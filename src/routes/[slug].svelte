<script context="module">
    import { getPageBySlug, publicPreviewToken } from "$lib/sanity";
    import { isPreviewInitialValue } from "$lib/stores";

    export async function load({ params, url }) {
        const page = await getPageBySlug(params.slug, {
            preview: isPreviewInitialValue
                || (url.searchParams.has('preview') && url.searchParams.get('token') === publicPreviewToken),
        })

        if (!page) {
            return {
                status: 404,
            }
        }
        
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
<div>
    <BlockContent blocks={page.content} />
</div>

<style>
    div {
        max-width: 960px;
        margin: auto;
        box-sizing: border-box;
        padding: 1rem;
    }
</style>