import { Link, useLocation } from "react-router-dom"
import CreateTemplate from "./CreateTemplate/CreateTemplate"
import Overview from "./Overview/Overview"
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "../../helpers/CookieHelpers";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from 'jwt-decode';

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

  if (profile && !getCookie("email")) {
    setCookie("email", profile.email, 1);
  }

  // const logOut = () => {
  //   setProfile(undefined);
  //   deleteCookie("access_token");
  //   deleteCookie("google_login_key");
  //   window.location.reload();
  // };

  useEffect(() => {
    const googleCookie = getCookie("google_login_key");

    if (googleCookie != undefined) {
      setProfile(jwtDecode(googleCookie))
    }

  }, [])

  console.log(getCookie("google_login_key"))
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
                const path = `/${pathArray.slice(1, index + 2).join('/')}`;
                if (index == pathArray.length - 1) {
                  return <li key={name + index}>{name}</li>
                }
                return <li key={name + index}><Link to={path}>{name}</Link></li>

              })}
            </ul>
          </div>

          {pathname == "/home" ? <Overview /> : <CreateTemplate />}

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

    </div>
    :
      <GoogleLogin
      onSuccess={credentialResponse => {
        document.cookie = `google_login_key = ${credentialResponse.credential}`
        console.log(jwtDecode(credentialResponse.credential as string));
        setProfile(jwtDecode(credentialResponse.credential as string));
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  )
}

export default Home