import { Handler } from '@netlify/functions';
import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: 'yycjemqk',
	dataset: 'production',
	apiVersion: '2022-03-16',
	token: process.env.SANITY_TOKEN,
	useCdn: false
});

const handler: Handler = async (httpEvent) => {
	console.log({ body: httpEvent.body})

	// HTTP POST bodies are always strings
	const trip = JSON.parse(httpEvent.body);

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
