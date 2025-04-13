import Header from './components/HeaderMenu.js';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register.js'
import RegisterSuccess from './pages/register-success.js'
import Login from './pages/login.js'
import Main from './pages/main.js'
import Board from './pages/board.js'
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/board" element={<Board />} />
        </Routes>


      </div>
    </div>
  );
}

export default App;
