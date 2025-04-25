import React from 'react';
import { useNavigate } from 'react-router-dom';
import CustomButton from '../components/CustomButton';
import '../styles/RegisterSuccess.css';
import check from '../assets/check-purple.png'

const RegisterSuccess = ({ username, nickname }) => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/main');
    };

    return (
        <div className="register-success-container">
            <div>
                <img class='success-icon' src={check}></img>
                <h2 className="success-title">회원가입 완료</h2>
                <p className="success-message">
                    회원가입이 성공적으로 완료되었습니다.
                </p>
            </div>
            <CustomButton
                label="메인으로"
                size="large"
                color="purple"
                onClick={handleGoHome}
                style={{width: '150px'}}
            />
        </div>
    );
};

export default RegisterSuccess;
