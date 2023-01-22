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
    const { data } = await createProducts({...newProduct, categories: selectCategories});
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
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={newProduct?.title}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="text"
              value={newProduct?.price}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="images">
            <Form.Label>Imágen</Form.Label>
            <Form.Control
              type="text"
              value={newProduct?.images}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="stock">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="text"
              value={newProduct?.stock}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Select className="my-4"onChange={(e) => setSelectCategories(e.target.value)}>
            <option disabled>Elegí la categoria</option>
            <option value={newProduct?.categories}>Entradas</option>
            <option value={newProduct?.categories}>Ensaladas</option>
            <option value={newProduct?.categories}>Menu Light</option>
            <option value={newProduct?.categories}>Pastas</option>
            <option value={newProduct?.categories}>Pizzas</option>
            <option value={newProduct?.categories}>Carnes</option>
            <option value={newProduct?.categories}>Pizzas</option>
            <option value={newProduct?.categories}>Pescados</option>
            <option value={newProduct?.categories}>Postres</option>

          </Form.Select>
          <Button type="button" onClick={isEdit ? editProduct : crearProducto}>
            {isEdit ? 'Editar' : 'Agregar'}
          </Button>
        </Form>
      </Loader>
    </div>
  );
};

export default FormCreateMenu;