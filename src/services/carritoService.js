import clientAxios from '../config/clientAxios';

export const comprarProductos = async (data) => {
  try {
    console.log(data)
    return await clientAxios.post('/createPedido', data)
  } catch (error) {
    console.error(error);
  }
}