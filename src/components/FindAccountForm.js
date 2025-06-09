import React, { useState } from 'react';
import axios from 'axios';

const FindAccountForm = ({ onSwitchToLogin }) => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/email/send`, null, {
                params: { email }
            });
            setSubmitted(true);
        } catch (err) {
            console.error(err);
            setError('메일 전송에 실패했습니다. 이메일 주소를 다시 확인해주세요.');
        }
    };

    return (
        <div className="find-account-form" style={{ width: '100%', maxWidth: 340, margin: '0 auto' }}>
            <h3 style={{ marginBottom: 18, textAlign: 'center', color: '#1E53B5' }}>계정 찾기</h3>
            {submitted ? (
                <div style={{ textAlign: 'center', color: '#22c55e', marginBottom: 20 }}>
                    비밀번호 재설정 링크가 이메일로 전송되었습니다.
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="가입한 이메일 주소"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            marginBottom: '16px',
                            fontSize: '15px',
                            background: '#f8fafc'
                        }}
                    />
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#1E53B5',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontWeight: 'bold',
                            fontSize: '15px',
                            marginBottom: '12px',
                            cursor: 'pointer'
                        }}
                    >
                        비밀번호 재설정 메일 받기
                    </button>
                    {error && <div style={{ color: 'red', fontSize: '13px' }}>{error}</div>}
                </form>
            )}
            <button
                type="button"
                onClick={onSwitchToLogin}
                style={{
                    width: '100%',
                    background: 'none',
                    border: 'none',
                    color: '#1E53B5',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }}
            >
                로그인으로 돌아가기
            </button>
        </div>
    );
};

export default FindAccountForm;
