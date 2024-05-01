import { setCookie } from "./helpers/CookieHelpers";
import Home from "./components/Home/Home";


function App() {

  if (location.hash) {
    const params = new URLSearchParams(location.hash);
    const accessToken = params.get('access_token');

    setCookie('access_token', accessToken!, 1);
    location.href = import.meta.env.BASE_URL;
  };




  return (
    <Home />
  )

}



export default App
