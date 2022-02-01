<script context="module">
    import { loadCarsWithDates } from '$lib/carLoaders.js'

    export async function load({ url }) {
        loadCarsWithDates(url)
    }
</script>

<script>
    import CarList from '$lib/components/CarList.svelte'
    export let pickup, dropoff, cars
    let pickupDate, dropoffDate

    $: if (pickup) { pickupDate = new Date(pickup) }
    $: if (dropoff) { dropoffDate = new Date(dropoff) }
</script>

<h1>Step 2: Choose a Car</h1>
<p>Showing cars available for pickup on {pickupDate.toLocaleDateString()} at {pickupDate.toLocaleTimeString()} and dropoff on {dropoffDate.toLocaleDateString()} at {dropoffDate.toLocaleTimeString()}</p>
<CarList {cars} />