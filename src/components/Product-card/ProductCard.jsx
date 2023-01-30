import React from "react";
//import productImg from '../../assets/images/chicken1.png'
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";

const ProductCard = (props) => {
  const { _id, title, images, price } = props.item;

  return (
    
    <Col className="product__item">
      <div style={{ width: '18rem' }} className="product__img">
        <img src={images} alt="product-img" className="w-100" />
      </div>

      <div className="product__content">
        <h5>
          {" "}
          <Link to={`/foods/${_id}`}> {title} </Link>{" "}
        </h5>
        <div className="d-flex align-items-center justify-content-between">
          <span className="product__price mt-4"> {price} </span>
          <button className="addTOCart__btn d-flex btn-light mt-4">
            Añadir al carrito
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
