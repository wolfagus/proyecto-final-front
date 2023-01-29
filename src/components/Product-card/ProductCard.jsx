import React from "react";
//import productImg from '../../assets/images/chicken1.png'
import "./ProductCard.css";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { id, title, imgUrl, price } = props.item;

  return (
    <div className="product__item">
      <div className="product__img">
        <img src={imgUrl} alt="product-img" className="w-100" />
      </div>

      <div className="product__content">
        <h5>
          {" "}
          <Link to={`/foods/${id}`}> {title} </Link>{" "}
        </h5>
        <div className="d-flex align-items-center justify-content-between">
          <span className="product__price mt-4"> {price} </span>
          <button className="addTOCart__btn d-flex btn-light mt-4">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
