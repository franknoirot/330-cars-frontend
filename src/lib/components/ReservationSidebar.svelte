<script>
    import { getCosts, taxRate } from '$lib/accounting';
    import { urlFor } from '$lib/sanity';
    import { roundToDecimalPlaces } from '$lib/utils';
    export let car, pickup, dropoff, tripExtras, costs, totalPrice
    $: carTitle = car && `${car.year} ${car.make} ${car.model}`;

    const extrasSubtotal = roundToDecimalPlaces(costs.filter(lineItem => lineItem[0].includes('extra')).reduce((acc, curr) => acc + curr[1], 0), 2)

    function formatDate(dateString) {
		function normalizeHour(hour) {
			if (hour === 0) {
				return [12, 'AM']
			} else if (hour < 12) {
				return [hour, 'AM']
			} else {
				return [hour - 12, 'PM']
			}
		}
		const d = new Date(dateString)
		const [normalizedHour, periodOfDay] = normalizeHour(d.getHours())

		return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}, ${normalizedHour}:${d.getMinutes().toString().padStart(2, '0')} ${periodOfDay}`
	}
</script>

<section class="sidebar">
    <aside>
        {#if pickup && dropoff}
        <div>
            <div class="heading-row first">
                <h2>Reservation dates</h2>
                <a href={`/cars/${car._id}`} class="capitalized-label">Modify</a>
            </div>
            <div class="basic-row">
                <span>Pick up</span>
                <span>{ formatDate($pickup) }</span>
            </div>
            <div class="basic-row">
                <span>Drop off</span>
                <span>{ formatDate($dropoff) }</span>
            </div>
        </div>
        {/if}
        {#if car}
        <div>
            <div class="heading-row">
                <h2>Car details</h2>
                <a href="/" class="capitalized-label">Modify</a>
            </div>
            <div class="car-row">
                <img src={urlFor(car.images[0]).width(64)} alt={car.images[0].altText} />
                <span>{ carTitle }</span>
                <span>${ car.dailyRate } / day</span>
            </div>
        </div>
        {/if}
        {#if tripExtras}
        <div>
            <div class="heading-row">
                <h2>Protection & extras</h2>
                <a href={`/cars/${car._id}/reserve`} class="capitalized-label">Modify</a>
            </div>
            {#each Object.values(tripExtras).filter(isNotFalsey => isNotFalsey) as extra, i (extra._id)}
            <div class="basic-row">
                <span>{ extra.title }</span>
                <span>${ extra.fullPrice }</span>
            </div>
            {/each}
        </div>
        {/if}
        {#if pickup && dropoff && car && tripExtras}
        <div>
            <div class="heading-row">
                <h2>Total cost</h2>
            </div>
            <div>
                <div class="basic-row">
                    <span>Vehicle rental</span>
                    <span>{ costs.find(lineItem => lineItem[0] === 'rental')[1].toFixed(2) }</span>
                </div>
                <div class="basic-row">
                    <span>Protection & extras</span>
                    <span>{ extrasSubtotal.toFixed(2) }</span>
                </div>
                <div class="basic-row">
                    <span>Tax ({ taxRate * 100 }%)</span>
                    <span>{ costs.find(lineItem => lineItem[0] === 'tax')[1].toFixed(2) }</span>
                </div>
                <div class="basic-row">
                    <span>Service Fee</span>
                    <span>{ costs.find(lineItem => lineItem[0] === 'service fee')[1].toFixed(2) }</span>
                </div>
                <hr>
                <div class="basic-row">
                    <strong>Total</strong>
                    <span>${ totalPrice.toFixed(2) }</span>
                </div>
            </div>
        </div>
        {/if}
    </aside>
</section>

<style>
    .sidebar {
		position: relative;
	}
	
    .sidebar aside {
		position: sticky;
		top: 32px;
	}

    .heading-row {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		margin: 3rem 0 1.5rem;
	}

	.heading-row.first {
		margin-top: 1rem;
	}

    .heading-row h2 {
		margin: 0;
	}

	aside .capitalized-label {
		font-family: var(--sans-serif);
		color: #0B85C9;
		text-decoration: none;
	}

	aside .capitalized-label:hover {
		color: #005d8f;
	}

	.basic-row {
		display: grid;
		grid-template-columns: 1fr auto;
		margin: 1rem 0;
	}

	.basic-row > span:last-of-type {
		text-align: right;
	}

	.car-row {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 1.25rem;
	}
</style>