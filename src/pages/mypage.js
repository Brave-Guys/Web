import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserNickname, updateUserImage } from '../apis/updateUser';
import { uploadImageToFirebase } from '../utils/uploadImageToFirebase';
import PageTitle from '../components/PageTitle';
import '../styles/Mypage.css';

const Mypage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [nickname, setNickname] = useState(user?.name || '');
    const [profileImage, setProfileImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(user?.imgUrl || '');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleNicknameUpdate = async () => {
        if (!nickname.trim()) {
            alert('닉네임을 입력하세요.');
            return;
        }

        try {
            await updateUserNickname(user.id, nickname);
            alert('닉네임이 수정되었습니다.');
            const updatedUser = { ...user, name: nickname };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload();
        } catch (err) {
            alert('닉네임 수정 실패');
            console.error(err);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
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

    return (
        <div className="mypage-container">
            <PageTitle
                title='내 정보'
                showBackArrow={true}
            />

            <div style={{ margin: '40px' }}></div>

            <div className="nickname-section">
                <label htmlFor="nickname">닉네임</label>
                <div className="nickname-input-group">
                    <input
                        id="nickname"
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                    <button onClick={handleNicknameUpdate}>수정</button>
                </div>
            </div>

            <div className="profile-section">
                <label>프로필 이미지</label>
                {previewUrl && (
                    <div className="profile-preview">
                        <img src={previewUrl} alt="프로필" />
                    </div>
                )}
                <div className="profile-upload-group">
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    <button onClick={handleSaveProfileImage}>저장</button>
                </div>
            </div>

            <div className="logout-section">
                <button className="logout-button" onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
    );
};

export default Mypage;
