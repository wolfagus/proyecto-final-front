import React, { useState } from 'react'
import ButtonLogin from './ButtonLogin'
import { Link, Navigate } from 'react-router-dom'
import {GrUserAdmin } from "react-icons/gr"
import './Navbar.css'
import FormRegister from '../FormUser/FormCreateUserFormik'
import { ActionTypes, useContextState } from '../../context/contextState'
import { Button } from 'react-bootstrap'
import ModalCustom from '../modalCustom/ModalCustom'
// import Dropdown from './Dropdown'


const Navbar = () => {


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setContextState({
      type: ActionTypes.SET_USER_LOGIN,
      value: false,
    });
    setContextState({
      type: ActionTypes.SET_USER_DATA,
      value: {},
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);


  const { contextState, setContextState } = useContextState();
  const [click, setClick] = useState(false);
  // const [dropdown, setDropdown] = useState(false);


  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);




  // const onMouseEnter = () => {
  //   if (window.innerWidth > 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(true);
  //   }
  // };

  // const onMouseLeave = () => {
  //   if (window.innerWidth < 960) {
  //     setDropdown(false);
  //   } else {
  //     setDropdown(false);
  //   }
  // };

  return (
    <>

      <nav className='navbars'>
      <ModalCustom
        show={showModal}
        title="Registrate"
        handleClose={() => setShowModal(!showModal)}
        FormRegister={FormRegister}
      />
      <ModalCustom
        show={showModalLogin}
        title="Login"
        handleClose={() => setShowModalLogin(!showModalLogin)}
        FormRegister={ButtonLogin }
      />
        <Link to='/' className='brand-logo' onClick={closeMobileMenu}>
        Mr. Chef 
        </Link>
        <div className='menu-icon' onClick={handleClick} >
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Inicio
            </Link>
          </li>
          <li className='nav-item'
          // onMouseEnter={onMouseEnter}
          // onMouseLeave={onMouseLeave}
          >
            <Link to='/Products' className='nav-links' onClick={closeMobileMenu}>
              Productos
              {/* Productos <i className='fas fa-caret-down' /> */}
            </Link>
            {/* {dropdown && <Dropdown />} */}
          </li>
          <li className='nav-item'>
            <Link to='/About-us' className='nav-links' onClick={closeMobileMenu}>
              Quiénes somos
            </Link>
          </li>
          {/* <li className='nav-item'>
            <Link to='/Login' className='navs-links-nobile' onClick={closeMobileMenu}>
              Iniciar sesion
            </Link>
          </li> */}
        
        <li className="ml-5">
              <Button
                className="nav-links bg-transparent border-dark ml-5"
                size="sm"
                onClick={
                  contextState.userLogged
                    ? () => logout()
                    : () => setShowModal(!showModal)
                }
              >
                {contextState.userLogged ? 'Cerrar Sesión' : 'Registrate'}
              </Button>
            </li>
            {!contextState.userLogged && (
              <li className="ml-5 nav-links">
                  <ButtonLogin/>         
              </li>
            )}
              {contextState.userLogged && contextState.userData.role === "ADMIN" && (
              <li>
                <Link to='/admin' className='nav-links-admin'>
                  Panel Admin <GrUserAdmin/>
                </Link>
              </li>
              )}
            </ul>

      </nav>

    </>
  )
}

export default Navbar