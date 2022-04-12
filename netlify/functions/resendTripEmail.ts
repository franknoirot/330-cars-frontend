import { Handler } from '@netlify/functions';
import nodemailer from 'nodemailer';
import sanityClient from '@sanity/client';

const client = sanityClient({
	projectId: 'yycjemqk',
	dataset: 'production',
	apiVersion: '2022-03-16',
	token: process.env.SANITY_TOKEN,
	useCdn: false
});

type ResendTripEmailBody = {
    toEmail: string,
    companyPhone: string,
    origin: string,
}

const handler: Handler = async (httpEvent) => {
	// HTTP POST bodies are always strings
	const handlerBody = JSON.parse(httpEvent.body) as ResendTripEmailBody;

	if (!handlerBody) {
		return {
			statusCode: 400,
			body: JSON.stringify({ message: 'Missing body content' })
		};
	}

    const trip = await client.fetch(`*[_type == "trip" && email == $emailAddress][0] {
        _id,
        name,
        email,
        phone,
        car-> {
            year,
            make,
            model,
            images[0] {
                asset -> {
                    url
                }
            }
        },
        pickup,
        dropoff,
        lineItems,
        totalPrice,
    }`, { emailAddress: handlerBody.toEmail })

    if (!trip) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'No trip found for that email'})
        }
    }

    const emailConfig = tripConfirmationEmail(Object.assign(trip, handlerBody))

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

    const message = {
        from: process.env.EMAIL_USERNAME,
        to: emailConfig.toEmail,
        subject: emailConfig.subject,
        text: emailConfig.text,
        html: emailConfig.html,
    }

    const res = await transport.sendMail(message)

    console.log({res})
	
	return {
		statusCode: 202,
		body: JSON.stringify(res),
	};
};

export { handler }; 


/**
 * Builds an API-friendly config for the reservation resend email sent after entering an email on the reservation page.
 * @param trip 
 * @returns emailConfig
 */
 export function tripConfirmationEmail(trip) {
    return {
        toEmail: trip.email,
        subject: 'Your requested reservation email re-send with 330 Cars',
        text: `Your trip ID is ${ trip.id }, and is scheduled for ${ trip.pickup }.`,
        html: `<html>
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@600&family=Work+Sans:wght@400;600&display=swap" rel="stylesheet">
            <style>
                * {
                    font-family: "Work Sans", sans-serif;
                }

                h1, h2, h3 {
                    font-family: "Source Serif Pro", "Work Sans", sans-serif;
                }

                th {
                    text-transform: capitalize;
                    font-weight: 600;
                }

                a {
                    color: hsl(195deg, 70%, 55%);
                    text-decoration: none;
                    font-weight: 600;
                }

                a:hover {
                    color: hsl(195deg, 75%, 50%);
                }

                th {
                    text-align: left;
                }
            </style>
        </head>
        <body>
        <h1>Your requested reservation email re-send with 330 Cars</h1>
        <p>Your reservation ID is <a href="${ trip.origin }/reservation/${ trip._id }">${ trip._id }</a>. You can view or cancel your reservation on 330-cars.com with it.</p>
        <p>Thank you for renting with us! If you have any questions or concerns, call <a href="${ trip.companyPhone }">${ trip.companyPhone }</a> between 9AM-5PM 7 days a week.</p>
        <h2>Trip dates</h2>
        <table>
            <tbody>
                <tr>
                    <th>Pick up</th>
                    <td>${ trip.pickup }</td>
                </tr>
                <tr>
                    <th>Drop off</th>
                    <td>${ trip.dropoff }</td>
                </tr>
            </tbody>
        </table>
        <h2>Full receipt</h2>
        <table>
            <tbody>
                ${ trip.lineItems.map(({label, cost}) => (`
                    <tr>
                        <th>${ label }</th>
                        <td style="text-align: right;">${ cost.toFixed(2) }</td>
                    </tr>
                `)).join('\n') }
                <tr style="border-top: solid 3px black;">
                    <th style="border-top: solid 3px black;">Total</th>
                    <td style="border-top: solid 3px black;">$${ trip.totalPrice.toFixed(2) }</td>
                </tr>
            </tbody>
        </table>
        <h2>Car & driver</h2>
        <table>
            <tbody>
                <tr>
                    <th>Car</th>
                    <td>${ `${ trip.car.year } ${ trip.car.make } ${ trip.car.model }` }</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${ trip.name }</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${ trip.email }</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${ trip.phone }</td>
                </tr>
            </tbody>
        </table>
        </body>
        </html>
        `
    }
}
