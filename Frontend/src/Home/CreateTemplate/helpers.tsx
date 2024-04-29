import { startOfDay, addDays, addHours, addMinutes } from "date-fns";
import { Week } from "./CreateTemplate";
import { GoogleEvent } from "./WeekTable/Event/CalendarEvent";

export function converToDate(date:Date, weekNumber :number, eventTime:string, dayNumber:number ){

    date = startOfDay(date)
    const daysToAdd = (weekNumber-1) * 7 + dayNumber
    date = addDays(date, daysToAdd)
    const [hoursString, minutesString] = eventTime.split(":");
    const hours = parseInt(hoursString, 10);
    const minutes = parseInt(minutesString, 10);
    date = addHours(date, hours +2)
    date = addMinutes(date, minutes)

    return date
}


export const convertToGoogle = (weeks:Week[], templateStart:Date ) => {
    const googleEvents: GoogleEvent[] = [];

    weeks.forEach((week) => {
        week.events.forEach((event) => {
            const startDate = converToDate(templateStart, week.number, event.startTime, event.day)
            const endDate = converToDate(templateStart, week.number, event.endTime, event.day)

            const googleEvent: GoogleEvent = {
                summary: event.name,
                location: event.description,
                start: {
                    dateTime: startDate.toISOString(),
                    timeZone: "Europe/Stockholm"
                },
                end: {
                    dateTime: endDate.toISOString(),
                    timeZone: "Europe/Stockholm"
                },
                recurrence: [event.recurrence],
                extendedProperties: {
                    shared: {
                        template: "sprint"
                    }
                }
            };

            googleEvents.push(googleEvent);
        });
    });

}