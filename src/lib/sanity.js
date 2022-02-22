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
