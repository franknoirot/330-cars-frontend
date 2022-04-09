<script context="module">
import { getTripById, urlFor } from "$lib/sanity";

    export async function load({ params }) {
        const trip = await getTripById(params.id)

        if (!trip) {
            return {
                status: 301,
                redirect: '/reservation',
            }
        }

        return {
            props: {
                trip,
            }
        }
    }
</script>

<script>
    import { formatDate } from '$lib/timeHelpers';
    import Icon from "$lib/components/Icon.svelte"
import { durationInDays, roundToDecimalPlaces } from "$lib/utils";

    export let trip

    const statusIcons = {
        'Cancelled': 'x',
        'Scheduled': 'clock',
        'Returned': 'checkmark',
    }
</script>

<svelte:head>
    <meta name="robots" content="noindex nofollow" />
</svelte:head>
<section class="title-area">
    <h1 class="display">Your reservation</h1>
    <p class="centered">ID: { trip._id }</p>
    <p class="centered">
        <span class={"badge " + trip.status}>
            <Icon type={statusIcons[trip.status]} width="16" />
            { trip.status }
        </span>
    </p>
</section>
<section>
    <div class="split-grid-1-3">
        <h2>Driver details</h2>
        <div>
            <div class="basic-row">
                <span>Name</span>
                <span>{ trip.name }</span>
            </div>
            <div class="basic-row">
                <span>Email</span>
                <span>{ trip.email }</span>
            </div>
            <div class="basic-row">
                <span>Phone</span>
                <span>{ trip.phone }</span>
            </div>
        </div>
    </div> 
    <hr />
    <div class="split-grid-1-3">
        <h2>Reservation dates</h2>
        <div>
            <div class="basic-row">
                <span>Pick up</span>
                <span>{ formatDate(trip.scheduledPickup) }</span>
            </div>
            <div class="basic-row">
                <span>Drop off</span>
                <span>{ formatDate(trip.scheduledDropoff) }</span>
            </div>
        </div>
    </div> 
    <div class="split-grid-1-3">
        <h2>Car details</h2>
        <div>
            <div class="car-row">
                <img src={urlFor(trip.car.images[0]).width(64)} alt={trip.car.images[0].altText} />
                <span>{ `${ trip.car.year } ${ trip.car.make } ${ trip.car.model }` }</span>
                <div>
                    <p class="mt-0">${ trip.car.dailyRate } / day</p>
                    <p>${ trip.car.dailyRate * durationInDays(trip.scheduledPickup, trip.scheduledDropoff) } total</p>
                </div>
            </div>
        </div>
    </div> 
    <div class="split-grid-1-3">
        <h2>Protection & extras</h2>
        <div>
            {#each trip.lineItems.filter(item => item.label.includes('extra')) as extra, i (extra._id + i)}
            <div class="basic-row">
                <span>{ extra.label.replace('extra - ', '') }</span>
                <span>${ extra.cost.toFixed(2) }</span>
            </div>
            {/each}
        </div>
    </div> 
    <div class="split-grid-1-3">
        <h2>Other fees</h2>
        <div>
            {#each trip.lineItems.filter(item => !(item.label.includes('extra') || item.label.includes('rental'))) as extra, i (extra._id + i)}
            <div class="basic-row">
                <span>{ extra.label.replace('extra - ', '') }</span>
                <span>${ extra.cost.toFixed(2) }</span>
            </div>
            {/each}
            <hr class="mb-0"/>
            <div class="basic-row">
                <strong>Total</strong>
                <span>${ roundToDecimalPlaces(trip.lineItems.reduce((acc, curr) => acc + curr.cost, 0), 2).toFixed(2) }</span>
            </div>

        </div>
    </div> 
</section>

<style>
    h1.display {
        margin-bottom: 0;
        text-align: center;
    }

    h2 {
        margin-top: 0;
    }

    .centered {
        text-align: center;
    }

    .badge {
        margin: auto;
        width: fit-content;
        padding: .4rem .8rem;
        border-radius: 3px;
        display: flex;
        align-items: center;
        gap: 1ch;
    }

    .badge.Cancelled {
        color: #E23E4F;
        background: #FFE2E5;
    }

    .badge.Scheduled {
        color: #9B9027;
        background: #FFFDEC;
    }

    .badge.Returned {
        color: #639878;
        background: #F4FDF6;
    }
    
    .split-grid-1-3 {
		display: grid;
		gap: 2rem;
        margin: auto;
		margin-top: 1.75rem;
		margin-bottom: 3rem;
		grid-template-columns: 2fr 3fr;
    }

    .split-grid-1-3,
    hr {
        max-width: 85ch;
	}

    hr {
        margin: 3rem auto;
    }

    hr.mb-0 {
        margin-bottom: 0;
    }

    .basic-row:first-of-type {
        margin-top: 0;
    }
</style>