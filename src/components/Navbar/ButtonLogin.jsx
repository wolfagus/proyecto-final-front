import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Formik } from 'formik';
import { schemaFormLogin } from '../../utils/ValidatedForms/validatedForms';
import { userLogin } from '../../services/userService';
import { setLocalStorage } from '../../utils/localStorageHelper';
import { useNavigate } from 'react-router-dom';
import { ActionTypes, useContextState } from '../../context/contextState';


const ButtonLogin = () => {

    const temporizadorDeRetraso =(data)=> {
         setTimeout(data, 3000);
      }
    const { setContextState } = useContextState();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btn btn-danger mx-3"
                  size="sm" onClick={handleShow}>
                Iniciar Sesión
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        validationSchema={schemaFormLogin}
                        onSubmit={async (values, actions) => {
                            const {data} = await userLogin({
                              email: values.email,
                              password: values.password,
                            })
                            setContextState({
                              type: ActionTypes.SET_USER_LOGIN,
                              value: true,
                            })
                            setContextState({
                              type: ActionTypes.SET_USER_DATA,
                              value: data.userData,
                            })
                            setLocalStorage('token', data.token)
                            setLocalStorage('user', data.userData)
                            if (data.userData.isVerified && data.userData.role === "ADMIN") {
                              console.log(data.userData.isVerified, data.userData.role)
                              navigate('/admin')
                            }
                            actions.resetForm();
                          }}
                        initialValues={{
                            email: '',
                            password: '',
                            terms: false,
                        }}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            values,
                            touched,
                            isValid,
                            errors,
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
                                        />
                                       
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

                                        <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                                    </Form.Group>

                                </Row>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        required
                                        name="terms"
                                        label="aceptar terminos y condiciones"
                                        onChange={handleChange}
                                        isInvalid={!!errors.terms}
                                        feedback={errors.terms}
                                        feedbackType="invalid"
                                        id="validationFormik0"
                                    />
                                </Form.Group>
                                <div className='d-flex justify-content-around'>
                                    <Button variant="danger" onClick={handleClose}>Cancelar</Button>
                                    <Button type="submit" onClick={temporizadorDeRetraso(handleClose)}
                                    >Ingresar</Button>
                                </div>



                            </Form>
                        )}
                    </Formik>

                </Modal.Body>


            </Modal>
        </>
    );
}

export default ButtonLogin;