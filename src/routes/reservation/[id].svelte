<script context="module">
    import { getTripById, origin, urlFor } from "$lib/sanity";

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
    import { durationInDays, ONE_DAY_MS, roundToDecimalPlaces } from "$lib/utils";
    import Modal from '$lib/components/Modal.svelte';

    export let trip
    let modalOpen = false
    let beforeChargeCutoff = (new Date(trip.scheduledPickup).getTime() - new Date().getTime()) / ONE_DAY_MS > 1.0
    let modalMessage = (beforeChargeCutoff)
        ? 'You are more than 24 hours from your rental time, so you will not be charged anything for cancelling.'
        : 'You are less than 24 hours from your rental time, so <strong>you will be charged $40</strong> for cancelling.'
    let modalCost = (beforeChargeCutoff)
        ? 0
        : 40

    console.log({ duration: durationInDays(trip.scheduledPickup, trip.scheduledDropoff), trip})

    console.log({ beforeChargeCutoff, timeUntil: (new Date(trip.scheduledPickup).getTime() - new Date().getTime()) / ONE_DAY_MS })

    const statusIcons = {
        'Cancelled': 'x',
        'Scheduled': 'clock',
        'Returned': 'check',
        'Rented': 'arrow',
    }

    async function cancelReservation() {
        const res = await fetch(origin + '/.netlify/functions/cancelTrip', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ tripId: trip._id, cancellationFee: modalCost })
        })

        console.log({ res })

        if (res.status == 204) {
            trip = await res.json()
        }

        modalOpen = false
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
            {#each trip.lineItems.filter(item => item.label.includes('extra')) as extra}
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
            {#each trip.lineItems.filter(item => !(item.label.includes('extra') || item.label.includes('rental'))) as extra}
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
            {#if trip.status == "Scheduled"}
            <button class="cancel" on:click={() => {modalOpen = true}}>
                Cancel reservation
                <Icon type="x" width="16" />
            </button>
            {/if}
        </div>
    </div> 
</section>
<Modal bind:isOpen={modalOpen}>
    <h2>Are you sure you want to cancel?</h2>
    <p>{@html modalMessage }</p>
    <div class="button-row">
        <button on:click={() => {modalOpen = false}}>
            No, don't cancel
        </button>
        <button class="cancel" on:click={cancelReservation}>
            Yes, cancel for ${modalCost.toFixed(2)}
        </button>
    </div>
</Modal>

<style>
    .title-area {
        margin-bottom: 4rem;
    }

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
        padding: .25rem .8rem;
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

    .badge.Rented {
        color: #0B85C9;
        background: #E2F5FF;
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

    .button-row {
        display: flex;
        justify-content: space-between;
    }

    button {
        padding: .5rem 2rem;
        border: 1px solid transparent;
        font-weight: 600;
        display: flex;
        gap: 1ch;
        align-items: center;
        border-radius: 3px;
        font-size: 1rem;
        font-family: var(--sans-serif);
        margin-top: 2rem;
        color: #0B85C9;
        background: #E2F5FF;
    }
    
    button:hover,
    button:focus {
        color: #0B85C9;
        background: #d1efff;
        cursor: pointer;
    }
    
    .cancel {
        border: 1px solid rgba(255, 226, 229, 0.5);
        color: #FFE2E5;
        background: #E23E4F;
    }
    .cancel:hover,
    .cancel:focus {
        color: #FFE2E5;
        background: #b42534;
    }
</style>