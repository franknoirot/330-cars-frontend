<script>
    import { tripId } from "$lib/stores";
    import { getTripById } from "$lib/sanity";

    let tripDetails = {}

    async function submitForm(e) {
        e.preventDefault()
        const id = e.target.tripId.value
        tripDetails = await getTripById(id)
    }
</script>

<h1>View, Modify, or Cancel a Reservation</h1>
<form on:submit={submitForm}>
    <label class="capitalized-label" for="tripId" value={($tripId) ? $tripId : ''}>Trip ID</label>
    <input id="tripId" name="tripId" type="text" required />
    <button type="submit">Submit</button>
</form>
<pre>{ JSON.stringify(tripDetails, null, 2) }</pre>