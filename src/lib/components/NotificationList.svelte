<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { notifications } from '$lib/stores';
	type AriaLiveType = 'off' | 'assertive' | 'polite';
	const defaultDuration = 4000;
	let tabHidden = false;
	let role = !tabHidden ? 'status' : 'none';
	let ariaLive = !tabHidden ? 'polite' : ('off' as AriaLiveType);

	$: notificationArray = Object.values($notifications);

	function notificationTimer(node, notification) {
		// runs when a notification is added
		window.setTimeout(() => {
			const tempNotifications = Object.assign({}, $notifications);
			delete tempNotifications[notification.id];
			$notifications = tempNotifications;
		}, notification.duration || defaultDuration);
	}
</script>

<!-- This is not available at the moment, but would make this implementation more complete
    See this Github issue: https://github.com/sveltejs/svelte/issues/3310
    <svelte:document on:visibilitychange={() => { tabHidden = document.hidden }} /> -->
<ul {role} aria-live={ariaLive} aria-relevant="additions">
	{#each notificationArray as notification, i (notification.id)}
		<li
			class={notification.type}
			style={`--duration: ${notification.duration || 4000}ms`}
			use:notificationTimer={notification}
			in:fly={{ y: 5, duration: 200 }}
			out:fade={{ duration: 100 }}
		>
			<span class="visually-hidden">Notification: </span>
			{@html notification.message}
			<svg class="timer" viewBox="0 0 10 10">
				<circle cx="5" cy="5" r="4" />
			</svg>
		</li>
	{/each}
</ul>

<style>
	ul {
		position: fixed;
		left: 50%;
		transform: translate(-50%);
		bottom: 3rem;
		margin: 0 auto;
		max-width: 600px;
		padding: 0;
	}

	li {
		display: flex;
		align-items: center;
		--primary: inherit; /* will inherit current text color by default */
		color: var(--primary);
		list-style: none;
		margin: 2ch auto;
		padding: 1ch 2ch;
		background: var(--bg-light);
		box-shadow: var(--box-shadow-md);
		border-radius: 3px;
		width: fit-content;
	}

	svg.timer {
		width: 1em;
		margin-inline-start: 2ch;
		fill: none;
	}

	svg.timer circle {
		stroke: var(--primary);
		fill: var(--primary);
		fill-opacity: 0.3;
		stroke-width: 2;
		stroke-opacity: 0.7;
		stroke-dasharray: calc(8 * 3.14); /* PI*R*2 with a 4-unit R */
		stroke-dashoffset: 0;
		animation: countdown var(--duration) linear forwards;
	}

	@keyframes countdown {
		to {
			stroke-dashoffset: 24;
			fill-opacity: 0;
			animation-play-state: paused;
		}
	}

	li.info {
		--primary: green;
	}

	li.warning {
		--primary: goldenrod;
	}

	li.error {
		--primary: firebrick;
	}
</style>
