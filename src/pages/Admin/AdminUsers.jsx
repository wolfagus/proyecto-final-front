import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUser } from "../../services/userService.js";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import FormCreateUser from "../../components/FormUser/FormCreateUser";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar";
import './admin.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  const [term, setTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [createUser, setCreateUser] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchUser = async () => {
      const { data } = await getAllUser();
      setUsers(data);
      setUserSearch(data);
    };
    fetchUser();
    setLoading(false);
  }, []);

  useEffect(() => {
    const search = users.filter((prod) =>
      prod.name.toLowerCase().includes(term.toLowerCase())
    );
    setUserSearch(search);
  }, [term, users]);

  const deleteUsuario = async (_id) => {
    setLoading(true);
    await deleteUser(_id);
    const filteredUsers = users.filter((user) => user._id !== _id);
    setUsers(filteredUsers);
    setLoading(false);
  };

  return (
    <div className="admin">
      <div className="flex">
        <Sidebar />
        <Container fluid className="content">
          <div className="container mt-5">
            <h1 className="text-center mb-4">Admin</h1>
            <button
              className="btn btn-primary my-3"
              onClick={() => setCreateUser(!createUser)}
            >
              {createUser ? "Ver Tabla" : "Agregar un nuevo usuario"}
            </button>
            {createUser ? (
              <FormCreateUser
                setCreateUser={setCreateUser}
                users={users}
                setUsers={setUsers}
                setUserSearch={setUserSearch}
              />
            ) : (
              <Loader isLoading={loading}>
                <InputGroup className="mb-3 my-3">
                  <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
                  <Form.Control
                    placeholder="Ingrese el nombre del usuario..."
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setTerm(e.target.value)}
                  />
                </InputGroup>
                <Table className="tableUser" striped bordered hover variant="dark">
                  <thead className="headUser">
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Fecha de creacion</th>
                      <th>Rol</th>
                      <th>Fecha eliminación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userSearch.map((user, index) => (
                      <tr>
                        <td>{++index}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.createdAt}</td>
                        <td>{user.role}</td>
                        <td>{user.deleteAt}</td>
                        <td>
                          <Button
                            type="button"
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteUsuario(user._id)}
                          >
                            D
                          </Button>
                          <Button
                            type="button"
                            className="mx-2"
                            variant="warning"
                            onClick={() =>
                              navigate(`/admin/edit/user/${user._id}`)
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
  );
};

export default AdminUsers;
