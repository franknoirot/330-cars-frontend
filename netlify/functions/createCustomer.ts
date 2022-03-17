import { Handler } from "@netlify/functions";
import sanityClient from "@sanity/client"

const client = sanityClient({
    projectId: 'yycjemqk',
    dataset: 'production',
    apiVersion: '2022-03-16',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
})

const handler: Handler = async (httpEvent) => {
    const { event, user } = JSON.parse(httpEvent.body);
    
    if (!event || !user) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing user info' }),
        }
    } else if (event !== "validate") {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid event value" }),
        }
    }

    const customer = {
        _type: 'customer',
        _id: user.id,
        name: user.user_metadata.full_name,
        email: user.email,
    }

    const res = await client.createIfNotExists(customer)
    console.log(`User created, ID is ${res._id}`)

  return {
    statusCode: 200,
  };
};

export { handler };