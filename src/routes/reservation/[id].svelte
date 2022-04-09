<script context="module">
import { getTripById } from "$lib/sanity";

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
    export let trip
</script>

<svelte:head>
    <meta name="robots" content="noindex nofollow" />
</svelte:head>
<pre>{ JSON.stringify(trip, null, 2) }</pre>