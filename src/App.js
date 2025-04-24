import Header from './components/HeaderMenu.js';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register.js';
import RegisterSuccess from './pages/register-success.js';
import Login from './pages/login.js';
import Main from './pages/main.js';
import Board from './pages/board.js';
import FindAccount from './pages/find-accout.js';
import Challenges from './pages/challengs.js';
import Mypage from './pages/mypage.js';
import WeeklyWorkout from './pages/weekly-workout.js';
import Masters from './pages/masters.js';
import SharePlus from './pages/share-plus.js';
import Inquiry from './pages/inquiry.js';
import Error from './pages/error.js';
import WorkoutLog from './pages/workoutlog.js';
import ExerciseTip from './pages/exercisetip.js';
import PostDetail from './pages/postdetail.js';
import './App.css';
import { Navigate } from 'react-router-dom';
import WritePost from './pages/writepost.js';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          {/* 공개 페이지 */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register-success" element={<RegisterSuccess />} />
          <Route path="/find-account" element={<FindAccount />} />

          {/* 보호된 페이지 */}
          <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
          <Route path="/main" element={<PrivateRoute><Main /></PrivateRoute>} />
          <Route path="/board" element={<PrivateRoute><Board /></PrivateRoute>} />
          <Route path="/challenges" element={<PrivateRoute><Challenges /></PrivateRoute>} />
          <Route path="/mypage" element={<PrivateRoute><Mypage /></PrivateRoute>} />
          <Route path="/weekly-workout" element={<PrivateRoute><WeeklyWorkout /></PrivateRoute>} />
          <Route path="/masters" element={<PrivateRoute><Masters /></PrivateRoute>} />
          <Route path="/share-plus" element={<PrivateRoute><SharePlus /></PrivateRoute>} />
          <Route path="/inquiry" element={<PrivateRoute><Inquiry /></PrivateRoute>} />
          <Route path="/workoutlog" element={<PrivateRoute><WorkoutLog /></PrivateRoute>} />
          <Route path="/exercise-tip" element={<PrivateRoute><ExerciseTip /></PrivateRoute>} />
          <Route path="/writepost" element={<PrivateRoute><WritePost /></PrivateRoute>} />
          <Route path="/post/:id" element={<PrivateRoute><PostDetail /></PrivateRoute>} />

          {/* 404 */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
