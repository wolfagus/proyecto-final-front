import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { createProducts, updateProduct } from '../../services/productService';
import Loader from '../Loader/Loader';
import swal from 'sweetalert';

const FormCreateMenu = ({
  setCreateProduct,
  productos,
  setProductos,
  setProductosSearch,
  isEdit,
  producto,
  isEditLoading,
  productId,
}) => {
  const [newProduct, setNewProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectCategories, setSelectCategories] = useState('')
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setIsLoading(true);
    setNewProduct(producto);
    setIsLoading(false);
  }, [producto]);

  const crearProducto = async () => {
    setIsLoading(true);
    const { data } = await createProducts({...newProduct, categories: selectCategories, });
    console.log(data)
    setNewProduct({});
    const allProducts = [...productos, data];
    setProductos(allProducts);
    setProductosSearch(allProducts);
    setIsLoading(false);
    setCreateProduct(false);
  };

  const editProduct = async () => {
    setIsLoading(true);
    await updateProduct(productId, newProduct);
    setIsLoading(false);
    swal({
      title: 'Producto editado exitosamente',
      icon: 'success',
    });
    navigate('/admin/menu');
  };

  return (
    <div>
      <h1>{isEdit ? 'Editar Producto' : 'Agregue un nuevo Menu'}</h1>
      <Loader isLoading={isLoading || isEditLoading}>
        <Form>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label className='text-white'>Nombre</Form.Label>
            <Form.Control
              minlength='4'
              maxlength='20'
              required
              type="text"
              value={newProduct?.title}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label className='text-white'>Precio</Form.Label>
            <Form.Control
              required
              type="number"
              value={newProduct?.price}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="images">
            <Form.Label className='text-white'>Imágen</Form.Label>
            <Form.Control
              required
              type="text"
              value={newProduct?.images}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label className='text-white'>Stock</Form.Label>
            <Form.Control
              required
              type="number"
              value={newProduct?.stock}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="categories">
            <Form.Label className="labelFormUser">Categoria</Form.Label>
            <Form.Select
              required
              type="text"
              value={newProduct?.categories}
              onChange={(e) => handleChange(e)}
            >
              <option>Entradas</option>
              <option>Ensaladas</option>
              <option>Minutas</option>
              <option>Menu Light</option>
              <option>Pastas</option>
              <option>Pizzas</option>
              <option>Carnes</option>
              <option>Pescados</option>
              <option>Postres</option>
            </Form.Select>
          </Form.Group>
          <Button type="button" onClick={isEdit ? editProduct : crearProducto}>
            {isEdit ? 'Editar' : 'Agregar'}
          </Button>
        </Form>
      </Loader>
    </div>
  );
};

export default FormCreateMenu;