<script>
import { browser } from "$app/env";

    import Icon from "./Icon.svelte";

    export let isOpen = false
    $: if (browser) document.body.classList.toggle('noscroll', isOpen);
    
    function handleEscape(e) {
        if (e.key === 'Escape') {
            isOpen = false
        }
    }
</script>

<svelte:window on:keydown={handleEscape} />
<div class={(isOpen ? "open" : "")}>
    <div class="modal-bg" on:click={() => (isOpen = false)}></div>
    <div class={"modal"}>
        <div class="close-row">
            <button class="close" on:click={() => (isOpen = false)}>
                <Icon type="x" width="12" />
            </button>
        </div>
        <slot />
    </div>
</div>

<style>
    .modal {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        transform-style: preserve-3d;
        transform: translate3d(-50%, -50%, 5rem);
        min-width: 40ch;
        max-width: 100%;
        padding: 1.25rem;
        border-radius: 3px;
        background: var(--bg-light);
        box-shadow: 0px 2px 2px rgba(11, 133, 201, 0.2), 0px 4px 8px rgba(11, 133, 201, 0.12);
        z-index: 99;
    }
    
    .modal-bg {
        display: none;
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(243, 251, 255, 0.9);
    }

    .open .modal,
    .open .modal-bg {
        display: block;
    }

    .close {
        display: grid;
        width: fit-content;
        place-items: center;
        border: 0;
        padding: .4rem;
        border-radius: 3px;
        margin: 0;
        margin-left: auto;
        background: hsl(190deg, 5%, 97%);
        color: inherit;
    }

    .close:hover,
    .close:focus {
        background: hsl(190deg, 16%, 94%);
    }
</style>