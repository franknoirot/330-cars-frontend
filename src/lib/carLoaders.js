import { client } from './sanity.js';

function queryUrl(query) {
	const baseUrl = 'https://yycjemqk.api.sanity.io/v2022-02-22/data/query/production?query=';
	return baseUrl + encodeURIComponent(query.replace(/\s/g, ''));
}

// Sanity needs its datetimes without seconds or milliseconds,
// but some browser functions and inputs return them. This slices that off if present
export function prepTimeString(timeString) {
	return (timeString.includes('.'))
		? timeString.slice(0, -4) // need to slice off seconds from datetime input for use in Sanity query
		: timeString
}

export async function loadCarsWithDates(pickup, dropoff) {
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

	return cars
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
		id,
		pickup,
		dropoff
	});

	return isAvailable;
}

async function handleResponse(res) {
	if (res.ok) {
		return (await res.json()).result;
	} else {
		throw new Error(res.message);
	}
}
