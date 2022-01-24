<script context="module">
    import { client, urlFor } from '$lib/sanity'

    export async function load({ params, url }) {
        const pickup = url.searchParams.get('pickup')
        const dropoff = url.searchParams.get('dropoff')

        if (!pickup || !dropoff) {
            return {
                status: 302,
                redirect: "/book-now",
            };
        }

        // query is all cars that are not referenced in a trip that overlaps the given dates.
        const query = `*[_type == "car" &&
            count(*[_type == "trip" && references(^._id) &&
                (scheduledPickup < $dropoff || scheduledDropoff > $pickup)][]
            ) < 1
        ] {
            make,
            model,
            year,
            "image": images[0].asset,
            _id
        }`
        
        const cars = await client.fetch(query, {
            pickup,
            dropoff,
        })
        
        return {
            props: {
                pickup,
                dropoff,
                cars,
            }
        }
    }
</script>

<script>
    import CarList from '$lib/components/CarList.svelte'
    export let pickup, dropoff, cars
    let pickupDate, dropoffDate

    $: if (pickup) { pickupDate = new Date(pickup) }
    $: if (dropoff) { dropoffDate = new Date(dropoff) }
</script>

<h1>Step 2: Choose a Car</h1>
<p>Showing cars available for pickup on {pickupDate.toLocaleDateString()} at {pickupDate.toLocaleTimeString()} and dropoff on {dropoffDate.toLocaleDateString()} at {dropoffDate.toLocaleTimeString()}</p>
<CarList {cars} />