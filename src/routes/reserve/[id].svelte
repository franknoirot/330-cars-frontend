<script context="module">
	import { getCarById } from '$lib/carLoaders.js';
	import { getAllExtras, urlFor } from '$lib/sanity';
	export const prerender = false; // set page to not pre-render for live car info

	export async function load({ params }) {
		const car = await getCarById(params.id);
		const extras = await getAllExtras();

		return {
			props: {
				car,
				extras,
			}
		};
	}
</script>

<script>
	import { pickup, dropoff } from '$lib/stores';
	import { roundToDecimalPlaces } from '$lib/utils';
	export let car, extras = [];
	const selectedExtras = {};

	$: carTitle = `${car.year} ${car.make} ${car.model}`;

	$: console.log(selectedExtras)

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

	function setExtraSelection(isChecked, extra) {
		selectedExtras[extra._id] = isChecked ? extra : false
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
		<div class="extras-area">
			{#each extras as extra, i (extra._id)}
			<label class={'extra ' + ((selectedExtras[extra._id]) ? 'active' : '')}>
				<input type="checkbox" class="visually-hidden" id={extra._id} on:change={e => setExtraSelection(e.target.checked, extra)}/>
				<h2>{ extra.title }</h2>
				<p>{ extra.description }</p>
				<p class="price-rate"><span class="price">${ extra.price }</span> / { extra.rateType }</p>
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

	.extras-area {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: minmax(300px, auto);
		align-items: stretch;
		gap: 2rem;
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
