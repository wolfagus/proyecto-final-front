import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import ProductCard from '../components/Product-card/ProductCard';
import { useNavigate } from "react-router-dom";
import { getAllProducts } from '../services/productService';
import Loader from '../components/Loader/Loader';

const Products = () => {
    const [productos, setProductos] = useState([]);
    const [productosSearch, setProductosSearch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [term, setTerm] = useState("");
    const navigate = useNavigate();
    const [category, setCategory] = useState('ALL');
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


    return (

        <Loader isLoading={loading}>
        <section>
            <Container>
                <Row>
                    <Col lg='12' className="text-center">
                        <h1 className="foodTitle mb-0 mt-5" > - Comidas Populares - </h1>
                    </Col>
                    <Col lg='12'>
                    <Loader isLoading={loading}>
                        <InputGroup className="mb-3 my-3">
                            <InputGroup.Text id="basic-addon1"> <button>Buscar</button> </InputGroup.Text>
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
                    {
                        productosSearch.map((producto) => (
                            console.log(producto),
                            <Col lg='4' md='4' key={producto._id} className="mt-5">
                                <ProductCard item={producto} />
                            </Col>
                        ))
                    }
                </Row>
                    



                
            </Container>
        </section>

</Loader>
    )
}

export default Products