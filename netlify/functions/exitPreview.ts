import { Handler } from "@netlify/functions";

const handler: Handler = async (httpEvent) => {
    console.log({ httpEvent })
    return {
		statusCode: 200,
        headers: {
            'Set-Cookie': 'previewToken=deleted; path=/; Max-Age=0',
        },
	};
}

export { handler }