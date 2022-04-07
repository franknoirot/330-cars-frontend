
<script>
    import { goto } from '$app/navigation';
    import { tripId } from '$lib/stores'

    // if (!$tripId) goto('/')
</script>

<h1>Your reservation is confirmed.</h1>
<div class="split-grid-1-3">
    <h2>Reservation ID</h2>
    <div>
        <p>{ $tripId }</p>
        <p>We’ve saved this in your browser’s storage so that if you need to come back and View, Edit, or Cancel your trip, it will autofill your reservation number.</p>
    </div>
</div>


<style>
    .split-grid-1-3 {
		display: grid;
		gap: 2rem;
		margin-top: 1.75rem;
		margin-bottom: 4rem;
		grid-template-columns: 1fr 2fr;
	}
</style>