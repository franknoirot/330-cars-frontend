<script>
import CarList from "./CarList.svelte";

</script>
<button {...$$restProps}>
    <slot></slot>
</button>

<style>
    button {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;

        background: #E2F5FF;
        color: #155070;
        border: none;
        font-size: 1.2rem;
        border-radius: 4px;
    }

    button:hover {
        background: #ade4ff;
        color: #0c3a53;
    }
</style>