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
	import { Input, Card, Skew, Spinner, Button, Headerz, ListTagNodes } from '$demo/index.js';
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

	// need to store the path link soemwhere for Canvas
	let data = { nodes: [], links: [] };

	let Canvas: any; // SvelteComponentTyped | null;
	let EndPoint: any; // SvelteComponentTyped | null;

	// config Canvas options
	let opts = {
		links: {
			strokeWidth: 1,
			textStartOffset: 20
		}
	};

	onMount(async () => {
		HypnsComponent = (await import('@douganderson444/hypns-svelte-component')).default;

		await loadIPFS();
		({ Web3WalletMenu } = await import('@peerpiper/web3-wallet-connector'));

		({ Canvas, EndPoint } = await import('@douganderson444/svelte-plumb'));

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
			await getInstance(bufftoHex(maybeValid));
		} catch (error) {
			console.error(error);
		}

		if (!loaded || !tag || !myData) return;
		await joseCryptor.put({ data: contacts }, 'Contacts');
	}

	function updateContacts(pubkey: Uint8Array, rootCID: string | null = null) {
		// see if there is an existing handle
		const existing = contacts?.[bufftoHex(pubkey)];
		if (existing) {
			existing.rootCID = rootCID;
			contacts = contacts; // refresh Svelte UI

			console.log({ contacts });
			return;
		}
		// if not, add it
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

		// if no contacts, get contacts from tagNodes
		if (!contacts && myTagNodes.hasOwnProperty('Contacts')) {
			console.log('Pulling contacts from crypt');
			const res = await joseCryptor.selfDecrypt(myTagNodes.Contacts);
			console.log({ res });
			if (!res) return;
			contacts = res.data as Record<string, ContactInfo>;
			// also need to load them into PiperNet
			for (const [pubkey, { handle, rootCID }] of Object.entries(contacts)) {
				await getInstance(pubkey);
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
			console.log('Setting up PiperNet for', publicKey);
			const inst = await hypnsNode.open({ keypair: { publicKey } }); // works with or without a PublicKey
			inst.on('update', (latest: any) => {
				if (latest?.rootCID) {
					console.log(`PiperNet update for ${publicKey} => ${latest.rootCID}`);
					updateContacts(maybeValid, latest.rootCID);
					pinCID(latest.rootCID);
				}
			});
			await inst.ready();
			return inst;
		} catch (error) {
			console.error(error);
		}
		return null;
	}

	async function pinCID(cid: string | CID) {
		console.log('Pinning...', cid.toString());

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
		tagNode,
		sender
	}: {
		tagNode: TagNode;
		sender: Uint8Array;
	}): Promise<boolean> {
		// myPublicKey
		if (!wallet) return false;
		const pk = await wallet.proxcryptor.getPublicKey();
		if (!Array.isArray(pk)) return false;
		return await joseCryptor.checkAccess(tagNode, pk as Uint8Array, sender);
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

	// When a user connects a data to a target, handle it
	async function handleConnected(e: CustomEvent) {
		console.log('Connected', e.detail);
		let toast = e.detail.source?.dataset + ' to ' + e.detail.target?.dataset;
		const maybeValid = validatePubKey(e.detail.target?.dataset?.pubkey);
		if (!maybeValid) return;
		if (!e.detail.source?.dataset?.tag) return;

		const pubkey = maybeValid;
		// grant access with proxcryptor
		await joseCryptor.grantAccess(e.detail.source.dataset.tag, pubkey);
		// toast
	}
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
	<Headerz>DAG-JOSE-<Skew>Proxcryptor</Skew> Mini Demo</Headerz>

	{#if Web3WalletMenu}
		<svelte:component
			this={Web3WalletMenu}
			on:walletReady={(e) => {
				wallet = e.detail.wallet;
			}}
		/>
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
				<Headerz><Skew color={'pink'}>New</Skew> Data</Headerz>
				<Input name="Tag" bind:value={tag} />
				<Input name="Your Data" bind:value={myData} />
				<Button clickHandler={putValue} disabled={!tag || !myData} type={'Yes'}>
					Encrypt & Save to Browser IPFS
				</Button>
			</Card>
			<Card>
				<Headerz>Contacts</Headerz>
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
			{#if myRootCID && Canvas}
				<Canvas bind:data let:connectable {opts} on:connected={handleConnected}>
					<Card>
						<Headerz>Your Data Details</Headerz>
						<div class="my-2">
							MyRootCID: <span class="bg-green-100 rounded-xl p-2 my-2 mono text-sm"
								>{myRootCID}</span
							>
						</div>

						<div class="flex flex-row justify-between w-full">
							{#if myTagNodes}
								{#key myTagNodes}
									{#await myTagNodes}
										Getting Tag NodeList...
									{:then myTagNodes}
										<div
											class="flex-initial flex flex-col bg-slate-200/20 shadow-lg m-1 p-4 rounded-xl w-2/5"
										>
											<Headerz>Data</Headerz>
											<ListTagNodes
												{getTagNodes}
												{ipfsNode}
												rootCID={myRootCID}
												decrypt={joseCryptor.selfDecrypt}
											>
												<EndPoint
													slot="endpoint"
													let:tag
													position={'right'}
													{connectable}
													options={{ dataset: { tag }, startOnly: true }}
												/>
											</ListTagNodes>
										</div>
										{#if contacts}
											{#key contacts}
												<div
													class="flex-initial flex flex-col bg-slate-200/20 shadow-lg m-1 p-4 rounded-xl w-2/5"
												>
													<Headerz>Contacts</Headerz>
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
															<EndPoint
																slot="endpoint"
																position={'left'}
																{connectable}
																options={{ dataset: { pubkey }, startOnly: true }}
															>
																<!-- custom endpoint -->
																<div
																	class="h-4 w-4 bg-white rounded-full border-4 border-black hover:ring hover:ring-green-800"
																/>
															</EndPoint>
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
														{:else}
															<div class="text-xs">No rootCID</div>
														{/if}
													{/each}
												</div>
											{/key}
										{/if}
									{/await}
								{/key}{/if}
						</div>
					</Card>
				</Canvas>
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
