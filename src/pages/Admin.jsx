import React from 'react'
import Sidebar from '../components/Sidebar'
import './admin.css'

const Admin = () => {
  return (
    <div className='admin'>
    <div className='flex'>
      <Sidebar/>
      <div className='content'>
        <p>Aqui va el contenido</p>
        
      </div>
      </div>
      </div> 
      )
}

export default Admin