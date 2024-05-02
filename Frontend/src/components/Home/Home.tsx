import { Link, useLocation, useNavigate } from "react-router-dom"
import CreateTemplate from "./CreateTemplate/CreateTemplate"
import Overview from "./Overview/Overview"
import { getCookie, setCookie } from "../../helpers/CookieHelpers";
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
              <li><Link to="/home" className="text-2xl">Recurri</Link></li>
              <li><Link to={"/home"}>Home</Link></li>
              <li><Link to={"/home/createtemplate"}>Create template</Link></li>
              <li><Link to={"/aboutus"}>About us</Link></li>
            </ul>
          </div>
        </div>

      </div>
      :
      <NavigateToLogin />

  )
}

export default Home