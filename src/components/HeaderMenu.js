import '../styles/HeaderMenu.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // 토큰 삭제
        navigate('/login'); // 로그인 페이지로 이동
    };

    return (
        <div className='nav'>
            <div className="nav-left">
                <img src={logo} alt="StrengthHub" className="nav-logo" />
                <h2 className='nav-logo-text'>StrengthHub</h2>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
                로그아웃
            </button>
        </div>
    );
};

export default Header;
