import type { IPFS } from 'ipfs-core-types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
	// interface Session {}
	// interface Stuff {}
}

declare global {
	var ipfsNode: IPFS;
}

declare module '@peerpiper/dag-jose-proxcryptor';
