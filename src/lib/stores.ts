import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { offsetNowHours } from './timeHelpers';

export interface INotification {
	id: string;
	message: string;
	type: string;
	duration?: number;
}

type NotificationsById = Map<string, INotification>;

export const notifications = writable({} as NotificationsById);

export const userStore = writable(null);

export const pickupInitialValue = fromLocalStorage('pickup', offsetNowHours(1.5))
export const pickup = writable(pickupInitialValue)
toLocalStorage(pickup, 'pickup')

export const dropoffInitialValue = fromLocalStorage('dropoff', offsetNowHours(25.5))
export const dropoff = writable(dropoffInitialValue)
toLocalStorage(dropoff, 'dropoff')

// Get value from localStorage if in browser and the value is stored, otherwise fallback
function fromLocalStorage(storageKey: string, fallbackValue: any) {
	if (browser) {
		const storedValue = window.localStorage.getItem(storageKey)
		return (storedValue !== 'undefined' && storedValue !== null) ? storedValue : fallbackValue
	} else {
		return fallbackValue
	}
}

// Subscribe a writable store to backup value to localStorage
function toLocalStorage(store, storageKey: string) {
	if (browser) {	
		store.subscribe(value => window.localStorage.setItem(storageKey, value))
	}
}