import { ONE_DAY_IN_MS, ONE_HOUR_IN_MS, ONE_MIN_IN_MS } from "./utils";

/**
 * Utility to get Datetime given a number of hours to offset from now.
 * Offset can be decimal, and can be negative
 * @param {number} hoursOffset
 * @returns {Date} offsetTime
 */
export function offsetNowHours(hoursOffset) {
	const now = new Date();
	const p = new Date(now.getTime() + 3_600_000 * hoursOffset - 60_000 * now.getTimezoneOffset());
	p.setSeconds(0, 0);
	return p.toISOString().slice(0, -1);
}

/**
 * Business time is more dropdown-friendly, and easier to limit
 * both the granularity of the time values and the available options.
 */ 
type BusinessTime = {
	hour: string,
	minutes: string,
	period: "AM"|"PM",
}

/**
 * Converts from a custom Sanity type Business Time to browser Date
 * @param {BusinessTime} businessTimeObj 
 * @returns {Date}
 */
export function fromBusinessTime(businessTimeObj: BusinessTime) : Date {
	const newDate = new Date()

	newDate.setHours(parseInt(businessTimeObj.hour) + ((businessTimeObj.period == "PM") ? 12 : 0))
	newDate.setMinutes(parseInt(businessTimeObj.minutes))

	return newDate
}


export function formatDate(dateString) {
	function normalizeHour(hour) {
		if (hour === 0) {
			return [12, 'AM']
		} else if (hour < 12) {
			return [hour, 'AM']
		} else {
			return [(hour === 12) ? hour : hour - 12, 'PM']
		}
	}
	const d = new Date(dateString)
	const [normalizedHour, periodOfDay] = normalizeHour(d.getHours())

	return `${(d.getMonth() + 1).toString().padStart(2, '0')}/${d.getDate().toString().padStart(2, '0')}/${d.getFullYear().toString().slice(-2)}, ${normalizedHour}:${d.getMinutes().toString().padStart(2, '0')} ${periodOfDay}`
}

export function withTimezoneOffset(date) {
	return new Date(date.getTime() + 60_000 * date.getTimezoneOffset())
}


type TimeOffsetParams = {
	days?: number,
	hours?: number,
	minutes?: number,
}

const offsetsInitial = {
	days: 0,
	hours: 0,
	minutes: 0,
}

export function offsetTime(date: Date, offsets = offsetsInitial as TimeOffsetParams) {
	const mergedOffsets = Object.assign(offsetsInitial, offsets)

	return new Date(Math.floor(date.getTime()
		+ mergedOffsets.days * ONE_DAY_IN_MS
		+ mergedOffsets.hours * ONE_HOUR_IN_MS
		+ mergedOffsets.minutes * ONE_MIN_IN_MS
	))
}