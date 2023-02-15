import clientAxios from '../config/clientAxios';

// esta funcion es para traer todos los productos de la db
export const getAllProducts = async () => {
  try {
    return await clientAxios.get('/allProducts')
  } catch (error) {
    console.error(error);
  }
}

// esta funcion es para poder ver un producto en particular
export const getOneProduct = async (_id) => {
  try {
    return await clientAxios.get(`/oneProduct/${_id}`)
  } catch (error) {
    console.error(error);
  }
}
// esta funcion es para crear los productos
export const createProducts = async (data) => {
  try {
    console.log(data)
    return await clientAxios.post('/createproducts', data)
  } catch (error) {
    console.error(error);
  }
}
// esta funcion es para eliminar un producto a travez del id, coloca isDelete en true y isActive en false
export const deleteProduct = async (id) => {
  try {
    return await clientAxios.delete(`/deleteProducts/${id}`)
  } catch (error) {
    console.error(error);
  }
}
// esta funcion es para actualizar los productos, recibe el id del producto que se va a actualizar y los nuevos parametros
export const updateProduct = async (_id, newProduct) => {
  try {
    return await clientAxios.put(`/editProducts/${_id}`, newProduct)
  } catch (error) {
    console.error(error);
  }
}
