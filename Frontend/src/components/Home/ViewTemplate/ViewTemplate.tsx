import { Link, useLocation, useNavigate } from "react-router-dom";
import ViewWeek from "./components/ViewWeek";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteTemplate, getTemplateById } from "../../../api/TemplateApi";
import { DatePicker } from "@mui/x-date-pickers";
import ErrorMessage from "../../../helpers/ErrorMessage";
import LoadingMessage from "../../../helpers/LoadingMessage";
import { convertToGoogle } from "../CreateTemplate/helpers";
import { useState } from "react";
import { getCookie } from "../../../helpers/CookieHelpers";
import NavigateToLogin from "../NavigateToLogin";



function ViewTemplate() {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;
    const pathArray = pathname.split("/")
    const [startDate, setStartDate] = useState<Date>(new Date());


    const { data: template, isLoading, isError } = useQuery({
        queryKey: ['templates', pathArray[pathArray.length - 1]],
        queryFn: () => getTemplateById(pathArray[pathArray.length - 1])


    });

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => {
            return deleteTemplate(pathArray[pathArray.length - 1]);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['templates'] })
            navigate("/home")
        }
    })

    const deleteTemplateById = () => {
        mutation.mutate();
        navigate("/home")
    }



    function handleApply(): void {
        let templates = template!.weeks
        convertToGoogle(templates, startDate!)
    }

    return (
    getCookie("email") != null  ? 
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden h-8" >Open drawer</label>

                <div className="pl-4 text-sm breadcrumbs h-12">
                    <ul>
                        {pathArray.length > 2 && pathArray.slice(1).map((name, index) => {

                            if (index == pathArray.length - 2) {
                                return <li key={name + index}>{name}</li>
                            }
                            return <li key={name + index}><Link to={"/home"}>{name}</Link></li>

                        })}

                    </ul>
                </div>

                {isLoading ?
                    <LoadingMessage />
                    :
                    isError ?
                        <ErrorMessage />
                        :
                        <section className="w-11/12 mx-auto">
                            <h1 className="pb-4">{template!.name}</h1>
                            {<ViewWeek weeks={template!.weeks} />}
                            <DatePicker value={startDate} onChange={(date) => setStartDate(date!) } />
                            <div className="pt-4 flex gap-4">
                                <button onClick={()=> handleApply()} className="btn btn-sm py-1 max-w-xs btn-success text-white">Apply Template </button>
                                <button onClick={() => deleteTemplateById()} className="btn btn-sm py-1 max-w-xs btn-error text-white">Delete Template </button>
                                <button className="btn btn-sm py-1 max-w-xs btn-info text-white"> Preview Template </button>
                                <Link to={`/home/editTemplate/${template!.id}`} className="btn btn-sm py-1 max-w-xs btn-info text-white"> Edit Template </Link>
                            </div>
                        </section>
                }

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
                    {/* Sidebar content here */}
                    <li><Link to="/home" className="text-2xl">Recurri</Link></li>
                    <li><Link to={"/home"}>Home</Link></li>
                    <li><Link to={"/home/createtemplate"}>Create template</Link></li>
                    <li><Link to={"/aboutus"}>About us</Link></li>
                </ul>
            </div>
        </div>
        :
        <NavigateToLogin/>
    )
}

export default ViewTemplate