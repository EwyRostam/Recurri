import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Template, Week } from "../CreateTemplate/CreateTemplate";
import { CalendarEvent } from "../CreateTemplate/WeekTable/Event/CalendarEvent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { editTemplate, getTemplateById } from "../../../api/TemplateApi";
import WeekTable from "../CreateTemplate/WeekTable/WeekTable";
import { getCookie } from "../../../helpers/CookieHelpers";
import LoadingMessage from "../../../helpers/LoadingMessage";
import ErrorMessage from "../../../helpers/ErrorMessage";
import NavigateToLogin from "../NavigateToLogin";

function EditTemplate() {
    const navigate = useNavigate();

    const [name, setName] = useState<string>("");
    const [weeks, setWeeks] = useState<Week[]>([]);

    const CustomRef = useRef<HTMLDialogElement>(null)

    const handleAddWeek = () => {
        const newWeek = {
            number: 0, events: [{
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
        queryKey: ['templates', pathArray[pathArray.length - 1]],
        queryFn: () => getTemplateById(pathArray[pathArray.length - 1])
    });

    useEffect(() => {
        if (template) {
            setName(template.name);
            setWeeks(template.weeks)
        }
    }, [])

    const mutation = useMutation({
        mutationFn: (template: Template) => {
            return editTemplate(template);

        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['templates'] })
            navigate("/home")
        },
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const template: Template = {
            userEmail: getCookie("email")!,
            name: name,
            weeks: weeks,
            id: pathArray[pathArray.length - 1]
        };
        mutation.mutate(template);
    }

    const handleChange = (e: SyntheticEvent) => {
        e.preventDefault();
        setName((e.target as HTMLInputElement).value);
    }

    return (
        getCookie("email") != null ?
            <div className="drawer lg:drawer-open">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <label htmlFor="my-drawer" className="btn drawer-button lg:hidden h-8 justify-start" >
                        <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                            <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                            <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round" />
                        </svg>
                    </label>

                    <div className="pl-4 text-sm breadcrumbs h-12">
                        <ul>
                            {pathArray.length > 2 && pathArray.slice(1).map((name, index) => {
                                const path = `/${pathArray.slice(1, index + 2).join('/')}`;
                                if (index == pathArray.length - 1) {
                                    return <li key={name + index}>{name}</li>
                                }
                                return <li key={name + index}><Link to={path}>{name}</Link></li>

                            })}

                        </ul>
                    </div>

                    {isLoading ?
                        <LoadingMessage />
                        :
                        isError ?
                            <ErrorMessage />
                            :
                            <section className="px-4">

                                <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <input type="text" name="name" className="input input-bordered w-full input-sm max-w-xs" value={name} onChange={handleChange} />
                                    <button type="button" onClick={handleAddWeek} className="btn btn-sm max-w-48">+ Add Week</button>
                                    <WeekTable weeks={weeks} handleAddEvent={handleAddEvent} setWeeks={setWeeks} CustomRef={CustomRef} />
                                    <input type="submit" className="btn btn-sm mt-4 max-w-48" value="Edit Template" />
                                </form>
                            </section>
                    }

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
                        {/* Sidebar content here */}
                        <li><h1 className="text-2xl">Recurri</h1></li>
                        <li><Link to={"/home"}>Home</Link></li>
                        <li><Link to={"/home/createtemplate"}>Create template</Link></li>
                        <li><Link to={"/aboutus"}>About us</Link></li>
                    </ul>
                </div>
            </div>
            :
            <NavigateToLogin />
    )
}

export default EditTemplate