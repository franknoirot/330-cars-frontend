import fetch from 'isomorphic-fetch';
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const publicPreviewToken = 'adwlkfjatw4oi3'
export const origin = (process.env.NODE_ENV == "development") ? 'http://localhost:8888' : 'https://dev--330-cars.netlify.app';


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
		return await fetch(origin + '/.netlify/functions/preview', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			// mode: 'same-origin', // no-cors, *cors, same-origin
			// credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ query, params }),
		}).then(res => res.json())
	}
}

const previewClient = new PreviewClient()

// Util wrapper for Sanity Image API 
const builder = imageUrlBuilder(client);
export function urlFor(source) {
	return builder.image(source);
}

// 🚀 GENERAL SANITY UTILS

/**
 * Sanity query snippet to get the latest draft entry of a model,
 * with fallback to latest published document
 * @param query 
 * @returns {string}
 */
const byIdWithDraftFallback = (query: string) => (
	`coalesce(
		*[_id == 'drafts.' + $id][0] ${ query }, 
		*[_id == $id][0] ${ query }
	)`
)

export async function getGlobalSettings() {
	const query = `*[_type == "settings"][0] {
		companyName,
		companyAddress,
		companyPhone,
		openingTime,
		closingTime,
		microCopy[]
	}`

	return await client.fetch(query)
}

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
export async function getCarById(id, options) : Promise<Car> {
	const query = byIdWithDraftFallback(`{
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
    }`);

	const usedClient = (options.preview) ? previewClient : client

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

// 📄 PAGE QUERY UTILS

type Page = {
	_id: string,
	slug: string,
	seo: {
		title: string,
		description: string,
		image?: object
	},
	content: object[]
}

export async function getPageBySlug(slug, options) : Promise<Page> {
	const fields = `{
		_id,
		slug,
		seo,
		content,
	}`

	// GROQ query for a Page by slug, taking the draft if available
	// and if the client is authorized
	const query = `coalesce(
		*[_type == "page" && slug.current == $slug && _id in path("drafts.**")][0] ${ fields }, 
		*[_type == "page" && slug.current == $slug][0] ${ fields }
	)`

	const usedClient = (options.preview) ? previewClient : client

	const page = await usedClient.fetch(query, { slug })

	return page;
}