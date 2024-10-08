import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
        <li>
            <NavLink 
              to="/admin/login" 
              className="block p-2 rounded hover:bg-gray-700"
              activeClassName="bg-gray-600"
            >
              login
            </NavLink>
          </li>
       

          <li>
            <NavLink 
              to="/admin/register" 
              className="block p-2 rounded hover:bg-gray-700"
              activeClassName="bg-gray-600"
            >
              register
            </NavLink>
          </li>
       
          <li>
            <NavLink 
              to="/admin/dashboard" 
              className="block p-2 rounded hover:bg-gray-700"
              activeClassName="bg-gray-600"
            >
              Dashboard
            </NavLink>
          </li>
       
       


          <li className='block p-2 rounded hover:bg-gray-700'>ASSOCIATION</li>
          <ul className=' pl-5'>
          <li>
            <NavLink 
              to="/admin/membres" 
              className="block p-2 rounded hover:bg-gray-700"
              activeClassName="bg-gray-600"
            >
              membres
            </NavLink>
          </li>

       
          </ul>


          <li>
            <NavLink 
              to="/admin/mediamanager" 
              className="block p-2 rounded hover:bg-gray-700"
              activeClassName="bg-gray-600"
            >
              VIDÉOTHEQUE
            </NavLink>
          </li>
          
       

       
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
