import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserNickname, updateUserImage } from '../apis/updateUser';
import { uploadImageToFirebase } from '../utils/uploadImageToFirebase';
import { checkNickname } from '../apis/checkDuplicate';
import { Link } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import tempImg from '../assets/person.png';
import LoadingOverlay from '../components/LoadingOverlay';
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
    const [isUnchanged, setIsUnchanged] = useState(true);
    const [isNicknameChecked, setIsNicknameChecked] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
        setIsNicknameChecked(false);
    };

    useEffect(() => {
        const hasChanged =
            nickname !== user?.name ||
            previewUrl !== (user?.imgUrl || '') ||
            oldPassword !== '' ||
            newPassword !== '' ||
            confirmPassword !== '';

        setIsUnchanged(!hasChanged);
    }, [nickname, previewUrl, oldPassword, newPassword, confirmPassword, user]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSaveProfileImage = async () => {
        if (!profileImage) return;
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
        } catch (err) {
            alert('닉네임 수정 실패');
            console.error(err);
        }
    };

    const handleCheckNickname = async () => {
        if (!nickname.trim()) {
            alert('닉네임을 입력하세요.');
            return;
        }
        try {
            await checkNickname(nickname);
            alert('사용 가능한 닉네임입니다.');
            setIsNicknameChecked(true);
        } catch (err) {
            if (err.response?.status === 409) {
                alert('이미 사용 중인 닉네임입니다.');
            } else {
                alert('중복 확인 중 오류가 발생했습니다.');
            }
            setIsNicknameChecked(false);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await handleNicknameUpdate();
            await handleSaveProfileImage();
            alert('정보가 수정되었습니다.');
            window.location.reload();
        } catch (err) {
            console.error('수정 실패:', err);
            alert('정보 수정 중 문제가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mypage-container">
            {isLoading && <LoadingOverlay visible={true} />}
            <div className="mypage-header">
                <PageTitle title="내 정보" showBackArrow={true} />
            </div>

            <div className="mypage-profile-info-wrapper">
                <div className="mypage-profile-container">
                    <div
                        className="profile-image-wrapper"
                        onClick={() => document.getElementById('profileUpload').click()}
                    >
                        <img
                            src={previewUrl || tempImg}
                            alt="프로필 이미지"
                            className="mypage-profile-image"
                        />
                        <div className="profile-overlay">
                            <Pencil className="edit-icon" />
                            <p>수정</p>
                        </div>
                    </div>
                    <input
                        type="file"
                        id="profileUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="mypage-basic-info">
                    <div className="mypage-name-row">
                        <span className="mypage-name">{nickname}</span>
                        {user?.userPlanType && (
                            <span className="mypage-plan">{user.userPlanType}</span>
                        )}
                    </div>
                    <div className="mypage-email">{`${emailId}@${emailDomain}`}</div>
                    <div style={{ margin: '10px' }}></div>
                    <Link to="/share-plan" className="change-plan-btn">내 플랜 업그레이드</Link>
                </div>
            </div>

            <div className="mypage-form">
                <div className="mypage-input-row">
                    <label className="mypage-label" htmlFor="nickname">닉네임</label>
                    <input
                        id="nickname"
                        placeholder="닉네임"
                        value={nickname}
                        onChange={handleNicknameChange}
                        className="mypage-input"
                    />
                    <button onClick={handleCheckNickname} className="mypage-check-button">중복 확인</button>
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

                <button
                    onClick={handleSubmit}
                    className="mypage-submit-button"
                    disabled={isUnchanged || !isNicknameChecked || isLoading}
                >
                    {isLoading ? '수정 중...' : '수정'}
                </button>
            </div>
        </div>
    );
};

export default Mypage;