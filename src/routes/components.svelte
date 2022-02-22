<script lang="ts">
	import { notifications, INotification } from '$lib/stores';

	function notify(notification) {
		const now = new Date();
		let id = now.getTime().toString();

		$notifications = {
			...$notifications,
			[id]: {
				id,
				...notification
			} as INotification
		};
	}

	const infoNotification = {
		type: 'info',
		message: 'Check out this message!',
		duration: 3000
	};
	const warningNotification = {
		type: 'warning',
		message: 'Look out, something dangerous!',
		duration: 4000
	};
	const errorNotification = {
		type: 'error',
		message: 'Something went wrong, what did you do??',
		duration: 5000
	};
</script>

<button on:click={() => notify(infoNotification)}>Add an Info Notification</button>
<button on:click={() => notify(warningNotification)}>Add a Warning Notification</button>
<button on:click={() => notify(errorNotification)}>Add an Error Notification</button>
