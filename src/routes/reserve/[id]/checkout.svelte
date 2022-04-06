<script context="module">
	import { getCarById } from '$lib/carLoaders.js';
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
    import { pickup, dropoff, tripExtras } from '$lib/stores'
    import ReservationSidebar from '$lib/components/ReservationSidebar.svelte'

    export let car

</script>

<div class="content-wrapper">
	<ReservationSidebar {car} {pickup} {dropoff} tripExtras={$tripExtras} />	
    <section>
        <h1>Checkout</h1>
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
		margin-bottom: 2rem;
	}
</style>