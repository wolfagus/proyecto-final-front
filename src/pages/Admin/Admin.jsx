import React from 'react'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import FormCreateProduct from '../../components/FormMenu/FormCreateMenu.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import { deleteProduct, getAllProducts } from '../../services/productService.js';
import './admin.css'

 const Admin = () => {
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
    const search = productos.filter(prod => prod.title.toLowerCase().includes(term.toLowerCase()));
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
      
      </div>
      </div>
      )
}

export default Admin