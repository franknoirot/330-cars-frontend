<script context="module">
    import { client, urlFor } from '$lib/sanity'

    export async function load({ params }) {
        const query = `*[_type == "car" && _id == $id][0] {
            make,
            model,
            year,
            "image": images[0].asset,
            vinNumber,
            mileage,
            dailyRate,
            status,
        }`
        
        const car = await client.fetch(query, { id: params.id })
        
        return {
            props: { car }
        }
    }
</script>

<script>
    export let car

    $: ({ make, model, year, image, ...otherData} = car)
    $: carTitle = `${year} ${make} ${model}`
</script>

<svelte:head>
	<title>Cars</title>
</svelte:head>

<h1>{carTitle}</h1>
<img src={urlFor(image).width(600)} alt={carTitle} />
<pre>{JSON.stringify(otherData, null, 2)}</pre>