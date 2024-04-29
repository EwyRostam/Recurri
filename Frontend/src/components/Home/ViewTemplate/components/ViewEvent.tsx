
import { CalendarEvent } from "../../CreateTemplate/WeekTable/Event/CalendarEvent"

type Props = {
    event: CalendarEvent
}
function ViewEvent({ event }: Props) {
    return (
        <tr>
            <td className="w-1/5">{event.name}</td>
            <td className="w-1/5">{event.description}</td>
            <td className="w-1/5">{event.day}</td>
            <td className="w-1/5">{event.startTime}</td>
            <td className="w-1/5">{event.endTime}</td>
        </tr>
    )
}

export default ViewEvent