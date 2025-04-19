import '../styles/HeaderMenu.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { FaCrown, FaTrophy, FaQuestionCircle, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const username = user?.name || '로그인';

    return (
        <div className='nav'>
            <div className="nav-left" onClick={() => navigate('/main')} style={{ cursor: 'pointer' }}>
                <img src={logo} alt="StrengthHub" className="nav-logo" />
                <h2 className='nav-logo-text'>StrengthHub</h2>
            </div>

            <div className="nav-icons">
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
                    <span>문의</span>
                </div>
                <div className="icon-btn" onClick={() => navigate(user ? '/mypage' : '/login')}>
                    <FaUserCircle className="icon" />
                    <span>{username}</span>
                </div>
            </div>
        </div>
    );
};

export default Header;
