<script>
	import Button from '$lib/components/Button.svelte';
	import Icon from './Icon.svelte';
	export let isAvailable;

	let buttonClass;
	$: switch (isAvailable) {
		case undefined:
			buttonClass = '';
			break;
		case false:
			buttonClass = 'unavailable';
			break;
		case true:
			buttonClass = 'available';
	}
</script>

<div class="btn-wrapper">
	<span class={'capitalized-label ' + (isAvailable ? 'available' : 'unavailable')}>
		{#if isAvailable}
			<Icon type="check" width="14" /> Available
		{:else}
			<Icon type="x" width="14" /> Reserved
		{/if}
	</span>
	<Button disabled={isAvailable === false} on:click>
		{#if isAvailable}
			Book Now
			<span class="flip-x"><Icon type="arrow" width="20" /></span>
		{:else}
			Choose another time
		{/if}
	</Button>
</div>

<style>
	.btn-wrapper,
	.capitalized-label {
		align-items: center;
	}

	.btn-wrapper {
		display: grid;
		grid-template-columns: auto 1fr;
		margin-top: 2rem;
		gap: 1rem;
	}
	.capitalized-label {
		display: flex;
		gap: 0.5rem;
	}

	.available {
		color: #639878;
	}

	.unavailable {
		color: #8d787a;
	}
</style>
