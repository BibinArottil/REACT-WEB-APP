import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Admin from "./pages/Admin"
import AdminHome from "./pages/AdminHome";
import AddUser from "./pages/AddUser";
import EditUser from './pages/EditUser'
import "react-toastify/dist/ReactToastify.css"
import Profile from "./pages/Profile";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />}/>
        <Route exact path="/register" element={<Register />}/>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/profile" element={<Profile />}/>
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/adminhome" element={<AdminHome />} />
        <Route exact path="/create" element={<AddUser />} />
        <Route exact path="/edituser/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
