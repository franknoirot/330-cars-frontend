<script>
	import { globalSettings } from '$lib/stores';
	import Icon from '$lib/components/Icon.svelte';

	export let hasLabel = true, size = "normal"

	const styles = {
		iconSize: {
			normal: '28',
			small: '16',	
		},
		fontSize: {
			normal: '1.2rem',
			small: '1rem',
		},
	}

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
	style={`font-size: ${styles.fontSize[size]};`}
>
	<Icon type="mapPin" width={styles.iconSize[size]} />
	<div>
		{#if hasLabel}<small class="capitalized-label">Location</small>{/if}
		<p>{@html formattedAddress }</p>
	</div>
</a>

<style>
	a {
		text-decoration: none;
		color: inherit;
		display: grid;
		grid-template-columns: auto auto;
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
		font-weight: 300;
	}
</style>
