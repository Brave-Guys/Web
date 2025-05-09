import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateUserNickname } from '../apis/updateUser';

const Mypage = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const [nickname, setNickname] = useState(user?.name || '');

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

            // localStorage도 갱신
            const updatedUser = { ...user, name: nickname };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            window.location.reload();
        } catch (err) {
            alert('닉네임 수정 실패');
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
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default Mypage;
