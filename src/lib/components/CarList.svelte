<script>
    import { fly, fade } from 'svelte/transition'
    import { urlFor } from '$lib/sanity'
    export let cars = []
    export let columns = 3
    export let pickup, dropoff
</script>

{#if cars.length}
<div class="car-list" style={`--columns: repeat(${columns}, 1fr);`}>
    {#each cars as car, i ('car-'+i)}
    <a class="car-item" href={'/cars/' + car._id + (pickup && dropoff ? `?pickup=${pickup}&dropoff=${dropoff}` : '')}
        in:fly="{{ y: 20, duration: 200, delay: 50 * i }}" out:fade="{{ duration: 100 }}">
        <img src={urlFor(car.image).width(400)} alt={car.year +' '+ car.make +' '+ car.model} />
        <h2>{car.year} {car.make} {car.model}</h2>
    </a>
    {/each}
</div>
{/if}

<style>
    .car-list {
        display: grid;
        grid-template-columns: var(--columns);
        row-gap: 60px;
        column-gap: 48px;
    }

    .car-item {
        text-decoration: none;
        color: inherit;
        border-radius: 4px;
        padding: 1rem;
        transition: all .14s ease-out;
    }

    .car-item:hover {
        background-color: hsl(190deg, 60%, 97%);
    }

    .car-item:focus {
        outline: solid 1px cornflowerblue;
    }
    
    .car-item h2 {
        font-weight: normal;
        font-size: 1.5rem;
        font-weight: 500;
        margin: 15px 0;
    }

    .car-item img {
        max-width: 100%;
        height: 10vw;
        object-fit: contain;
        mix-blend-mode: darken;
    }
</style>