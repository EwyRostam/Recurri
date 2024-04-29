import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import WeekTable from "./WeekTable/WeekTable"
import { CalendarEvent } from "./WeekTable/Event/CalendarEvent";
import { convertToGoogle } from "./helpers";
import { useNavigate } from "react-router-dom";

export type Template = {
    templateName: string
    weeks : Week[]
}

export type Week = {
    number: number,
    events: CalendarEvent[];
}

type Props = {
    setTemplates: Dispatch<SetStateAction<Template[]>>
}

function CreateTemplate({setTemplates} : Props) {
    const navigate = useNavigate();
    const [weeks, setWeeks] = useState<Week[]>([{
        number: 1,
        events : [{
            name: "",
            description: "",
            day: 1,
            startTime : "",
            endTime : "",
            recurrence : ""
        }]
    }]);

    const CustomRef = useRef<HTMLDialogElement>(null)

    const handleAddWeek = () => {
        const newWeek = { number: 1, events: [{
        name: "",
        description: "",
        day: 0,
        startTime: "",
        endTime: "",
        recurrence: ""}
    ] };
        setWeeks((prevWeeks) => [...prevWeeks, newWeek]);
    };

    const handleAddEvent = (weekIndex: number) => {
        const newEvent: CalendarEvent = {
            name: "",
            description: "",
            day: 0,
            startTime: "",
            endTime: "",
            recurrence: ""
        };
        const updatedWeeks = [...weeks];
        updatedWeeks[weekIndex].events.push(newEvent);
        setWeeks(() => updatedWeeks);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { templateName } = e.target as typeof e.target & {
            templateName: { value: string };
        };
    
        const template: Template = {
            templateName: templateName.value,
            weeks : weeks
        };

        setTemplates(oldTemplates => [...oldTemplates, template])
        navigate("/home")
    }

    
    return (
        <section className="px-4">

            <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="templateName" className="input input-bordered w-full input-sm max-w-xs" placeholder="Template name"/>
                <button type="button" onClick={handleAddWeek} className="btn btn-sm max-w-48">+ Add Week</button>
                <WeekTable weeks={weeks} handleAddEvent={handleAddEvent} setWeeks={setWeeks} CustomRef={CustomRef} />
                <input type="submit" className="btn btn-sm mt-4 max-w-48" value="Create Template" />
                <button className="btn btn-sm max-w-48" onClick={()=>convertToGoogle(weeks, new Date())}> Convert To google </button>
            </form>

            <dialog id="my_modal_3" className="modal z-20" ref={CustomRef}>
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <form action="" className="form-control items-center">

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 1</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 2</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 3</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 4</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 5</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 6</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <label className="label cursor-pointer justify-start gap-6">
                            <span className="label-text">Day 7</span>
                            <input type="checkbox" value="1" className="checkbox" />
                        </label>

                        <input type="text" />
                        <input type="submit" className="btn btn-sm" value="Apply" />
                    </form>
                </div>
            </dialog>
        </section>
    )
}

export default CreateTemplate