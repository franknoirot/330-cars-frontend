<script context="module">
    export async function load() {
        // TODO: Create FAQ content type in Studio
        const faqs = [
            {
                question: "How soon before my reservation can I cancel?",
                answer: "You can cancel up to 2 hours before your scheduled pickup time.",
            },
            {
                question: "Can I take a car?",
                answer: "You may *buy* any rental car we have.",
            },
            {
                question: "What color are your cars?",
                answer: "What do you mean? They're all sorts of colors, I mean cars come in different colors—what are you talking about?",
            },
        ]

        return {
            props: { faqs },
        }
    }
</script>

<script>
    export let faqs = []
</script>

<h1>Help & Rental FAQs</h1>
<p>
    We know rentals can be tricky to trust. There is a lot of fine print in those little contracts, 
    so as a small local business we want to make sure you're as comfortable as possible in choosing 
    us for your transportation needs.
</p>
<section>
    {#each faqs as faq, i ('faq-'+i)}
    <details>
        <summary>{ faq.question }</summary>
        { faq.answer }
    </details>
    {/each}
</section>

<style>
    details {
        margin: 2rem 0;
    }

    summary {
        margin-bottom: 1rem;    
    }
</style>