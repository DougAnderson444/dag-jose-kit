<script lang="ts">
	import Progressbar from './Progressbar.svelte';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { onMount } from 'svelte';

	export let duration: number = 60000; // 10 seconds
	export let label: string | null = null;

	// create tweened value between 0 and 20 seconds
	const loader = tweened(1, {
		duration,
		easing: cubicOut
	});
	onMount(async () => {
		$loader = 99;
	});
</script>

{#if $loader}
	<Progressbar
		size="h-6"
		progress={String($loader.toFixed(0))}
		labelOutside="Loading{label ? ' ' + label : ''}... {$loader.toFixed(0)}%"
	/>
{/if}
