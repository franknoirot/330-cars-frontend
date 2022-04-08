<script context="module">
	import { getGlobalSettings } from '$lib/sanity';

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
	import { globalSettings as globalSettingsStore } from '$lib/stores';
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
</script>

<div>
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
	main {
		box-sizing: border-box;
		width: 100%;
		max-width: 1366px;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	@media (max-width: 768px) {
		main {
			padding: 0;
		}
	}
</style>
