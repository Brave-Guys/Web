import React, { useState } from 'react';
import InputField from '../components/InputField'
import CustomButton from '../components/CustomButton'
import PageTitle from '../components/PageTitle'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        emailId: '',
        emailDomain: 'naver.com'
    });

    const [status, setStatus] = useState({
        username: 'error',
        password: 'error',
        confirmPassword: 'error',
        nickname: 'error',
        emailId: 'error'
    });

    const [messages, setMessages] = useState({
        username: '이미 가입되어 있는 아이디예요.',
        password: '비밀번호가 짧아요.',
        confirmPassword: '비밀번호가 일치하지 않아요.',
        nickname: '이미 존재하는 닉네임이에요.',
        emailId: '이메일 형식으로 입력해주세요.'
    });

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    return (
        <>
            <PageTitle
                title="회원가입"
                description=""
                showBackArrow={true}
            />

            <div style={{ padding: '30px' }}>
                <InputField
                    label="아이디"
                    guide="6-20자"
                    placeholder="아이디 입력"
                    value={formData.username}
                    onChange={handleChange('username')}
                    status={status.username}
                    message={messages.username}
                />
                <CustomButton
                    label="중복 확인"
                    size="small"
                    color="gray"
                    onClick={() => { }}
                />

                <InputField
                    label="비밀번호"
                    guide="문자, 숫자, 특수문자 포함 8-20자"
                    placeholder="비밀번호 입력"
                    value={formData.password}
                    onChange={handleChange('password')}
                    status={status.password}
                    message={messages.password}
                />

                <InputField
                    label="비밀번호 확인"
                    guide="비밀번호 재입력"
                    placeholder="비밀번호 확인"
                    value={formData.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    status={status.confirmPassword}
                    message={messages.confirmPassword}
                />

                <InputField
                    label="닉네임"
                    guide="6-20자"
                    placeholder="닉네임 입력"
                    value={formData.nickname}
                    onChange={handleChange('nickname')}
                    status={status.nickname}
                    message={messages.nickname}
                />
                <CustomButton
                    label="중복 확인"
                    size="small"
                    color="gray"
                    onClick={() => { }}
                />

                <div className="email-input-wrapper">
                    <InputField
                        label="이메일"
                        guide="이메일 입력"
                        placeholder=""
                        value={formData.emailId}
                        onChange={handleChange('emailId')}
                        status={status.emailId}
                        message={messages.emailId}
                    />
                    <span className="email-at">@</span>
                    <select
                        value={formData.emailDomain}
                        onChange={handleChange('emailDomain')}
                        className="email-domain"
                    >
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="daum.net">daum.net</option>
                    </select>
                </div>

                <div className="submit-button">
                    <CustomButton
                        label="회원가입"
                        size="large"
                        color="purple"
                        onClick={() => { }}
                    />
                </div>
            </div>
        </>
    );
};

export default Register;
