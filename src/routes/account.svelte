<script context="module">
    import { getCustomerById } from '$lib/sanity'
    let customer = {}

    export async function load({ session }) {
        const user = session?.user
        console.log({ session })
        if (!user) {
            return {
                // redirect: '/',
                status: 200,
            }
        } else {
            customer = await getCustomerById(user.sub)
        }
    }   
</script>

<h1>User Account for {customer.name}</h1>
<pre>{ JSON.stringify(customer, null, 2) }</pre>