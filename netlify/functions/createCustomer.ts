import { Handler } from "@netlify/functions";
import sanityClient from "@sanity/client"

const client = sanityClient({
    projectId: 'yycjemqk',
    dataset: 'production',
    apiVersion: '2022-03-16',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
})

const handler: Handler = async (event) => {
    if (!event.body) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: 'Missing body'
            }),
        }
    }

    const customer = {
        _type: 'customer',
        ...JSON.parse(event.body),
    }

    const res = await client.createIfNotExists(customer)
    console.log(`User created, ID is ${res._id}`)

  return {
    statusCode: 201,
    body: JSON.stringify({ message: res }),
  };
};

export { handler };