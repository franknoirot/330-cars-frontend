const previewToken = 'adwlkfjatw4oi3'

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const startPreviewSession = (event.url.searchParams.has('preview') && event.url.searchParams.get('token') == previewToken)

    const response = await resolve(event);

    // set a browser cookie if the user is in preview mode
    if (startPreviewSession) {
        response.headers.set('Set-Cookie', `previewToken=${previewToken}; Max-Age=${60 * 60}; SameSite=Strict; Secure; Path=/`)
    }

    return response
}