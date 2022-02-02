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
        <hr />
        <div class="features">
            {#each car.features as feature, j (j)}
            <p>
                <strong>{ feature.primary }</strong> <br/>
                { feature.secondary }
            </p>
            {/each}
        </div>
    </section>
    <section>
        <h1>{carTitle}</h1>
        <CarCarousel images={car.images} />
        <p class="description">{ car.description }</p>
    </section>
</div>

<style>
    .content-wrapper {
        display: grid;
        gap: 3rem;
        grid-template-columns: auto 1fr;
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

    .description {
        margin-block-start: 2.5rem;
        line-height: 1.4;
    }

    hr {
        margin-top: 2rem;
        border: solid 1px #f4f8fc;
    }

    .features {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        width: 80%;
        margin: 1rem auto;
        font-size: 1.1rem;
    }

    .features p {
        text-align: center;
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