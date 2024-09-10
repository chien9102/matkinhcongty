import logo from './logo.svg';
import './App.css';
import AdminDashboard from './pages/admin/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
       <AdminDashboard></AdminDashboard>
    </BrowserRouter>
  );
}

export default App;
