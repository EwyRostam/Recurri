import { useState } from "react";
import getUser, { User } from "./api/UserApi";
import { useQuery } from "@tanstack/react-query";
import { deleteCookie, setCookie } from "./helpers/CookieHelpers";
import Home from "./components/Home/Home";
import Overview from "./components/Home/Overview/Overview";
import Login from "./components/Login/Login";




const LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/calendar&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:5173&client_id=`;


function App() {
  const [profile, setProfile] = useState<User>();

  if (location.hash) {
    const params = new URLSearchParams(location.hash);
    const accessToken = params.get('access_token');

    setCookie('access_token', accessToken!, 1);
    location.href = import.meta.env.BASE_URL;
  };


 
  

  const login = () => {
    location.href = LOGIN_URL + import.meta.env.VITE_APP_CLIENT_ID;
  }

  return (
    <Home />
  )

}

export default App
