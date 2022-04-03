<script context="module">
	import { getCarById, prepTimeString, validateCarDates } from '$lib/carLoaders.js';
	import { offsetNowHours } from '$lib/timeHelpers';
	import CarCarousel from '$lib/components/CarCarousel.svelte';
	import { pickupInitialValue, dropoffInitialValue } from '$lib/stores';
	export const prerender = false; // set page to not pre-render for live car info

	export async function load({ params }) {
		const car = await getCarById(params.id);

		const isAvailable = await validateCarDates(params.id, {
			pickup: prepTimeString(pickupInitialValue),
			dropoff: prepTimeString(dropoffInitialValue),
		});

		return {
			props: {
				car,
				isAvailable,
			}
		};
	}
</script>

<script>
	import { pickup, dropoff } from '$lib/stores';
	import { goto } from '$app/navigation';
	import SEO from '$lib/components/SEO.svelte';
	import BookingForm from '$lib/components/BookingForm.svelte';
	import AvailabilityButton from '$lib/components/AvailabilityButton.svelte';
	import BuyCTA from '$lib/components/BuyCTA.svelte';
	import { durationInDays, roundToDecimalPlaces } from '$lib/utils';

	export let car, isAvailable;
	let duration = durationInDays($pickup, $dropoff); // trip duration in days

	$: carTitle = `${car.year} ${car.make} ${car.model}`;

	async function onFormChange(e) {
		isAvailable = await validateCarDates(car._id, {
			pickup: prepTimeString($pickup),
			dropoff: prepTimeString($dropoff),
		});
	}

	function handleClick(e) {
		goto(`/reserve/${car._id}`)
	}
</script>

<SEO
	title={`${carTitle} | 330 Cars`}
	description={`This ${carTitle} is available for rent in Akron and Cleveland, Ohio for affordable rates, and even with pickup!`}
/>
<div class="content-wrapper">
	<section class="sidebar">
		<aside>
			<BookingForm
				{isAvailable}
				onChange={onFormChange}
				on:duration_update={(e) => {
					duration = e.detail;
				}}
			/>
			<AvailabilityButton {isAvailable} on:click={handleClick} />
			<div class="cost-info">
				<h2>${car.dailyRate}<span class="capitalized-label">&nbsp;/ day</span></h2>
				<p>
					<strong style="font-weight: 600">${roundToDecimalPlaces(car.dailyRate * duration, 2)}</strong> + taxes due at pickup
				</p>
			</div>
		</aside>
	</section>
	<section>
		<h1>{carTitle}</h1>
		<CarCarousel images={car.images} />
		<div class="info-wrapper">
			{#if car.description}
				<div class="description">
					<p class="capitalized-label">Description</p>
					<p>{car.description}</p>
				</div>
			{/if}
			{#if car.features && car.features.length}
				<div class="features">
					{#each car.features as feature, j (j)}
						<p>
							<strong>{feature.primary}</strong> <br />
							{feature.secondary}
						</p>
					{/each}
				</div>
			{/if}
		</div>
		<BuyCTA />
	</section>
</div>

<style>
	.content-wrapper {
		display: grid;
		gap: 5rem;
		grid-template-columns: 2fr 5fr;
		width: 100%;
		box-sizing: border-box;
	}
	.sidebar {
		position: relative;
	}

	.sidebar aside {
		position: sticky;
		top: 32px;
	}

	h1 {
		font-family: var(--serif);
		font-size: 4rem;
		font-weight: 600;
		margin: 0;
		margin-bottom: 2rem;
	}

	.cost-info h2 {
		font-family: var(--serif);
		font-size: 2.5rem;
		margin-bottom: 0;
		margin-top: 3rem;
	}

	.cost-info .capitalized-label {
		font-family: var(--sans-serif);
		font-weight: 400;
	}

	.description {
		line-height: 1.4;
		padding-inline-start: 1.875rem;
		position: relative;
	}

	.description::before {
		content: '';
		position: absolute;
		width: 1px;
		height: 3rem;
		top: 0;
		left: 0;
		background: var(--gray);
	}

	.description .capitalized-label {
		margin-block-start: 0;
	}

	.info-wrapper {
		margin-block-start: 3rem;
		display: grid;
		grid-template-columns: 3fr 2fr;
		gap: 2rem;
	}

	.features {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		font-size: 1.1rem;
		margin: 0 auto;
	}

	.features p {
		text-align: center;
		margin: 0 auto;
		flex: 40%;
	}

	.features strong {
		font-size: 1.3rem;
		line-height: 1.5;
	}

	@media (max-width: 768px) {
		.content-wrapper {
			grid-template-columns: 1fr;
			padding: 1rem;
		}

		h1 {
			margin-block-start: 1rem;
		}

		.sidebar {
			order: 2;
		}

		.sidebar aside {
			position: static;
		}
	}
</style>
