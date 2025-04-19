import Header from './components/HeaderMenu.js';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register.js'
import RegisterSuccess from './pages/register-success.js'
import Login from './pages/login.js'
import Main from './pages/main.js'
import Board from './pages/board.js'
import FindAccount from './pages/find-accout.js'
import Challenges from './pages/challengs.js'
import Mypage from './pages/mypage.js'
import WeeklyWorkout from './pages/weekly-workout.js';
import Masters from './pages/masters.js'
import SharePlus from './pages/share-plus.js'
import Inquiry from './pages/inquiry.js';
import Error from './pages/error.js'
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
          <Route path="/find-account" element={<FindAccount />} />
          <Route path="/challenges" element={<Challenges />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/masters" element={<Masters />} />
          <Route path="/weekly-workout" element={<WeeklyWorkout />} />
          <Route path="/share-plus" element={<SharePlus />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="*" element={< Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
