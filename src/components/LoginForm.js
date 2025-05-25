import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../apis/loginUser';
import CustomButton from './CustomButton';
import FloatingInput from './FloatingInput';
import kakaoIcon from '../assets/kakao.png';
import naverIcon from '../assets/naver.png';
import googleIcon from '../assets/google.png';

const LoginForm = ({ onSwitchToRegister }) => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
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

    return (
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
                        onClick={onSwitchToRegister} // ✨ 여기만 바뀜!
                    />
                    <CustomButton
                        label="로그인"
                        size="large"
                        color="gray"
                        onClick={handleLogin}
                    />
                </div>
            </div>

            <Link to='/find-account'>계정 찾기</Link>

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
                            <div className="text-area">네이버 계정으로 로그인</div>
                        </div>
                    </button>

                    <button className="social-button google">
                        <div className="social-content">
                            <div className="icon-area">
                                <img src={googleIcon} alt="Google" className="social-icon" />
                            </div>
                            <div className="text-area">구글 계정으로 로그인</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
