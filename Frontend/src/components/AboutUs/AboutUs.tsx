import { Link } from "react-router-dom";

function AboutUs() {

    return (
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
                <div className="px-5 flex items-center md:mt-24 flex-col w-full h-full gap-4">
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
                    <br />
                    <img src={"https://i.ibb.co/1syVvnf/calendar.png"} alt="calendar" className="w-[15%] h-auto" />
                </div>
            </div>

            <div className="drawer-side">

                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
                    {/* Sidebar content here */}
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay">
                        <svg fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1"
                            viewBox="0 0 460.775 460.775">
                            <path d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"/>
                        </svg>
                    </label>
                    <li><Link to="/home" className="text-2xl">Recurri</Link></li>
                    <li><Link to={"/home"}>Home</Link></li>
                    <li><Link to={"/home/createtemplate"}>Create template</Link></li>
                    <li><Link to={"/aboutus"}>About us</Link></li>
                </ul>
            </div>
        </div>

    )
}

export default AboutUs