<script>
import { browser } from '$app/env';

    import { goto } from '$app/navigation';
    import { makeIcsFile } from '$lib/calendar';
    import { globalSettings, pickup, dropoff, tripId, userStore } from '$lib/stores'
import { offsetNowHours } from '$lib/timeHelpers';
    let pickupDateTime = new Date($pickup)
    let calURL = ''

    // If the user is missing any of the necessary values, exit
    if (!($tripId && $pickup && $dropoff) && browser) {
        goto('/')
    } else if (new Date($dropoff).getTime() < new Date().getTime()) {
        $pickup = offsetNowHours(1.5)
        $dropoff = offsetNowHours(25.5)
        goto('/')
    }
    

    $: if ($pickup && $dropoff) {
        calURL = makeIcsFile(
            $tripId,
            { start: new Date($pickup), end: new Date($dropoff) },
            '330 Cars Reservation',
            'Trip ID: ' + $tripId
        )
    }

</script>

{#if $tripId && $pickup && $dropoff}
<h1>Your reservation is confirmed.</h1>
<div class="split-grid-1-3">
    <h2>Reservation ID</h2>
    <div>
        <p>{ $tripId }</p>
        <p>We’ve saved this in your browser’s storage so that if you need to come back and View, Edit, or Cancel your trip, it will autofill your reservation number.</p>
    </div>
</div>
<div class="split-grid-1-3">
    <h2>Next steps</h2>
    <div>
        <p>An email has been sent to {#if $userStore.email}<strong>{ $userStore.email }</strong>{:else}your provided address{/if} with all of your reservation information.</p>
        <p>
            We look forward to seeing you on <strong>{ pickupDateTime.toDateString() }</strong> at <strong>{ pickupDateTime.toLocaleTimeString() }</strong> to pick up your car. Be sure to bring a credit card and a valid driver’s license.
        </p>
        <a href={calURL} download="330-cars-reservation.ics" class="calendar-link">Add to your calendar</a>
    </div>
</div>
<div class="split-grid-1-3">
    <h2>Thank you ❤️</h2>
    <div>
        <p>
            Thank you so much for booking with us. If you have a good experience, tell your friends. We don’t have a marketing team. Call <a href={'tel:'+$globalSettings.companyPhone}>{ $globalSettings.companyPhone }</a> any time if you have questions or adjustments to your trip.
        </p>
    </div>
</div>
{/if}


<style>
    h1 {
		font-family: var(--serif);
		font-size: 4rem;
		font-weight: 600;
		margin: 2rem 0 4rem;
        text-align: center;
	}

    .split-grid-1-3 {
		display: grid;
		gap: 2rem;
        margin: auto;
		margin-top: 1.75rem;
		margin-bottom: 2rem;
		grid-template-columns: 1fr 2fr;
        max-width: 75ch;
	}

    .calendar-link {
        color: #0B85C9;
        border: solid 1px;
        display: block;
        margin-top: 2rem;
        width: fit-content;
        border-radius: 3px;
        padding: .4rem 2rem;
    }

    .calendar-link:hover {
        background: #0B85C91C;
        color: #0B85C9;
    }
</style>