import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'

export default function Admin() {
  return (
    <div className=' flex'>
   <Sidebar/>
     <Outlet />
    </div>
  )
}
