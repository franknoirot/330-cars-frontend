import { Handler } from '@netlify/functions';
import sanityClient from '@sanity/client';
import { nanoid } from 'nanoid';

const client = sanityClient({
	projectId: 'yycjemqk',
	dataset: 'production',
	apiVersion: '2022-04-07',
	token: process.env.SANITY_TOKEN,
	useCdn: false
});

export function roundToDecimalPlaces(number: number, decimalPlaces: number): number {
    return Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
}

const handler: Handler = async (httpEvent) => {
	// HTTP POST bodies are always strings
	const { tripId, cancellationFee } = JSON.parse(httpEvent.body);

	if (!tripId) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Missing trip ID' })
		};
	}

	const trip = await client.getDocument(tripId)

	const res = await client.patch(tripId)
		.set({ status: "Cancelled" })
		.set({ totalPrice: cancellationFee })
		.append('lineItems', [
			{
				// record a discount of their trip to account for the cancellation
				_key: nanoid(),
				label: 'cancellation - discount',
				cost: roundToDecimalPlaces(trip.lineItems.reduce((acc, curr) => acc + curr.cost, 0) * -1, 2),
			},
			{
				// record any late cancellation fees incurred
				_key: nanoid(),
				label: 'cancellation - fee',
				cost: cancellationFee, 
			},
		]).commit()

	// TODO Send a cancellation email

	return {
		statusCode: 202,
		body: JSON.stringify(res),
		headers: {
			'Content-Type': 'application/json',
		}
	};
};

export { handler };
