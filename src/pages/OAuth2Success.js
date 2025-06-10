import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OAuth2Success = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
                    withCredentials: true,
                });
                localStorage.setItem('user', JSON.stringify(res.data));
                navigate('/main');
            } catch (err) {
                console.error('OAuth2 로그인 유저 정보 불러오기 실패', err);
                navigate('/login');
            }
        };

        fetchUser();
    }, []);

    return <div>로그인 처리 중입니다...</div>;
};

export default OAuth2Success;
