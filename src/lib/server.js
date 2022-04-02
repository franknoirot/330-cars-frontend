// Server Response Utilities
// by Clayton Farr: https://github.com/ClaytonFarr/sveltekit-netlify-stripe-fauna-example/blob/master/src/lib/utils/helpers.js
// ------------------------------------------------------------------------------------
// Used to provide common structure to endpoint/serverless function responses
// For errors, stick to the basics of HTTP and avoid hunting for obscure error codes:
// - use 500 errors for application failing to do its job
//    response(500)
// - use 404 for things that aren't found
//    response(404)
// - use 200 with an 'error' message for everything else
//    response(200, {
//       "error": "This is what went wrong"
//    })

export function serverResponse(statusCode, successful = true, body = {}, headers = null) {
	// use for SvelteKit .js endpoints (returns code as 'status')
	// do not user for 'additional_functions' functions (need to return code as 'statusCode')

	// set statusMessage
	let statusMessage;
	if (successful) {
		statusMessage = 'success';
	}
	if (!successful && !body.statusMessage) {
		statusMessage = 'error';
	}

	// set errorMessage
	let errorMessage = body.error;
	if ((statusCode === 405 || statusCode === 502) && !body.error)
		errorMessage = 'Issue reaching server - please submit again.';
	if ((statusCode === 500 && !body.error) || body.error?.toLowerCase().includes('unexpected token'))
		errorMessage = 'We encountered a system error - please try again.';
	if ((statusCode === 401 || statusCode === 403) && !body.error)
		errorMessage = 'Unauthorized Request';
	if (statusCode === 200 && !successful && !body.error) {
		errorMessage = 'Request error.';
	}
	if (statusCode === 404 && !body.error) {
		errorMessage = 'Item not found.';
	}

	// compose body
	if (successful) body = { statusMessage, ...body };
	else body = { statusMessage, error: errorMessage, ...body };

	return {
		status: statusCode,
		headers,
		body: JSON.stringify(body)
	};
}
