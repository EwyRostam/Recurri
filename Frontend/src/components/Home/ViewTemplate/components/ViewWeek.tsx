import { Week } from "../../CreateTemplate/CreateTemplate"
import ViewEvent from "./ViewEvent"

type Props = {
    weeks: Week[]
}

function ViewWeek({weeks}:Props) {
  return (
    <section className="flex items-center flex-col gap-4">
    {weeks.map((week, index) => {
        return(
            <table className="table table-sm w-11/12" key={"week_"+index}>
            <thead>
                <tr>
                    <th>Week</th>
                    <th>{week.number}</th>
                </tr>
                <tr>
                    <th className="w-1/5">Summary</th>
                    <th className="w-1/5">Description</th>
                    <th className="w-1/5">Day</th>
                    <th className="w-1/5">Start</th>
                    <th className="w-1/5">End</th>
                </tr>
            </thead>
            <tbody>
                {week.events.map((event,eventIndex)=> <ViewEvent key={"Week_"+index+"_Event_"+eventIndex} event={event}/>)}
            </tbody>
        </table>
        )
    } )}
    </section>
   
  )
}

export default ViewWeek