import '../styles/HeaderMenu.css';
import logo from '../assets/logo.png';
import DefaultAvatar from '../assets/person.png';
import { useEffect, useRef, useState } from 'react';
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
    FaClipboardList,
    FaBars,
    FaTimes
} from 'react-icons/fa';

const Header = () => {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const username = user?.name || '로그인';
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const mobileMenuRef = useRef(null);

    // 프로필 드롭다운 외부 클릭 감지
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowProfileMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // 모바일 메뉴 외부 클릭 감지
    useEffect(() => {
        if (!mobileMenuOpen) return;
        const handleClick = (e) => {
            if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [mobileMenuOpen]);

    const menuItems = [
        { icon: <FaVideo className="icon" />, label: '금주의 운동', path: '/weekly-workout' },
        { icon: <FaShareAlt className="icon" />, label: 'Share+', path: '/share-plus' },
        { icon: <FaBookOpen className="icon" />, label: '운동 설명서', path: '/exercise-tip' },
        { icon: <FaComments className="icon" />, label: '커뮤니티', path: '/board' },
        { icon: <FaClipboardList className="icon" />, label: '운동 기록', path: '/workoutlog' },
        { icon: <FaCrown className="icon" />, label: '상급자', path: '/masters' },
        { icon: <FaTrophy className="icon" />, label: '챌린지', path: '/challenges' },
        { icon: <FaQuestionCircle className="icon" />, label: '문의하기', path: '/inquiry' }
    ];

    return (
        <div className='nav'>
            {/* 햄버거 버튼: 모바일에서만 보임, 좌측 상단 */}
            <button
                className="hamburger-btn"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="메뉴 열기"
            >
                <FaBars />
            </button>
            {/* 왼쪽: 로고 */}
            <div className="nav-left">
                <div className="logo-wrapper" onClick={() => navigate('/main')}>
                    <img src={logo} alt="StrengthHub" className="nav-logo" />
                    <h2 className='nav-logo-text'>StrengthHub</h2>
                </div>
            </div>
            {/* 가운데: 메뉴 (데스크탑에서만 보임) */}
            <div className="nav-links">
                {menuItems.map(item => (
                    <div
                        className="icon-btn"
                        key={item.label}
                        onClick={() => navigate(item.path)}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </div>
                ))}
            </div>
            {/* 오른쪽: 프로필 (데스크탑에서만 보임) */}
            <div className="nav-right" ref={menuRef}>
                <div className="icon-btn profile-btn" onClick={() => setShowProfileMenu(prev => !prev)}>
                    {user?.imgUrl ? (
                        <img src={user.imgUrl} alt="프로필" className="profile-image" />
                    ) : (
                        <FaUserCircle className="icon" />
                    )}
                    <span>{username}</span>
                    {user?.userPlanType && (
                        <span className={`plan-badge ${user.userPlanType.toLowerCase()}`}>
                            {user.userPlanType}
                        </span>
                    )}
                </div>
                {showProfileMenu && (
                    <div className="profile-dropdown">
                        <div className="profile-header">
                            <img src={user?.imgUrl || DefaultAvatar} alt="프로필" className="dropdown-profile-image" />
                            <div>
                                <div className="profile-name">{user?.name}</div>
                                <div className="profile-email">{user?.email}</div>
                            </div>
                        </div>
                        <hr />
                        <ul className="profile-menu-list">
                            <li onClick={() => { setShowProfileMenu(false); navigate('/mypage'); }}>마이페이지</li>
                            <li onClick={() => {
                                localStorage.removeItem('user');
                                setShowProfileMenu(false);
                                navigate('/login');
                            }}>로그아웃</li>
                        </ul>
                    </div>
                )}
            </div>
            {/* 모바일 메뉴 드로어 */}
            {mobileMenuOpen && (
                <div className="mobile-menu-backdrop">
                    <nav className="mobile-menu" ref={mobileMenuRef}>
                        <div className="mobile-menu-header">
                            <span style={{ fontWeight: 'bold', fontSize: '16px' }}>메뉴</span>
                            <button
                                className="close-btn"
                                onClick={() => setMobileMenuOpen(false)}
                                aria-label="메뉴 닫기"
                            >
                                <FaTimes />
                            </button>
                        </div>
                        <div className="mobile-menu-links">
                            {menuItems.map(item => (
                                <div
                                    className="icon-btn"
                                    key={item.label}
                                    onClick={() => {
                                        navigate(item.path);
                                        setMobileMenuOpen(false);
                                    }}
                                >
                                    {item.icon}
                                    <span style={{ marginLeft: 8 }}>{item.label}</span>
                                </div>
                            ))}
                        </div>
                        <hr style={{ margin: '16px 0' }} />
                        <div className="mobile-profile-section">
                            {user ? (
                                <>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                        <img
                                            src={user.imgUrl || DefaultAvatar}
                                            alt="프로필"
                                            className="dropdown-profile-image"
                                            style={{ width: 36, height: 36 }}
                                        />
                                        <div>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <div className="profile-name">{user.name}</div>
                                                {user.userPlanType && (
                                                    <span
                                                        className={`plan-badge ${user.userPlanType.toLowerCase()}`}
                                                        style={{ marginLeft: '4px' }}
                                                    >
                                                        {user.userPlanType}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="profile-email">{user.email}</div>
                                        </div>
                                    </div>

                                    <div
                                        className="icon-btn"
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            navigate('/mypage');
                                        }}
                                    >마이페이지</div>
                                    <div
                                        className="icon-btn"
                                        onClick={() => {
                                            localStorage.removeItem('user');
                                            setMobileMenuOpen(false);
                                            navigate('/login');
                                        }}
                                    >로그아웃</div>
                                </>
                            ) : (
                                <div
                                    className="icon-btn"
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate('/login');
                                    }}
                                >로그인</div>
                            )}
                        </div>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default Header;
