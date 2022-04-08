import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
const publicPreviewToken = 'adwlkfjatw4oi3'

/**
 * Basic Sanity client implementation following startup guide
 */
export const client = sanityClient({
	projectId: 'yycjemqk',
	dataset: 'production',
	apiVersion: '2022-04-08',
	useCdn: true
});

/**
 * Wraps Sanity client with preview authentication into a
 * serverless function call
 */
class PreviewClient {
	async fetch(query, params) {
		return await fetch('/.netlify/functions/preview', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, params }),
		})
	}
}

const previewClient = new PreviewClient()

// Util wrapper for Sanity Image API 
const builder = imageUrlBuilder(client);
export function urlFor(source) {
	return builder.image(source);
}

// 🂱 GENERAL SANITY UTILS

/**
 * Sanity query snippet to get the latest draft entry of a model,
 * with fallback to latest published document
 * @param modelName 
 * @param preview 
 * @returns {string}
 */
const draftWithFallbackSnippet = (modelName: string, preview: boolean) => (preview)
		? `coalesce(
			*[_id == 'drafts.' + $id && _type == "${ modelName }"][0], 
			*[_id == $id && _type == "${ modelName }"][0]
		  )`
		: `*[_id == $id && _type == "${ modelName }"][0]`


// 🚗 CAR QUERY UTILS

// Sanity needs its datetimes without seconds or milliseconds,
// but some browser functions and inputs return them. This slices that off if present
export function prepTimeString(timeString) {
	return (timeString.includes('.'))
		? timeString.slice(0, -4) // need to slice off seconds from datetime input for use in Sanity query
		: timeString
}

/**
 * Query Sanity for all published Cars available for rent between the provided pickup and dropoff times.
 * @param {string} pickup 
 * @param {string} dropoff 
 * @returns 
 */
export async function allCarsWithinDates(pickup, dropoff) {
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

type Car = {
	_id: string,
	make: string,
	model: string,
	year: number,
	images: object[],
	vinNumber: string,
	mileage: number,
	dailyRate: number,
	status: string,
	description: string,
	features: object[]
}

/**
 * Query Sanity for a Car with the provided ID.
 * Supports preview mode.
 * @param {string} id 
 * @returns {Promise<Car>}
 */
export async function getCarById(id, options = { preview: false, token: '' }) : Promise<Car> {
	const query = `${ draftWithFallbackSnippet('car', options.preview) } {
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

	console.log({ query })

	const usedClient = (options.preview && options.token && options.token === publicPreviewToken) ? previewClient : client

	const car = await usedClient.fetch(query, { id });

	return car;
}

/**
 * Query Sanity to see if the Car with the provided `id` is available for rent during the time between
 * the `pickup` and `dropoff` provided within `options`.
 * @param {string} id 
 * @param {{pickup: Date, dropoff: Date}} options 
 * @returns {Promise<boolean>} isAvailable
 */
export async function validateCarDates(id: string, options) : Promise<boolean> {
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


// 💅 TRIP EXTRA QUERY UTILS
type TripExtra = {
	_id: string,
	title: string,
	description: string,
	price: number,
	rateType: string,
}


/**
 * Query Sanity for all published Extra content
 * @returns TripExtras[]
 */
export async function getAllExtras() : Promise<TripExtra> {
	const query = `*[_type == "extra"] {
        _id,
        title,
		description,
		price,
		rateType
    }`;

	const extras = await client.fetch(query);

	return extras;
}


/**
 * Query Sanity for a Trip document by its ID
 * @returns Trip
 */
 export async function getTripById(id) {
	const query = `*[_type == "trip" && _id == $id][0] {
        _id,
        name,
		email,
		phone,
		scheduledPickup,
		scheduledDropoff,
		car-> {
			_id,
			make,
			model,
			year,
		},
		extras[]-> {
			_id,
			title,
		}
    }`;

	const trip = await client.fetch(query, { id });

	return trip;
}