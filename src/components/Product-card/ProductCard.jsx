import React from "react";
//import productImg from '../../assets/images/chicken1.png'
import "./ProductCard.css";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { ActionTypes, initialState, useContextState } from '../../context/contextState';

const ProductCard = (props) => {  
  const { setContextState } = useContextState();
  const { _id, title, images, price } = props.item;
  const addCarrito = () =>{
    setContextState({
      type: ActionTypes.SET_ADD_CARRITO,
      value: props.item,
    },console.log(initialState.carrito))
  }


  return (
    
    <Col className="product__item">
      <div className="product__img">
        <img src={images} alt="product-img" />
      </div>

      <div className="product__content">
        <h5>
          {" "}
          <Link to={`/foods/${_id}`}> {title} </Link>{" "}
        </h5>
        <div className="d-flex align-items-center justify-content-evenly content-price-cart">
          <span className="product__price mt-4"> {price} </span>
          <button className="addTOCart__btn d-flex btn-light mt-4" onClick={() =>addCarrito()}>
            Añadir al carrito
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
