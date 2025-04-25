import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import bgImage from '../assets/welcome.png';
import { loginUser } from '../apis/loginUser';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import kakaoIcon from '../assets/kakao.png';
import naverIcon from '../assets/naver.png';
import googleIcon from '../assets/google.png';

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

                        <div className="login-box-inner">
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
                        </div>
                        <div style={{marginTop: '20px'}}>
                            <div className="social-buttons">
                                <button className="social-button kakao">
                                    <div className="social-content">
                                        <div className="icon-area">
                                            <img src={kakaoIcon} alt="Kakao" className="social-icon" />
                                        </div>
                                        <div className="text-area">
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
    );
};

export default Login;
