import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import { schemaFormLogin } from "../../utils/ValidatedForms/validatedForms";
import { userLogin } from "../../services/userService";
import { setLocalStorage } from "../../utils/localStorageHelper";
import { useNavigate } from "react-router-dom";
import { ActionTypes, useContextState } from "../../context/contextState";
import swal from "sweetalert";

const ButtonLogin = () => {
  const { setContextState } = useContextState();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="nav-links bg-transparent border-dark ml-5" size="sm" onClick={handleShow}>
        Iniciar Sesión
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Formik
            validationSchema={schemaFormLogin}
            onSubmit={async (values, actions) => {
              try {
                const { data } = await userLogin({
                email: values.email,
                password: values.password,
              }
              );
              console.log(data)
              setContextState({
                type: ActionTypes.SET_USER_LOGIN,
                value: true,
              });
              setContextState({
                type: ActionTypes.SET_USER_DATA,
                value: data.userData,
              });
              setLocalStorage("token", data.token);
              setLocalStorage("user", data.userData);
              if (data.userData.isVerified && data.userData.role === "ADMIN") {
                console.log(data.userData.isVerified, data.userData.role);
                navigate("/admin/clients");
              }
              actions.resetForm();
              } catch (error) {
                swal("Verifique que los datos ingresados sean correctos o que su correo electronico este verificado");
              }
              
            }}
            initialValues={{
              email: "",
              password: "",
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Correo electronico</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={values.email}
                      placeholder="ejemplo@ejemplo.com"
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      isInvalid={!!errors.email}
                      feedback={errors.email}
                      feedbackType="invalid"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="validationFormik02">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={values.password}
                      placeholder="******"
                      onChange={handleChange}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password}
                      feedback={errors.password}
                      feedbackType="invalid"
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <div className="d-flex justify-content-around">
                  <Button variant="danger" onClick={handleClose}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleClose}>
                    Ingresar
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ButtonLogin;