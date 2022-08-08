<script lang="ts">
	export let color: string = 'green';

	let green = `before:bg-green-200 text-black `;
	let pink = 'before:bg-pink-500';
</script>

<span
	class="{color == 'pink'
		? pink
		: green} before:block before:absolute before:-inset-1 before:-skew-y-3 relative inline-block"
	><span class="relative pr-1"><slot /></span>
</span>
