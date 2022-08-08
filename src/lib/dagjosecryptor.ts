import { randomBytes } from '@stablelib/random';
// import * as hash from 'hash.js';
import { hexDigestMessage } from './utils/index';

// JWT & utilities
import { xc20pDirEncrypter, xc20pDirDecrypter, decryptJWE, createJWE } from 'did-jwt';
import { decodeCleartext, prepareCleartext } from 'dag-jose-utils';

import mitt from 'mitt';
import type { Emitter } from 'mitt';

import type { Proxcryptor } from '@peerpiper/iframe-wallet-sdk';
import type { IPFS } from 'ipfs-core-types';
import { CID } from 'multiformats/cid';

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

const REKEYS = 'reKeys';

let lock = false;

const sleep = (milliseconds) => {
	return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export type TagNode = {
			tag: string;
			schema: object;
			timestamp: Date; // unary to milliseconds string
			encryptedData: CID; // link to the encryptedData saved in IPLD/IPFS
			encryptedKey: string, // the tranform reCryptable symmetric key
			prev: CI; // link to the previous tag
			Record<K, O>; // new blank map for reCryptabled keys
		};

export type Events = {
	rootCIDUpdate: string;
};

export class DagJoseCryptor {
	rootCID: string;
	proxcryptor: Proxcryptor;
	ipfs: IPFS;
	emitter: Emitter<Events>;
	selfDecryptTag: Function;

	constructor(ipfs: IPFS, proxcryptor: Proxcryptor, cid?: string) {
		this.ipfs = ipfs;
		this.proxcryptor = proxcryptor;
		this.rootCID = cid || null;
		this.emitter = mitt<Events>();
	}

	async updateDag(tag, newEntry): Promise<string> {
		// new Entry CID
		const newCID = await this.ipfs.dag.put(newEntry, {
			pin: true,
			storeCodec: 'dag-cbor', // default
			preload: false
		});

		// get current object from given root
		const exisitingData = this.rootCID ? await this.ipfs.dag.get(CID.parse(this.rootCID)) : {};

		let data = {
			...exisitingData.value, // keep exisiting data
			[tag]: newCID, // push new data onto this object, overwriting if necessary
			prev: this.rootCID ? CID.parse(this.rootCID) : false // link to previous data, if existed
		};

		// save it to the DAG rollup
		const newRootCID = await this.ipfs.dag.put(data, {
			pin: true,
			storeCodec: 'dag-cbor' // default
		});

		// force preload of newly saved DAG
		this.ipfs.dag.get(newRootCID);

		return newRootCID.toString();
	}

	async getHashedTags(
		tag: string,
		targetPublicKey: Uint8Array,
		senderPubKey: Uint8Array
	): Uint8Array {
		const tagArray: Uint8Array = textEncoder.encode(tag);

		// TODO: asymmetrically encrypt for their public key instead? Lookup will be longer though
		const input = new Uint8Array([...tagArray, ...targetPublicKey, ...senderPubKey]);

		// const hashedPubkeys = hash.sha256().update(input).digest('hex');
		// crypto.subtle.digest('SHA-256', input);
		const hashedPubkeys = await hexDigestMessage(input);
		return hashedPubkeys;
	}

	async getTagReKeysNode(tag) {
		if (!tag) return;
		// get current list of rekeys
		const resTagNode = await this.ipfs.dag.get(CID.parse(this.rootCID), { path: `/${tag}` });
		let tagNode = resTagNode.value;
		const reKeyNode = tagNode[REKEYS];
		return { reKeyNode, tagNode };
	}

	async setTagReKeys(tag: string, targetPublicKey: Uint8Array): Promise<CID> {
		// put key is special because it is not encrypted
		// but gets added to rootCID
		// so targets can access their decryption keys
		// key = hash(target public key + tag) <-- would be the same across apps, correlation possible
		// key = hash(sender public key + target public key + tag) <-- unique across apps
		if (!tag) return;

		// get senders publicKey
		const senderPubKey = await this.proxcryptor.getPublicKey(); // get current/active proxcryptor publicKey

		const hashedPubkeys = await this.getHashedTags(tag, targetPublicKey, senderPubKey); // hex string

		let { reKeyNode, tagNode } = await this.getTagReKeysNode(tag);

		// generate a re-encryption key for this targetPublicKey
		const targetsReKey = await this.proxcryptor.generateReKey(targetPublicKey, tag);

		// now reencrypt using the encrypted msg + reKey
		const targetsReEncryptedKey = await this.proxcryptor.reEncrypt(
			targetPublicKey,
			tagNode.encryptedKey,
			targetsReKey
		);

		// lookup dictionary: Map of (key=hash, value=reEncrKey)
		reKeyNode[hashedPubkeys] = targetsReEncryptedKey;

		// update reKeyNode in Tag object
		tagNode = { ...tagNode, [REKEYS]: reKeyNode };

		// update CID rollup
		this.rootCID = await this.updateDag(tag, tagNode);
		return this.rootCID;
	}

	async checkAccess(tag: string, targetPublicKey: Uint8Array, senderPubKey: Uint8Array) {
		if (!tag) return;

		// check if this target is on the ReKey list
		const hashedPubkeys = await this.getHashedTags(tag, targetPublicKey, senderPubKey); // hex string
		let { reKeyNode, tagNode } = await this.getTagReKeysNode(tag);

		// lookup in dictionary: Map of (key=hash, value=reEncrKey)
		if (hashedPubkeys in reKeyNode) return reKeyNode[hashedPubkeys]; // access was granted
		// else
		return false;
	}

	decryptFromTagNode = async(tagNode, senderPubKey: Uint8Array): Promise<object | false> =>{
		/**
		Just need to decrypt it using the de-proxcryptor, here's how:
		1. Get the reKey from the tagNode that matches the hashTag of this pubkey
		hashTag comes from proxcryptor.getHashedTags()
		2. Take that reKey together with the cid of the Tag and call proxcryptor.get(cid, reKey)
		3. Result is the decrypted data
		4. If the user doesnt have access, return false
		*/
		const targetPublicKey = await this.proxcryptor.getPublicKey();
		const hashTag = await this.getHashedTags(tagNode.tag, targetPublicKey, senderPubKey);

		// validate
		if (!(hashTag in tagNode[REKEYS])) return false; // no reKey avaialble to decrypt for this prox public_key

		// lookUp
		const reKey = tagNode[REKEYS][hashTag];
		return await this.get(tagNode.encryptedData, reKey);
	}

	async put(secretz: object, tag: string, schema = {}) {
		// cleanse input object of undefined values, IPLD doesnt like undefined properies
		secretz = Object.fromEntries(
			Object.entries(secretz).map(([k, v]) => (v === undefined ? [k, null] : [k, v]))
		);

		// Create a key, encrypt and store a block, then load and decrypt it:
		const symmetricKey = randomBytes(32); // our random secret key
		const selfEncryptedSymmetricKey = await this.proxcryptor.selfEncrypt(symmetricKey, tag);
		const cid = await this.storeDAGEncrypted(secretz, symmetricKey); // for when arweave can put DAG objects, see https://github.com/ArweaveTeam/arweave/pull/338
		// const cid = await this.storeIPFSEncrypted(secretz, symmetricKey);

		// pin encryptedData cid
		let pinned = await this.ipfs.pin.add(cid, { recursive: true });

		while (lock) {
			await sleep(1000);
		}

		lock = true;

		let prev = false;
		// this will be caught if rootCID is null, ie) no prev entires yet
		try {
			let res = await this.ipfs.dag.resolve(`${this.rootCID}/${tag}`);
			prev = res.cid;
		} catch (error) {
			prev = false;
		}
		const newEntry = {
			tag,
			schema,
			timestamp: +new Date(), // unary to milliseconds string
			encryptedData: cid, // link to the encryptedData saved in IPLD/IPFS
			encryptedKey: selfEncryptedSymmetricKey, // the tranform reCryptable symmetric key
			[REKEYS]: {}, // new blank map for reCryptabled keys
			prev
		};

		this.rootCID = await this.updateDag(tag, newEntry);
		this.emitter.emit('rootCIDUpdate', this.rootCID);
		lock = false;
	}

	async get(cid: CID, re_encrypted_message): Promise<object> {
		// decrypt
		const symmetricKey = await this.proxcryptor.reDecrypt(re_encrypted_message);
		const decoded = await this.loadEncrypted(cid, symmetricKey);
		return decoded;
	}

	selfDecryptTagNode = async (tagNode): Promise<object> | Promise<false> => {
		if (!this.rootCID || !this.ipfs || !tag) return false;

		try {
			// const tag = tagNode.tag
			// const cid = (
			// 	await this.ipfs.dag.get(CID.parse(this.rootCID), { path: `/${tag}`, localResolve: true })
			// ).value;
			// let tagNode = (await this.ipfs.dag.get(cid, { localResolve: true })).value;
			return await this.selfDecrypt(tagNode);
		} catch (error) {
			// tag may not exist yet, or maybe the user is typing
			console.warn(`${tag} no DAG data`);
			return false;
		}
	};

	selfDecrypt = async(tagNode: TagNode): Promise<object> | Promise<false> => {
		try {
			const symmetricKey = await this.proxcryptor.selfDecrypt(tagNode.encryptedKey);
			const decoded = await this.loadEncrypted(tagNode.encryptedData, symmetricKey);
			// const decoded = await this.loadIPFSEncrypted(data.encryptedData, symmetricKey);
			return decoded;
		} catch (error) {
			console.error('In selfDecrypt', error);
			return false;
		}
	}

	// Encrypt and store a payload using a secret key:
	storeDAGEncrypted = async (payload, key) => {
		const jwe = await this.makeJWE(payload, key);
		/* Let IPFS store the bytes using the DAG-JOSE codec and return a CID
		 * Note: here it is format: codecName
		 * In ipfs.create({ipld: { codecs: codec }}) (used to be format, but name changed)
		 * Changes to storeCodec/inputCodec in upcomign chg  https://github.com/ipfs/js-ipfs/blob/a960d28d4689c794889f91c9307f0aeb0d6a45f3/docs/core-api/DAG.md
		 */
		const cid = await this.ipfs.dag.put(jwe, {
			// TODO: Wait until ipfs-go codec lands? https://github.com/ipfs/js-ipfs/pull/3917
			// format: 'dag-jose' // dagJose.code, // codec code ensures this jose CID is saved
			pin: true,
			storeCodec: 'dag-cbor', // default
			hashAlg: 'sha2-256', // default
			preload: false
		});
		return cid;
	};

	storeIPFSEncrypted = async (payload, key) => {
		const jwe = await this.makeJWE(payload, key);
		const res = await this.ipfs.add(JSON.stringify(jwe), {
			cidVersion: 1,
			pin: true
		});
		return res.cid;
	};

	makeJWE = async (payload, key) => {
		// self enct
		const dirEncrypter = xc20pDirEncrypter(key);
		// prepares a cleartext object to be encrypted in a JWE
		const cleartext = await prepareCleartext(payload);
		// encrypt into JWE container layout using secret key
		const jwe = await createJWE(cleartext, [dirEncrypter]);
		return jwe;
	};

	// Load an encrypted block from a CID and decrypt the payload using a secret key:
	loadEncrypted = async (cid: CID, key) => {
		const dirDecrypter = xc20pDirDecrypter(key);
		const retrieved = await this.ipfs.dag.get(cid);
		const decryptedData = await decryptJWE(retrieved.value, dirDecrypter);
		return decodeCleartext(decryptedData);
	};
}
