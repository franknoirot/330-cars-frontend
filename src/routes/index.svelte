<script context="module">
    import { client } from '$lib/sanity'

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
    import CarList from '$lib/components/CarList.svelte'
    import BookingForm from '$lib/components/BookingForm.svelte'
    export let cars
</script>

<h1 style="text-align: center">330 Cars</h1>
<BookingForm style="margin: 1.5rem auto;" />
<CarList {cars} />