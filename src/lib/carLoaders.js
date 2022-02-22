// import { client } from './sanity.js';
function queryUrl(query) {
    const baseUrl = 'https://yycjemqk.api.sanity.io/v2022-02-22/data/query/production?query='
    return baseUrl + encodeURIComponent(query.replaceAll(/\s/g,''))
}

export async function loadCarsWithDates(url, fetch, options) {
	const pickup = url.searchParams.get('pickup') || options.pickup;
	const dropoff = url.searchParams.get('dropoff') || options.dropoff;

	let cars = [];

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

		cars = await handleResponse(
            await fetch(queryUrl(query))
        )
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

		cars = await handleResponse(
            await fetch(queryUrl(query) + `&$pickup="${pickup}"&$dropoff="${dropoff}"`)
        )
	}

	return {
		props: {
			pickup,
			dropoff,
			cars
		}
	};
}

export async function getCarById(id, fetch) {
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

	const car = await handleResponse(
        await fetch(queryUrl(query) + `&$id="${id}"` )
    )

	return car;
}

export async function validateCarDates(id, fetch, options) {
	const { pickup, dropoff } = options;

	const query = `count(*[_type == "trip" &&
        references($id) &&
        !(scheduledDropoff <= $pickup || scheduledPickup >= $dropoff)
    ]) < 1`;

	const isAvailable = await handleResponse(
        await fetch(queryUrl(query) + `&$pickup="${pickup}"&$dropoff="${dropoff}"&$id="${id}"`)
    )

	return isAvailable;
}

async function handleResponse(res) {
    if (res.ok) {
        return (await res.json()).result
    } else {
        throw new Error(res.message)
    }
}
