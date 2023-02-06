import React, { useState } from "react";
import ButtonLogin from "./ButtonLogin";
import { Link } from "react-router-dom";
import "./Navbar.css";
import FormRegister from "../FormUser/FormCreateUserFormik";
import { ActionTypes, useContextState } from "../../context/contextState";
import { Button, Col, Modal, Row } from "react-bootstrap";
import ModalCustom from "../modalCustom/ModalCustom";
import Form from "react-bootstrap/Form";
import { comprarProductos } from "../../services/carritoService";

// import Dropdown from './Dropdown'

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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

  const clearCarrito = () => {
    setContextState({
      type: ActionTypes.SET_REMOVE_ALL_CARRITO,
      value: [],
    });
  };
  let total = 0
  for (var i = 0; i < contextState.carrito.length; i++) {
    let price = contextState.carrito[i].price
    total = total + price
  }

 let  titlePedido = ''
  for (var i = 0; i < contextState.carrito.length; i++) {
    let name = contextState.carrito[i].title
    titlePedido = `${titlePedido} + ${name}` 
  }
  const newPedido = {
    title: titlePedido,
    detalles: contextState.carrito.map((producto) => producto ),
    price: total
  }

  const realizarCompra = async() => {
    const { data } = await comprarProductos(newPedido);
    console.log(data)
  }

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
      <nav className="navbars">
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
          FormRegister={ButtonLogin}
        />
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          Mr. Chef
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"} />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Inicio
            </Link>
          </li>
          <li
            className="nav-item"
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
          >
            <Link
              to="/Products"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Productos
              {/* Productos <i className='fas fa-caret-down' /> */}
            </Link>
            {/* {dropdown && <Dropdown />} */}
          </li>
          <li className="nav-item">
            <Link
              to="/About-us"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              Quiénes somos
            </Link>
          </li>
          {/* <li className='nav-item'>
            <Link to='/Login' className='navs-links-nobile' onClick={closeMobileMenu}>
              Iniciar sesion
            </Link>
          </li> */}
        </ul>
        <li className="ml-5">
          <Button
            className="btn btn-danger ml-5"
            size="sm"
            onClick={
              contextState.userLogged
                ? () => logout()
                : () => setShowModal(!showModal)
            }
          >
            {contextState.userLogged ? `Cerrar Sesión` : "Registrate"}
          </Button>
        </li>
        {!contextState.userLogged && (
          <li className="ml-5">
            <ButtonLogin />
          </li>
        )}
        {contextState.userLogged ? (
          <li className="ml-5">
            {" "}
            <Button variant="primary" onClick={handleShow}>
              <i class="fa-solid fa-cart-shopping text-white"></i>
            </Button>{" "}
          </li>
        ) : null}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row >
              {contextState.carrito.map((producto)=>
              <Row key={producto._id}>
              <p className="text-dark">{producto.title}: ${producto.price}</p>
              </Row>) }
              <p className="text-dark">Total ${total}</p>
            </Row>
            <Form>
              <Button variant="secondary" onClick={()=>clearCarrito()}>
                Cancelar todo
              </Button>
              <Button variant="primary"  onClick={()=> realizarCompra()}  >
                Comprar
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </nav>
    </>
  );
};

export default Navbar;
