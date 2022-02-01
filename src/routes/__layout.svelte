<script>
	import '../app.css'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
</script>

<Header />
<main>
	<slot />
</main>
<Footer />

<style>
	main {
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
	}
</style>