<script>
	import { globalSettings } from '$lib/stores';
	import Icon from '$lib/components/Icon.svelte';

	let {
		street,
		street_2,
		city,
		state,
		zipCode
	} = $globalSettings.companyAddress

	let formattedAddress = street + '<br>'
		+ (street_2 ? street_2 + '<br>' : '')
		+ `${ city }, ${ state } ${ zipCode }`

	let addressSlug = (`${ street }+${ city }+${ state }+${ zipCode }`).replace(' ', '+')
</script>

<a
	href={"https://www.google.com/maps/place/" + addressSlug}
	target="_blank"
	rel="noopener noreferrer"
>
	<Icon type="mapPin" width="28" />
	<div>
		<small class="capitalized-label">Location</small>
		<p>{@html formattedAddress }</p>
	</div>
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
		display: grid;
		grid-template-columns: 28px auto;
		align-items: center;
		gap: 20px;
	}

	a:hover {
		color: cornflowerblue;
	}

	small,
	p {
		margin: 7px 0;
	}

	p {
		font-size: 1.2rem;
		font-weight: 300;
	}
</style>
