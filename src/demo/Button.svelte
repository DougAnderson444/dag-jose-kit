<script lang="ts">
	import { Spinner } from '$demo/index.js';

	export let clickHandler: svelte.JSX.MouseEventHandler<HTMLButtonElement> | null | undefined =
		null;
	export let type: string = 'green';
	export let disabled: boolean = false;

	let green = 'bg-green-500 hover:bg-green-700 text-white';
	let blue = 'bg-blue-500 hover:bg-blue-700 text-white';
	let red = 'bg-red-500 hover:bg-red-700 text-white';
	let yellow = 'bg-yellow-500 hover:bg-yellow-700 text-white';
</script>

<button
	class="{!type || type == 'Yes'
		? green
		: type == 'No'
		? red
		: type == 'Connecting'
		? yellow
		: blue} font-bold rounded-lg shadow-md px-4 py-2 my-4 w-fit disabled:opacity-25 "
	disabled={disabled || type == 'Connecting'}
	on:click|preventDefault={clickHandler}
>
	<slot />
</button>
