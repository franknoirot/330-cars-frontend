import { Handler } from "@netlify/functions";
import sanityClient from "@sanity/client"

const client = sanityClient({
    projectId: 'yycjemqk',
    dataset: 'production',
    apiVersion: '2022-03-16',
    token: process.env.SANITY_TOKEN,
    useCdn: false,
})

const handler: Handler = async ({ body }) => {
    const { event, user } = JSON.parse(body);
    
    if (!event || !user) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing user info' }),
        }
    } else if (event !== "identity-validate") {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: "Invalid event value" }),
        }
    }

    console.log("user info", user)

    const customer = {
        _type: 'customer',
        name: user.fullname || user.fullName || user.name,
        email: user.email,
    }

    const res = await client.create(customer)
    console.log(`User created, ID is ${res._id}`)

  return {
    statusCode: 200,
  };
};

export { handler };