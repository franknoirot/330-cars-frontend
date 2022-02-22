import { client } from './sanity.js';

export async function loadCarsWithDates(url, options) {
	const pickup = url.searchParams.get('pickup') || options.pickup;
	const dropoff = url.searchParams.get('dropoff') || options.dropoff;

	let cars = [];

    console.log('From within the loadCarsWithDates function!', { url, options, client })

	if (!pickup || !dropoff) {
		const query = `*[_type == "car"] {
            make,
            model,
            year,
            "image": images[0].asset,
            vehicleClass,
            dailyRate,
            _id
        }`;

		cars = await client.fetch(query);
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
        }`;

		cars = await client.fetch(query, {
			pickup,
			dropoff
		});
	}

	return {
		props: {
			pickup,
			dropoff,
			cars
		}
	};
}

export async function getCarById(id) {
	const query = `*[_type == "car" && _id == $id][0] {
        _id,
        make,
        model,
        year,
        images,
        vinNumber,
        mileage,
        dailyRate,
        status,
        description,
        features
    }`;

	const car = await client.fetch(query, { id });

	return car;
}

export async function validateCarDates(id, options) {
	const { pickup, dropoff } = options;

	const query = `count(*[_type == "trip" &&
        references($id) &&
        !(scheduledDropoff <= $pickup || scheduledPickup >= $dropoff)
    ]) < 1`;

	const isAvailable = await client.fetch(query, {
		pickup,
		dropoff,
		id
	});

	return isAvailable;
}
