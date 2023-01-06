import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Admin from './pages/Admin';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <BrowserRouter>
      <PublicRoutes/>
    </BrowserRouter>
  );
}

export default App;
