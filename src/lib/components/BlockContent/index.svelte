<script>
    import PortableText from '@portabletext/svelte'
    import AddressBlock from './AddressBlock.svelte';
    import FAQ from './FAQ.svelte'

    export let blocks = []

    const serializerOverrides = {
        types: {
            // embedded components and content types
            addressBlock: AddressBlock,
            faq: FAQ,
        },
        marks: {
            // marks like bold and italics
        },
        blockStyles: {
            // block-level styles like headings and paragraphs
        },
    }
</script>

<div class="block-content">
    <PortableText {blocks} serializers={serializerOverrides} />
</div>

<style>
    :global(.block-content h1) {
        margin-top: 2rem;
        margin-bottom: 3rem;
    }
    :global(.block-content h2) {
        margin: 3rem 0 1.25rem;
    }
</style>