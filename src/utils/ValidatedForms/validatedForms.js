import * as yup from 'yup';


/*Schema de validacion para el formulario de registro */
export const schemaFormRegister = yup.object().shape({
  name: yup.string().max(20, 'Maximo de 20 caracteres').min(2, 'Minimo de 2 caracteres')
  .matches(/(^$)|[a-zA-Z]/, 'No se permiten signos especiales, solo letras').required('Campo obligatorio'),
  email: yup.string().email('El mail es inválido').required('Campo obligatorio'),
  password: yup
    .string()
    .required('Complete este campo obligatorio')
    .min(8, 'Debe tener minimo 8 y un maximo de 15 caracteres')
    .max(15, 'Debe tener minimo 8 y un maximo de 15 caracteres')
    .matches(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d).*$/, 'Debe tener almenos una minucula o mayúscula y un numero'),
  terms: yup.bool().required().oneOf([true], 'Debés aceptar los terminos y condiciones'),
});
/*Schema de validacion para el formulario de login */
export const schemaFormLogin = yup.object().shape({
  email: yup.string().email('El email es inválido').required('Campo obligatorio'),
  password: yup.string().required('Campo obligatorio').matches(/[a-zA-Z]/, ''),
});