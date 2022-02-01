import { client } from '$lib/sanity'

export async function loadCarsWithDates(url, options) {
    const pickup = url.searchParams.get('pickup') || options.pickup;
    const dropoff = url.searchParams.get('dropoff') || options.dropoff;

    console.log({ actualDropoff: dropoff, optDrop: options.dropoff, paramDrop: url.searchParams.get('dropoff') })
    let cars = []

    if (!pickup || !dropoff) {
        const query = `*[_type == "car"] {
            make,
            model,
            year,
            "image": images[0].asset,
            vehicleClass,
            dailyRate,
            _id
        }`
        
        cars = await client.fetch(query)
    } else {
        // query is all cars that are not referenced in a trip that overlaps the given dates.
        const query = `*[_type == "car" &&
            count(*[_type == "trip" &&
                references(^._id) &&
                !(scheduledDropoff <= $pickup || scheduledPickup >= $dropoff)
            ]) < 1
        ] {
            make,
            model,
            year,
            "image": images[0].asset,
            vehicleClass,
            dailyRate,
            _id,
        }`
        
        cars = await client.fetch(query, {
            pickup,
            dropoff,
        })
    }

    
    return {
        props: {
            pickup,
            dropoff,
            cars,
        }
    }
}