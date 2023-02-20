
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useNavigate , Link} from "react-router-dom"
import {useCookies} from "react-cookie";
import axios from "axios"
import { useEffect } from 'react';
function BasicExample() {
    const navigate = useNavigate();
  const [cookies,removeCookie] = useCookies([])

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

    
    return (
    <Navbar collapseOnSelect expand="lg" bg="info" variant="light">
    <Container>
      <Navbar.Brand>React-App</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link >Home</Nav.Link>
          <Nav.Link >About</Nav.Link>
        </Nav>
        <Nav>
          <NavDropdown title="Profile" id="collasible-nav-dropdown">
            <NavDropdown.Item>
              <Link to="/profile">
              Profile
              </Link>
              </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>
              LogOut
              </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

}

export default BasicExample;