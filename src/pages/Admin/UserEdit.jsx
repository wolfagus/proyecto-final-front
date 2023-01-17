import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import FormCreateUser from '../../components/FormUser/FormCreateUser';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getOneUser } from '../../services/userService';
import './admin.css'

const UserEdit = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data } = await getOneUser(id);
      setUser(data)
      setLoading(false);
    }
    getUser();
  }, [id]);


  return (
    <div className="admin">
      <div className='flex'>
      <Sidebar />
      <Container className='content' fluid>
      <h1 className="text-center">USUARIOS</h1>
      <FormCreateUser isEdit user={user} isEditLoading={loading} userId={id}/>
      </Container>
      </div>
    </div>
  );
};

export default UserEdit;