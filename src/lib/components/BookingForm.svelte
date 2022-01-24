<script>
    import { goto } from '$app/navigation'
    import Button from '$lib/components/Button.svelte'

    async function handleSubmit(e) {
        const data = Object.fromEntries((new FormData(e.target)).entries())
        goto(`/book-now/choose-a-car?pickup=${data.pickup}&dropoff=${data.dropoff}`)
    }
</script>

<form id="booking-form" on:submit|preventDefault={handleSubmit} {...$$restProps}>
    <label for="pickup">
        Pickup
        <input type="datetime-local" id="pickup" name="pickup" required />
    </label>
    <label for="dropoff">
        Dropoff
        <input type="datetime-local" id="dropoff" name="dropoff" required />
    </label>
    <Button typ e="submit" style="display: block; width: 100%;">🔍 Search</Button>
</form>

<style>
    #booking-form {
        width: fit-content;
        padding: 1.5rem;
        border-radius: 8px;
        background: #fff;
        box-shadow: var(--box-shadow-md);
    }

    label {
        display: block;
        margin: 2rem 0;
        font-weight: bold;
    }

    label:first-of-type { margin-top: 0; }

    input[type="datetime-local"] {
        display: block;
        font-size: 1.2rem;
        padding: .5rem;
        border-radius: 4px;
        font-family: sans-serif;
        border: 1px solid #b0b0b0;
        margin-top: .5rem;
    }
</style>