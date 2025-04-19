import React, { useEffect, useState } from 'react';
import Box from '../components/Box';
import '../styles/main.css';

const Main = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="main-page">
            <div className="welcome-text">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2>{user?.name ?? '사용자'}님 반가워요!</h2>
                    <h2 className="pro-badge">{user?.userPlanType ?? '사용자'}</h2>
                </div>
                <p>내 운동을 관리해보세요.</p>
            </div>

            <div className="card-grid">
                <Box type={2} showArrow={true} title='기록' />
                <Box type={2} showArrow={true} title='Share+' />
                <Box type={2} showArrow={true} title='금주의 운동' />
                <Box type={2} showArrow={true} title='기본 운동 설명서' />
                <Box type={2} showArrow={true} title='게시판' />
            </div>
        </div>
    );
};

export default Main;
