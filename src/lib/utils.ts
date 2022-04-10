export function roundToDecimalPlaces(number: number, decimalPlaces: number): number {
    return Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces)
}

export const ONE_DAY_MS = 24 * 60 * 60 * 1000; // 1 day in 
// Takes a start and end datetime string with timezone and returns duration in rental days
export function durationInDays(start, end) { 
    return Math.ceil(
        (new Date((end.includes('Z')) ? end : end + 'Z').getTime() - new Date((start.includes('Z')) ? start : start + 'Z').getTime()) / ONE_DAY_MS
    );
}