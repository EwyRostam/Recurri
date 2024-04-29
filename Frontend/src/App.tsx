import { useState } from 'react';
import './App.css'
import Home from './components/Home/Home'
import { deleteCookie } from './helpers/CookieHelpers';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

function App() {
  const [profile, setProfile] = useState<User>();

  const logOut = () => {
    setProfile(undefined);
    deleteCookie("access_token");
    window.location.reload();
  };
  return (
    <div>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
          <Home />
        </div>
      ) : (
        <div>
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
        </div>
      )}
    </div>
  )
}

export default App
