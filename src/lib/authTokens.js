// ======================================================
// Cookie Utilities
// by Clayton Farr: https://github.com/ClaytonFarr/sveltekit-netlify-stripe-fauna-example/blob/master/src/lib/utils/cookies.js
// ======================================================

import { serverResponse } from '$lib/server';

// ------------------------------------------------------
// Authentication cookie utilities
// ------------------------------------------------------

const JWT_COOKIE_NAME = 'nf_jwt';

export const parseIdentityCookies = (event) => {
	const cookies = event.request.headers.get('cookie');
	let jwt = null;

	// grab JWT value, if cookie is present
	if (cookies) jwt = cookies.split('; ').find((row) => row.startsWith(JWT_COOKIE_NAME));
	if (jwt) jwt = jwt.slice(JWT_COOKIE_NAME.length + 1);
	return { jwt };
};

export function setIdentityCookies(body, token, redirection = null) {
	const headers = {
		'Set-Cookie': `${JWT_COOKIE_NAME}=${token}; Path=/; SameSite=Lax; HttpOnly; Secure; Max-Age=3600;`
	};
	if (redirection) headers['Location'] = redirection;
	return serverResponse(redirection ? 302 : 200, true, body, headers);
}

export const deleteIdentityCookies = (body, redirection = null) => {
	const headers = {
		'Set-Cookie': `${JWT_COOKIE_NAME}=; Path=/; SameSite=Lax; HttpOnly; Secure; Max-Age=0;`
	};
	if (redirection) headers['Location'] = redirection;
	return serverResponse(redirection ? 302 : 200, true, body, headers);
};

// Validate JSON
// ------------------------------------------------------------------------------------
export function isValidJSONString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}

// Decode JWT
// ------------------------------------------------------------------------------------
export const parseJwt = (jwt) => {
	const base64Url = jwt.split('.')[1];
	if (base64Url) {
		const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		const buff = Buffer.from(base64, 'base64');
		const payloadInit = buff.toString('ascii');
		if (isValidJSONString(payloadInit)) {
			return JSON.parse(payloadInit);
		}
	}
};
