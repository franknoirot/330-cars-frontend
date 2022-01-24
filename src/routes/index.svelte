<script context="module">
    import { client, urlFor } from '$lib/sanity'

    export async function load({ params }) {
        const query = `*[_type == "car"] {
            _id,
            make,
            model,
            year,
            "image": images[0].asset,
        }`
        
        const cars = await client.fetch(query)
        
        return {
            props: { cars }
        }
    }
</script>

<script>
    export let cars
</script>

<h1 style="text-align: center">330 Cars</h1>
<div class="car-list">
    {#each cars as car, i ('car-'+i)}
    <a class="car-item" href={'/cars/' + car._id}>
        <img src={urlFor(car.image).width(200)} alt={car.year +' '+ car.make +' '+ car.model} />
        <h2>{car.year} {car.make} {car.model}</h2>
    </a>
    {/each}
</div>

<style>
    .car-item {
        display: flex;
        padding: 1rem;
        margin: auto;
        margin-bottom: 2rem;
        align-items: center;
        gap: 2rem;
        max-width: 600px;
        box-shadow: 0 .2em .5em hsla(190deg, 10%, 5%, .25), 0 .5em .9em hsla(190deg, 5%, 5%, 8%);
        text-decoration: none;
        color: inherit;
        border-radius: 4px;
    }

    .car-item h2 {
        font-weight: normal;
    }
</style>