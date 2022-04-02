<script>
	import { page } from '$app/stores';
	export let title = '330 Cars | Cleveland-Akron Car Rentals';
	export let description = 'A small family-operated car rental service for Ohians';
	export let image = '';

	console.log({ page: $page });
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={$page.url.toString()} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={$page.url.toString()} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />

	<!-- Images -->
	{#if image}
		<meta property="og:image" content={image} />
		<meta property="twitter:image" content={image} />
	{/if}
</svelte:head>
