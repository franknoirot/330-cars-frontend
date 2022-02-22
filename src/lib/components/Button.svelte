<script>
	import CarList from './CarList.svelte';
</script>

<button {...$$restProps}>
	<slot />
</button>

<style>
	button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px;

		background: #e2f5ff;
		color: #155070;
		border: none;
		font-size: 1.2rem;
		border-radius: 4px;
	}

	button:hover {
		background: #ade4ff;
		color: #0c3a53;
	}

	button.available {
		color: #157039;
		background: #e2ffe8;
	}

	button.unavailable {
		color: #8d787a;
		background: #fff4f5;
	}
</style>
