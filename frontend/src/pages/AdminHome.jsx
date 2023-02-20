import React from 'react'
import Home from '../components/AdminHome/Home'
import Navbar from '../components/AdminHeader/Navbar'
import {Context} from '../context/SearchContext'

function AdminHome() {
  return (
    <div>
      <Context>
        <Navbar />
        <Home />
      </Context>
    </div>
  )
}

export default AdminHome