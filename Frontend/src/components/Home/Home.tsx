import { Link, useLocation, useNavigate } from "react-router-dom"
import CreateTemplate from "./CreateTemplate/CreateTemplate"
import Overview from "./Overview/Overview"
import { deleteCookie, getCookie, setCookie } from "../../helpers/CookieHelpers";
import { useQuery } from "@tanstack/react-query";
import getUser from "../../api/UserApi";
import NavigateToLogin from "./NavigateToLogin";
import LoadingMessage from "../../helpers/LoadingMessage";

export type User = {
  picture: string;
  name: string;
  email: string;
};

function Home() {
  const location = useLocation();
  const { pathname } = location;
  const pathArray = pathname.split("/")
  const navigate = useNavigate();

  if (location.hash) {
    const params = new URLSearchParams(location.hash);
    const accessToken = params.get('access_token');
    setCookie('access_token', accessToken!, 1);
    navigate("/home");
  };

  const { isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser
  })

  if (isLoading) {
    return (
      <LoadingMessage />
    )
  }

  const logOut = () => {
    deleteCookie("email");
    deleteCookie("access_token");
    window.location.reload();
  };


  return (
    getCookie("email") != null ?
      <div className="font-primary">
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
                  if (index == pathArray.length - 2) {
                    return <li key={name + index}>{name}</li>
                  }
                  return <li key={name + index}><Link to={"/home"}>{name}</Link></li>

                })}
              </ul>
            </div>
            {pathname == "/home" ? <Overview /> : <CreateTemplate />}
          </div>

          <div className="drawer-side">
            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
              {/* Sidebar content here */}
              <label htmlFor="my-drawer" className="drawer-button lg:hidden h-8 flex justify-start w-full" >
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
              <button className="absolute bottom-2 left-4 btn" onClick={() => logOut()}>
                Log Out
              </button>
            </ul>
          </div>
        </div>

      </div>
      :
      <NavigateToLogin />

  )
}

export default Home