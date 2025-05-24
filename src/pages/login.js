import React, { useEffect, useState } from 'react';
import '../styles/login.css';
import appIcon from '../assets/logo.png';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const LoginPage = () => {
    const [bgIndex, setBgIndex] = useState(0);
    const [mode, setMode] = useState('login');

    const backgroundImages = [
        require('../assets/bg1.png'),
        require('../assets/bg2.png'),
        require('../assets/bg3.png'),
    ];

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
                    <div className="login-left"></div>
                    <div className="login-right">
                        {mode === 'login' ? (
                            <LoginForm onSwitchToRegister={() => setMode('register')} />
                        ) : (
                            <RegisterForm onSwitchToLogin={() => setMode('login')} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
