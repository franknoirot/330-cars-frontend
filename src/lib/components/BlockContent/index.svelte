<script>
    import PortableText from '@portabletext/svelte'

    export let blocks = []

    const serializerOverrides = {
        types: {
            // embedded components and content types
        },
        marks: {
            // marks like bold and italics
        },
        blockStyles: {
            // block-level styles like headings and paragraphs
        },
    }
</script>

<PortableText {blocks} {serializerOverrides} />