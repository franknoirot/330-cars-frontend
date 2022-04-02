<script>
    export let vehicleClassFilter = "All Classes"
    export let vehicleClassesWithCounts = {}
</script>

<div>
    <h2>Car class</h2>
    <fieldset class="vc-fields">
        {#each Object.keys(vehicleClassesWithCounts) as vehicleClass, i (vehicleClass)}
        <label>
            <input name="vehicleClass" type="radio" value={vehicleClass} bind:group={vehicleClassFilter} />
            { vehicleClass } <span class="capitalized-label">{ vehicleClassesWithCounts[vehicleClass] }</span>
        </label>
        {/each}
    </fieldset>
</div>

<style>
    .vc-fields {
		box-sizing: border-box;
        padding: 0;
        border: none;
	}

	.vc-fields > label {
		display: block;
        text-transform: capitalize;
		margin: 1rem 0;
        font-size: 1.375rem;
        letter-spacing: -0.015rem;
	}

    .capitalized-label {
        margin-inline-start: 1rem;
    }

	.vc-fields input {
		accent-color: #48e;
	}

    @media (max-width: 920px) {
        .vc-fields {
			display: flex;
			gap: 1rem;
			flex-wrap: wrap;
			padding: 0.5rem 1rem;
			margin: 1rem;
		}

		.vc-fields legend {
			padding-inline-start: 1rem;
		}

		.vc-fields label {
			flex: 40%;
			margin: 0.25rem;
		}
    }
</style>