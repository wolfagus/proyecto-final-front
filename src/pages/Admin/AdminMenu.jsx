import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getAllProducts,
} from "../../services/productService.js";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import FormCreateMenu from "../../components/FormMenu/FormCreateMenu";
import Loader from "../../components/Loader/Loader";
import "./admin.css";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import swal from "sweetalert";
import "./admin.css";

const AdminMenu = () => {
  const [productos, setProductos] = useState([]);
  const [productosSearch, setProductosSearch] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [createProduct, setCreateProduct] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const { data } = await getAllProducts();
      setProductos(data);
      setProductosSearch(data);
    };
    fetchProducts();
    setLoading(false);
  }, [productos]);

  useEffect(() => {
    const search = productos.filter((prod) =>
      prod.title.toLowerCase().includes(term.toLowerCase())
    );
    setProductosSearch(search);
  }, [term, productos]);

  const deleteProducto = async (id) => {
    setLoading(true);
    swal({
      title: "Esta seguro que desea eliminar el menu?",
      text: "Si acepta, eliminará el producto",
      icon: "warning",
      buttons: ["CANCELAR", "ACEPTO"],
      dangerMode: true,
    }).then((res) => {
      if (res) {
        swal("El menu ha sido eliminado!", {
          icon: "success",
        });
        deleteProduct(id);
        navigate("/admin/menu");
      } else {
        swal("Cancelaste la eliminación!");
      }
    });
    setLoading(false);
  };

  return (
    <div className="admin">
      <div className="flex">
        <Sidebar />
        <Container className="content">
          <div className="container text-white mt-5">
            <h1 className="text-center mb-4">MENÚS</h1>
            <button
              className="btn btn-primary my-3"
              onClick={() => setCreateProduct(!createProduct)}
            >
              {createProduct ? "Ver Tabla" : "Agregar Menu"}
            </button>
            {createProduct ? (
              <FormCreateMenu
                setCreateProduct={setCreateProduct}
                productos={productos}
                setProductos={setProductos}
                setProductosSearch={setProductosSearch}
              />
            ) : (
              <Loader isLoading={loading}>
                <InputGroup className="mb-3 my-3">
                  <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
                  <Form.Control
                    placeholder="Ingrese el menu que desea buscar"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </InputGroup>
                <Table responsive striped bordered hover variant="dark">
                  <thead className="tHeadFormat">
                    <tr>
                      <th>#</th>
                      <th className="th-image">Imagen</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Categoria</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productosSearch.map((producto, index) => (
                      producto.isActive &&  <tr>
                        <td>{++index}</td>
                        <td className="td-image">
                          <img
                            src={producto.images}
                            className="img_menu"
                            alt=""
                          />
                        </td>
                        <td>{producto.title}</td>
                        <td>{producto.price}</td>
                        <td>{producto.stock}</td>
                        <td>{producto.categories}</td>
                        <td>
                          <Button
                            type="button"
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteProducto(producto._id)}
                          >
                            <FaRegTrashAlt />
                          </Button>
                          <Button
                            type="button"
                            className="mx-2"
                            variant="warning"
                            onClick={() =>
                              navigate(`/admin/edit/product/${producto._id}`)
                            }
                          >
                            <FaUserEdit />
                          </Button>
                        </td>
                      </tr>
                      
                    ))}
                  </tbody>
                </Table>
              </Loader>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default AdminMenu;
