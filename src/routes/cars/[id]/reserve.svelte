<script context="module">
	import { getCarById } from '$lib/sanity';
	import { getAllExtras, urlFor } from '$lib/sanity';
	export const prerender = false; // set page to not pre-render for live car info

	export async function load({ params }) {
		const car = await getCarById(params.id, { preview: false });
		const extras = await getAllExtras();

		return {
			props: {
				car,
				extras,
			}
		};
	}
</script>

<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import ReservationSidebar from '$lib/components/ReservationSidebar.svelte';
	import { pickup, dropoff, tripExtras } from '$lib/stores';
	import type { TripExtra } from '$lib/sanity';
	import { durationInDays, roundToDecimalPlaces } from '$lib/utils';
	import { getCosts } from '$lib/accounting';
	export let car, extras;

	$: (extras) && extras.forEach(extra => { extra.fullPrice = calculateExtraPrice(extra) })

	const costs = getCosts({pickup: $pickup, dropoff: $dropoff}, car)
    const total = costs.reduce((acc, curr) => acc + curr[1], 0)

	function calculateExtraPrice(extra: TripExtra) {
		let ratedPortion = 0
		switch (extra.rateType) {
			case "trip":
				ratedPortion = extra.ratePrice
				break
			case "day":
				ratedPortion = extra.ratePrice * durationInDays($pickup, $dropoff)
				break
			case "gallon":
				ratedPortion = extra.ratePrice * car.tankSize * .75
		}
		return roundToDecimalPlaces(extra.basePrice + ratedPortion, 2)
	}

	function setExtraSelection(isChecked, extra) {
		$tripExtras[extra._id] = isChecked ? extra : false
	}
</script>

<div class="content-wrapper">
	<ReservationSidebar {car} {pickup} {dropoff} {costs} />	
	<section>
		<div class="heading-row">
			<h1>Protection & Extras</h1>
			<a href={`/cars/${car._id}/checkout`} class="btn-link">
				Checkout
				<Icon type="arrow" width="20" class="flip-x"/>
			</a>
		</div>
		<div class="extras-area">
			{#each extras as extra, i (extra._id)}
			<label class={'extra ' + (($tripExtras[extra._id]) ? 'active' : '')}>
				<input type="checkbox" class="visually-hidden" id={extra._id} checked={!!$tripExtras[extra._id]} on:change={e => setExtraSelection(e.target.checked, extra)}/>
				<h2>{ extra.title }</h2>
				<p class="description">{ extra.description }</p>
				<p class="price-rate"><span class="price">
					${ (extra.fullPrice.toFixed(2).endsWith("00")) ? extra.fullPrice : extra.fullPrice.toFixed(2) }
				</p>
			</label>
			{/each}
		</div>
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

	h1 {
		font-family: var(--serif);
		font-size: 4rem;
		font-weight: 600;
		margin: 0;
	}

	.btn-link {
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		color: #E2F5FF;
		padding: .5rem .75rem;
		border-radius: 3px;
		display: block;
		background: #0B85C9;
	}

	.btn-link:hover {
		background-color: #005d8f;
	}

	.heading-row {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		margin: 3rem 0;
	}

	.heading-row:first-of-type {
		margin-top: 1rem;
	}

	.extras-area {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: minmax(300px, auto);
		align-items: stretch;
		gap: 3rem 2rem;
	}

	.extra {
		position: relative;
		display: grid;
		grid-template-rows: fit-content 1fr auto;
		box-sizing: border-box;
		padding: 0;
		margin: 0;
		background: var(--bg-light);
		filter: drop-shadow(0px 5px 12px rgba(33, 112, 147, 0.06)) drop-shadow(0px 1px 3px rgba(33, 112, 147, 0.13));
		border-radius: 3px;
		position: relative;
	}

	.extra > * {
		flex-basis: 0;
	}

	.description {
		flex-basis: 1;
	}

	.extra::before {
		content: '';
		position: relative;
		display: block;
		width: 100%;
		height: 50px;
		background: linear-gradient(90deg, rgba(213, 235, 244, 0) 0%, #D5EBF4 57.29%), #E2F5FF;
		border-radius: 3px 3px 0 0;
	}

	.extra::after {
		content: '';
		position: absolute;
		width: 2.5rem;
		height: 3px;
		background: #217093;
		top: 47px;
		left: 0;
	}

	.extra.active {
		outline: 3px solid #217093;
	}

	.extra h2 {
		font-size: 1.5rem;
		letter-spacing: -0.015rem;
		line-height: 1.2;
		margin: 1.25rem 1.25rem 0rem;
	}

	.extra p {
		margin-left: 1.25rem;
		margin-right: 1.25rem;
	}

	.price-rate {
		margin-bottom: 1.25rem;	
	}

	.price {
		font-size: 2.25rem;
		font-family: var(--serif);
		font-weight: 600;
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
