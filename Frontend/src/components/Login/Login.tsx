import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom"
import { setCookie } from "../../helpers/CookieHelpers";

function Login() {
    const navigate = useNavigate()
    const login = useGoogleLogin({
        onSuccess: codeResponse => {
            console.log(codeResponse)
            setCookie('access_token', codeResponse.access_token!, 1);
            navigate("/home")
        },
        scope: 'https://www.googleapis.com/auth/calendar',
        include_granted_scopes: true
      });
      
    return (
        <section className="w-full h-screen flex justify-center items-center flex-col gap-4">
            <h1 className="text-2xl">Recurri</h1>
            <p> Create Calendar Templates for recurring events!</p>
            <button type="button" onClick={()=> login()} className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2 max-w-sm">
                <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                Sign up with Google
                <div>
                </div>
            </button>
        </section>
    )
}

export default Login