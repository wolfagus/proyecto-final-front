import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import FormCreateMenu from '../../components/FormMenu/FormCreateMenu';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getOneProduct } from '../../services/productService'; 
import './admin.css'

const MenuEdit = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data } = await getOneProduct(id);
      setProducto(data)
      setLoading(false);
    }
    getUser();
  }, [id]);


  return (
    <div className="admin">
      <div className='flex'>
      <Sidebar />
      <Container className='content text.white' fluid>
      <FormCreateMenu isEdit producto={producto} isEditLoading={loading} productId={id}/>
      </Container>
      </div>
    </div>
  );
};

export default MenuEdit;