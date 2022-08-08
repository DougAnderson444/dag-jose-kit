import b64 from 'base64-js';
import bs58 from 'bs58';
import { CID } from 'multiformats/cid';
import type { IPFS } from 'ipfs-core-types';

const ROOT_CID = '__ROOT_CID';
const PUBLIC_KEY_BYTES = 32;

// Pre-Init
const LUT_HEX_4b = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const LUT_HEX_8b = new Array(0x100);
for (let n = 0; n < 0x100; n++) {
	LUT_HEX_8b[n] = `${LUT_HEX_4b[(n >>> 4) & 0xf]}${LUT_HEX_4b[n & 0xf]}`;
}
// End Pre-Init
export function bufftoHex(buffer) {
	let out = '';
	for (let idx = 0, edx = buffer.length; idx < edx; idx++) {
		out += LUT_HEX_8b[buffer[idx]];
	}
	return out;
}

export const bytesFromHexString = (hexString) =>
	new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));

export function hexToB64(hex) {
	const maybeValid = validatePubKey(hex);
	// if (!maybeValid) return;
	return b64.fromByteArray(maybeValid);
}

// returns byte array of any public key encoding
export function validatePubKey(pubKey): Uint8Array | false {
	// console.log('Validating', { pubKey });

	if (!pubKey) return false;

	// base64 / base64URL
	let pubKeyBytes = b64.toByteArray(pubKey);

	if (pubKeyBytes.length == PUBLIC_KEY_BYTES) {
		return pubKeyBytes;
	} else {
		// console.log('Not base 64', { pubKey });
	}

	// base58 / base58BTC
	try {
		let b58Bytes = bs58.decode(pubKey);
		// console.log(
		// 	{ b58Bytes },
		// 	b58Bytes.length,
		// 	PUBLIC_KEY_BYTES,
		// 	b58Bytes.length == PUBLIC_KEY_BYTES
		// );

		if (b58Bytes.length == PUBLIC_KEY_BYTES) {
			return b58Bytes;
		}
	} catch (error) {
		// console.log('Not base 58', { pubKey });
	}

	try {
		// hex
		let hexBytes = bytesFromHexString(pubKey);
		// console.log({ hexBytes });

		if (hexBytes.length === PUBLIC_KEY_BYTES) {
			return hexBytes;
		}
	} catch (error) {
		console.warn('Not hex either ', { pubKey });
	}

	console.warn('Not any supported encodings :( ');

	return false;
}

export async function hexDigestMessage(message) {
	const msgUint8 = new TextEncoder().encode(message); // encode as (utf-8) Uint8Array
	const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8); // hash the message
	const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
	const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
	return hashHex;
}

// : Promise<any[]>
export async function getTagNodes({
	ipfsNode,
	rootCID
}: {
	ipfsNode: IPFS;
	rootCID: string;
}): Promise<Record<string, TagNode>> {
	if (!ipfsNode || !rootCID) return;
	const root = await ipfsNode.dag.get(CID.parse(rootCID));
	const promises = Object.entries(root.value).map(async ([key, val]) => {
		if (key === 'prev' || !val) return null;
		let fields = await ipfsNode.dag.get(val);
		return [key, fields.value]; // https://github.com/ipfs/js-ipfs/blob/master/docs/core-api/DAG.md#ipfsdaggetcid-options
	});

	const result = await Promise.all(promises);
	const filtered = result.filter((r) => r);
	return Object.fromEntries(filtered); // filter out null values, turn back into object
}

//: Promise<any>
export async function getTagNode({ tag, rootCID, ipfsNode }) {
	if (!rootCID || !ipfsNode || !tag) return;

	try {
		const tagCid = (await ipfsNode.dag.get(rootCID, { path: `/${tag}`, localResolve: true })).value;
		let tagNode = (await ipfsNode.dag.get(tagCid, { localResolve: true })).value;
		return tagNode;
	} catch (error) {
		// tag may not exist yet, or maybe the user is typing
		console.warn(`${tag} no DAG data`);
		return false;
	}
}
