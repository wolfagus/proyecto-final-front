import clientAxios from '../config/clientAxios';


// esta funcion sirve para traer todos los pedidos de la db
export const getAllPedidos = async () => {
  try {
    return await clientAxios.get('/allPedidos')
  } catch (error) {
    console.error(error);
  }
}
// funcion es para comprar los productos que estan en el carrito 
export const comprarProductos = async (data) => {
  try {
    console.log(data)
    return await clientAxios.post('/createPedido', data)
  } catch (error) {
    console.error(error);
  }
}

// esta funcion es para que el admin pueda confirmar el pedido una vez que vea realizado el pago 
export const confirmarPedido = async (data) => {
  try {
    console.log(data)
    return await clientAxios.post('/confirmPedido', data)
  } catch (error) {
    console.error(error);
  }
}