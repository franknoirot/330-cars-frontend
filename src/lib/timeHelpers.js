export function offsetNowHours(t) {
    const now = new Date()
    const p = new Date(now.getTime() + 3_600_000 * t - 60_000 * now.getTimezoneOffset())
    p.setSeconds(0, 0)
    return p.toISOString().slice(0, -1)
}