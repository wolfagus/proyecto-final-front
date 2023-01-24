import clientAxios from '../config/clientAxios';

export const getAllProducts = async () => {
  try {
    return await clientAxios.get('/allProducts')
  } catch (error) {
    console.error(error);
  }
}

export const getOneProduct = async (_id) => {
  try {
    return await clientAxios.get(`/oneProduct/${_id}`)
  } catch (error) {
    console.error(error);
  }
}

export const createProducts = async (data) => {
  try {
    return await clientAxios.post('/createproducts', data)
  } catch (error) {
    console.error(error);
  }
}

export const deleteProduct = async (id) => {
  try {
    return await clientAxios.delete(`/deleteProducts/${id}`)
  } catch (error) {
    console.error(error);
  }
}

export const updateProduct = async (_id, newProduct) => {
  try {
    return await clientAxios.put(`/editProducts/${_id}`, newProduct)
  } catch (error) {
    console.error(error);
  }
}
