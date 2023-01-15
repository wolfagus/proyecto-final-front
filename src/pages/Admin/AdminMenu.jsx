import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProduct, getAllProducts } from '../../services/productService.js';
import { Button, Container, Form, InputGroup, Table } from 'react-bootstrap'
import FormCreateMenu from '../../components/FormMenu/FormCreateMenu';
import Loader from '../../components/Loader/Loader';
import Sidebar from '../../components/Sidebar'

const AdminMenu = () => {
    const [productos, setProductos] = useState([]);
    const [productosSearch, setProductosSearch] = useState([]);
    const [term, setTerm] = useState('');
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
    }, []);
  
    useEffect(() => {
      const search = productos.filter(prod => prod.name.toLowerCase().includes(term.toLowerCase()));
      setProductosSearch(search)
    }, [term, productos])
  
    const deleteProducto = async (id) => {
      setLoading(true);
      await deleteProduct(id);
      const filteredProducts = productos.filter(
        (producto) => producto._id !== id
      );
      setProductos(filteredProducts);
      setLoading(false);
    };

  return (
    <div className='admin'>
    <div className='flex'>
      <Sidebar/>
      <Container fluid className='content'>
      <div className="container mt-5">
      <h1 className="text-center mb-4">Admin</h1>
      <button
        className="btn btn-primary my-3"
        onClick={() => setCreateProduct(!createProduct)}
      >
        {createProduct ? 'Ver Tabla' : 'Agregar Menu'}
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
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productosSearch.map((producto, index) => (
                <tr>
                  <td>{++index}</td>
                  <td>{producto.name}</td>
                  <td>{producto.price}</td>
                  <td>{producto.categories?.name}</td>
                  <td>
                    <Button
                      type="button"
                      className="mx-2"
                      variant="danger"
                      onClick={() => deleteProducto(producto._id)}
                    >
                      D
                    </Button>
                    <Button
                      type="button"
                      className="mx-2"
                      variant="warning"
                      onClick={() =>
                        navigate(`/admin/edit/product/${producto._id}`)
                      }
                    >
                      E
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
  )
}

export default AdminMenu