import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserNickname, updateUserImage } from '../apis/updateUser';
import { uploadImageToFirebase } from '../utils/uploadImageToFirebase';
import PageTitle from '../components/PageTitle';
import tempImg from '../assets/person.png'
import '../styles/Mypage.css';

const Mypage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [nickname, setNickname] = useState(user?.name || '');
    const [emailId, setEmailId] = useState(user?.email?.split('@')[0] || '');
    const [emailDomain, setEmailDomain] = useState(user?.email?.split('@')[1] || 'naver.com');
    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.imgUrl || '');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        alert('로그아웃 되었습니다.');
        navigate('/login');
    };

    const handleSaveProfileImage = async () => {
        if (!profileImage) {
            alert('이미지를 선택하세요.');
            return;
        }
        try {
            const imgUrl = await uploadImageToFirebase(profileImage);
            await updateUserImage(user.id, imgUrl);
            const updatedUser = { ...user, imgUrl };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert('프로필 이미지가 업데이트되었습니다.');
            window.location.reload();
        } catch (err) {
            alert('이미지 업로드 실패');
            console.error(err);
        }
    };

    const handleNicknameUpdate = async () => {
        if (!nickname.trim()) {
            alert('닉네임을 입력하세요.');
            return;
        }
        try {
            await updateUserNickname(user.id, nickname);
            const updatedUser = { ...user, name: nickname };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert('닉네임이 수정되었습니다.');
            window.location.reload();
        } catch (err) {
            alert('닉네임 수정 실패');
            console.error(err);
        }
    };

    const handleSubmit = () => {
        handleNicknameUpdate();
        handleSaveProfileImage();
    };

    return (
        <div className="mypage-container">
            <div className="mypage-header">
                <PageTitle
                    title="내 정보"
                    showBackArrow={true}
                />
            </div>

            <div className="mypage-profile-container">
                <img
                    src={previewUrl || tempImg}
                    alt="프로필 이미지"
                    className="mypage-profile-image"
                />
                <label htmlFor="profileUpload" className="mypage-image-button">이미지 변경</label>
                <input
                    type="file"
                    id="profileUpload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                />
            </div>

            <div className="mypage-form">
                <div className="mypage-input-row">
                    <label className="mypage-label" htmlFor="nickname">닉네임</label>
                    <input
                        id="nickname"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        className="mypage-input"
                    />
                    <button onClick={handleNicknameUpdate} className="mypage-check-button">중복 확인</button>
                </div>

                <div className="mypage-input-row">
                    <label className="mypage-label" htmlFor="emailId">이메일</label>
                    <input
                        id="emailId"
                        placeholder="이메일 아이디"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        className="mypage-email-input"
                    />
                    <span className="email-at">@</span>
                    <select
                        value={emailDomain}
                        onChange={(e) => setEmailDomain(e.target.value)}
                        className="mypage-domain-select"
                    >
                        <option value="naver.com">naver.com</option>
                        <option value="gmail.com">gmail.com</option>
                        <option value="daum.net">daum.net</option>
                    </select>
                </div>

                <div className="mypage-input-row">
                    <label className="mypage-label" htmlFor="oldPassword">기존 비밀번호</label>
                    <input
                        id="oldPassword"
                        placeholder="기존 비밀번호"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="mypage-input"
                    />
                </div>

                <div className="mypage-input-row">
                    <label className="mypage-label" htmlFor="newPassword">새 비밀번호</label>
                    <input
                        id="newPassword"
                        placeholder="문자, 숫자, 특수문자 포함 8-20자"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mypage-input"
                    />
                </div>

                <div className="mypage-input-row">
                    <label className="mypage-label" htmlFor="confirmPassword">비밀번호 확인</label>
                    <input
                        id="confirmPassword"
                        placeholder="비밀번호 확인"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mypage-input"
                    />
                </div>

                <button onClick={handleSubmit} className="mypage-submit-button">수정</button>

                <button onClick={handleLogout} className="mypage-logout-button">
                    로그아웃
                </button>
            </div>
        </div>
    );
};

export default Mypage;
