<script>
	import { fly, fade } from 'svelte/transition';
	import { urlFor } from '$lib/sanity';
	export let cars = [];
	export let columns = 3;
</script>

{#if cars.length}
	<div class="car-list" style={`--columns-desktop: ${columns}`}>
		{#each cars as car, i ('car-' + i)}
			<a
				sveltekit:prefetch
				class="car-item"
				href={'/cars/' + car._id }
				in:fly={{ y: 20, duration: 200, delay: 50 * i }}
				out:fade={{ duration: 100 }}
			>
				<img src={urlFor(car.image).width(400)} alt={car.year + ' ' + car.make + ' ' + car.model} />
				<h2>{car.year} {car.make} {car.model}</h2>
				<p>
					<span style="text-transform: capitalize;">{car.vehicleClass}</span> • ${car.dailyRate}/day
				</p>
			</a>
		{/each}
	</div>
{/if}

<style>
	.car-list {
		--columns: 2;
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		row-gap: 60px;
		column-gap: 48px;
	}

	.car-item {
		text-decoration: none;
		border-radius: 4px;
		background: var(--bg-light);
		color: var(--text-light);
		border: solid transparent;
		padding: 1rem;
		transition: all 0.14s ease-out;
	}

	.car-item:hover {
		border-color: var(--l-color-1);
	}

	.car-item:focus {
		outline: solid 1px cornflowerblue;
	}

	.car-item h2 {
		font-weight: normal;
		font-size: 1.5rem;
		font-weight: 500;
		margin: 15px 0;
	}

	.car-item img {
		max-width: 100%;
		height: 10vw;
		min-height: 120px;
		object-fit: contain;
		mix-blend-mode: darken;
	}

	@media (min-width: 769px) {
		.car-list {
			grid-template-columns: repeat(var(--columns-desktop), 1fr);
		}
	}

	@media (max-width: 768px) {
		.car-list {
			gap: .5rem;
			margin: .5rem;
		}

		.car-item {
			padding: 0.6rem;
		}

		.car-item h2 {
			font-size: 1rem;
			margin: 0;
		}

		.car-item p {
			color: hsl(190deg, 3%, 48%);
			font-size: 0.9rem;
			margin: 0.25rem 0;
		}
	}
</style>
