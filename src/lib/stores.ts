import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { prepTimeString } from './carLoaders';
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

const isAfterNow = storedValue => new Date(storedValue).getTime() > new Date().getTime()

export const pickupInitialValue = fromLocalStorage('pickup', offsetNowHours(1.5))
export const pickup = writable(prepTimeString(pickupInitialValue))
toLocalStorage(pickup, 'pickup')

export const dropoffInitialValue = fromLocalStorage('dropoff', offsetNowHours(25.5))
export const dropoff = writable(prepTimeString(dropoffInitialValue))
toLocalStorage(dropoff, 'dropoff')

export const tripExtrasInitialValue = fromLocalStorage('tripExtras', {}, )
export const tripExtras = writable(tripExtrasInitialValue)
toLocalStorage(tripExtras, 'tripExtras')

// Get value from localStorage if in browser and the value is stored, otherwise fallback
function fromLocalStorage(storageKey: string, fallbackValue: any) {
	if (browser) {
		const storedValue = window.localStorage.getItem(storageKey)
		return (storedValue !== 'undefined' && storedValue !== null) ? fromString(storedValue, typeof fallbackValue) : fallbackValue
	} else {
		return fallbackValue
	}
}

// Subscribe a writable store to backup value to localStorage
function toLocalStorage(store, storageKey: string) {
	if (browser) {	
		store.subscribe(value => {
			let storageValue = toString(value)

			window.localStorage.setItem(storageKey, storageValue)
		})
	}
}

function toString(value) {
	if (typeof value === "string") { return value }
	else if (typeof value === "object") { return JSON.stringify(value) }
	else { return value.toString() }
}

function fromString(value, type) {
	switch (type) {
		case "string":
			return value
		case "object":
			return JSON.parse(value)
		case "date":
			return new Date(value)
		default:
			return value
	}
}