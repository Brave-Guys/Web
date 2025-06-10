import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FindAccountForm.css';

const FindAccountForm = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState('inputEmail'); // inputEmail → inputCode → verified → resetPassword
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

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
            setUserInfo(response.data);
            setStep('verified');
        } catch (err) {
            console.error(err);
            setError('인증 코드가 유효하지 않거나 만료되었습니다.');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (newPassword !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/users/reset-password`, {
                email,
                newPassword
            });
            setMessage('비밀번호가 성공적으로 변경되었습니다.');
            setStep('done');
        } catch (err) {
            console.error(err);
            setError('비밀번호 변경에 실패했습니다.');
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
                    <div className="success-message">가입자 정보</div>
                    <div className="user-summary">
                        <p className="user-id-display">{userInfo.userId}</p>
                    </div>
                    <button
                        className="submit-button"
                        onClick={() => setStep('resetPassword')}
                    >
                        비밀번호 재설정
                    </button>
                </div>
            )}

            {step === 'resetPassword' && (
                <form onSubmit={handlePasswordReset}>
                    <input
                        type="password"
                        placeholder="새 비밀번호"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                    <input
                        type="password"
                        placeholder="새 비밀번호 확인"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">비밀번호 변경하기</button>
                    {error && <div className="error-message">{error}</div>}
                    {message && <div className="success-message">{message}</div>}
                </form>
            )}

            {step === 'done' && (
                <div className="success-message">
                    🎉 비밀번호가 변경되었습니다. 로그인 화면으로 이동해주세요.
                </div>
            )}

            <button type="button" className="back-to-login-findaccount" onClick={onSwitchToLogin}>
                로그인으로 돌아가기
            </button>
        </div>
    );
};

export default FindAccountForm;
