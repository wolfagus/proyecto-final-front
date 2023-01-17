import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { userRegister, updateUser } from "../../services/userService";
import Loader from "../Loader/Loader";
import swal from "sweetalert";
import "./formCreateUser.css";

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
    const { data } = await userRegister({ ...newUser });
    setNewUser({});
    const allUsers = [...users, data];
    console.log('User created');
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
      title: "Usuario editado exitosamente",
      icon: "success",
    });
    navigate("/admin/clients");
  };

  return (
    <div>
      <h1>{isEdit ? "Editar Usuario" : "Agregue un nuevo Usuario"}</h1>
      <Loader isLoading={isLoading || isEditLoading}>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="labelFormUser">Nombre</Form.Label>
            <Form.Control
              className="controlFormUser"
              required
              type="text"
              value={newUser?.name}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="labelFormUser">Email</Form.Label>
            <Form.Control
              required
              type="text"
              value={newUser?.email}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="role">
            <Form.Label className="labelFormUser">Rol</Form.Label>

            <Form.Select
              type="text"
              value={newUser?.role}
              onChange={(e) => handleChange(e)}
            >
              <option>ADMIN</option>
              <option>CLIENTE</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="labelFormUser">Password</Form.Label>
            <Form.Control
              type="password"
              value={newUser?.password}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Button type="button" onClick={isEdit ? editUser : createUser}>
            {isEdit ? "Editar" : "Agregar"}
          </Button>
        </Form>
      </Loader>
    </div>
  );
};

export default FormCreateUser;
