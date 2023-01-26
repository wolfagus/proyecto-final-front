import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Carrito from "./carrito";
// import Dropdown from './Dropdown'

const Navbar = () => {
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
      <nav className="navbars">
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
          <li className="nav-item">
            <div className="nav-links">
              <Carrito></Carrito>
            </div>
          </li>
        </ul>
        <Button />
      </nav>
    </>
  );
};

export default Navbar;
