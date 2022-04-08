<script>
    import Icon from "./Icon.svelte"
    export let phoneNumber = "330-858-6940"
</script>

<section>
    <div>
        <slot />
    </div>
    <a href={ 'tel:' + phoneNumber }>
        <Icon type="phone" width="28" />
        { phoneNumber }
    </a>
</section>

<style>
    section {
        background-color: #EFFAFE;
        border-radius: 4px;
        display: grid;
        grid-template-columns: 3fr 2fr;
        place-items: center;
        gap: 60px;
        margin-top: 4rem;
    }

    div, a {
        box-sizing: border-box;
        padding: 24px 30px;
    }

    h2, p, a {
        color: #217193;
    }

    h2 {
        margin: 0 0 1rem;
        font-family: var(--serif);
        font-size: 2.5rem;
        font-weight: 600;
    }

    p {
        margin: 0;
    }

    a {
        display: flex;
        gap: .5rem;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 2rem;
        width: 100%;
        height: 100%;
        border-radius: 0 4px 4px 0;
        background:linear-gradient(180deg, rgba(213, 235, 244, 0) 0%, #D5EBF4 100%);
    }
</style>