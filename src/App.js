import Header from './components/HeaderMenu.js';
import './App.css';
import Register from './pages/register.js'
import CustomButton from './components/CustomButton.js';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header />
      <div className='content'>

        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>

        <CustomButton
          label="중복 확인"
          size="small"
          color="gray"
          rounded="pill"
        />

        <CustomButton
          label="완료"
          size="large"
          color="green"
          rounded="pill"
        />

        <CustomButton
          label="위험"
          size="small"
          color="red"
          rounded="square"
        />

      </div>
    </div>
  );
}

export default App;
