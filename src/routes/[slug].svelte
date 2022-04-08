<script context="module">
    import { getPageBySlug } from "$lib/sanity";

    export async function load({ params }) {
        const page = await getPageBySlug(params.slug)

        console.log({ page, params })

        return {
            props: { page }
        }
    }
</script>
<script>
    import BlockContent from '$lib/components/BlockContent/index.svelte'
    import SEO from '$lib/components/SEO.svelte'
    export let page
</script>

{#if page.seo}
<SEO title={page.seo.title} />
{/if}
<BlockContent blocks={page.content} />