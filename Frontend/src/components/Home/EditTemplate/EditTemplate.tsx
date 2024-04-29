import { FormEvent, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Template, Week } from "../CreateTemplate/CreateTemplate";
import {CalendarEvent} from "../CreateTemplate/WeekTable/Event/CalendarEvent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTemplate, getTemplateById, saveCalendarTemplate } from "../../../api/TemplateApi";
import { convertToGoogle } from "../CreateTemplate/helpers";
import WeekTable from "../CreateTemplate/WeekTable/WeekTable";

function EditTemplate() {
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

    const location = useLocation();
    const { pathname } = location;
    const pathArray = pathname.split("/")
    
    
    const { data: template, isLoading, isError } = useQuery({
        queryKey: ['templates' , pathArray[pathArray.length - 1]],
        queryFn: () => getTemplateById(pathArray[pathArray.length - 1])
        
        
    });

    const mutation = useMutation({
        mutationFn: (template: Template) => {
          return editTemplate(template);
    
        },
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey:['templates']})
        }
      })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { name } = e.target as typeof e.target & {
            name: { value: string };
        };

        const template: Template = {
            userEmail: sessionStorage.getItem("email")!,
            name: name.value,
            weeks: weeks
        };
        console.log(template)
        mutation.mutate(template);

    }

    if (isLoading) {
        return (<p>Loading...</p>)
    }
    if (isError) return <p>An error occured</p>

    return (
        <section className="px-4">

            <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="name" className="input input-bordered w-full input-sm max-w-xs" value={template!.name} placeholder="Template name" />
                <button type="button" onClick={handleAddWeek} className="btn btn-sm max-w-48">+ Add Week</button>
                <WeekTable weeks={template!.weeks} handleAddEvent={handleAddEvent} setWeeks={setWeeks} CustomRef={CustomRef} />
                <input type="submit" className="btn btn-sm mt-4 max-w-48" value="Edit Template" />
                <button className="btn btn-sm max-w-48" onClick={() => convertToGoogle(weeks, new Date())}> Convert To google </button>
            </form>
        </section>
    )
}

export default EditTemplate