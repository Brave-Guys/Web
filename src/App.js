import Header from './components/HeaderMenu.js';
import './App.css';
import Register from './pages/register.js'
import PageTitle from './components/PageTitle.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <div className='content'>

        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>

      </div>
    </div>
  );
}

export default App;
