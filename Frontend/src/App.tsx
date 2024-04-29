import { useState } from 'react';
import './App.css'
import Home from './components/Home/Home'
import { deleteCookie } from './helpers/CookieHelpers';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export type User = {
  picture: string;
  name: string;
  email: string;
};

function App() {
  const [profile, setProfile] = useState<User>();

  const logOut = () => {
    setProfile(undefined);
    deleteCookie("access_token");
    window.location.reload();
  };
  return (
    <div>
     <Home/>
    </div>
  )
}

export default App
