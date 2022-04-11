import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder"
import { origin } from "./sanity"

type EmailConfig = {
    toEmail: string,
    subject: string,
    text?: string,
    html: string,
}

type TripEmailConfig = {
    id: string,
    driver: {
        name: string,
        email: string,
        phone: string,
    },
    car: {
        title: string,
        imageUrl: ImageUrlBuilder,
    },
    pickup: string,
    dropoff: string,
    lineItems: {
        label: string | number,
        cost: string | number,
    }[],
    totalPrice: number,
    company: {
        phone: string,
    }
}

/**
 * Builds an API-friendly config for the trip confirmation email sent after successful checkout.
 * @param {TripEmailConfig} trip 
 * @returns {EmailConfig}
 */
export function tripConfirmationEmail(trip: TripEmailConfig) : EmailConfig {
    return {
        toEmail: trip.driver.email,
        subject: 'Your reservation with 330 Cars is confirmed',
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
        <h1>Your 330 Cars reservation is confirmed</h1>
        <p>Your reservation ID is <a href="${ origin }/reservation/${ trip.id }">${ trip.id }</a>. You can view or cancel your reservation on 330-cars.com with it.</p>
        <p>Thank you for renting with us! If you have any questions or concerns, call <a href="${ trip.company.phone }">${ trip.company.phone }</a> between 9AM-5PM 7 days a week.</p>
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
        <h2>Car & driver</h2>
        <table>
            <tbody>
                <tr>
                    <th>Car</th>
                    <td>${ trip.car.title }</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${ trip.driver.name }</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${ trip.driver.email }</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${ trip.driver.phone }</td>
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
        </body>
        </html>
        `
    }
}


/**
 * Builds an API-friendly config for the trip cancellation email sent
 * after successful cancellation on the reservation view page.
 * @param {TripEmailConfig} trip 
 * @returns {EmailConfig}
 */
export function tripCancellationEmail(trip: TripEmailConfig, cancellationMessage: string) : EmailConfig {
    return {
        toEmail: trip.driver.email,
        subject: 'Your reservation with 330 Cars has been cancelled',
        text: `Your trip ${ trip.id } scheduled for ${ trip.pickup } has been successfully cancelled.`,
        html: `<html lang="en">
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
        <h1>Your 330 Cars reservation has been cancelled</h1>
        <p>Your reservation ID was <a href="${ origin }/reservation/${ trip.id }">${ trip.id }</a>. You can view your cancelled reservation on 330-cars.com with it.</p>
        <p>${ cancellationMessage }</p>
        <p>We're sorry you weren't able to rent with us! Call <a href="${ trip.company.phone }">${ trip.company.phone }</a> between 9AM-5PM 7 days a week if you have any feedback on how we can do better.</p>
        <h2>Cancelled trip dates</h2>
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
        <h2>Car & driver</h2>
        <table>
            <tbody>
                <tr>
                    <th>Car</th>
                    <td>${ trip.car.title }</td>
                </tr>
                <tr>
                    <th>Name</th>
                    <td>${ trip.driver.name }</td>
                </tr>
                <tr>
                    <th>Email</th>
                    <td>${ trip.driver.email }</td>
                </tr>
                <tr>
                    <th>Phone</th>
                    <td>${ trip.driver.phone }</td>
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
                <tr>
                    <th style="border-top: solid 3px black;">Total</th>
                    <td style="border-top: solid 3px black;">$${ trip.totalPrice.toFixed(2) }</td>
                </tr>
            </tbody>
        </table>
        </body>
        </html>`
    }
}