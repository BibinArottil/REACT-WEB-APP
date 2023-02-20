import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import "./Edit.css";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [values, setValues] = useState({
    name: "",
    phone: "",
    email: "",
    status: "",
  });
  const handleBack = () => {
    navigate("/adminhome");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.patch(
      "http://localhost:4000/admin/editUser",
      {
        ...values,
      },
      {
        withCredentials: true,
      }
    );
    if (data.state === false) {
      let error = "Email is already registered";
      generateError(error);
    } else {
      let update = "User details updated";
      generateSuceess(update);
    }
  };

  const generateError = (res) =>
    toast.error(res, {
      position: "top-center",
    });
  const generateSuceess = (res) =>
    toast.success(res, {
      position: "top-center",
    });
  const getUser = async () => {
    await axios.get(`http://localhost:4000/admin/details/${id}`).then((res) => {
      setValues({
        name: res.data.userData.name,
        phone: res.data.userData.phone,
        email: res.data.userData.email,
      });
    });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div>
        <div className="signup_containerr">
          <div className="signup_form_containerr">
            <div className="leftt">
              <h1>Update Noww !!!</h1>
            </div>
            <div className="rightt">
              {/* <form className="form_containerr"> */}
              {/* <h1>Please Update Now!!</h1> */}
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                value={values.name}
                required
                className="inputt"
              />
              <br />
              <input
                type="text"
                placeholder="Phone No:"
                name="phone"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                value={values.phone}
                required
                className="inputt"
              />
              <br />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                required
                className="inputt"
              />
              <br />
              <button onClick={handleSubmit} className="green_btnn">
                Update
              </button>
              <button onClick={handleBack} className="green_btnn">
                Back
              </button>
              {/* </form> */}
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
