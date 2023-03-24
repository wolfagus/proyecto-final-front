import React from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import Loader from "../../components/Loader/Loader";
import "./admin.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import swal from "sweetalert";
import {
  confirmarPedido,
  getAllPedidos,
} from "../../services/carritoService.js";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [productosSearch, setProductosSearch] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPedidos = async () => {
      const { data } = await getAllPedidos();
      setPedidos(data);
      setProductosSearch(data);
      setLoading(false);
    };
    fetchPedidos();
  }, [pedidoConfirmado]);

  const handleConfirmarPedido = (producto) => {
    swal({
      title: "¿Está seguro de que desea confirmar este pedido?",
      icon: "warning",
      buttons: {
        cancel: "Cancelar",
        confirm: {
          text: "Confirmar",
          className: "btn-success",
        },
      },
      dangerMode: true,
    }).then((confirmado) => {
      if (confirmado) {
        confirmarPedido(producto);
        swal("Pedido confirmado con éxito!", {
          icon: "success",
        }).then(() => {
          setPedidoConfirmado(true); // Actualiza el estado de pedidoConfirmado
        });
      } else {
        swal("Pedido no confirmado.");
      }
    });
  };

  const handleSearch = (e) => {
    setTerm(e.target.value);
    const searchTerm = e.target.value.toLowerCase();
    const filteredPedidos = pedidos.filter((pedido) =>
      pedido.detalles.some(
        (detalle) =>
          detalle.title.toLowerCase().includes(searchTerm) ||
          pedido.isApproved.toString().toLowerCase().includes(searchTerm)
      )
    );
    setProductosSearch(filteredPedidos);
  };

  return (
    <div className="admin">
      <div className="flex">
        <Sidebar />
        <Container className="content">
          <div className="container text-white mt-5">
            <h1 className="text-center mb-4">PEDIDOS</h1>

            <Loader isLoading={loading}>
              <InputGroup className="mb-3 my-3">
                <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
                <Form.Control
                  placeholder="Ingrese el pedido que desea buscar"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={term}
                  onChange={handleSearch}
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
                      <td>
                        {producto.detalles
                          .map((Prod) => Prod.title)
                          .join(" + ")}
                      </td>
                      <td>{producto.price}</td>
                      <td>{producto.isApproved ? "Aprobado" : "Pendiente"}</td>
                      <td>
                        <Button
                          type="button"
                          className="mx-2"
                          variant="success"
                          onClick={() => handleConfirmarPedido(producto)}
                        >
                          <AiFillCheckSquare />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {productosSearch.length === 0 && (
                <p className="text-center">No se encontraron resultados</p>
              )}
            </Loader>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Pedidos;
