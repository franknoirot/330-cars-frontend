<script>
	import '../app.css'
	import Header from '$lib/components/Header.svelte'
	import Footer from '$lib/components/Footer.svelte'
</script>

<div>
	<Header />
	<main>
		<slot />
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
		max-width: 1280px;
		margin: 0 auto;
		padding: 2rem;
	}

	@media (max-width: 768px) {
		main {
			padding: 0;
		}
	}
</style>