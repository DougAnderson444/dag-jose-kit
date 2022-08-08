/**
 * Can be made globally available by placing this
 * inside `global.d.ts` and removing `export` keyword
 */

import type CID from '../modules/ipfs-core/'

export interface Locals {
	userid: string;
}

export interface EncryptedPackage {
	tag: string,
	schema: string[],
	timestamp: Date,
	encryptedData: cid, // link to the encryptedData saved in IPLD/IPFS
	encryptedKey: selfEncryptedSymmetricKey, // the tranform reCryptable symmetric key
	prev: CID || false // link to chain of saved data
}

// export type { TagNode } from './dagjosecryptor'
