<script lang="ts">
	type Colors = 'blue' | 'gray' | 'red' | 'yellow' | 'purple' | 'green' | 'indigo' | 'pink';

	export let progress: string = '45';
	export let size: string = 'h-2.5';
	export let labelInside: boolean = false;
	export let labelOutside: string = '';
	export let color: Colors = 'green';

	const barColors = {
		blue: 'bg-blue-600',
		gray: 'bg-gray-600 dark:bg-gray-300',
		red: 'bg-red-600 dark:bg-red-500',
		green: 'bg-green-500 dark:bg-green-500',
		yellow: 'bg-yellow-400',
		pink: 'bg-pink-500 ',
		purple: 'bg-purple-600 dark:bg-purple-500',
		indigo: 'bg-indigo-600 dark:bg-indigo-500'
	};
</script>

{#if labelOutside}
	<div class="flex justify-between mb-1">
		<span class="text-base font-medium  dark:text-white">{labelOutside}</span>
		<span class="text-sm font-medium  dark:text-white">{progress}%</span>
	</div>
{/if}
<div class="w-full bg-gray-200 rounded-full {size} dark:bg-gray-700">
	{#if labelInside}
		<div
			class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
			style="width: {progress}%"
		>
			{progress}%
		</div>
	{:else}
		<div class={barColors[color] + ' ' + size + ' rounded-full'} style="width: {progress}%" />
	{/if}
</div>
