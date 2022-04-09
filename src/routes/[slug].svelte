<script context="module">
    import { getPageBySlug, publicPreviewToken } from "$lib/sanity";
    import { isPreviewInitialValue } from "$lib/stores";

    export async function load({ params, url }) {
        const page = await getPageBySlug(params.slug, {
            preview: isPreviewInitialValue
                || (url.searchParams.has('preview') && url.searchParams.get('token') === publicPreviewToken),
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