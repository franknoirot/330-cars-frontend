import { parseIdentityCookies, parseJwt } from '$lib/authTokens';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // parse jwt from cookie in event, if present, and populate locals.user
    const { jwt } = parseIdentityCookies(event);
    if (jwt) {
        event.locals.token = jwt;
        event.locals.user = parseJwt(jwt);
    }
    if (event.locals.user) {
        event.locals.user.authenticated = true;
    } else {
        event.locals.user = {};
        event.locals.user.authenticated = false;
    }
    
    // console.log(new Date().toISOString(), ': HOOKS handle jwt :', jwt);
    // console.log(new Date().toISOString(), ': HOOKS handle locals.user.authenticated :', event.locals.user.authenticated);

    // process evented route/endpoint
    const response = await resolve(event, {
        ssr: !event.url.pathname.startsWith('/account'),
      });

    return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
    console.log('someones is getting a session', { event })

    return event.locals.user
      ? {
          user: event.locals.user,
        }
      : {};
  }