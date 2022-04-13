<script>
	import { urlFor } from '$lib/sanity';
	import Icon from './Icon.svelte';
	export let images = [];
	let currentIndex = 0;

	const decrement = () => {
		currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
	};
	const increment = () => {
		currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
	};
</script>

{#if images.length}
	<div class="grid-wrapper">
		<div class="main-image">
			<img src={urlFor(images[currentIndex]).width(720)} alt={images[currentIndex].altText} />
			{#if images.length > 1}
				<button class="back" on:click={decrement}>
					Previous
					<div class="icon"><Icon type="arrow" width="70" /></div>
				</button>
				<button class="forward" on:click={increment}>
					Next
					<div class="icon flip-x"><Icon type="arrow" width="70" /></div>
				</button>
			{/if}
		</div>
		{#if images.length > 1}
			<ul class="film-strip">
				{#each images as image, i ('image-' + i)}
					<li>
						<button
							class={'image-button' + (currentIndex == i ? ' current' : '')}
							on:click={() => {
								currentIndex = i;
							}}
						>
							<img src={urlFor(image).width(150)} alt={image.altText} />
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
{/if}

<style>
	.grid-wrapper {
		display: grid;
		grid-template-columns: 1fr 100px;
		gap: 1rem;
	}

	.main-image {
		position: relative;
		border-radius: 4px;
		border: solid 1px #e9f2fc;
	}

	.main-image img {
		width: 100%;
		height: 400px;
		object-fit: contain;
	}

	.main-image button {
		opacity: 0;
		transition: opacity 0.11s ease-out;
		position: absolute;
		background: transparent;
		font-weight: 600;
		width: 15%;
		top: 0;
		bottom: 0;
		border: 0;
		display: flex;
		padding: 1rem;
		flex-direction: column;
		justify-content: flex-end;
	}

	.main-image:focus-within button,
	.main-image:hover button {
		opacity: 1;
		background: linear-gradient(
			180deg,
			rgba(226, 245, 255, 0) 31.54%,
			rgba(226, 245, 255, 0.4) 100%
		);
	}

	.main-image button:focus,
	.main-image button:hover {
		background: linear-gradient(
			180deg,
			rgba(226, 245, 255, 0) 31.54%,
			rgba(226, 245, 255, 0.8) 100%
		);
	}

	.main-image .back {
		left: 0;
		border-radius: 4px 0 0 4px;
		align-items: flex-end;
	}

	.main-image .forward {
		right: 0;
		border-radius: 0 4px 4px 0;
		align-items: flex-start;
	}

	.icon {
		margin: 0.5rem 0 1rem;
	}

	.flip-x {
		transform: scaleX(-1);
	}

	.film-strip,
	.film-strip li {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.film-strip button {
		display: block;
		background: none;
		padding: 0;
		margin: 1rem 0;
		border: none;
		border-radius: 2px;
		width: 100%;
	}
	.film-strip button:first-of-type {
		margin-block-start: 0;
	}

	.film-strip button.current {
		outline: solid 2px cornflowerblue;
		outline-offset: 2px;
	}

	.film-strip img {
		display: block;
		width: 100%;
		height: 3rem;
		object-fit: cover;
	}

	@media (max-width: 768px) {
		.grid-wrapper {
			grid-template-columns: 1fr;
		}

		.film-strip {
			box-sizing: border-box;
			padding: 0.5rem;
			display: flex;
			gap: 1rem;
			overflow-x: auto;
		}

		.film-strip button {
			margin: 0;
		}

		.film-strip img {
			width: auto;
			height: 70px;
		}

		.main-image {
			max-width: 100%;
		}

		.main-image img {
			height: 280px;
			width: 100%;
			max-width: 100%;
			display: block;
		}
	}
</style>
