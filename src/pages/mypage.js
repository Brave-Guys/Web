import React from 'react';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div>
            <p>마이페이지</p>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
};

export default Mypage;
