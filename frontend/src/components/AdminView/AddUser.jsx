import React, { useState } from "react";
import {useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Create() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  let name = values.name;
  let phone = values.phone;
  let email = values.email;
  let password = values.password;

  const validation = () => {
    if (name.length == "") {
      setErrors({ name: "Please enter valid name!!" });
    } else if (!/^[A-Za-z\s]*$/.test(name)) {
      setErrors({ name: "Username should only contain alphabets and space" });
    } else if (phone === "") {
      setErrors({ phone: "Please enter valid phone number" });
    } else if (!/^[0-9]{10}$/.test(phone)) {
      setErrors({ phone: "Phone should be 10 digit" });
    } else if (email === "") {
      setErrors({ email: "Email required....!" });
    } else if (
      !String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors({ email: "invalid Email...!" });
    } else if (password === "") {
      setErrors({ password: "Password required..!" });
    } else if (password.length < 4) {
      setErrors({ password: "Password should have atleast 4 characters..!" });
    } else {
      setErrors(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/create",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );

      if(data.status===false){
        let error = "Email is already registered"
        generateError(error)
      }else{
        let success = "New user added successful"
        generateSuccess(success)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateError = (error) =>
  toast.error(error, {
    position: "top-center",
  });
  const generateSuccess = (success) =>
  toast.success(success, {
    position: "top-center",
  });
  
  const handleBack = () =>{
    navigate('/adminhome')
  }

  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left">
          <h1>Add user</h1>
        </div>
        <div className="righ">
          <div className="form_container">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onKeyUp={validation}
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              value={name}
              required
              className="input"
            />
            <br />
            <p className="error_msg">{errors.name}</p>
            <input
              type="text"
              placeholder="Phone No:"
              name="phone"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              onKeyUp={validation}
              value={phone}
              required
              className="input"
            />
            <br />
            <p className="error_msg">{errors.phone}</p>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              onKeyUp={validation}
              value={email}
              required
              className="input"
            />
            <br />
            <p className="error_msg">{errors.email}</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              onKeyUp={validation}
              value={password}
              required
              className="input"
            />
            <br />
            <p className="error_msg">{errors.password}</p>

            <button onClick={handleSubmit} className="green_btn">
              Add
            </button>
            <button onClick={ handleBack} className="green_btn">
              Back
            </button>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
