import '../styles/HeaderMenu.css';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className='nav'>
            <div className="nav-left">
                <img src={logo} alt="StrengthHub" className="nav-logo" />
                <h2 className='nav-logo-text'>StrengthHub</h2>
            </div>

            <div className="nav-buttons">
                <button className="nav-btn" onClick={() => navigate('/challenges')}>챌린지</button>
                <button className="nav-btn" onClick={() => navigate('/inquiry')}>문의</button>
                <button className="nav-btn" onClick={() => navigate('/mypage')}>내정보</button>
                <button className="logout-btn" onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default Header;
