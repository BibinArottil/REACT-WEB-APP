import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { useContext } from 'react';
import {useNavigate} from "react-router-dom"
import axios from 'axios'
import {useCookies} from 'react-cookie'
import { SearchContext } from '../../context/SearchContext';
import { useEffect } from 'react';

function CollapsibleExample() {
  const [cookies,removeCookie] = useCookies([])
  const {search,setSearch} = useContext(SearchContext)
  const navigate = useNavigate()

  useEffect(()=>{
    const verifyUser = async ()=>{
      if(!cookies.jwt || cookies.jwt==="undefined"){
        navigate('/admin')
      }else{
    const {data} = await axios.post(
          "http://localhost:4000/admin",{},{ withCredentials: true,});
          console.log(data);
          if(!data.status){
            removeCookie("jwt");
            navigate('/admin')
          }
      }
   }
   verifyUser();

  },[cookies,navigate,removeCookie])

  const handleLogout=()=>{
    removeCookie("jwt")
    navigate('/admin')
  }
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand><h1>Admin</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Button onClick={()=>navigate('/create')} variant="outline-info">Add User</Button>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
            />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
          <Nav>
          <Button onClick={handleLogout} className='ms-3' variant="outline-danger">Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;