import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import bgImage from '../assets/welcome.png';
import { loginUser } from '../apis/loginUser';

const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setLoginData({ ...loginData, [field]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const data = await loginUser(loginData);
            localStorage.setItem('token', data.token); // JWT 저장
            alert('로그인 성공!');
            navigate('/main'); // 홈 또는 대시보드로 이동
        } catch (err) {
            alert('로그인 실패: ' + (err.response?.data?.message || '알 수 없는 오류'));
        }
    };

    return (
        <div
            className="login-page"
            style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'top center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed',
            }}
        >
            <div className="login-container">
                <div className="login-left">
                    <div className="login-text">
                        운동 기록을<br />한눈에 확인하세요
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-box">
                        <h2>로그인</h2>
                        <input
                            type="text"
                            placeholder="ID"
                            value={loginData.username}
                            onChange={handleChange('username')}
                        />
                        <input
                            type="password"
                            placeholder="비밀번호"
                            value={loginData.password}
                            onChange={handleChange('password')}
                        />

                        <div className="login-buttons">
                            <button className="signup-btn" onClick={() => navigate('/register')}>
                                회원가입
                            </button>
                            <button className="login-btn" onClick={handleLogin}>
                                로그인
                            </button>
                        </div>

                        <div className="social-buttons">
                            <button className="kakao">카카오로 로그인</button>
                            <button className="naver">네이버로 로그인</button>
                            <button className="google">구글로 로그인</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
