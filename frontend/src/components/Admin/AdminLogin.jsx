import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import "./AdminLogin.css";
import axios from "axios";

function AdminLogin() {
  const navigate = useNavigate();
  const [cookies] = useCookies([]);
  const [errors] = useState({});

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!cookies.jwt || cookies.jwt === "undefined") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [cookies, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/adminlogin",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
        if(data.status===false){
          let error = "Invalid Credentials"
          generateError(error)
        }else if(data.Invalid===false){
          let error = "Email or Password incorrect"
          generateError(error)
        }else{
          navigate('/adminhome')
        }
    } catch (error) {
      console.log(error);
    }
  };

  const generateError = (error) =>
    toast.error(error, {
      position: "top-center",
    });

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="lleft">
          <form className="form_container" onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }

              required
              className="iinput"
            />
            <p className="error_msg">{errors.email}</p>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }

              required
              className="iinput"
            />
            <br />
            <p className="error_msg">{errors.password}</p>

            <button type="submit" className="ggreen_btn">
              Sing In
            </button>
          </form>
        </div>
        <div className="rrright">
          <h1>User Home ?</h1>
          <Link to="/login">
            <button type="button" className="wwhite_btn">
              Home
            </button>
          </Link>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default AdminLogin;
