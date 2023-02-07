import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css' 

const Footer = () => {
  return (
    <>
    <div className="container-75 bg-dark">
  <footer className="d-flex flex-wrap justify-content-around align-items-center py-3 my-0 border-top">
    <div className="col-md-4 d-flex align-items-center">
    <div className='fs-1 text-muted'>
      <Link to='/' className='footer-logo ml-0'>
        Mr. Chef  
        </Link>
      </div>
      <span className="mb-3 mb-md-0 text-muted">© 2023 Company, Inc</span>
    </div>

    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li className="ms-3"><a className="text-muted" href="/"><i class="fa-brands fa-facebook fs-2"  ></i></a></li>
      <li className="ms-3"><a className="text-muted" href="/"><i class="fa-brands fa-instagram fs-2"  ></i></a></li>
      <li className="ms-3"><a className="text-muted" href="/"><i class="fa-brands fa-twitter fs-2"  ></i></a></li>
    </ul>
  </footer>
</div>
    </>  
  )
}

export default Footer;
