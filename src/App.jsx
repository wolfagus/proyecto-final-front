import { BrowserRouter } from 'react-router-dom';
import './App.css';
import PublicRoutes from './routes/PublicRoutes';

function App() {
  return (
    <BrowserRouter>
      <PublicRoutes/>
    </BrowserRouter>
  );
}

export default App;
