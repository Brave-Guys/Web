import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { loginUser } from '../apis/loginUser';
import CustomButton from '../components/CustomButton';
import FloatingInput from '../components/FloatingInput';
import kakaoIcon from '../assets/kakao.png';
import naverIcon from '../assets/naver.png';
import googleIcon from '../assets/google.png';
import appIcon from '../assets/logo.png';

const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [bgIndex, setBgIndex] = useState(0);

    const backgroundImages = [
        require('../assets/bg1.png'),
        require('../assets/bg2.png'),
        require('../assets/bg3.png'),
    ];

    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setLoginData({ ...loginData, [field]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            await loginUser(loginData);
            navigate('/main');
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setBgIndex((prev) => (prev + 1) % backgroundImages.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="login-background">
            {backgroundImages.map((img, i) => (
                <div
                    key={i}
                    className={`bg-slide ${i === bgIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                />
            ))}

            <div className="login-page">
                <div className='mobile-title'>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={appIcon} style={{ width: '40px', marginRight: '10px' }} />
                        <p style={{ color: '#1E53B5', fontWeight: 'bold', fontStyle: 'italic' }}>StrengthHub</p>
                    </div>
                    <p style={{ fontSize: '15px', color: '#777' }}>운동 기록 및 트레이닝 서비스</p>
                </div>
                <div className="login-container">
                    <div className="login-left">
                    </div>

                    <div className="login-right">
                        <div className="login-box">
                            <div className="login-title-row" style={{ padding: '0px' }}>
                                <div style={{ fontSize: '30px', fontWeight: 'bold' }}>로그인</div>
                            </div>
                            <div className="error-message">{errorMessage === '' ? '\u00A0' : errorMessage}</div>

                            <div style={{ margin: '20px' }}></div>

                            <div className="login-box-inner">
                                <FloatingInput
                                    id="username"
                                    label="ID"
                                    value={loginData.username}
                                    onChange={handleChange('username')}
                                    onKeyDown={handleKeyDown}
                                />
                                <FloatingInput
                                    id="password"
                                    label="비밀번호"
                                    type="password"
                                    value={loginData.password}
                                    onChange={handleChange('password')}
                                    onKeyDown={handleKeyDown}
                                />
                                <div className="login-buttons">
                                    <CustomButton
                                        label="회원가입"
                                        size="large"
                                        color="gray"
                                        onClick={() => navigate('/register')}
                                    />
                                    <CustomButton
                                        label="로그인"
                                        size="large"
                                        color="gray"
                                        onClick={handleLogin}
                                    />
                                </div>
                            </div>

                            <div style={{ marginTop: '20px' }}>
                                <div className="social-buttons">
                                    <button className="social-button kakao">
                                        <div className="social-content">
                                            <div className="icon-area">
                                                <img src={kakaoIcon} alt="Kakao" className="social-icon" />
                                            </div>
                                            <div className="text-area" style={{ color: 'black' }}>
                                                카카오톡 계정으로 로그인
                                            </div>
                                        </div>
                                    </button>

                                    <button className="social-button naver">
                                        <div className="social-content">
                                            <div className="icon-area">
                                                <img src={naverIcon} alt="Naver" className="social-icon" />
                                            </div>
                                            <div className="text-area">
                                                네이버 계정으로 로그인
                                            </div>
                                        </div>
                                    </button>

                                    <button className="social-button google">
                                        <div className="social-content">
                                            <div className="icon-area">
                                                <img src={googleIcon} alt="Google" className="social-icon" />
                                            </div>
                                            <div className="text-area">
                                                구글 계정으로 로그인
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
