import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import {useState, useEffect} from 'react'
import {useNavigate,NavLink} from 'react-router-dom'
import {SearchContext} from '../../context/SearchContext'
import { useContext } from 'react';

function BasicExample() {
    const { search } = useContext(SearchContext)
    const [filterUser, setFilterUser] = useState([])
    const navigate = useNavigate()
    const [details, setDetails] =useState([])
    const getUser =async()=>{
        await axios.get("http://localhost:4000/admin/user").then((res)=>{
        setDetails(res.data.userData)
        })
    }

    const handleDelete = async (id) =>{
      await axios.delete(`http://localhost:4000/admin/userDelete/${id}`).then(()=>{
        getUser(  )
       })
    }

    useEffect(()=>{
        getUser()
    },[])

    useEffect(()=>{
        if(search !==""){
            const filterData =details.filter((value)=>
                value.name.toLowerCase().includes(search.toLowerCase())
            )
            setFilterUser(filterData)
        }
    },[search])

  return (
    <Table striped bordered hover size='sm'>
      <thead>
        <tr>
          <th>No:</th>
          <th>Name</th>
          <th>Phone No:</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {search ==="" && 
            details.map((data,i)=>{
                return(
                  <tr key={data._id}>
                    <td>{i+1}</td>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>
                      <NavLink to={`/edituser/${data._id}`}>
                        <Button style={{width:"70px"}} >Edit</Button>
                      </NavLink>
                        <Button onClick={()=>handleDelete(data._id)} variant='danger' className='ms-3'>Delete</Button>
                    </td>
                  </tr>
                )
            })
        }
        { search !=="" && 
            filterUser.map((data,i)=>{
                return(
                  <tr key={data._id}>
                    <td>{i+1}</td>
                    <td>{data.name}</td>
                    <td>{data.phone}</td>
                    <td>{data.email}</td>
                    <td>
                        <Button onClick={()=>navigate('/edituser')}>Edit</Button>
                        <Button onClick={()=>handleDelete(data._id)} variant='danger' className='ms-3'>Delete</Button>
                    </td>
                  </tr>
                )
            })
        }
      </tbody>
    </Table>
  );
}

export default BasicExample;
