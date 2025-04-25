import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import PageTitle from '../components/PageTitle';
import CustomSelect from '../components/CustomSelect';
import { registerUser } from '../apis/registerUser';
import { checkNickname, checkUsername } from '../apis/checkDuplicate';
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
    const [isUsernameChecked, setIsUsernameChecked] = useState(false);
    const [isNicknameChecked, setIsNicknameChecked] = useState(false);

    const navigate = useNavigate();

    const handleChange = (field) => (e) => {
        const value = e.target.value;
        setFormData({ ...formData, [field]: value });

        if (field === 'username') setIsUsernameChecked(false);
        if (field === 'nickname') setIsNicknameChecked(false);
    };

    const handleCheckUsername = async () => {
        if (!formData.username) {
            setStatus((prev) => ({ ...prev, username: 'error' }));
            setMessages((prev) => ({ ...prev, username: '아이디를 입력하세요.' }));
            setIsUsernameChecked(false);
            return;
        }
        try {
            await checkUsername(formData.username);
            setStatus((prev) => ({ ...prev, username: 'success' }));
            setMessages((prev) => ({ ...prev, username: '사용 가능한 아이디입니다.' }));
            setIsUsernameChecked(true); // ✅ 중복검사 통과!
        } catch (err) {
            setIsUsernameChecked(false);
            if (err.response?.status === 409) {
                setStatus((prev) => ({ ...prev, username: 'error' }));
                setMessages((prev) => ({ ...prev, username: '이미 사용 중인 아이디입니다.' }));
            } else {
                setStatus((prev) => ({ ...prev, username: 'error' }));
                setMessages((prev) => ({ ...prev, username: '아이디 확인 중 오류 발생' }));
            }
        }
    };

    const handleCheckNickname = async () => {
        if (!formData.nickname) {
            setStatus((prev) => ({ ...prev, nickname: 'error' }));
            setMessages((prev) => ({ ...prev, nickname: '닉네임을 입력하세요.' }));
            setIsNicknameChecked(false);
            return;
        }
        try {
            await checkNickname(formData.nickname);
            setStatus((prev) => ({ ...prev, nickname: 'success' }));
            setMessages((prev) => ({ ...prev, nickname: '사용 가능한 닉네임입니다.' }));
            setIsNicknameChecked(true); // ✅ 중복검사 통과!
        } catch (err) {
            setIsNicknameChecked(false);
            if (err.response?.status === 409) {
                setStatus((prev) => ({ ...prev, nickname: 'error' }));
                setMessages((prev) => ({ ...prev, nickname: '이미 사용 중인 닉네임입니다.' }));
            } else {
                setStatus((prev) => ({ ...prev, nickname: 'error' }));
                setMessages((prev) => ({ ...prev, nickname: '닉네임 확인 중 오류 발생' }));
            }
        }
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
            if (!isUsernameChecked || !isNicknameChecked) {
                alert('아이디 또는 닉네임 중복 확인을 완료해주세요.');
                return;
            }
            try {
                const res = await registerUser(formData);
                navigate('/register-success');
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
                            value={formData.username}
                            onChange={handleChange('username')}
                            status={status.username || 'default'}
                            message={messages.username}
                            rightElement={
                                <CustomButton
                                    label="중복 확인"
                                    size="small"
                                    color="gray"
                                    onClick={handleCheckUsername}
                                />
                            }
                        />
                    </div>

                </div>

                <div className='input-group'>
                    <InputField
                        label="비밀번호"
                        guide="문자, 숫자, 특수문자 포함 8-20자"
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
                            value={formData.nickname}
                            onChange={handleChange('nickname')}
                            status={status.nickname || 'default'}
                            message={messages.nickname}
                            rightElement={
                                <CustomButton
                                    label="중복 확인"
                                    size="small"
                                    color="gray"
                                    onClick={handleCheckNickname}
                                />
                            }
                        />
                    </div>

                </div>

                <div className="email-input-wrapper input-group" style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', marginBottom: '50px' }}>
                    <div style={{ flex: 1 }}>
                        <InputField
                            label="이메일"
                            guide=""
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


                <div style={{ display: 'flex', justifyContent: 'center' }}>
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