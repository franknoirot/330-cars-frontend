<script context="module">
    import { loadCarsWithDates } from '$lib/carLoaders';
    import { offsetNowHours } from '$lib/timeHelpers';

    export async function load({ url }) {
        return loadCarsWithDates(url, {
            pickup: offsetNowHours(1.5).slice(0, -3), // need to slice off seconds for use in Sanity query
            dropoff: offsetNowHours(25.5).slice(0, -3),
        })
    }
</script>

<script>
    import { goto } from '$app/navigation'
    import CarList from '$lib/components/CarList.svelte'
    import BookingForm from '$lib/components/BookingForm.svelte'
    import AddressInfo from '$lib/components/AddressInfo.svelte'
    export let cars = []
    export let pickup, dropoff


    async function dateFormSubmit(e) {
        console.log('submitting')
        const data = Object.fromEntries((new FormData(e.target)).entries())
        goto(`/?pickup=${data.pickup}&dropoff=${data.dropoff}`)
    }
</script>

<div class="wrapper">
    <aside>
        <section>
            <BookingForm style="margin: 1.5rem auto;" onSubmit={dateFormSubmit} />
        </section>
    </aside>
    <section>
        <div class="info-row">
            <AddressInfo />
            <p class="welcome-statement">
                330 Cars is a family-owned local rental car business in Warren, Ohio. 
                We offer unbeatable rates, after-rental pickup, and other luxuries that big rental companies 
                can’t offer because thier lawyers cost too much. 
                <a href="/about">You can read our full story here →</a>
            </p>
        </div>
        <CarList {cars} {pickup} {dropoff} columns={3} />
    </section>
</div>

<style>
    .wrapper {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 48px;
    }

    aside {
        position: relative;
    }
    aside * {
        position: sticky;
        top: 32px;
    }

    .info-row {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 48px;
        align-items: center;
        margin-bottom: 40px;
    }

    .welcome-statement {
        font-size: 1.125rem;
        line-height: 1.4;
    }

    .welcome-statement a {
        text-decoration: none;
        color: cornflowerblue;
    }
</style>