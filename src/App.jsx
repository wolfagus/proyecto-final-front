import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ActionTypes, useContextState } from './context/contextState';
import PublicRoutes from './routes/PublicRoutes';
import { getLocalStorage } from './utils/localStorageHelper';
import { useEffect } from 'react';


function App() {
  const { contextState,setContextState } = useContextState();

  useEffect(() => {
    const haveUser = getLocalStorage('token');
    const haveUserData = getLocalStorage('user');
    if (haveUser) {
      setContextState({ type: ActionTypes.SET_USER_LOGIN, value: true });
      setContextState({ type: ActionTypes.SET_USER_DATA, value: haveUserData });
    }
  }, []);

  return (
    <BrowserRouter>
      <PublicRoutes/>
    </BrowserRouter>
  );
}

export default App;
