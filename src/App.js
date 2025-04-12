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

        <PageTitle
          title="페이지 제목"
          description="해당 페이지에 대한 설명"
          showBackArrow={true}
        />

        <Routes>
          <Route path="/register" element={<Register />} />
        </Routes>

        <div>
          <p>asdfasdf</p>
        </div>
      </div>
    </div>
  );
}

export default App;
