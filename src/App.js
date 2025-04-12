import Header from './components/HeaderMenu.js';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register.js'
import Login from './pages/login.js'
import Board from './pages/board.js'
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
        </Routes>


      </div>
    </div>
  );
}

export default App;
