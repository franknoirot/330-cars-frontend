<script lang="ts">
    import type {BlockProps} from '@portabletext/svelte';
    import BlockContent from '$lib/components/BlockContent/index.svelte';
    import AddressInfo from '$lib/components/AddressInfo.svelte';
    import type { PortableTextBlocks } from '@portabletext/svelte/ptTypes';
    import type { SanityImageAssetDocument } from '@sanity/client';
import { urlFor } from '$lib/sanity';

    
    type ITwoColumnSectionBlock = {
        images: Array<SanityImageAssetDocument>,
        content: PortableTextBlocks,
        imageOnRight: boolean,
    }

    // Property custom blocks receive from @portabletext/svelte when redered
    export let portableText: BlockProps<ITwoColumnSectionBlock>
    const {
        block: {
            images,
            content,
            imageOnRight,
        }
    } = portableText
</script>

<section>
    <div class={"images" + (imageOnRight ? ' on-right' : '')}>
        {#each images as image, i (i)}
        <img src={urlFor(image).maxWidth(720).toString()} alt={image.altText} />
        {/each}
    </div>
    <div class="serif-h2">
        <BlockContent blocks={content} />
    </div>
</section>

<style>
    :global(.serif-h2 .block-content h2) {
        font-family: var(--serif);
        font-size: 3rem;
        font-weight: 600;
        margin: 0;
        margin-bottom: 1rem;
    }

	section {
		display: grid;
        grid-template-columns: 1fr 1fr;
		column-gap: 10%;
		align-items: center;
        margin: 4rem 0;
	}

    .on-right {
        order: 2;
    }

    .images {
        isolation: isolate;
        position: relative;
        padding: 1.75rem;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
    }

    .images::before {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50%;
        background: linear-gradient(90deg, rgba(213, 235, 244, 0) 0%, #D5EBF4 57.29%), #E2F5FF;
        border-radius: 8px;
    }

    .on-right::before {
        top: 50%;
        bottom: 0;
    }

    img {
        max-width: 100%;
        object-fit: contain;
        border-radius: 3px;
        box-shadow: 0px 2px 2px rgba(11, 133, 201, 0.2), 0px 4px 8px rgba(11, 133, 201, 0.12);
        grid-row: 1 / 2;
    }

    img:first-of-type {
        grid-column: 1 / -2;
    }
    
    img:last-of-type {
        isolation: isolate;
        grid-column: 2 / -1;
        z-index: -1;
    }

    .on-right img:first-of-type {
        grid-column: 2 / -1;
    }

    .on-right img:last-of-type {
        grid-column: 1 / -2;
    }

    .images img:only-of-type,
    .images.on-right img:only-of-type {
        grid-column: start / end;
    }

    /* img:not(:first-of-type) {
        display: none;
    } */

    @media (max-width: 768px) {
        :global(.serif-h2 .block-content h2) {
            margin-top: 2rem;
            font-size: 2.25rem;
        }

        section {
            grid-template-columns: 1fr;
        }

        .images::before {
            top: 50%;
            bottom: 0;
        }

        .on-right {
            order: -1;
        }

    }
</style>