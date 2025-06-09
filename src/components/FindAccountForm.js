import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FindAccountForm.css';

const FindAccountForm = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState('inputEmail'); // inputEmail → inputCode → verified
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState(null); // 가입자 정보 저장

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setUserInfo(null);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/email/send`, null, {
                params: { email },
            });
            setStep('inputCode');
            setMessage('이메일로 인증 코드가 전송되었습니다.');
        } catch (err) {
            console.error(err);
            setError('메일 전송에 실패했습니다. 이메일 주소를 다시 확인해주세요.');
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/email/verify`, null, {
                params: { email, code },
            });

            setUserInfo(response.data); // userInfo에 사용자 정보 저장
            setStep('verified');
        } catch (err) {
            console.error(err);
            setError('인증 코드가 유효하지 않거나 만료되었습니다.');
        }
    };

    return (
        <div className="find-account-form">
            <h3 className="form-title">계정 찾기</h3>

            {step === 'inputEmail' && (
                <form onSubmit={handleSendEmail}>
                    <input
                        type="email"
                        placeholder="가입한 이메일 주소"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">
                        인증 코드 메일 받기
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            )}

            {step === 'inputCode' && (
                <form onSubmit={handleVerifyCode}>
                    <div className="info-message">{message}</div>
                    <input
                        type="text"
                        placeholder="이메일로 받은 인증 코드 입력"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">
                        코드 인증하기
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </form>
            )}

            {step === 'verified' && userInfo && (
                <div className="verified-info">
                    <div className="success-message">✅ 인증 완료! 아래는 가입자 정보입니다.</div>
                    <div className="user-summary">
                        {userInfo.profileImgUrl && (
                            <img
                                src={userInfo.profileImgUrl}
                                alt="프로필"
                                className="user-profile-img"
                            />
                        )}
                        <p><strong>아이디:</strong> {userInfo.userId}</p>
                        <p><strong>닉네임:</strong> {userInfo.nickname}</p>
                        <p><strong>이메일:</strong> {userInfo.email}</p>
                        <p><strong>플랜:</strong> {userInfo.userPlanType}</p>
                    </div>
                </div>
            )}

            <button type="button" className="back-to-login" onClick={onSwitchToLogin}>
                로그인으로 돌아가기
            </button>
        </div>
    );
};

export default FindAccountForm;
