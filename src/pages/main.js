import React, { useEffect, useState } from 'react';
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
        </div>
    );
};

export default Main;
