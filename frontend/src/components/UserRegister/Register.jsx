import React, {useState, useEffect} from 'react'
import {  useNavigate } from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import {useCookies} from 'react-cookie'
import axios from 'axios'
import './Register.css'

export default function Register() {
    const navigate = useNavigate();
    const [cookies] = useCookies([]);
    useEffect(()=>{
        if(!cookies.jwt || cookies.jwt==="undefined") {
            navigate("/register")
        }else{
            navigate("/")
        }
    },[cookies,navigate])
    const [errors, setErrors] = useState({})
    const [values, setValues] = useState({
        name:"",
        phone:"",
        email:"",
        password:"",
    })
    let name=values.name
    let phone=values.phone
    let email=values.email
    let password=values.password

    const generateError = (error) => 
        toast.error(error, {
            position: "top-center"
        })
        const validation = ()=>{
            if(name.length ==""){
                setErrors({name:"Please enter valid name!!"})
            } else if(!/^[A-Za-z\s]*$/.test(name)){
                setErrors({name:'Username should only contain alphabets and space'})
            } else if(phone === ""){
                setErrors({phone:"Please enter valid phone number"})
            } else if(!/^[0-9]{10}$/.test(phone)){
                setErrors({phone:'Phone should be 10 digit'})
            } else if(email === ""){
                setErrors({email: "Email required....!"})
            }else if(
                !String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            )
            {
                setErrors({email: "invalid Email...!"})
            }else if (password==="") {
                setErrors({password:'Password required..!'})
              }else if (password.length < 4) {
                setErrors({password:'Password should have atleast 4 characters..!'})
              } else{
                setErrors(false)
              }
          }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.post(
                "http://localhost:4000/register",
                {
                ...values,
            },{
                withCredentials: true
            })
            console.log(data);
            if(data){
                if(data.errors){
                    const {name,phone,email, password} = data.errors;
                    if(name) generateError(name);
                    else if(phone) generateError(phone)
                    else if(email) generateError(email)
                    else if(password) generateError(password)
                }else{
                    navigate("/")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Welcome Back</h1>
          {/* <Link to="/login"> */}
            <button type="button" className="white_btn" onClick={()=> navigate('/login')}>
              Sign In
            </button>
          {/* </Link> */}
        </div>
        <div className="righ">
          <form className="form_container" onSubmit={(e) => handleSubmit(e)}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
			  onKeyUp={validation}
              onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
              value={name}
              required
              className="input"
            />
			<br/>
			<p className='error_msg'>{errors.name}</p>
            <input
              type="text"
              placeholder="Phone No:"
              name="phone"
              onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
			  onKeyUp={validation}
              value={phone}
              required
              className="input"
            />
			<br/>
			<p className='error_msg'>{errors.phone}</p>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
			  onKeyUp={validation}
              value={email}
              required
              className="input"
            />
			<br/>
			<p className='error_msg'>{errors.email}</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
			  onKeyUp={validation}
              value={password}
              required
              className="input"
            />
			<br/>
			<p className='error_msg'>{errors.password}</p>
            
            <button type="submit" className="green_btn">
              Sign Up
            </button>
          </form>
      <ToastContainer/>  
        </div>
      </div>
    </div>
  )
}
