import React from 'react'
import { Image } from 'react-bootstrap';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import './admin.css'

 const Admin = () => {
  return (
    <div className='admin'>
    <div className='flex'>
      <Sidebar/>
      <Image roundedCircle className='vh-100 img-admin-panel' src={require('../../assets/images/Panel de administracion.png')} />
      </div>
      </div>
      )
}

export default Admin