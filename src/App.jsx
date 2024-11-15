import logo from './logo.svg';
import './App.css';
import './styles/client.css';
import AdminDashboard from './pages/admin/AdminDashboard';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Main from './pages/client/Main';
import Footer from './components/Footer';
import Detail from './components/Detail';
import Home from './pages/client/Home';
function App() {
  return (
    <BrowserRouter>
      <AdminDashboard></AdminDashboard>
      {/* <Home/> */}
    </BrowserRouter>
  );
}

export default App;
