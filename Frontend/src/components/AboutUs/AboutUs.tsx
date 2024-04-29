import { Link, useLocation } from "react-router-dom";

function AboutUs() {
    const location = useLocation();
    const { pathname } = location;
    const pathArray = pathname.split("/")

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button lg:hidden h-8" >Open drawer</label>
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

                <div className="flex items-center md:mt-24 flex-col w-full h-full gap-4">
                    <h1 className="text-2xl max-w-lg"> Welcome to <span className="font-bold">Recurri </span>! </h1>

                    <p className="max-w-lg">
                        At <span className="font-bold">Recurri </span>, we understand the hassle of manually creating events on your Google Calendar. That's why we've created a platform that simplifies the process by providing ready-to-use templates for various occasions.
                    </p>

                    <p className="max-w-lg">
                        Gone are the days of tediously entering each event separately. With our extensive collection of finished templates, you can quickly populate your calendar with events tailored to your needs.
                    </p>

                    <p className="max-w-lg">
                        But that's not all - we also empower you to unleash your creativity by allowing you to create your own custom templates. Whether it's for personal use, work, or special occasions, our intuitive interface makes template creation a breeze.
                    </p>
                    <p className="max-w-lg">
                        Say goodbye to the time-consuming task of event planning and hello to effortless scheduling with <span className="font-bold">Recurri </span>!
                    </p>
                </div>


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

    )
}

export default AboutUs