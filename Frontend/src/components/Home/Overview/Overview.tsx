import { Link } from "react-router-dom"
import { Template } from "../CreateTemplate/CreateTemplate"

type Props = {
    templates: Template[]
}
function Overview({ templates }: Props) {

    return (
        <>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">

                <Link to={"/home/createtemplate"} className="border border-black pb-[100%] relative" >
                    <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-1/4 h-1/4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Create Template
                    </div>
                </Link>
                {templates.map(({ templateName }) => {
                    return (
                        <div className="border border-black pb-[100%] relative">
                            <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
                                {templateName}
                            </div>
                        </div>
                    )
                })}

            </section>

            <div className="w-full flex justify-center py-4">
                <div className="join">
                    <input className="join-item btn btn-square" type="radio" name="options" aria-label="1" defaultChecked />
                    <input className="join-item btn btn-square" type="radio" name="options" aria-label="2" />
                    <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" />
                    <input className="join-item btn btn-square" type="radio" name="options" aria-label="4" />
                </div>
            </div>

        </>
    )
}

export default Overview