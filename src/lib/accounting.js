import { durationInDays, roundToDecimalPlaces } from "./utils"
export const taxRate = 0.078

export function getCosts(dates, car, extras = []) {
    const costs = [
        ['rental', (car) ? roundToDecimalPlaces(car.dailyRate * durationInDays(dates.pickup, dates.dropoff), 2) : 0],
        ...Object.values(extras).filter(x => x).map(extra => (['extra - ' + extra.title, roundToDecimalPlaces(extra.fullPrice, 2)])),
    ]

    console.log({ costs })
    
    costs.push(['tax', roundToDecimalPlaces(costs.reduce((acc, curr) => acc + curr[1], 0) * taxRate, 2)])
    costs.push(['service fee', 3.00])

    return costs
}