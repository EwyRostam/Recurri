import { useNavigate } from "react-router-dom";
import LoadingMessage from "../../helpers/LoadingMessage";
import { useEffect } from "react";

export default function NavigateToLogin(){
    useEffect(()=>{
        navigate("/login")
    },[ window.location.href])
    const navigate = useNavigate()

    return <LoadingMessage />
}