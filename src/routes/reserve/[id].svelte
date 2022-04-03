<script context="module">
	import { getCarById, prepTimeString, validateCarDates } from '$lib/carLoaders.js';
	import { offsetNowHours } from '$lib/timeHelpers';
	import CarCarousel from '$lib/components/CarCarousel.svelte';
	import { pickupInitialValue, dropoffInitialValue } from '$lib/stores';
	export const prerender = false; // set page to not pre-render for live car info

	export async function load({ params }) {
		const car = await getCarById(params.id);

		return {
			props: {
				car,
			}
		};
	}
</script>

<script>
	import { pickup, dropoff } from '$lib/stores';
	import { durationInDays, roundToDecimalPlaces } from '$lib/utils';
import { urlFor } from '$lib/sanity';

	export let car, isAvailable;

	$: carTitle = `${car.year} ${car.make} ${car.model}`;

	function formatDate(dateString) {
		function normalizeHour(hour) {
			if (hour === 0) {
				return [12, 'AM']
			} else if (hour < 12) {
				return [hour, 'AM']
			} else {
				return [hour - 12, 'PM']
			}
		}
		const d = new Date(dateString)
		const [normalizedHour, periodOfDay] = normalizeHour(d.getHours())

		return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}, ${normalizedHour}:${d.getMinutes()} ${periodOfDay}`
	}
</script>

<div class="content-wrapper">
	<section class="sidebar">
		<aside>
			<div>
				<h2>Reservation dates</h2>
				<div class="time-row">
					<span>Pick up</span>
					<span>{ formatDate($pickup) }</span>
				</div>
				<div class="time-row">
					<span>Drop off</span>
					<span>{ formatDate($dropoff) }</span>
				</div>
			</div>
			<div style="margin-top: 3rem">
				<h2>Car details</h2>
				<div class="car-row">
					<img src={urlFor(car.images[0]).width(64)} alt={car.images[0].altText} />
					<span>{ carTitle }</span>
					<span>${ car.dailyRate } / day</span>
				</div>
			</div>
		</aside>
	</section>
	<section>
		<h1>Protection & Extras</h1>
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

	aside .capitalized-label {
		font-family: var(--sans-serif);
		font-weight: 400;
	}

	.time-row {
		display: grid;
		grid-template-columns: auto 1fr;
		margin: 1rem 0;
	}

	.time-row > span:last-of-type {
		text-align: right;
	}

	.car-row {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 1.25rem;
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
