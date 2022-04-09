import { browser } from "$app/env";

function makeIcsDate(date) {
    return date.toISOString()
        .replace('000Z', 'Z')
        .replace(/[-:.]/g, '')
}

export function makeIcsFile(id, dates, summary, description) {
    const text = (
    `BEGIN:VCALENDAR
    CALSCALE:GREGORIAN
    METHOD:PUBLISH
    PRODID:-//330 Cars//EN
    VERSION:2.0
    BEGIN:VEVENT
    UID:${ id }
    DTSTAMP:${ makeIcsDate(dates.start) }
    DTSTART:${ makeIcsDate(dates.start) }
    DTEND:${ makeIcsDate(dates.end) }
    SUMMARY:${ summary }
    DESCRIPTION:${ description }
    END:VEVENT
    END:VCALENDAR`
    ).replace(/^\s+/gm, '')
  

    if (browser) {
        const file = new File([text], '330-cars-reservation.ics', { type: 'text/plain' })

        window.URL.revokeObjectURL(file)
        return window.URL.createObjectURL(file)
    } else {
        return ""
    }
}