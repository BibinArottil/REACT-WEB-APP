import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {useCookies} from 'react-cookie'
import axios from "axios"
import './Home.css'

export default function Secret() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    useEffect(()=>{
        const verifyUser = async () => {
            if(!cookies.jwt) {
                navigate("/login")
            }else{
                const {data} = await axios.post(
                    "http://localhost:4000/",
                    {},
                    {withCredentials:true}
                    );
                    if(!data.status){
                        removeCookie("jwt")
                        navigate("/login")
                    }
            }
        }
        verifyUser()
    },[cookies, navigate, removeCookie])

  return (
    <div className='private_main'>
        <h1 className='text'>Welcome</h1>
    </div>
  )
}
