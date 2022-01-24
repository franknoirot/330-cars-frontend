<script>
	import '../app.css'
	import Header from '$lib/components/Header.svelte'
</script>

<Header />
<main>
	<slot />
</main>

<style>
	main {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
	}
</style>