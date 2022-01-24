<script>
    import { goto } from '$app/navigation'

    async function handleSubmit(e) {
        const data = Object.fromEntries((new FormData(e.target)).entries())
        goto(`/book-now/choose-a-car?pickup=${data.pickup}&dropoff=${data.dropoff}`)
    }
</script>

<h1>Book Now</h1>
<div class="booking-block">
    <form id="booking-form" on:submit|preventDefault={handleSubmit}>
        <label for="pickup">
            Pickup
            <input type="datetime-local" id="pickup" name="pickup" required />
        </label>
        <label for="dropoff">
            Dropoff
            <input type="datetime-local" id="dropoff" name="dropoff" required />
        </label>
        <button type="submit">Next Step: Choose a Car</button>
    </form>
</div>