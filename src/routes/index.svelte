<script context="module">
	import { loadCarsWithDates } from '$lib/carLoaders';
	import { offsetNowHours } from '$lib/timeHelpers';

	export async function load({ url, fetch }) {		
		const results = await loadCarsWithDates(url, fetch, {
			pickup: offsetNowHours(1.5).slice(0, -4), // need to slice off seconds for use in Sanity query
			dropoff: offsetNowHours(25.5).slice(0, -4)
		});

		return {
			props: results,
		}
	}
</script>

<script>
	import { goto } from '$app/navigation';
	import CarList from '$lib/components/CarList.svelte';
	import BookingForm from '$lib/components/BookingForm.svelte';
	import AddressInfo from '$lib/components/AddressInfo.svelte';
	import VehicleClassFilter from '$lib/components/VehicleClassFilter.svelte';
	export let cars = [];
	export let pickup, dropoff;

	let vehicleClassFilter = 'All Classes';

	$: vehicleClassCounts = (cars.length) ? cars.reduce((prev, car) => {
		const vehicleClassObj = Object.assign({}, prev)
		if (vehicleClassObj[car.vehicleClass] !== undefined) {
			vehicleClassObj[car.vehicleClass]++
		} else {
			vehicleClassObj[car.vehicleClass] = 1
		}
		return vehicleClassObj
	}, { 'All Classes': cars.length }) : [];

	$: filteredCars = (cars.length) ? cars.filter(
		(car) =>
			vehicleClassFilter == 'All Classes' || car.vehicleClass === vehicleClassFilter.toLowerCase()
	) : [];

	async function dateFormUpdate(e) {
		const { pickup, dropoff } = Object.fromEntries(
			new FormData(e.target.form || e.target).entries()
		);
		goto(`/?pickup=${pickup}&dropoff=${dropoff}`);
	}
</script>

<div class="wrapper">
	<aside>
		<div>
			<BookingForm class="home" onChange={dateFormUpdate}/>
			<VehicleClassFilter vehicleClassesWithCounts={vehicleClassCounts} bind:vehicleClassFilter={vehicleClassFilter} />
		</div>
	</aside>
	<section class="info-row">
		<div class="hidden-small-tablet"><AddressInfo /></div>
		<p class="welcome-statement">
			330 Cars is a family-owned local rental car business in Warren, Ohio. We offer unbeatable
			rates, after-rental pickup, and other luxuries that big rental companies can’t offer because
			thier lawyers cost too much.
			<a href="/about">You can read our full story here →</a>
		</p>
	</section>
	<section class="car-list">
		<CarList cars={filteredCars} {pickup} {dropoff} columns={3} />
	</section>
</div>

<style>
	.wrapper {
		display: grid;
		grid-template-columns: auto 1fr;
		grid-template-rows: auto auto;
		column-gap: 5rem;
		row-gap: 3rem;
		position: relative;
	}

	aside {
		position: relative;
		grid-column: 1 / 2;
		grid-row: span 2;
	}

	aside > div {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		position: sticky;
		top: 32px;
	}

	.info-row {
		display: grid;
		grid-template-columns: 1fr 2fr;
		gap: 48px;
		align-items: center;
	}

	.car-list {
		grid-column: 2 / 3;
		grid-row: 2 / 3;
	}

	.welcome-statement {
		font-size: 1.125rem;
		line-height: 1.4;
	}

	.welcome-statement a {
		text-decoration: none;
		font-weight: 700;
		color: inherit;
	}

	.welcome-statement a:hover,
	.welcome-statement a:focus {
		color: cornflowerblue;
	}

	@media (max-width: 920px) {
		.wrapper {
			display: flex;
			flex-direction: column;
			gap: 1rem;
		}

		.info-row {
			order: -1;
			padding: 1rem;
		}

		aside {
			grid-row: 2 / 3;
		}
	}

	@media (max-width: 720px) {
		.info-row {
			display: block;
		}

		.hidden-small-tablet {
			display: none;
		}
	}
</style>
