<script context="module">
    import { getCarById, validateCarDates } from '$lib/carLoaders.js'
    import { offsetNowHours } from '$lib/timeHelpers';
    import CarCarousel from '$lib/components/CarCarousel.svelte'

    export async function load({ url, params }) {
        const pickup = url.searchParams.get('pickup') || offsetNowHours(1.5).slice(0, -4)
        const dropoff = url.searchParams.get('dropoff') || offsetNowHours(25.5).slice(0, -4)

        const car = await getCarById(params.id)

        const isAvailable = await validateCarDates(params.id, {
            pickup,
            dropoff,
        })

        return {
            props: {
                car,
                isAvailable,
                pickup,
                dropoff,
            } 
        }
    }
</script>

<script>
import BookingForm from "$lib/components/BookingForm.svelte"
import { goto } from '$app/navigation';

    export let car, isAvailable, pickup, dropoff

    $: ({ make, model, year, images, ...otherData} = car)
    $: carTitle = `${year} ${make} ${model}`

    async function onFormChange(e) {
        const { pickup, dropoff } = Object.fromEntries((new FormData(e.target.form)).entries())
        if (!pickup || !dropoff) return
        goto(`/cars/${car._id}?pickup=${pickup}&dropoff=${dropoff}`)
    }
</script>

<svelte:head>
	<title>Cars</title>
</svelte:head>

<div class="content-wrapper">
    <section class="sidebar">
        <aside>
            <BookingForm {pickup} {dropoff} {isAvailable} onChange={onFormChange} />
        </aside>
    </section>
    <section>
        <h1>{carTitle}</h1>
        <CarCarousel images={car.images} />
        <pre>{JSON.stringify(otherData, null, 2)}</pre>
    </section>
</div>

<style>
    .content-wrapper {
        display: grid;
        gap: 3rem;
        grid-template-columns: auto 1fr ;
    }
    .sidebar {
        position: relative;
    }

    .sidebar aside {
        position: sticky;
        top: 32px;
    }
</style>