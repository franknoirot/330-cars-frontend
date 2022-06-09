<script>
    import { globalSettings } from "$lib/stores";
    import Icon from "./Icon.svelte"
    export let phoneNumber = $globalSettings.companyPhone || "330-858-6940"
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
    }

    div, a {
        box-sizing: border-box;
        padding: 24px 30px;
    }

    a {
        color: #217193;
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

    @media (prefers-color-scheme: dark) {
        section {
            background-color: #41484b;
        }

        a {
            color: #62ccf9;
            background: linear-gradient(180deg, rgba(36, 43, 46, 0) 0%, #182930 100%);
        }
    }

    @media (max-width: 768px) {
        section {
            display: flex;
            gap: 0;
            flex-direction: column;
        }

        div {
            padding-bottom: 0;
        }

        a {
            padding: 2rem 30px; 
        }
    }
</style>