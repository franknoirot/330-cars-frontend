<script>
    import { page } from '$app/stores'
	import { goto } from '$app/navigation';
    import { isPreview } from '$lib/stores';

    async function exitPreview() {
		const res = await fetch(origin + '/.netlify/functions/exitPreview')
		$isPreview = false
		goto($page.url.pathname)
	}
</script>

{#if $isPreview}
<div class="banner">
    <strong>Browsing in Preview Mode</strong>
    <button on:click={exitPreview}>Exit Preview Mode</button>
</div>
{/if}

<style>
    .banner {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: radial-gradient(circle at top center, hsl(30deg, 70%, 94%), hsl(30deg, 70%, 88%));
		padding: .5rem 2rem;
		border: solid 3px hsl(25deg, 78%, 60%);
	}

	.banner button {
		background: hsl(25deg, 75%, 65%);
		padding: .5rem 1.25rem;
		border: none;
		border-radius: 3px;
		cursor: pointer;
	}

	.banner button:hover,
	.banner button:focus {
		background: hsl(25deg, 78%, 60%);
	}
</style>