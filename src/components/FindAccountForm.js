import React, { useState } from 'react';
import axios from 'axios';
import '../styles/FindAccountForm.css';

const FindAccountForm = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState('inputEmail'); // inputEmail → inputCode → verified
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSendEmail = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

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
            setStep('verified');
            setMessage('인증에 성공했습니다.');
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

            {step === 'verified' && (
                <div className="success-message">
                    ✅ 이메일 인증이 완료되었습니다. <br />비밀번호 재설정은 관리자에게 문의하세요.
                </div>
            )}

            <button type="button" className="back-to-login" onClick={onSwitchToLogin}>
                로그인으로 돌아가기
            </button>
        </div>
    );
};

export default FindAccountForm;
