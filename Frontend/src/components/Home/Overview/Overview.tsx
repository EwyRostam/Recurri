import { useQuery } from "@tanstack/react-query";
import { getAllTemplates } from "../../../api/TemplateApi";
import { Link } from "react-router-dom";
import LoadingMessage from "../../../helpers/LoadingMessage";
import ErrorMessage from "../../../helpers/ErrorMessage";

function Overview() {

    const { data, isLoading, isError } = useQuery({
        queryKey: ['templates'],
        queryFn: getAllTemplates
    });

    if (isLoading) return (
        <LoadingMessage />
    )

    if (isError) return <ErrorMessage />

    return (
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                    <Link to="/home/createtemplate" className="border border-black pb-[100%] relative">
                        <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-1/4 h-1/4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Create Template
                        </div>
                    </Link>
                    {data && data.map((template, index) =>

                        <Link to={`/home/template/${template.id}`} key={template.name + index} className="border border-black pb-[100%] relative">
                            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                                <img src={"https://i.ibb.co/1syVvnf/calendar.png"} alt="calendar" className="w-[75px] h-auto" />
                                {template.name}
                            </div>
                        </Link>
                    )}
                </section>
    )
}

export default Overview