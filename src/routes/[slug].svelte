<script context="module">
    import { getPageBySlug } from "$lib/sanity";
    import { isPreviewInitialValue } from "$lib/stores";

    export async function load({ params }) {
        const page = await getPageBySlug(params.slug, {
            preview: isPreviewInitialValue,
        })
        
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
<SEO title={page.seo.metaTitle} description={page.seo.metaDescription} />
{/if}
<BlockContent blocks={page.content} />