import { Handler } from '@netlify/functions';
import sanityClient from '@sanity/client';
import { nanoid } from 'nanoid'

const client = sanityClient({
	projectId: 'yycjemqk',
	dataset: 'production',
	apiVersion: '2022-03-16',
	token: process.env.SANITY_TOKEN,
	useCdn: false
});

const handler: Handler = async (httpEvent) => {
	// HTTP POST bodies are always strings
	const trip = JSON.parse(httpEvent.body);

	if (!trip) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Missing trip info' })
		};
	}

	trip._type = "trip"

	// Sanity is supposed to auto-generate IDs, but appears to be broken
	// Instead generating something that looks like a  _rev value,
	// so we are generating our own.
	trip._id = nanoid()

	// array items appear need a _key value
	trip.extras.forEach(extra => (extra._key = nanoid()))

	const res = await client.create(trip);

	return {
		statusCode: 201,
		body: JSON.stringify(res),
	};
};

export { handler };
