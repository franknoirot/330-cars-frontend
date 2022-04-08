import { Handler } from "@netlify/functions";
import sanityClient from '@sanity/client';

/**
 * Sanity client authorized to view previews
 * DO NOT REVEAL ON CLIENT SIDE
 */
 export const previewClient = sanityClient({
	projectId: 'yycjemqk',
	dataset: 'production',
	apiVersion: '2022-04-08',
	useCdn: false,
	withCredentials: true,
	token: process.env.SANITY_TOKEN,
});

const handler: Handler = async (httpEvent) => {
    // HTTP POST bodies are always strings
	const body = JSON.parse(httpEvent.body);

    console.log({ body, httpEvent })

    if (!(body && body.query)) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Missing query' })
		};
	}

    const res = await previewClient.fetch(body.query, body.params);

    console.log({ res })

    return {
		statusCode: 200,
		body: JSON.stringify(res),
        headers: {
            'Content-Type': 'application/json'
        },
	};
}

export { handler }