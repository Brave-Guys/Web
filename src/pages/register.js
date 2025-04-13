import React, { useState } from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import PageTitle from '../components/PageTitle';
import CustomSelect from '../components/CustomSelect';
import { registerUser } from '../apis/registerUser';
import '../styles/Register.css'

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        emailId: '',
        emailDomain: 'naver.com'
    });

    const [status, setStatus] = useState({});
    const [messages, setMessages] = useState({});

    const handleChange = (field) => (e) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleSubmit = async () => {
        const newStatus = {};
        const newMessages = {};

        // 유효성 검사
        if (!/^\w{6,20}$/.test(formData.username)) {
            newStatus.username = 'error';
            newMessages.username = '6~20자의 아이디를 입력해주세요.';
        }

        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:;"'<>?,.]).{8,20}$/.test(formData.password)) {
            newStatus.password = 'error';
            newMessages.password = '비밀번호가 짧거나 형식에 맞지 않아요.';
        }

        if (formData.password !== formData.confirmPassword) {
            newStatus.confirmPassword = 'error';
            newMessages.confirmPassword = '비밀번호가 일치하지 않아요.';
        }

        if (!/^.{3,20}$/.test(formData.nickname)) {
            newStatus.nickname = 'error';
            newMessages.nickname = '3~20자의 닉네임을 입력해주세요.';
        }

        if (!/^\S+@\S+\.\S+$/.test(`${formData.emailId}@${formData.emailDomain}`)) {
            newStatus.emailId = 'error';
            newMessages.emailId = '이메일 형식으로 입력해주세요.';
        }

        setStatus(newStatus);
        setMessages(newMessages);

        if (Object.keys(newStatus).length === 0) {
            try {
                console.log(formData);
                const res = await registerUser(formData);
                alert('회원가입 성공!');
                // TODO:
                // 성공 후 페이지 이동이나 초기화 등
            } catch (err) {
                alert('회원가입 실패: ' + (err.response?.data?.message || '알 수 없는 오류'));
            }
        }
    };

    return (
        <div className='register-container'>
            <PageTitle title="회원가입" description="" showBackArrow={true} />

            <div style={{ padding: '30px' }}>
                <div className='input-group' style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
                    <div style={{ flex: 1 }}>
                        <InputField
                            label="아이디"
                            guide="6-20자"
                            placeholder="아이디 입력"
                            value={formData.username}
                            onChange={handleChange('username')}
                            status={status.username || 'default'}
                            message={messages.username}
                            rightElement={
                                <CustomButton
                                    label="중복 확인"
                                    size="small"
                                    color="gray"
                                    onClick={() => { }}
                                />
                            }
                        />
                    </div>

                </div>

                <div className='input-group'>
                    <InputField
                        label="비밀번호"
                        guide="문자, 숫자, 특수문자 포함 8-20자"
                        placeholder="비밀번호 입력"
                        value={formData.password}
                        onChange={handleChange('password')}
                        status={status.password || 'default'}
                        message={messages.password}
                        type='password'
                    />
                </div>

                <div className='input-group'>
                    <InputField
                        label="비밀번호 확인"
                        guide="비밀번호 재입력"
                        placeholder="비밀번호 확인"
                        value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        status={status.confirmPassword || 'default'}
                        message={messages.confirmPassword}
                        type='password'
                    />
                </div>

                <div className='input-group' style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginTop: '20px' }}>
                    <div style={{ flex: 1 }}>
                        <InputField
                            label="닉네임"
                            guide="3-20자"
                            placeholder="닉네임 입력"
                            value={formData.nickname}
                            onChange={handleChange('nickname')}
                            status={status.nickname || 'default'}
                            message={messages.nickname}
                            rightElement={
                                <CustomButton
                                    label="중복 확인"
                                    size="small"
                                    color="gray"
                                    onClick={() => { }}
                                />
                            }
                        />
                    </div>

                </div>

                <div className="email-input-wrapper input-group" style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '50px' }}>
                    <div style={{ flex: 1 }}>
                        <InputField
                            label="이메일"
                            guide="이메일 입력"
                            placeholder=""
                            value={formData.emailId}
                            onChange={handleChange('emailId')}
                            status={status.emailId || 'default'}
                            message={messages.emailId}
                            rightElement={
                                <>
                                    <span className="email-at" style={{ fontSize: '16px', marginBottom: '8px' }}>@</span>
                                    <CustomSelect
                                        value={formData.emailDomain}
                                        onChange={handleChange('emailDomain')}
                                        options={['naver.com', 'gmail.com', 'daum.net']}
                                        width="250px"
                                    />
                                </>
                            }
                        />
                    </div>

                </div>


                <div className="submit-button" style={{ display: 'flex', justifyContent: 'center' }}>
                    <CustomButton
                        label="회원가입"
                        size="large"
                        color="purple"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;