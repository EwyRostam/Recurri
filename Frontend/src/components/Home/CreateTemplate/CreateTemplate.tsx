import { FormEvent, useRef, useState } from "react";
import WeekTable from "./WeekTable/WeekTable"
import { CalendarEvent } from "./WeekTable/Event/CalendarEvent";
import { useNavigate } from "react-router-dom";
import { saveCalendarTemplate } from "../../../api/TemplateApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "../../../helpers/CookieHelpers";
import NavigateToLogin from "../NavigateToLogin";

export type Template = {
    id?: string;
    userEmail: string;
    name: string;
    weeks: Week[];
}

export type Week = {
    number: number,
    events: CalendarEvent[];
}

function CreateTemplate() {
    const navigate = useNavigate();
    const [weeks, setWeeks] = useState<Week[]>([{
        number: 1,
        events: [{
            name: "",
            description: "",
            day: 1,
            startTime: "",
            endTime: "",
            recurrence: ""
        }]
    }]);

    const CustomRef = useRef<HTMLDialogElement>(null)

    const handleAddWeek = () => {
        const newWeek = {
            number: 1, events: [{
                name: "",
                description: "",
                day: 0,
                startTime: "",
                endTime: "",
                recurrence: ""
            }
            ]
        };
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

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (template: Template) => {
            return saveCalendarTemplate(template);

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['templates'] })
        }
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { templateName } = e.target as typeof e.target & {
            templateName: { value: string };
        };

        const template: Template = {
            userEmail: getCookie("email")!,
            name: templateName.value,
            weeks: weeks
        };

        mutation.mutate(template);
        navigate("/home")
    }

    return (
            <section className="px-4">
                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
                    <input type="text" name="templateName" className="input input-bordered w-full input-sm max-w-xs" placeholder="Template name" />
                    <button type="button" onClick={handleAddWeek} className="btn btn-sm max-w-48 btn-primary">+ Add Week</button>
                    <div className="w-[320px] overflow-scroll sm:w-auto sm:overflow-auto">
                        <WeekTable weeks={weeks} handleAddEvent={handleAddEvent} setWeeks={setWeeks} CustomRef={CustomRef} />
                    </div>
                    <input type="submit" className="btn btn-sm mt-4 max-w-48 btn-success text-white" value="Create Template" />
                </form>
            </section>
    )
}

export default CreateTemplate