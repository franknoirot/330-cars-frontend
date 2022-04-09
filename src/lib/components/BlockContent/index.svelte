<script>
    import PortableText from '@portabletext/svelte'
    import FAQ from './FAQ.svelte'

    export let blocks = []

    const serializerOverrides = {
        types: {
            // embedded components and content types
            
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

<PortableText {blocks} serializers={serializerOverrides} />