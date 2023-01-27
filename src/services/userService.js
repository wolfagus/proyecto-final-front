import clientAxios from '../config/clientAxios';

export const userRegister = async (data) => {
  try {
    console.log(data)
    return await clientAxios.post('/registerUser', data)
  } catch (error) {
    console.error(error);
  }
}

export const getAllUser = async () => {
  try {
    return await clientAxios.get('/users')
  } catch (error) {
    console.error(error);
  }
}

export const getOneUser = async (_id) => {
  try {
    return await clientAxios.get(`/user/${_id}`)
  } catch (error) {
    console.error(error);
  }
}

export const userLogin = async (data) => {
  try {
    console.log(data)
    return await clientAxios.post('/login', data)
    
  } catch (error) {
    console.error(error);
  }
}

export const deleteUser = async (_id) => {
  try {
    return await clientAxios.delete(`/deleteUser/${_id}`)
  } catch (error) {
    console.error(error);
  }
}

export const updateUser = async (_id, newUser) => {
  try {
    return await clientAxios.put(`/editUser/${_id}`, newUser)
  } catch (error) {
    console.error(error);
  }
}
