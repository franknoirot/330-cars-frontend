<button on:click {...$$restProps}>
	<slot />
</button>

<style>
	button {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px;

		background: #0b85c9;
		border: 1px solid rgba(226, 245, 255, 0.5);
		color: #e2f5ff;
		font-weight: 600;
		font-size: 1rem;
		border-radius: 4px;
	}

	button:hover:not(:disabled) {
		background: #035785;
	}

	button:disabled {
		background: #DAE2E6;
		color: var(--gray);
		cursor: not-allowed;
	}
</style>
