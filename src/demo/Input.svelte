<script lang="ts">
	export let name: string;
	export let value: string;
	export let placeholder: string = '';
</script>

<div class="flex-1 mt-2">
	<label class="flex-col">
		<span
			class="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700"
		>
			{name}
		</span>
		<input
			bind:value
			type="text"
			name="text"
			class="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
			{placeholder}
		/>
	</label>
</div>
