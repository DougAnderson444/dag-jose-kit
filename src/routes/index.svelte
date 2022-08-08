<script lang="ts">
	import { onMount } from 'svelte';
	import type { CID } from 'multiformats/cid';

	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import {
		DagJoseCryptor,
		bufftoHex,
		getTagNodes,
		getTagNode,
		validatePubKey,
		hexToB64,
		bytesFromHexString
	} from '@peerpiper/dag-jose-proxcryptor-kit';

	/**
	 * You need an object that implements the Proxcryptor interface
	 * You get this from the iframe wallet SDK
	 */
	import type { handlers } from '@peerpiper/iframe-wallet-sdk';
	import type { SvelteComponentTyped } from 'svelte/internal';
	// import type { DagJoseCryptor } from '@peerpiper/dag-jose-proxcryptor-kit';
	import type { IPFS } from 'ipfs-core-types';

	// import some demo utils
	import { Item, Input, Card, Skew, Spinner, Button, Title, ListTagNodes } from '$demo/index.js';
	import Progress from '$demo/Progress.svelte';
	import type { TagNode } from '$lib/dagjosecryptor.js';

	// hypns (via hypercore-protocol & hyperswarm topics) gives us a way to pass around the latest rootCID of a public key
	let HypnsComponent: any; // SvelteComponentTyped

	// and our hypns opener var
	interface HypnsNode {
		open: Function;
		close: Function;
	} // publicKey is hex string

	interface HypnsInstance {
		latest: any;
		publicKey: string;
		on: Function;
		publish: Function;
	}
	let hypnsNode: HypnsNode;
	let myHypnsInstance: HypnsInstance; // our instance of Hypns.open(ourWallet)

	let setJoseCryptor: Function;
	let joseCryptor: DagJoseCryptor;
	let myRootCID: string;
	let myPublicKey: Uint8Array;
	let loaded: boolean;

	/**
	 * In order to save to IPFS/IPLD, we need an IPFS ipfsNode
	 */
	let ipfsNode: IPFS;
	async function loadIPFS() {
		// little trick to allow faster development and avoid IPFS lockfile issues on the repo
		if (globalThis.ipfsNode && !ipfsNode) {
			ipfsNode = globalThis.ipfsNode;
			return;
		}

		const mod = await import('../modules/ipfs-core-0.14.0/ipfs-core.js');
		const IPFSModule = mod.default;

		ipfsNode = await IPFSModule.create();
		globalThis.ipfsNode = ipfsNode;
	}
	/**
	 * We need a Proxcryptor, which we can get from the iFrame Wallet SDK
	 */
	let wallet: typeof handlers | null = null;
	let Web3WalletMenu: SvelteComponentTyped | null;

	// data props
	let tag: string = 'Color';
	let myData: string = 'Blue';

	// contact props
	interface ContactInfo {
		rootCID: string | null;
		handle: string;
	}

	type PubKey = string;

	let contacts: Record<PubKey, ContactInfo> | undefined = undefined;
	let handle: string = 'DougAnderson444';
	let myContact: string = 'GnHDprayyzahnWjDqvQ9AGWsmjojWymVNztGHNr4S7an';

	// we also need a way to display the data in our IPFS nodes
	let myTagNodes: Record<string, TagNode>;

	onMount(async () => {
		HypnsComponent = (await import('@douganderson444/hypns-svelte-component')).default;

		await loadIPFS();
		({ Web3WalletMenu } = await import('@peerpiper/web3-wallet-connector'));

		setJoseCryptor = async () => {
			if (!wallet?.proxcryptor) return;
			joseCryptor = new DagJoseCryptor(ipfsNode, wallet.proxcryptor, myRootCID); //refesh when updated
			joseCryptor.emitter.on('rootCIDUpdate', (val) => {
				console.log('rootCIDUpdate', { val });
				myRootCID = val; // val == joseCryptor.rootCID;
			});

			const pk = await wallet.proxcryptor.getPublicKey();
			if (!Array.isArray(pk)) return;
			myPublicKey = pk as Uint8Array;
			loaded = true;
		};
	});

	async function putValue(
		event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
	): Promise<void> {
		console.log('putting: ', { [tag]: myData });

		if (!loaded || !tag || !myData) return;
		await joseCryptor.put({ data: myData }, tag);
	}

	async function putContact(_: Event): Promise<void> {
		const maybeValid = validatePubKey(myContact);
		if (!maybeValid || !hypnsNode) return;

		updateContacts(maybeValid);

		// Open any missing hypns listener for the PK
		try {
			const newInstance = await getInstance(bufftoHex(maybeValid));
			if (!newInstance) return;
			setupHypnsInstance(newInstance);
		} catch (error) {
			console.error(error);
		}

		if (!loaded || !tag || !myData) return;
		await joseCryptor.put({ data: contacts }, 'Contacts');
	}

	function updateContacts(pubkey: Uint8Array, rootCID: string | null = null) {
		contacts = {
			...contacts,
			[bufftoHex(pubkey)]: { handle, rootCID }
		};
	}

	async function handleRootCIDUpdate() {
		if (!myRootCID) return;
		const tn = await getTagNodes({ ipfsNode, rootCID: myRootCID });
		if (!tn) return;
		myTagNodes = tn;

		console.log({ contacts }, !contacts);
		// if no contacts, get contacts from tagNodes
		if (!contacts && myTagNodes.hasOwnProperty('Contacts')) {
			console.log('Pulling contacts from crypt');
			const res = await joseCryptor.selfDecrypt(myTagNodes.Contacts);
			console.log({ res });
			if (!res) return;
			contacts = res.data as Record<string, ContactInfo>;
			// also need to load them into PiperNet
			for (const [pubkey, { handle, rootCID }] of Object.entries(contacts)) {
				const newInstance = await getInstance(pubkey);
				if (!newInstance) continue;
				setupHypnsInstance(newInstance);
			}
		}
	}

	async function initHypnsNode() {
		const instance = await hypnsNode.open({ wallet }); // makes a new keypair for you if no wallet
		await instance.ready();
		myHypnsInstance = instance;
		myHypnsInstance.on('update', (latest: any) => {
			console.log('SELF rootCIDUpdate', { latest });
			if (latest?.rootCID) {
				// handle initial loading use case where joseCryptor.rootCID == null
				if (joseCryptor.rootCID != latest.rootCID) {
					joseCryptor.rootCID = latest.rootCID;
				}
				// put this second, as it triggers Svelte updates that rely on joseCryptor.rootCID being set already
				myRootCID = latest.rootCID;
				pinCID(latest.rootCID);
				myHypnsInstance = myHypnsInstance;
			}
		});
	}

	// opens a readonly version of a contact's hypns instance
	// pk: string is hex publicKey
	async function getInstance(pk: string): Promise<HypnsInstance | null> {
		const maybeValid = validatePubKey(pk);
		if (!maybeValid) return null;
		const publicKey = bufftoHex(maybeValid);
		try {
			const inst = await hypnsNode.open({ keypair: { publicKey } }); // works with or without a PublicKey
			await inst.ready();
			return inst;
		} catch (error) {
			console.error(error);
		}
		return null;
	}

	function setupHypnsInstance(instance: HypnsInstance): void {
		console.log('Setting up', instance.publicKey);

		const maybeValidpk = validatePubKey(instance.publicKey);
		if (!maybeValidpk) return;
		// updateContacts(maybeValidpk);

		instance.on('update', (latest: any) => {
			if (latest?.rootCID) {
				console.log(`update: ${latest.rootCID}`);
				updateContacts(maybeValidpk, latest.rootCID);
				pinCID(latest.rootCID);
			}
		});
	}

	async function pinCID(cid: string | CID) {
		let pinned = await ipfsNode.pin.add(cid, { recursive: true });
		console.log({ pinned: pinned.toString() });

		for await (const ref of ipfsNode.refs(cid, { recursive: true })) {
			if (ref.err) {
				// console.error(ref.err);
			} else {
				// console.log(ref.ref);
				// output: "QmHash"
			}
		}
	}

	async function viewAccess({
		tag,
		sender
	}: {
		tag: string;
		sender: Uint8Array;
	}): Promise<boolean> {
		// myPublicKey
		if (!wallet) return false;
		const pk = await wallet.proxcryptor.getPublicKey();
		if (!Array.isArray(pk)) return false;
		return await joseCryptor.checkAccess(tag, pk as Uint8Array, sender);
	}

	/**
	 * Svelte $:Triggers
	 */

	// trigger config once everything is loaded
	$: if (ipfsNode && setJoseCryptor && wallet && wallet?.proxcryptor) setJoseCryptor();

	// trigger hypns init once node + wallet are loaded
	$: !!hypnsNode && wallet && initHypnsNode();

	/**
	 * When rootCID updates:
	 *  Show latest tagNodes assoc with the rootCID
	 */
	$: myRootCID && handleRootCIDUpdate();
