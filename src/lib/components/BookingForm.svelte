<script>
	import { createEventDispatcher } from 'svelte';
	import { pickup, dropoff } from '$lib/stores';
	import { offsetNowHours } from '$lib/timeHelpers';
	import { durationInDays, ONE_DAY_IN_MS } from '$lib/utils';

	const dispatch = createEventDispatcher();
	export let onSubmit = () => {}; // no-op by default
	export let onChange = () => {}; // no-op by default
	let duration = ONE_DAY_IN_MS;

	function onPickupChange(e) {
		$dropoff = new Date(new Date($pickup + 'Z').getTime() + duration).toISOString().slice(0, -1);
	}

	function onDropoffChange() {
		duration = durationInDays($pickup, $dropoff)
		dispatch('duration_update', duration);
	}
</script>

<section>
	<h2>Reservation Dates</h2>
	<form
		id="booking-form"
		on:submit|preventDefault={onSubmit}
		on:change|preventDefault={onChange}
		{...$$restProps}
	>
		<div class="fields">
			<label for="pickup" class="capitalized-label">
				Pickup
				<input
					type="datetime-local"
					id="pickup"
					name="pickup"
					bind:value={$pickup}
					step={15 * 60}
					min={offsetNowHours(1)}
					on:change={onPickupChange}
					required
				/>
			</label>
			<label for="dropoff" class="capitalized-label">
				Dropoff
				<input
					type="datetime-local"
					id="dropoff"
					name="dropoff"
					bind:value={$dropoff}
					step={15 * 60}
					min={$pickup}
					on:change={onDropoffChange}
					required
				/>
			</label>
		</div>
	</form>
</section>

<style>
	#booking-form {
		width: fit-content;
	}

	label {
		display: block;
		margin: 1.5rem 0;
	}

	label:first-of-type {
		margin-top: 0;
	}
	label:last-of-type {
		margin-bottom: 0;
	}

	input[type='datetime-local'] {
		display: block;
		font-size: 1.25rem;
		letter-spacing: -0.015rem;
		border-radius: 2px;
		margin-top: 0.5rem;
		background: var(--bg);
		padding: 4px;
    	border: solid 1px #B5CDE8;
	}

	:global(#booking-form.home) {
		margin: 1.5rem auto;
	}
	@media (max-width: 768px) {
		section {
			margin: 1rem;
		}

		:global(section:not(.home)) {
			margin: 0;
		}

		h2 {
			margin-top: 0;
		}

		#booking-form {
			margin: 0;
		}

		/* Home page-specific mobile styles */
		.fields {
			padding: 0;
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			margin-block-end: 0;
		}

		label {
			margin: 0;
			width: 100%;
		}

		input[type='datetime-local'] {
			box-sizing: border-box;
			width: 100%;
		}
	}
</style>
