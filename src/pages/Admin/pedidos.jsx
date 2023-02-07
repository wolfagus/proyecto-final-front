import React from "react";
import { AiFillCheckSquare, IconName } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import "./admin.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import swal from "sweetalert";
import "./admin.css";
import { confirmarPedido, getAllPedidos } from "../../services/carritoService.js";

const  Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [productosSearch, setProductosSearch] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    setLoading(true);
    const fetchPedidos = async () => {
      const { data } = await getAllPedidos();
      setPedidos(data);
      setProductosSearch(data);
    };
    fetchPedidos();
    setLoading(false);
  }, []);


  return (
    <div className="admin">
      <div className="flex">
        <Sidebar />
        <Container className="content">
          <div className="container text-white mt-5">
            <h1 className="text-center mb-4">MENÚS</h1>

              <Loader isLoading={loading}>
                <InputGroup className="mb-3 my-3">
                  <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
                  <Form.Control
                    placeholder="Ingrese el pedido que desea buscar"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </InputGroup>
                <Table responsive striped bordered hover variant="dark">
                  <thead className="tHeadFormat">
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Estado</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosSearch.map((producto, index) => (
                      <tr>
                        <td>{++index}</td>
                        <td>{producto.detalles.map((Prod) => `${Prod.title} +  `)}</td>
                        <td>{producto.price}</td>
                        <td>{producto.isApproved ? 'Aprovado' : 'Pendiente'}</td>
                        <td>
                          <Button
                            type="button"
                            className="mx-2"
                            variant="success"
                            onClick={() => confirmarPedido(producto)}
                          >
                            <AiFillCheckSquare />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Loader>
            
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Pedidos;
