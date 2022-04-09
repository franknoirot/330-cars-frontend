<script lang="ts">
    import type {BlockProps} from '@portabletext/svelte'
    
    type FAQProps = {
        question: string,
        answer: string,
    }

    // Property custom blocks receive from @portabletext/svelte when redered
    export let portableText: BlockProps<FAQProps>
</script>

<details>
    <summary>{portableText.block.question}</summary>
    {portableText.block.answer}
</details>

<style>
	details {
		margin: 2rem 0;
	}

	summary {
		margin-bottom: 1rem;
	}
</style>