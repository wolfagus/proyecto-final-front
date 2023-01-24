import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser, getAllUser } from "../../services/userService.js";
import { Button, Container, Form, InputGroup, Table } from "react-bootstrap";
import FormCreateUserFormik from "../../components/FormUser/FormCreateUserFormik";
import Loader from "../../components/Loader/Loader";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./admin.css";
import { FaRegTrashAlt, FaUserEdit } from "react-icons/fa";
import swal from "sweetalert";

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
  swal({
    title: "Esta seguro que desea eliminar el usuario?",
    text: "Si acepta, el usuario quedará inactivo",
    icon: "warning",
    buttons: ["CANCELAR", "ACEPTO"],
    dangerMode: true,
  })
  .then((res) => {
    if (res) {
      swal("El usuario ha sido eliminado!", {
        icon: "success",
      });
     deleteUser(_id);
     navigate("/admin/clients")
     window.location.reload();
    } else {
      swal("Cancelaste la eliminación!");
    }
  })
  setLoading(false);
};


/*   const deleteUsuario = async (_id) => {
    setLoading(true);
    await deleteUser(_id);
    const filteredUsers = users.filter((user) => user._id !== _id);
    setUsers(filteredUsers);
    setLoading(false);
  }; */

  return (
    <div className="admin">
      <div className="flex">
        <Sidebar />
        <Container fluid className="content">
          <div className="container">
            <h1 className="text-center mb-4">USUARIOS</h1>
            <button
              className="btn btn-primary my-3"
              onClick={() => setCreateUser(!createUser)}
            >
              {createUser ? "Ver Tabla" : "Agregar un nuevo usuario"}
            </button>
            {createUser ? (
              
              <FormCreateUserFormik
              
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
                <Table
                  responsive
                  striped
                  bordered
                  hover
                  variant="dark"
                >
                  <thead className="tHeadFormat">
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
                        <td className="tdAction">
                          <Button
                            type="button"
                            className="mx-2"
                            variant="danger"
                            onClick={() => deleteUsuario(user._id)}
                          >
                            <FaRegTrashAlt />
                          </Button>
                          <Button
                            type="button"
                            className="mx-2"
                            variant="warning"
                            onClick={() =>
                              navigate(`/admin/edit/user/${user._id}`)
                            }
                          >
                            <FaUserEdit/>
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
