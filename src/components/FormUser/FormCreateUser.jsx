import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { userRegister, updateUser } from '../../services/userService';
import Loader from '../Loader/Loader';
import swal from 'sweetalert';

const FormCreateUser = ({
  setCreateUser,
  users,
  setUsers,
  setUsersSearch,
  isEdit,
  user,
  isEditLoading,
  userId,
}) => {
  const [newUser, setNewUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setIsLoading(true);
    setNewUser(user);
    setIsLoading(false);
  }, [user]);

  const createUser = async () => {
    setIsLoading(true);
    const { data } = await userRegister({...newUser});
    setNewUser({});
    const allUsers = [...users, data];
    setUsers(allUsers);
    setUsersSearch(allUsers);
    setIsLoading(false);
    setCreateUser(false);
  };

  const editUser = async () => {
    setIsLoading(true);
    await updateUser(userId, newUser);
    setIsLoading(false);
    swal({
      title: 'Usuario editado exitosamente',
      icon: 'success',
    });
    navigate('/admin/clients');
  };

  return (
    <div>
      <h1>{isEdit ? 'Editar Usuario' : 'Agregue un nuevo Usuario'}</h1>
      <Loader isLoading={isLoading || isEditLoading}>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={newUser?.name}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={newUser?.email}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Rol</Form.Label>
            <Form.Control
              type="text"
              value={newUser?.role}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="text"
              value={newUser?.password}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Button type="button" onClick={isEdit ? editUser : createUser}>
            {isEdit ? 'Editar' : 'Agregar'}
          </Button>
        </Form>
      </Loader>
    </div>
  );
};

export default FormCreateUser;