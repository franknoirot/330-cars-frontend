import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
	projectId: 'yycjemqk',
	dataset: 'production',
	apiVersion: '2022-02-21',
	useCdn: false
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
	return builder.image(source);
}

export async function getAllExtras() {
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
