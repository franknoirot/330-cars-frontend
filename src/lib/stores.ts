import { writable } from 'svelte/store';

export interface INotification {
	id: string;
	message: string;
	type: string;
	duration?: number;
}

type NotificationsById = Map<string, INotification>;

export const notifications = writable({} as NotificationsById);
