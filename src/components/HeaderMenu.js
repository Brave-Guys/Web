import '../styles/HeaderMenu.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {
    FaCrown,
    FaTrophy,
    FaQuestionCircle,
    FaUserCircle,
    FaVideo,
    FaShareAlt,
    FaBookOpen,
    FaComments,
    FaClipboardList
} from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const username = user?.name || '로그인';

    return (
        <div className='nav'>
            <div className="nav-left">
                <div className="logo-wrapper" onClick={() => navigate('/main')}>
                    <img src={logo} alt="StrengthHub" className="nav-logo" />
                    <h2 className='nav-logo-text'>StrengthHub</h2>
                </div>

                <div className="nav-links">
                    <div className="icon-btn" onClick={() => navigate('/weekly-workout')}>
                        <FaVideo className="icon" />
                        <span>금주의 운동</span>
                    </div>
                    <div className="icon-btn" onClick={() => navigate('/share-plus')}>
                        <FaShareAlt className="icon" />
                        <span>Share+</span>
                    </div>
                    <div className="icon-btn" onClick={() => navigate('/exercise-tip')}>
                        <FaBookOpen className="icon" />
                        <span>운동 설명서</span>
                    </div>
                    <div className="icon-btn" onClick={() => navigate('/board')}>
                        <FaComments className="icon" />
                        <span>커뮤니티</span>
                    </div>
                    <div className="icon-btn" onClick={() => navigate('/workoutlog')}>
                        <FaClipboardList className="icon" />
                        <span>운동 기록</span>
                    </div>
                    <div className="icon-btn" onClick={() => navigate('/masters')}>
                        <FaCrown className="icon" />
                        <span>상급자</span>
                    </div>
                    <div className="icon-btn" onClick={() => navigate('/challenges')}>
                        <FaTrophy className="icon" />
                        <span>챌린지</span>
                    </div>
                    <div className="icon-btn" onClick={() => navigate('/inquiry')}>
                        <FaQuestionCircle className="icon" />
                        <span>문의하기</span>
                    </div>
                </div>
            </div>

            <div className="nav-right">
                <div className="icon-btn" onClick={() => navigate(user ? '/mypage' : '/login')}>
                    {user?.imgUrl ? (
                        <img src={user.imgUrl} alt="프로필" className="profile-image" />
                    ) : (
                        <FaUserCircle className="icon" />
                    )}
                    <span>{username}</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
