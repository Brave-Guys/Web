import Header from './components/HeaderMenu.js';
import './App.css';
import Register from './pages/register.js'
import PageTitle from './components/PageTitle.js';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login.js'

function App() {
  return (
    <div>
      <Header />
      <div>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
