<script>
	import { goto } from '$app/navigation';
	import { offsetNowHours } from '$lib/timeHelpers';
	import Button from '$lib/components/Button.svelte';
	import Icon from './Icon.svelte';

	export let onSubmit = () => {}; // no-op by default
	export let onChange = () => {}; // no-op by default
	export let numResults = 0;
	export let pickup = offsetNowHours(1.5); // 1.5 hours from now
	export let dropoff = offsetNowHours(25.5); // 25.5 hours from now
	export let isAvailable;
	let duration = 24 * 60 * 60 * 1000; // 1 day in ms

	function onPickupChange(e) {
		dropoff = new Date(new Date(pickup + 'Z').getTime() + duration).toISOString().slice(0, -1);
	}

	function onDropoffChange() {
		duration = new Date(dropoff + 'Z').getTime() - new Date(pickup + 'Z').getTime();
	}

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

<form
	id="booking-form"
	on:submit|preventDefault={onSubmit}
	on:change|preventDefault={onChange}
	{...$$restProps}
>
	<div class="fields">
		<label for="pickup">
			Pickup
			<input
				type="datetime-local"
				id="pickup"
				name="pickup"
				bind:value={pickup}
				step={15 * 60}
				min={offsetNowHours(1)}
				on:change={onPickupChange}
				required
			/>
		</label>
		<label for="dropoff">
			Dropoff
			<input
				type="datetime-local"
				id="dropoff"
				name="dropoff"
				bind:value={dropoff}
				step={15 * 60}
				min={pickup}
				on:change={onDropoffChange}
				required
			/>
		</label>
	</div>
	<Button
		type="submit"
		style="margin-top: 0; width: 100%;"
		class={buttonClass}
		disabled={isAvailable === false}
	>
		{#if isAvailable === undefined}
			<Icon type="search" width="18" stroke="#155070" />
			{!numResults ? 'Search available cars' : numResults + ' cars available'}
		{:else if isAvailable}
			<Icon type="check" width="18" /> Book Now
		{:else if !isAvailable}
			<Icon type="x" width="16" /> Choose another time
		{/if}
	</Button>
</form>

<style>
	#booking-form {
		width: fit-content;
	}

	.fields {
		padding: 1.5rem;
	}

	label {
		display: block;
		margin: 1.5rem 0;
		font-weight: bold;
	}

	label:first-of-type {
		margin-top: 0;
	}
	label:last-of-type {
		margin-bottom: 0;
	}

	input[type='datetime-local'] {
		display: block;
		font-size: 1.2rem;
		padding: 0.5rem;
		border-radius: 2px;
		font-family: sans-serif;
		border: 1px solid #e9f2fc;
		margin-top: 0.5rem;
	}

	:global(#booking-form.home) {
		margin: 1.5rem auto;
	}
	@media (max-width: 768px) {
		#booking-form {
			margin-top: 0;
		}

		:global(#booking-form.home) {
			margin: 0;
			width: 100%;
			padding: 0 1rem;
			box-sizing: border-box;
			margin-block-end: 1.5rem;
		}

		/* Home page-specific mobile styles */
		:global(#booking-form.home) .fields {
			padding: 0;
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			margin-block-end: 1rem;
		}

		:global(#booking-form.home) label {
			margin: 0;
			width: 100%;
		}

		:global(#booking-form.home) input[type='datetime-local'] {
			box-sizing: border-box;
			width: 100%;
		}
	}
</style>
