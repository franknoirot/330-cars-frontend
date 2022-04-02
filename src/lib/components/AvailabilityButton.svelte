<script>
    import { goto } from '$app/navigation';
    import Button from '$lib/components/Button.svelte'
	import Icon from './Icon.svelte';
	export let isAvailable;

    let buttonClass;
	$: switch (isAvailable) {
		case undefined:
			buttonClass = '';
			break;
		case false:
			buttonClass = 'unavailable';
			break;
		case true:
			buttonClass = 'available';
	}
</script>

<Button
type="submit"
style="margin-top: 0; width: 100%;"
class={buttonClass}
disabled={isAvailable === false}
>
    {#if isAvailable === undefined}
        <Icon type="search" width="18" stroke="#155070" />
        {!numResults ? 'Search available cars' : numResults + ' cars available'}
    {:else if isAvailable}
        <Icon type="check" width="18" /> Book Now
    {:else if !isAvailable}
        <Icon type="x" width="16" /> Choose another time
    {/if}
</Button>