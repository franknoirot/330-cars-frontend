<script context="module">
	import netlifyIdentity from 'netlify-identity-widget'
	import { browser } from '$app/env'
	import { userStore } from '$lib/stores'

	const storeUser = user => {
		console.log('storing user', user)
		userStore.set(user)
	}

	if (browser) {
		netlifyIdentity.on('init', storeUser)
		netlifyIdentity.on('login', storeUser)
		netlifyIdentity.init()
	}

	function handleSignIn() { netlifyIdentity.open() }
	function handleSignOut() {
		netlifyIdentity.logout()
		userStore.set(null)
	}
</script>

<script>
	import { page } from '$app/stores';
	import Icon from '$lib/components/Icon.svelte';
	let menuOpen = false;
	let isCurrentPage = (url) => ($page.url.pathname === url ? 'active' : '');
	let showTagline = isCurrentPage('/');
</script>

<header>
	<nav>
		<div class="logo-lockup">
			<a href="/" class="logo">
				<Icon type="logo" />
			</a>
			{#if showTagline}
				<span class="tagline">Homegrown car rentals for Cleveland and Akron, Ohio.</span>
			{/if}
		</div>
		<ul class="top-nav">
			<div class="display-contents desktop-only">
				<li><a href="/about" class={isCurrentPage('/about')}>About</a></li>
				<li><a href="/help" class={isCurrentPage('/help')}>Help</a></li>
				{#if !$userStore}
				<li><button class={'link-button'} on:click={handleSignIn}>Log in</button></li>
				{:else}
				<li><button class={'link-button'} on:click={handleSignOut}>Log out</button></li>
				{/if}
			</div>
			<li class="mobile-only">
				<a
					href="https://www.google.com/maps/place/330+N+Arlington+St,+Akron,+OH+44305/@41.0814338,-81.4928358,17z"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Icon type="mapPin" width="16" />
				</a>
			</li>
			<div class="vl" />
			<li class="phone-number">
				<a href="tel:3308586940">
					<Icon type="phone" width="20" />
					<span class="desktop-only"><strong>330</strong>-858-6940</span>
				</a>
			</li>
			<li class="mobile-only menu-toggle">
				<button
					on:click={() => {
						menuOpen = !menuOpen;
					}}
				>
					{#if !menuOpen}
						<Icon type="menu" width="25" />
					{:else}
						<Icon type="x" width="25" />
					{/if}
				</button>
			</li>
		</ul>
	</nav>
</header>

<style>
	header {
		background: var(--bg);
		border-bottom: solid 1px hsl(190deg, 20%, 85%);
		width: 100%;
		box-sizing: border-box;
	}

	nav {
		box-sizing: border-box;
		max-width: 1260px;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: auto;
		padding: 1rem;
	}

	.logo-lockup {
		display: flex;
		align-items: center;
		column-gap: 1rem;
		row-gap: 0.4rem;
		flex-wrap: wrap;
	}

	.tagline {
		font-size: 0.8rem;
		font-style: italic;
		color: hsl(190deg, 20%, 40%);
	}

	.logo {
		width: 20vw;
		max-width: 200px;
		min-width: 125px;
		display: block;
	}

	ul {
		list-style: none;
		display: flex;
		align-items: center;
		gap: 2rem;
		margin: 0;
		padding: 0;
	}

	.vl {
		height: 1.5rem;
		border-inline-start: 1px solid #b5cde8;
	}

	.phone-number a {
		display: flex;
		align-items: center;
		color: inherit;
		gap: 6px;
		white-space: nowrap;
	}

	a, button.link-button {
		color: inherit;
		text-decoration: none;
	}

	button.link-button {
		background: none;
		font: inherit;
		border: none;
	}

	a:hover,
	a.active,
	button.link-button:hover,
	button.link-button:active {
		cursor: pointer;
		color: cornflowerblue;
	}

	.menu-toggle button {
		padding: 0;
		margin: 0;
		border: 0;
		background: 0;
	}

	@media (min-width: 769px) {
		.mobile-only {
			display: none;
		}
	}

	@media (max-width: 768px) {
		header {
			position: sticky;
			top: 0px;
			z-index: 5;
		}

		ul {
			gap: 1.5rem;
		}
		.phone-number {
			order: -1;
		}

		.tagline {
			display: none;
		}
	}
</style>
