<script lang="ts">
	import { Spinner } from '$demo/index.js';
	import { createEventDispatcher } from 'svelte';
	import type { TagNode } from '$lib/dagjosecryptor';

	export let tagNode: TagNode;
	export let decrypt: Function;
	export let sender: Uint8Array | undefined = undefined;
	export let viewAccess: Function | undefined = undefined;

	const dispatch = createEventDispatcher();

	let decrypted: any = false;
	let onAccessList: boolean = false;

	$: if (tagNode)
		(async () => {
			console.log('View access for', { tagNode });
			console.log('tagNode.tag', tagNode.tag, !viewAccess || !tagNode.tag || !sender);
			if (!viewAccess || !tagNode.tag || !sender) return;
			// check if is also on access list
			onAccessList = await viewAccess({ tagNode, sender });
		})();

	const decryptHandler = async (event: Event): Promise<void> => {
		console.log('decryptHandler', { tagNode }, { sender });
		if (sender && viewAccess) {
			if (!onAccessList) {
				console.log('not on access list');
				return;
			}
			decrypted = await decrypt(tagNode, sender);
		} else {
			decrypted = await decrypt(tagNode);
			if (!decrypted) {
				console.log('not decrypted');
				return;
			}
		}
		dispatch('decrypted', { decrypted: decrypted.data });
	};
</script>

<div class="flex flex-row">
	<div class="shrink mr-2">
		<slot name="tag" />
	</div>
	<div class="grow">
		{#if decrypted}
			{#await decrypted}
				<Spinner>Decrypting...</Spinner>
			{:then decrypted}
				<p>📂 Decrypted:</p>
				<slot decrypted={decrypted.data} />
			{/await}
		{:else if tagNode}
			<button
				on:click={decryptHandler}
				class="flex-1 mr-2 disabled:opacity-30"
				disabled={sender && !onAccessList}>🔒 Decrypt</button
			>
		{/if}
	</div>
	<slot name="ep" />
</div>
