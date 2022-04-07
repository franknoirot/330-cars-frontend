import { Handler } from '@netlify/functions';
import sanityClient from '@sanity/client';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';

const client = sanityClient({
	projectId: 'yycjemqk',
	dataset: 'production',
	apiVersion: '2022-03-16',
	token: process.env.SANITY_TOKEN,
	useCdn: false
});

const handler: Handler = async (httpEvent) => {
	console.log({httpEvent})
	const trip = httpEvent.body;

	if (!trip) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Missing trip info' })
		};
	}

	trip._type = "trip"

	const res = await client.create(trip);

	return {
		statusCode: 200,
		body: JSON.stringify(res)
	};
};

export { handler };
