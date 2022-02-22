<footer>
	<nav>
		<div>
			<a href="/terms"><strong>Terms of Service</strong></a>
			<a href="/privacy"><strong>Privacy</strong></a>
		</div>
		<a
			class="designer-badge"
			href="https://franknoirot.co"
			target="_blank"
			rel="noopener noreferrer"
		>
			Site by <strong>Frank Noirot</strong>
		</a>
	</nav>
</footer>

<style>
	footer {
		background: hsl(190deg, 20%, 95%);
		padding: 1rem 32px;
		margin-top: 3rem;
		margin-bottom: 0;
		border-block-start: solid 1px hsl(190deg, 20%, 85%);
	}

	footer nav {
		max-width: 1260px;
		box-sizing: border-box;
		display: flex;
		row-gap: 1.5rem;
		justify-content: space-between;
		margin: 0 auto;
	}

	footer div {
		display: flex;
		gap: 20px;
	}

	footer a {
		text-decoration: none;
		font-size: 1rem;
		color: inherit;
	}

	.designer-badge {
		color: hsl(190deg, 20%, 40%);
	}

	@media (max-width: 768px) {
		footer nav {
			flex-direction: column;
			margin-block-end: 1rem;
		}
	}
</style>
