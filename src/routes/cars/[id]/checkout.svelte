<script context="module">
	import { getCarById } from '$lib/sanity';
	export const prerender = false; // set page to not pre-render for live car info

	export async function load({ params }) {
		const car = await getCarById(params.id);

		return {
			props: {
				car,
			}
		};
	}
</script>

<script>
    import { pickup, dropoff, tripExtras, tripId } from '$lib/stores'
    import ReservationSidebar from '$lib/components/ReservationSidebar.svelte'
	import Icon from '$lib/components/Icon.svelte';
import { goto } from '$app/navigation';

    export let car

	async function submitForm(e) {
		e.preventDefault()
		const formData = new FormData(e.target)
		const formObj = Object.assign({
			car: {
				_type: 'reference',
				_ref: car._id,
			},
			extras: Object.values($tripExtras).filter(isNotFalsey => isNotFalsey).map(extra => ({
				_type: 'reference',
				_ref: extra._id,
  			})),
			scheduledPickup: $pickup,
			scheduledDropoff: $dropoff,
			status: "Scheduled",
		}, Object.fromEntries(formData.entries()))

		const res = await fetch('/.netlify/functions/createTrip', {
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formObj)
		})

		console.log({ res })
		const resData = await res.json()
		console.log({resData})
		$tripId = resData._id
		goto('/confirmation')
	}
</script>

<div class="content-wrapper">
	<ReservationSidebar {car} {pickup} {dropoff} tripExtras={$tripExtras} />	
    <section>
        <h1>Checkout</h1>
		<form on:submit={submitForm}>
			<div class="split-grid-1-3">
				<h2>Driver details</h2>
				<div>
					<label class="capitalized-label" for="name">Name</label>
					<input id="name" name="name" type="text" required />
					<label class="capitalized-label" for="email">Email</label>
					<input id="email" name="email" type="email" required />
					<label class="capitalized-label" for="phone">Phone Number</label>
					<input id="phone" name="phone" type="tel" required />
				</div>
			</div>
			<h2>Payment information</h2>
			<div class="split-grid-1-3">
				<h3>Card details</h3>
				<div>
					<div class="split-grid-2-3" style="margin-top: 0">
						<div>
							<label class="capitalized-label" for="card">Card Number</label>
							<input id="card" name="card" type="text" required />
						</div>
						<div>
							<label class="capitalized-label" for="expDate">Exp. Date</label>
							<input id="expDate" name="expDate" type="text" required />
						</div>
					</div>
					<p>
						You will not be charged now. If you fail to cancel this reservation prior to your scheduled pick up time or fail to pick up the vehicle, a <strong>$40 no-show fee</strong> will be charged to this card. A valid credit card must be presented at the time of rental to complete the reservation, but it does not need to be this card.
					</p>
				</div>
			</div>
			<div class="split-grid-1-3">
				<h3>Billing information</h3>
				<div>
					<label class="capitalized-label" for="address_1">Address Line 1</label>
					<input id="address_1" name="address_1" type="text" required />
					<label class="capitalized-label" for="address_2">Address Line 2</label>
					<input id="address_2" name="address_2" type="text" />
					<div class="split-grid-2-1-1">
						<div>
							<label class="capitalized-label" for="city">City</label>
							<input id="city" name="city" type="text" required />
						</div>
						<div>
							<label class="capitalized-label" for="state">State</label>
							<input id="state" name="state" type="text" maxlength="2" required />
						</div>
						<div>
							<label class="capitalized-label" for="zipCode">ZIP Code</label>
							<input id="zipCode" name="zipCode" type="text" maxlength="5" required />
						</div>
					</div>
				</div>
			</div>
			<div class="split-grid-1-3">
				<h2>Before you reserve</h2>
				<div>
					<ol>
						<li>Make sure you are comfortable with our Terms & Conditions. By submitting this form you agree to the 330 Cars Terms & Conditions. You confirm that you understand and accept our Rental Terms, Qualifications and Requirements.</li>
						<li>Make sure you meet our Minimum Age Requirements. We cannot rent to anyone that does not meet them.</li>
						<li>Bring your license. A valid driver’s license must be presented at the time of pick up.</li>
					</ol>
					<button class="btn-link mt-2" type="submit">
						Reserve your trip
						<Icon type="arrow" width="20" class="flip-x"/>
					</button>
				</div>
			</div>
		</form>
	</section>
</div>

<style>
    .content-wrapper {
		display: grid;
		gap: 6rem;
		grid-template-columns: 2fr 5fr;
		width: 100%;
		box-sizing: border-box;
	}

	h1 {
		font-family: var(--serif);
		font-size: 4rem;
		font-weight: 600;
		margin: 0;
		margin-bottom: 2rem;
	}

	
	.split-grid-1-3,
	.split-grid-2-3,
	.split-grid-2-1-1 {
		display: grid;
		gap: 2rem;
		margin-top: 1.75rem;
	}
	
	.split-grid-1-3 {
		margin-bottom: 4rem;
		grid-template-columns: 1fr 2fr;
	}
	.split-grid-2-3 {
		grid-template-columns: 3fr 1fr;
	}
	.split-grid-2-1-1 {
		grid-template-columns: 2fr 1fr 1fr;
	}

	h2 {
		margin-top: 0;
	}

	h3 {
		color: #4A5660;
		font-size: 1.5rem;
		font-weight: 400;
		margin-top: 0;
	}

	label,
	input {
		display: block;
		width: 100%;
		margin: .25rem 0;
	}

	label {
		margin-top: 1.75rem;
	}

	label:first-of-type {
		margin-top: 0;
	}

	input {
		padding: .375rem .5rem;
		border-radius: 3px;
		border: solid 1px #B5CDE8;
	}

	.btn-link {
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		color: #E2F5FF;
		padding: .5rem 1.5rem;
		border-radius: 3px;
		display: inline-block;
		background: #0B85C9;
		border: 0;
	}

	.btn-link:hover {
		background-color: #005d8f;
	}

	.mt-2 {
		margin-top: 2rem;
	}
</style>