</script>

{#if !ipfsNode}
	<div class="p-6 text-green-500 bg-neutral-900 rounded-xl">
		<Progress duration={45000} label="PiperNet" />
	</div>
{/if}

{#if HypnsComponent}
	<HypnsComponent bind:hypnsNode />
	{#if myRootCID && myHypnsInstance}
		{#if myRootCID != myHypnsInstance?.latest?.rootCID}
			<div
				class="text-amber-300 bg-neutral-900 rounded-lg p-4 m-4"
				transition:fly={{
					delay: 100,
					duration: 300,
					x: 0,
					y: -200,
					opacity: 0.25,
					easing: quintOut
				}}
			>
				⚠️ PiperNet needs updating <button
					class="m-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					on:click={(_) => myHypnsInstance.publish({ rootCID: myRootCID })}>Publish Update</button
				>
			</div>
		{/if}
	{/if}
{/if}

<main class="m-4 flex flex-col h-screen">
	<Title>DAG-JOSE-<Skew>Proxcryptor</Skew> Mini Demo</Title>

	{#if Web3WalletMenu}
		<svelte:component this={Web3WalletMenu} bind:wallet />
	{:else}
		<div class="fixed top-10 right-10 ">
			<Spinner>Loading Wallet...</Spinner>
		</div>
	{/if}

	<div class="text-lg font-semibold text-left ">
		Once IPFS & the wallet are loaded, then you can use the proxcryptor
	</div>

	{#if loaded}
		<div class="flex flex-row mt-4 flex-nowrap justify-start items-stretch space-x-4 align-top ">
			<Card>
				<Title><Skew color={'pink'}>New</Skew> Data</Title>
				<Input name="Tag" bind:value={tag} />
				<Input name="Your Data" bind:value={myData} />
				<Button clickHandler={putValue} disabled={!tag || !myData} type={'Yes'}>
					Encrypt & Save to Browser IPFS
				</Button>
			</Card>
			<Card>
				<Title>Contacts</Title>
				<Input name="Handle" bind:value={handle} />
				<Input name="Their Public Key" bind:value={myContact} />
				<Button
					clickHandler={putContact}
					disabled={!handle || !myContact || !hypnsNode || !ipfsNode}
					type={'Yes'}
				>
					Save to Browser
				</Button>
			</Card>
		</div>

		<div class="mt-4">
			{#if myRootCID}
				<Card>
					<Title>Your Data Details</Title>
					<div class="my-2">
						MyRootCID: <span class="bg-green-100 rounded-xl p-2 my-2 mono text-sm">{myRootCID}</span
						>
					</div>

					<div class="flex flex-row">
						{#if myTagNodes}
							{#await myTagNodes}
								Getting Tag NodeList...
							{:then myTagNodes}
								<div class="flex-1 flex flex-col bg-slate-200/20 shadow-lg m-1 p-4 rounded-xl">
									<Title>Data</Title>
									<ListTagNodes
										{getTagNodes}
										{ipfsNode}
										rootCID={myRootCID}
										decrypt={joseCryptor.selfDecrypt}
									/>
								</div>
								{#if contacts}
									<div class="flex-1 flex flex-col bg-slate-200/20 shadow-lg m-1 p-4 rounded-xl">
										<Title>Contacts</Title>
										<!-- If no contacts, decrypt them from IPLD -->
										{#each Object.entries(contacts) as [pubkey, { handle, rootCID }]}
											<div
												class="flex flew-row items-center bg-green-100 rounded-lg text-xs h-fit border-2"
											>
												<div class="p-2">
													{handle}
												</div>
												<div class="p-2">
													{hexToB64(pubkey)}
												</div>
											</div>
											{#if rootCID}
												<div class="p-2">
													<!-- Get TAGS for each rootCID -->
													<ListTagNodes
														{getTagNodes}
														{ipfsNode}
														{rootCID}
														decrypt={pubkey.toLocaleUpperCase() ==
														myHypnsInstance.publicKey.toLocaleUpperCase()
															? joseCryptor.selfDecrypt
															: joseCryptor.decryptFromTagNode}
														sender={pubkey.toLocaleUpperCase() ==
														myHypnsInstance.publicKey.toLocaleUpperCase()
															? undefined
															: bytesFromHexString(pubkey)}
														viewAccess={pubkey.toLocaleUpperCase() ==
														myHypnsInstance.publicKey.toLocaleUpperCase()
															? undefined
															: viewAccess}
													/>

													<!-- Check contacts access list -->
													<!-- Offer to decrypt if on access list -->
												</div>
											{/if}
										{/each}
									</div>
								{/if}
							{/await}
						{/if}
					</div>
				</Card>
			{:else}
				<div
					class="flex flex-grow rounded-3xl border-4 border-dashed p-10 font-extrabold text-xl text-black/30"
				>
					No Data to Show Yet
				</div>
			{/if}
		</div>
	{/if}
</main>
