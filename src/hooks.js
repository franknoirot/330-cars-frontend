 /** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
    console.log('someones is getting a session', { event })

    return event.locals.user
      ? {
          user: {
            // only include properties needed client-side —
            // exclude anything else attached to the user
            // like access tokens etc
            name: event.locals.user.name,
            email: event.locals.user.email,
            avatar: event.locals.user.avatar
          }
        }
      : {};
  }