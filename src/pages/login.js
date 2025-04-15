import React from 'react';
import '../styles/login.css'; // 스타일 분리 :)
import bgImage from '../assets/텅키.jpg';

const Login = () => {
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
                        <input type="text" placeholder="ID" />
                        <input type="password" placeholder="비밀번호" />

                        <div className="login-buttons">
                            <button className="signup-btn">회원가입</button>
                            <button className="login-btn">로그인</button>
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
