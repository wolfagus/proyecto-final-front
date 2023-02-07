import clientAxios from '../config/clientAxios';

export const getAllPedidos = async () => {
  try {
    return await clientAxios.get('/allPedidos')
  } catch (error) {
    console.error(error);
  }
}

export const comprarProductos = async (data) => {
  try {
    console.log(data)
    return await clientAxios.post('/createPedido', data)
  } catch (error) {
    console.error(error);
  }
}

export const confirmarPedido = async (data) => {
  try {
    console.log(data)
    return await clientAxios.post('/confirmPedido', data)
  } catch (error) {
    console.error(error);
  }
}