import { Navigate } from 'react-router-dom';
import { useContextState } from '../context/contextState';

const PrivateRoutes = ({children}) => {
  const { contextState } = useContextState();
  return (
    contextState.userData.role === 'ADMIN' ? children : <Navigate to='/' />
  )
}

export default PrivateRoutes