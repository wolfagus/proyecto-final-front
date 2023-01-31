import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { ActionTypes, useContextState } from './context/contextState';
import PublicRoutes from './routes/PublicRoutes';
import { getLocalStorage } from './utils/localStorageHelper';
import { useEffect } from 'react';


function App() {
  const { setContextState } = useContextState();

  useEffect(() => {
    const haveUser = getLocalStorage('token');
    if (haveUser) {
      setContextState({ type: ActionTypes.SET_USER_LOGIN, value: true });
    }
    
  }, []);
  return (
    <BrowserRouter>
      <PublicRoutes/>
    </BrowserRouter>
  );
}

export default App;
