<script context="module">
    import { userStore } from '$app/stores'
    import { getCustomerById } from '$lib/sanity'
    let customer = {}

    /** @type {import('./[slug]').Load} */
    export async function load({ session }) {
        const user = userStore.get() || session
        console.log({ session })
        if (!user) {
            return {
                redirect: '/',
            }
        }

        customer = await getCustomerById(user.id)
    }   
</script>

<h1>User Account for {customer.name}</h1>
<pre>{ JSON.stringify(customer, null, 2) }</pre>