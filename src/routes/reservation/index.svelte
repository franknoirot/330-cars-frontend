<script>
    import { globalSettings, tripId } from "$lib/stores";
    import { getTripById, origin } from "$lib/sanity";
    import Icon from "$lib/components/Icon.svelte";
    import { goto } from "$app/navigation";
    import { browser } from "$app/env";
    let id = ($tripId) ? $tripId : ""
    let email = ''

    let tripDetails, emailStatus = 'Unsent'

    async function submitIdForm(e) {
        e.preventDefault()
        tripDetails = await getTripById(id)
        if (tripDetails && tripDetails._id && browser) {
            goto('/reservation/' + id, {
                state: tripDetails
            })
        } else {
            // TODO handle error
        }
    }

    async function submitEmailForm(e) {
        e.preventDefault()
        console.log({ email })

        const emailConfig = {
            toEmail: email,
            companyPhone: $globalSettings.companyPhone,
            origin,
        }

        const res = await fetch(origin + '/.netlify/functions/resendTripEmail',{
			method: 'POST', // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(emailConfig)
        })

        
        if (res.status == 202) {
            emailStatus = 'Sent'
        } else if (res.status == 400) {
            emailStatus = 'Error'
        }
    }
</script>

<svelte:head>
    <meta name="robots" content="noindex nofollow" />
</svelte:head>
<h1 class="display">View or Cancel your reservation</h1>
<div class="split-grid-1-3">
    <h2>By reservation ID</h2>
    <div>
        <form on:submit={submitIdForm}>
            <div class="field-pair mt-0">
                <label class="capitalized-label" for="tripId">Reservation ID</label>
                <input id="tripId" name="tripId" type="text" bind:value={id} required />
            </div>
            <button class="btn-link " type="submit">
                Submit
                <Icon type="arrow" width="20" class="flip-x"/>
            </button>
        </form>
    </div>
</div> 
<div class="split-grid-1-3 mt-6">
    <h2>By email</h2>
    <div>
        <form on:submit={submitEmailForm}>
            <div class="field-pair mt-0">
                <label class="capitalized-label" for="email">Email</label>
                <input id="email" name="email" type="email" bind:value={email} required />
            </div>
            <button class="btn-link" type="submit">
                Submit
                <Icon type="arrow" width="20" class="flip-x"/>
            </button>
        </form>
        <p>
            {#if emailStatus == "Unsent"}
            If you don’t have your reservation ID, enter the email address you booked with and we’ll resend the reservation details email to you.
            {:else if emailStatus == "Sent"}
            We found a trip reserved for { email } and have re-sent an email with its details to you. There is a link to view or cancel your reservation within it.
            {:else}
            Sorry, we didn't find a reserved trip associated with { email }.
            {/if}
        </p>
    </div>
</div>

<style>
    h1.display {
        text-align: center;
        margin: 3rem 0 4rem;
    }

    h2 {
        margin-top: 0;
    }

    .split-grid-1-3 {
		display: grid;
		gap: 2rem;
        margin: auto;
		margin-top: 1.75rem;
		margin-bottom: 2rem;
		grid-template-columns: 1fr 2fr;
        max-width: 75ch;
	}

    form {
        display: grid;
        grid-template-columns: 2fr 1fr;
        align-items: flex-end;
        gap: 2rem;
    }

    input {
        margin-bottom: 0;
    }

    .btn-link {
		font-size: 1rem;
		font-weight: 600;
		text-decoration: none;
		color: #E2F5FF;
		padding: .4rem 1.5rem;
		border-radius: 3px;
		display: inline-block;
		background: #0B85C9;
		border: 0;
	}

	.btn-link:hover:not(:disabled) {
		background-color: #005d8f;
	}

    .btn-link:disabled {
        background: hsl(190deg, 15%, 70%);
        cursor: not-allowed;
    }

    .mt-6 {
        margin-top: 6rem;
    }
</style>