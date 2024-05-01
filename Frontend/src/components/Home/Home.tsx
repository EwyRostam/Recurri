import { Link, useLocation, useNavigate } from "react-router-dom"
import CreateTemplate from "./CreateTemplate/CreateTemplate"
import Overview from "./Overview/Overview"
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../helpers/CookieHelpers";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';
import { useQuery } from "@tanstack/react-query";
import getUser from "../../api/UserApi";
import NavigateToLogin from "./NavigateToLogin";

export type User = {
  picture: string;
  name: string;
  email: string;
};

function Home() {
  const location = useLocation();
  const { pathname } = location;
  const pathArray = pathname.split("/")
  const [profile, setProfile] = useState<User>();
  const navigate = useNavigate();
  
  if (profile && !getCookie("email")) {
    setCookie("email", profile.email, 1);
  }

   if (location.hash) {
    const params = new URLSearchParams(location.hash);
    const accessToken = params.get('access_token');

    setCookie('access_token', accessToken!, 1);
     navigate("/home");
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUser
  })

  if(isLoading)
    {
      return (
      <p>
        Loading...
      </p>
      )
    }


  // const createProfile = () => {
  //   const user: User = {
  //     picture: data.photos[0].url,
  //     name: data.names[0].displayName,
  //     email: data.emailAddresses[0].value
  //   }
  //   setProfile(user);
  // }

  // if(data && profile == null)
  //   {
  //     createProfile();
  //   }

  // const logOut = () => {
  //   setProfile(undefined);
  //   deleteCookie("access_token");
  //   deleteCookie("google_login_key");
  //   window.location.reload();
  // };



  return (
    getCookie("email") != null  ? 
    <div>
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