import Header from './components/HeaderMenu.js';
import './App.css';
import Register from './pages/register.js'
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login.js'
import Main from './pages/main.js'

function App() {
  return (
    <div>
      <Header />
      <div>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
        </Routes>


      </div>
    </div>
  );
}

export default App;
