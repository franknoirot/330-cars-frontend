import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';
// import sanityClient from '@sanity/client';

// const client = sanityClient({
// 	projectId: 'yycjemqk',
// 	dataset: 'production',
// 	apiVersion: '2022-03-16',
// 	token: process.env.SANITY_TOKEN,
// 	useCdn: false
// });

type EmailConfig = {
    toEmail: string,
    subject: string,
    text?: string,
    html: string,
}

const handler: Handler = async (httpEvent) => {
	// HTTP POST bodies are always strings
	const emailConfig = JSON.parse(httpEvent.body) as EmailConfig;

	if (!emailConfig) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Missing emailConfig info' })
		};
	}

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_DOMAIN,
        port: process.env.EMAIL_PORT,
        secure: false,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        dkim: {
            domainName: process.env.DKIM_DOMAIN,
            keySelector: process.env.DKIM_KEY_SELECTOR,
            privateKey: process.env.DKIM_PKEY,
        }
    })

    // TODO: Maybe make this message a content type in sanity that I can them hook into.
    const message = {
        from: process.env.EMAIL_USERNAME,
        to: emailConfig.toEmail,
        subject: emailConfig.subject,
        text: emailConfig.subject,
        html: emailConfig.html,
    }

    const res = await transport.sendMail(message)

    console.log({res})
	
	return {
		statusCode: 201,
		body: JSON.stringify(res),
	};
};

export { handler };
