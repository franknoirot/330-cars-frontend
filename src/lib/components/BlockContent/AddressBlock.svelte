<script lang="ts">
    import type {BlockProps} from '@portabletext/svelte';
    import BlockContent from '$lib/components/BlockContent/index.svelte';
    import AddressInfo from '$lib/components/AddressInfo.svelte';
    import type { PortableTextBlocks } from '@portabletext/svelte/ptTypes';

    
    type IAddressBlock = {
        addressLabel: string,
        copy: PortableTextBlocks,
    }

    // Property custom blocks receive from @portabletext/svelte when redered
    export let portableText: BlockProps<IAddressBlock>
</script>

<section>
    <AddressInfo label={portableText.block.addressLabel} />
    <div>
        <BlockContent blocks={portableText.block.copy} />
    </div>
</section>

<style>
	section {
		display: grid;
        grid-template-columns: max-content auto;
		gap: 10%;
		align-items: center;
        margin-bottom: 4rem;
	}

    @media (max-width: 768px) {
        section {
            grid-template-columns: 1fr;
        }
    }
</style>