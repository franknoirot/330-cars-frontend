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
