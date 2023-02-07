import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { ActionTypes, useContextState } from '../../context/contextState';
import { userRegister } from '../../services/userService';
import { setLocalStorage } from '../../utils/localStorageHelper';
import { schemaFormRegister } from '../../utils/ValidatedForms/validatedForms';
import "./formCreateUser.css";

const FormRegister = () => {
  const { setContextState } = useContextState();
  const navigate = useNavigate();
  return (
    <Formik
      validationSchema={schemaFormRegister}
      onSubmit={async (values, actions) => {
        const {data} = await userRegister({
          password: values.password,
          email: values.email,
          name: values.name
        })
        console.log(data)
        setContextState({
          type: ActionTypes.SET_USER_LOGIN,
          value: true,
        })
        setContextState({
          type: ActionTypes.SET_USER_DATA,
          value: data.saveUser.email,
        })
        setLocalStorage('token', data.activeToken)
        setLocalStorage('user', data.saveUser.role)
        
        actions.resetForm();
      }}
      initialValues={{
        name: '',
        email: '',
        password: '',
        role: 'CLIENT',
        terms: false,
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
            <Form.Group as={Col} md="6" controlId="validationName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                isValid={touched.name && !errors.name}
                isInvalid={!!errors.name}
                feedback={errors.name}
                feedbackType="invalid"
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormikEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={values.email}
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
          <Row>
            <Form.Group as={Col} md="6" controlId="validationFormikPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
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
          <Form.Group className="mb-3 mt-3">
            <Form.Check
              required
              name="terms"
              label="Aceptar terminos y condiciones"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button className='bg-transparent border-0' type="submit" disabled={isSubmitting}>Registrarse</Button>
        </Form>
      )}
    </Formik>
  );
};

export default FormRegister;
