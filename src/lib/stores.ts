import { browser } from '$app/env';
import { writable } from 'svelte/store';
import { prepTimeString } from './sanity';
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

export const globalSettingsInitialValue = fromLocalStorage('globalSettings', {
	companyName: '330 Cars',
	companyPhone: '330-858-6940',
	companyAddress: {
		street: '1 Super duper Way',
		street_2: 'Apt 4',
		city: 'Akron',
		state: 'OH',
		zipCode: '55555',
	}
})
export const globalSettings = writable(globalSettingsInitialValue)
toLocalStorage(globalSettings, 'globalSettings')


// TODO: Implement a check on localStorage date values against this
const isAfterNow = storedValue => new Date(storedValue).getTime() > new Date().getTime()

// Trip pickup, saved as a Date.
// Initial value is used in the individual car page to validate availability on load,
// Because Svelte stores are not available within that context.
export const pickupInitialValue = fromLocalStorage('pickup', offsetNowHours(1.5))
export const pickup = writable(prepTimeString(pickupInitialValue))
toLocalStorage(pickup, 'pickup')

// Trip dropoff, saved as a Date.
export const dropoffInitialValue = fromLocalStorage('dropoff', offsetNowHours(25.5))
export const dropoff = writable(prepTimeString(dropoffInitialValue))
toLocalStorage(dropoff, 'dropoff')

// Trip extra service packages. Saved as an object with keys matching each selected Extra's Sanity ID.
// If user selects and deselects an Extra, this object will contain keys with `false` values that need to be filtered out.
export const tripExtras = writable(fromLocalStorage('tripExtras', {}, ))
toLocalStorage(tripExtras, 'tripExtras')

// Trip ID. The ID of the user's most recent reserved trip.
export const tripId = writable(fromLocalStorage('tripId', ''))
toLocalStorage(tripId, 'tripId')

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

// Simple agnostic casting to string for localStorage interface above
function toString(value) {
	if (typeof value === "string") { return value }
	else if (typeof value === "object") { return JSON.stringify(value) }
	else { return value.toString() }
}

// Simple agnostic casting from string for localStorage interface above
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