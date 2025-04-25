import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import bgImage from '../assets/welcome.png';
import { loginUser } from '../apis/loginUser';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

const Login = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        setLoginData({ ...loginData, [field]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            await loginUser(loginData);
            alert('로그인 성공!');
            navigate('/main');
        } catch (err) {
            alert('로그인 실패: ' + err.message);
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
                        운동 기록을<br />한눈에<br />확인하세요
                    </div>
                </div>

                <div className="login-right">
                    <div className="login-box">
                        <h2>로그인</h2>
                        <InputField
                            label="ID"
                            guide=""
                            placeholder=""
                            value={loginData.username}
                            onChange={handleChange('username')}
                            status="default"
                        />

                        <InputField
                            label="비밀번호"
                            guide=""
                            placeholder=""
                            type="password"
                            value={loginData.password}
                            onChange={handleChange('password')}
                            status="default"
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
