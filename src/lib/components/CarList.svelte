<script>
    import { fly, fade } from 'svelte/transition'
    import { urlFor } from '$lib/sanity'
    export let cars = []
</script>

{#if cars.length}
<div class="car-list">
    {#each cars as car, i ('car-'+i)}
    <a class="car-item" href={'/cars/' + car._id} in:fly="{{ y: 20, duration: 200, delay: 50 * i }}" out:fade="{{ duration: 100 }}">
        <img src={urlFor(car.image).width(200)} alt={car.year +' '+ car.make +' '+ car.model} />
        <h2>{car.year} {car.make} {car.model}</h2>
    </a>
    {/each}
</div>
{/if}

<style>
    .car-item {
        display: flex;
        padding: 1rem;
        margin: auto;
        margin-bottom: 2rem;
        align-items: center;
        gap: 2rem;
        max-width: 600px;
        box-shadow: var(--box-shadow-md);
        text-decoration: none;
        color: inherit;
        border-radius: 4px;
    }

    .car-item h2 {
        font-weight: normal;
    }
</style>