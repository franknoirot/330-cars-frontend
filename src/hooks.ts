import { offsetNowHours } from '$lib/timeHelpers'
import * as cookie from 'cookie'
const previewToken = 'adwlkfjatw4oi3'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const getCookies = event.request.headers.get('Cookie')
    const cookies = (getCookies) ? cookie.parse(getCookies) : false
    const newPreview = (event.url.searchParams.has('preview') && event.url.searchParams.get('token') == previewToken)

    // TODO: Cookie does not seem to persist across refreshes
    const ongoingPreview = cookies?.previewToken === previewToken
    const exitPreview = event.pathname == '/exit-preview'

    if (newPreview || ongoingPreview) {
        event.params.preview = true
    } if (exitPreview) {
        event.params.preview = false
    }

    console.log({
        newPreview, ongoingPreview, exitPreview, expire: offsetNowHours(1).toString()
    })

    const response = await resolve(event);

    // set a browser cookie if the user is in preview mode
    if (newPreview) {
        response.headers.set('Set-Cookie', `previewToken=${previewToken}; expires=${offsetNowHours(1).toString()}; SameSite=Strict; Secure`)
    } if (exitPreview) {
        response.headers.set('Set-Cookie', 'previewToken=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT')
    }



    return response
}