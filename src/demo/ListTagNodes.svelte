<script lang="ts">
	import Item from './Item.svelte';
	import type { IPFS } from 'ipfs-core-types';
	import type { TagNode } from '$lib/dagjosecryptor';

	export let getTagNodes: Function;
	export let decrypt: Function;
	export let sender: Uint8Array | undefined = undefined;
	export let viewAccess: Function | undefined = undefined;
	export let rootCID: string;
	export let ipfsNode: IPFS;

	let tagNodes: TagNode[];

	getTagNodes({ ipfsNode, rootCID }).then((tn: TagNode[]) => {
		tagNodes = tn;
		console.log({ tagNodes, rootCID });
	});
</script>

{#if tagNodes}
	{#key tagNodes}
		{#await tagNodes}
			Fetching {rootCID}...
		{:then tagNodes}
			<div class="text-xs bg-neutral-300 rounded-lg p-2">rootCID: {rootCID}</div>
			{#each Object.entries(tagNodes) as [tag, tagNode]}
				{#key tagNode}
					<Item {tagNode} {decrypt} {viewAccess} {sender} let:decrypted>
						<svelte:fragment slot="tag">
							{tag}
						</svelte:fragment>
						<div class="p-2">
							{decrypted}
						</div>
						<svelte:fragment slot="ep">
							<slot name="endpoint" {tag} pubkey={sender} />
						</svelte:fragment>
					</Item>
					<!-- endpoint slot -->
				{/key}
			{/each}
		{/await}
	{/key}
{/if}
<slot />
