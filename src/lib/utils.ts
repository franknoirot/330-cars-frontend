export function roundToDecimalPlaces(number: number, decimalPlaces: number): number {
    return Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
}
/** One day in milliseconds */
export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
/** One day in milliseconds */
export const ONE_HOUR_IN_MS = 60 * 60 * 1000;
/** One day in milliseconds */
export const ONE_MIN_IN_MS = 60 * 1000;

// Takes a start and end datetime string with timezone and returns duration in rental days
export function durationInDays(start, end) { 
    return Math.ceil(
        (new Date((end.includes('Z')) ? end : end + 'Z').getTime() - new Date((start.includes('Z')) ? start : start + 'Z').getTime()) / ONE_DAY_IN_MS
    );
}