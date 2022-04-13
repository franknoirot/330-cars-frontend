<script>
import AddressInfo from "./AddressInfo.svelte";
import Icon from "./Icon.svelte";
import { globalSettings } from '$lib/stores'

</script>
<footer>
	<nav>
		<div class="company-details">
			<a href="/" class="logo">
				<Icon type="logo" width="130" />
			</a>
			<div class="link-columns">
				<AddressInfo label="" size="small" />
				<a class="phone" href={`tel:${ $globalSettings.companyPhone }`}>
					<Icon type="phone" width="16" />
					<span>{ $globalSettings.companyPhone }</span>
				</a>
			</div>
		</div>
		<div class="link-columns">
			<ul>
				<li><strong>Reservation</strong></li>
				<li><a href="/reservation">View your trip</a></li>
				<li><a href="/reservation">Cancel your trip</a></li>
				<li><a href="/protection-extras">Protection & extras</a></li>
			</ul>
			<ul>
				<li><strong>Our Company</strong></li>
				<li><a href="/terms-of-use">About us</a></li>
				<li><a href="/privacy-policy">Help & FAQ</a></li>
			</ul>
			<ul>
				<li><strong>Policies</strong></li>
				<li><a href="/terms-of-use">Terms of use</a></li>
				<li><a href="/privacy-policy">Privacy</a></li>
				<li><a href="/renter-eligibility">Renter eligibility</a></li>
			</ul>
			
		</div>
		<a
			class="designer-badge"
			href="https://franknoirot.co"
			target="_blank"
			rel="noopener noreferrer"
		>
			Site by Frank Noirot
		</a>
	</nav>
</footer>

<style>
	footer {
		background: linear-gradient(90deg, rgba(213, 235, 244, 0) 0%, #D5EBF4 100%), #E2F5FF;
		border-block-start: 1px solid #B5CDE8;
		padding: 1rem 32px;
		margin-top: 3rem;
		margin-bottom: 0;
	}

	@media (prefers-color-scheme: dark) {
		footer {
			background: hsl(225, 11%, 7%);
		}
	}

	footer nav {
		max-width: 1366px;
		box-sizing: border-box;
		display: flex;
		row-gap: 1.5rem;
		justify-content: space-between;
		margin: 0 auto;
	}

	.link-columns {
		display: flex;
		flex-wrap: wrap;
		gap: 3rem;
		margin: 0;
		padding: 0;
	}

	.company-details .link-columns > * {
		margin: .25rem 0;
	}

	.link-columns li {
		list-style: none;
		margin: 1rem 	0;
		padding: 0;
	}

	.company-details * {
		display: block;
		margin: 1.25rem 0;
	}

	footer a {
		text-decoration: none;
		font-weight: normal;
		font-size: 1rem;
		color: inherit;
	}

	a.phone {
		text-decoration: none;
		color: inherit;
		display: grid;
		grid-template-columns: min-content auto;
		align-items: center;
		gap: 20px;
	}

	a:hover {
		color: cornflowerblue;
	}

	.designer-badge {
		align-self: flex-end;
	}

	@media (max-width: 768px) {
		footer nav {
			flex-direction: column;
			margin-block-end: 1rem;
		}
	}
</style>
