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
        padding: 12px;

        font-size: 1.2rem;
        background: linear-gradient(180deg, #F9FDFF 0%, #E2F5FF 100%);
        border: 1px solid #75C5FF;
        border-radius: 8px;
    }
</style>