import React, { useEffect, useState } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { getAllProducts } from "../services/productService";
import Loader from "../components/Loader/Loader";
import { ActionTypes, useContextState } from "../context/contextState";
import { Link } from "react-router-dom";
import '../components/Product-card/ProductCard.css'

const Products = () => {
  const {contextState, setContextState } = useContextState();
  const [productos, setProductos] = useState([]);
  const [productosSearch, setProductosSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [term, setTerm] = useState("");

 
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const { data } = await getAllProducts();
      setProductos(data);
      setProductosSearch(data);
    };
    fetchProducts();
    setLoading(false);
  }, []);
  useEffect(() => {
    const search = productos.filter((prod) =>
      prod.title.toLowerCase().includes(term.toLowerCase())
    );
    setProductosSearch(search);
  }, [term, productos]);


  const addCarrito = (producto) => {
    setContextState({
      type: ActionTypes.SET_ADD_CARRITO,
      value: producto})
  };

  return (
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h1 className="foodTitle mb-0 mt-5"> - Comidas Populares - </h1>
            </Col>
            <Col lg="12">
              <Loader isLoading={loading}>
                <InputGroup className="mb-3 my-3">
                  <InputGroup.Text id="basic-addon1">
                    {" "}
                    <button>Buscar</button>{" "}
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Ingrese el menu que desea buscar"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </InputGroup>
              </Loader>
            </Col>
          </Row>
          <Row>
            {productosSearch.map((producto) => (
              producto.isActive && 
              <Col lg="4" md="4" className="mt-5">
                <Col className="product__item" key={producto._id}>
                  <div style={{ width: "18rem" }} className="product__img">
                    <img
                      src={producto.images}
                      alt="product-img"
                      className="w-100"
                    />
                  </div>

                  <div className="product__content">
                    <h5>
                      {" "}
                      <Link to={`/foods/${producto._id}`}>
                        {" "}
                        {producto.title}{" "}
                      </Link>{" "}
                    </h5>
                    <div className="d-flex align-items-center justify-content-evenly content-price-cart">
                      <span className="product__price">
                        {" $ "}
                        {producto.price}{" "}
                      </span>
                      <button className="addTOCart__btn d-flex btn-light mt-2"onClick={() => addCarrito(producto)}>
                        Añadir al carrito
                      </button>
                    </div>
                  </div>
                </Col>
              </Col>
            ))}
          </Row>
        </Container>
  );
};

export default Products;
