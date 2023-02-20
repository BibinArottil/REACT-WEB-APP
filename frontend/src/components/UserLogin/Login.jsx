import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast} from 'react-toastify'
import {useSelector, useDispatch} from "react-redux"
import axios from 'axios';
import {useCookies} from 'react-cookie'
import {setLocalStorageData} from '../../redux/store'
import './Login.css'
export default function Login() {
  // const localStorageData = useSelector(state => state.localStorage.data);

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [cookies,removeCookies] = useCookies([]);
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        email:"",
        password:"",
    })
    useEffect(()=>{
        if(!cookies.jwt || cookies.jwt==="undefined") {
            navigate("/login")
        }else{
            navigate("/")
        }
    },[cookies,navigate])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:4000/login", {
                ...values,
            },{
                withCredentials: true
            })
            if(data.state===false){
              let error = "Invalid Credentials"
              generateError(error)
            }else if(data.invalid===true){
              let error = "Email or Password incorrect"
              generateError(error)
            }else if(data.create===true){
                dispatch(setLocalStorageData(data.existUser))
                navigate("/")
              }

        } catch (error) {
            console.log(error);
        }
    }

    const generateError = (error) => 
    toast.error(error, {
        position: "top-center"
    })

    const validation = () => {
      if (values.email === "") {
        setErrors({ email: "Email required....!" });
      } else if (
        !String(values.email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        setErrors({ email: "invalid Email...!" });
      } else if (values.password === "") {
        setErrors({ password: "Password required..!" });
      } else if (values.password.length < 4) {
        setErrors({ password: "Password should have atleast 4 characters..!" });
      } else {
        setErrors(false);
      }
    };

  return (
    <div className="login_container">
    <div className="login_form_container">
      <div className="lleft">
        <form className="fform_container" onSubmit={(e) => handleSubmit(e)}>
          <h1>Login to Your Account</h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
            onKeyUp={validation}
            // value={email}
            required
            className="iinput"
          />
          <p className="error_msg">{errors.email}</p>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
            onKeyUp={validation}
            // value={password}
            required
            className="iinput"
          />
          <br />
          <p className="error_msg">{errors.password}</p>
         
          <button type="submit" className="ggreen_btn">
            Sign In
          </button>
        </form>
      </div>
      <div className="rright">
        <h1>New Here ?</h1>
        {/* <Link to="/signup"> */}
          <button type="button" className="wwhite_btn" onClick={()=>navigate('/register')}>
            Sign Up
          </button>
        {/* </Link> */}
      </div>
      <ToastContainer />
    </div>
  </div>
  )
}
