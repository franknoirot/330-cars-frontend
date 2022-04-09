<script context="module">
	import { getGlobalSettings, origin } from '$lib/sanity';

	export async function load() {
		const globalSettings = await getGlobalSettings()
		return {
			props: {
				globalSettings
			}
		}
	}
</script>

<script>
	import { page } from '$app/stores'
	import { goto } from '$app/navigation';
	import { globalSettings as globalSettingsStore, isPreview } from '$lib/stores'; 
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import NotificationList from '$lib/components/NotificationList.svelte';
	import '../app.css';
	export let globalSettings = {}

	// whenever fetched global settings become available, stash them into a
	// localStorage-back Svelte store.
	$: if (globalSettingsStore) {
		$globalSettingsStore = globalSettings
	}

	async function exitPreview() {
		const res = await fetch(origin + '/.netlify/functions/exitPreview')
		$isPreview = false
		goto($page.url.pathname)
	}
</script>

<div class={$isPreview ? 'preview' : ''}>
	{#if $isPreview}
	<aside>
		<strong>Browsing in Preview Mode</strong>
		<button on:click={exitPreview}>Exit Preview Mode</button>
	</aside>
	{/if}
	<Header phoneNumber={globalSettings.companyPhone} />
	<main>
		<slot />
		<NotificationList />
	</main>
	<Footer />
</div>

<style>
	div {
		display: grid;
		grid-template-rows: auto 1fr auto;
		min-height: 100vh;
		width: 100%;
	}

	div.preview {
		grid-template-rows: auto auto 1fr auto;
	}
	main {
		box-sizing: border-box;
		width: 100%;
		max-width: 1366px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	aside {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: radial-gradient(circle at top center, hsl(30deg, 70%, 94%), hsl(30deg, 70%, 88%));
		padding: .5rem 2rem;
		border: solid 3px hsl(25deg, 78%, 60%);
	}

	aside button {
		background: hsl(25deg, 75%, 65%);
		padding: .5rem 1.25rem;
		border: none;
		border-radius: 3px;
		cursor: pointer;
	}

	aside button:hover,
	aside button:focus {
		background: hsl(25deg, 78%, 60%);
	}

	@media (max-width: 768px) {
		main {
			padding: 0;
		}
	}
</style>
