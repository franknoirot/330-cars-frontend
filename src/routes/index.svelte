<script context="module">
    import { loadCarsWithDates } from '$lib/carLoaders';
    import { offsetNowHours } from '$lib/timeHelpers';

    export async function load({ url }) {
        return loadCarsWithDates(url, {
            pickup: offsetNowHours(1.5).slice(0, -4), // need to slice off seconds for use in Sanity query
            dropoff: offsetNowHours(25.5).slice(0, -4),
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

    let vehicleClassFilter = "All Classes"

    $: filteredCars = cars.filter(car => vehicleClassFilter == "All Classes" || car.vehicleClass === vehicleClassFilter.toLowerCase())

    async function dateFormUpdate(e) {
        const { pickup, dropoff } = Object.fromEntries((new FormData(e.target.form || e.target)).entries())
        goto(`/?pickup=${pickup}&dropoff=${dropoff}`)
    }
</script>

<div class="wrapper">
    <aside>
        <section>
            <BookingForm style="margin: 1.5rem auto;" onChange={dateFormUpdate} onSubmit={dateFormUpdate} numResults={cars.length} />
            <fieldset class="vc-fields">
                <legend for="vehicleClass" class="vc-label">Car Class 
                    {#if (cars.length !== filteredCars.length)}<span>  filtered to {filteredCars.length} cars</span>{/if}
                </legend>
                <label>
                    <input name="vehicleClass" type="radio" value="All Classes" bind:group={vehicleClassFilter}/>
                    All Classes
                </label>
                <label>
                    <input name="vehicleClass" type="radio" value="economy" bind:group={vehicleClassFilter}/>
                    Economy
                </label>
                <label>
                    <input name="vehicleClass" type="radio" value="standard" bind:group={vehicleClassFilter}/>
                    Standard
                </label>
                <label>
                    <input name="vehicleClass" type="radio" value="luxury" bind:group={vehicleClassFilter}/>
                    Luxury
                </label>
            </fieldset>
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
        <CarList cars={filteredCars} {pickup} {dropoff} columns={3} />
    </section>
</div>

<style>
    .wrapper {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 3rem;
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

    .vc-fields {
        border: solid 1px hsl(190deg, 60%, 96%);
    }

    .vc-fields > label {
        display: block;
        margin: 1rem 0;
    }

    .vc-label {
        font-weight: bold;
    }

    .vc-label span {
        color: gray;
        font-weight: normal;
    }

    @media (max-width: 768px) {
        .wrapper {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .info-row {
            display: none;
        }

        aside * {
            position: static;
        }

        .vc-fields {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            padding: .5rem 1rem;
        }

        .vc-fields legend {
            padding-inline-start: 1rem;
        }

        .vc-fields label {
            flex: 40%;
            margin: .25rem;
        }
    }
</style>