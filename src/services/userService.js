import clientAxios from '../config/clientAxios';

// esta funcion es para regitrarse 
export const userRegister = async (data) => {
  try {
    console.log(data)
    return await clientAxios.post('/registerUser', data)
  } catch (error) {
    console.error(error);
  }
}
// esta funcion trae todos los usuarios de la db
export const getAllUser = async () => {
  try {
    return await clientAxios.get('/users')
  } catch (error) {
    console.error(error);
  }
}
//esta funcion trae un usuario en particular a travez del id 
export const getOneUser = async (_id) => {
  try {
    return await clientAxios.get(`/user/${_id}`)
  } catch (error) {
    console.error(error);
  }
}
// esta funcion es para logearse
export const userLogin = async (data) => {
  try {
    return await clientAxios.post('/login', data)
  } catch (error) {
    console.error(error);
  }
}
// esta fucnion es para eliminar un usuario, lo busca atravez del id y coloca isActive en false
export const deleteUser = async (_id) => {
  try {
    return await clientAxios.delete(`/deleteUser/${_id}`)
  } catch (error) {
    console.error(error);
  }
}
// esta funcion es para actualizar el usuario
export const updateUser = async (_id, newUser) => {
  try {
    return await clientAxios.put(`/editUser/${_id}`, newUser)
  } catch (error) {
    console.error(error);
  }
}
