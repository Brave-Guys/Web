import Header from './components/HeaderMenu.js';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register.js';
import RegisterSuccess from './pages/register-success.js';
import Login from './pages/login.js';
import Main from './pages/main.js';
import Board from './pages/board.js';
import FindAccount from './pages/find-accout.js';
import Challenges from './pages/challenges.js';
import Mypage from './pages/mypage.js';
import WeeklyWorkout from './pages/weekly-workout.js';
import Masters from './pages/masters.js';
import SharePlus from './pages/share-plus.js';
import Inquiry from './pages/inquiry.js';
import Error from './pages/error.js';
import WorkoutLog from './pages/workoutlog.js';
import ExerciseTip from './pages/exercisetip.js';
import PostDetail from './pages/postdetail.js';
import WritePost from './pages/writepost.js';
import EditPost from './pages/editpost.js';
import SearchResult from './pages/searchResult.js';
import ChallengeWrite from './pages/challengeWrite.js';
import ChallengeDetail from './pages/challengeDetail.js';
import EditChallenge from './pages/EditChallenge.js';
import ParticipantDetail from './pages/ParticipantDetail.js';
import MyChallengeHistory from './pages/MyChallengeHistory.js';
import HowToBeMaster from './pages/howToBeMaster.js';
import ApplyMaster from './pages/applyMaster.js';
import AdminRoom from './pages/adminRoom.js';
import SeniorDetail from './pages/SeniorDetail.js';
import SharePlusApply from './pages/SharePlusApply.js';
import SeniorRoom from './pages/SeniorRoom.js';
import SeniorRequestDetail from './pages/SeniorRequestDetail.js';
import ShareChat from './pages/ShareChat.js';
import SharePlan from './pages/SharePlan.js';

import ExerciseTipChest from './pages/exercise-tip-detail/ExerciseTipChest';
import ExerciseTipShoulder from './pages/exercise-tip-detail/ExerciseTipShoulder';
import ExerciseTipBack from './pages/exercise-tip-detail/ExerciseTipBack';
import ExerciseTipBicep from './pages/exercise-tip-detail/ExerciseTipBicep';
import ExerciseTipAbs from './pages/exercise-tip-detail/ExerciseTipAbs';
import ExerciseTipThigh from './pages/exercise-tip-detail/ExerciseTipThigh';
import ExerciseTipTricep from './pages/exercise-tip-detail/ExerciseTipTricep';
import ExerciseTipHamstring from './pages/exercise-tip-detail/ExerciseTipHamstring';

import './App.css';
import { Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import Footer from './components/Footer';
import MasterRequestDetail from './pages/MasterRequestDetail.js';

const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {!hideHeader && <Header />}
      <div style={{ flex: 1 }} className='content'>
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
          <Route path="/search" element={<PrivateRoute><SearchResult /></PrivateRoute>} />

          <Route path="/exercise-tip" element={<PrivateRoute><ExerciseTip /></PrivateRoute>} />
          <Route path="/exercise-tip/chest" element={<PrivateRoute><ExerciseTipChest /></PrivateRoute>} />
          <Route path="/exercise-tip/shoulder" element={<PrivateRoute><ExerciseTipShoulder /></PrivateRoute>} />
          <Route path="/exercise-tip/back" element={<PrivateRoute><ExerciseTipBack /></PrivateRoute>} />
          <Route path="/exercise-tip/bicep" element={<PrivateRoute><ExerciseTipBicep /></PrivateRoute>} />
          <Route path="/exercise-tip/abs" element={<PrivateRoute><ExerciseTipAbs /></PrivateRoute>} />
          <Route path="/exercise-tip/thigh" element={<PrivateRoute><ExerciseTipThigh /></PrivateRoute>} />
          <Route path="/exercise-tip/tricep" element={<PrivateRoute><ExerciseTipTricep /></PrivateRoute>} />
          <Route path="/exercise-tip/hamstring" element={<PrivateRoute><ExerciseTipHamstring /></PrivateRoute>} />

          <Route path="/writepost" element={<PrivateRoute><WritePost /></PrivateRoute>} />
          <Route path="/post/:id" element={<PrivateRoute><PostDetail /></PrivateRoute>} />
          <Route path="/challenges/:id" element={<PrivateRoute><ChallengeDetail /></PrivateRoute>} />
          <Route path="/edit-challenge/:id" element={<PrivateRoute><EditChallenge /></PrivateRoute>} />
          <Route path="/editpost/:id" element={<PrivateRoute><EditPost /></PrivateRoute>} />
          <Route path="/create-challenge" element={<PrivateRoute><ChallengeWrite /></PrivateRoute>} />
          <Route path="/challenges/:challengeId/participants/:participantId" element={<PrivateRoute><ParticipantDetail /></PrivateRoute>} />
          <Route path="/mychallengehistory" element={<PrivateRoute><MyChallengeHistory /></PrivateRoute>} />
          <Route path="/how-to-be-master" element={<PrivateRoute><HowToBeMaster /></PrivateRoute>} />
          <Route path="/apply-master" element={<PrivateRoute><ApplyMaster /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminRoom /></PrivateRoute>} />
          <Route path="/admin/apply/:id" element={<PrivateRoute><MasterRequestDetail /></PrivateRoute>} />
          <Route path="/masters/:id" element={<PrivateRoute><SeniorDetail /></PrivateRoute>} />
          <Route path="/shareplus/apply/:seniorId" element={<PrivateRoute><SharePlusApply /></PrivateRoute>} />
          <Route path="/senior" element={<PrivateRoute><SeniorRoom /></PrivateRoute>} />
          <Route path="/senior/requests/:id" element={<PrivateRoute><SeniorRequestDetail /></PrivateRoute>} />
          <Route path="/share/:id/chat" element={<PrivateRoute><ShareChat /></PrivateRoute>} />
          <Route path="/share-plan" element={<PrivateRoute><SharePlan /></PrivateRoute>} />

          {/* 404 */}
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
      {!hideHeader && <Footer />}
    </div>
  );
}

export default App;
