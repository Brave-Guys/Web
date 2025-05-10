import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserNickname, updateUserImage } from '../apis/updateUser';
import { uploadImageToFirebase } from '../utils/uploadImageToFirebase';
import axios from 'axios';

const Mypage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [nickname, setNickname] = useState(user?.name || '');
    const [profileImage, setProfileImage] = useState(null); // 이미지 파일
    const [previewUrl, setPreviewUrl] = useState(user?.imgUrl || ''); // 기존 이미지

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
        <div>
            <h2>마이페이지</h2>
            <div>
                <label>닉네임: </label>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                />
                <button onClick={handleNicknameUpdate}>수정</button>
            </div>

            <div>
                <label>프로필 이미지:</label>
                <br />
                {previewUrl && <img src={previewUrl} alt="프로필" width="120" />}
                <br />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button onClick={handleSaveProfileImage}>저장</button>
            </div>

            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default Mypage;
