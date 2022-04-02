<script context="module">
    import { getCustomerById } from '$lib/sanity'
    let customer = {}

    export async function load({ session }) {
        const user = session?.user
        if (!user.authenticated) {
            return {
                redirect: '/',
                status: 301,
            }
        } else {
            customer = await getCustomerById(user.sub)
            return {
                props: {
                    customer
                }
            }
        }
    }   
</script>
<script>
    export let customer = {}
</script>

<h1>User Account for {customer.name}</h1>
<pre>{ JSON.stringify(customer, null, 2) }</pre>