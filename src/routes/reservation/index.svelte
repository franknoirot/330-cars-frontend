<script>
    import { tripId } from "$lib/stores";
    import { getTripById } from "$lib/sanity";
    let inputValue = ($tripId) ? $tripId : ""

    let tripDetails = {}

    async function submitForm(e) {
        e.preventDefault()
        tripDetails = await getTripById(inputValue)
    }
</script>

<h1>View, Modify, or Cancel a Reservation</h1>
<form on:submit={submitForm}>
    <label class="capitalized-label" for="tripId">Trip ID</label>
    <input id="tripId" name="tripId" type="text" bind:value={inputValue} required />
    <button type="submit">Submit</button>
</form>
<pre>{ JSON.stringify(tripDetails, null, 2) }</pre>