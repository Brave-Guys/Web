import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import '../styles/SeniorRoom.css';

const SeniorRoom = () => {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/share-requests/master/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setRequests(res.data);
            } catch (err) {
                console.error('Share+ 요청 조회 실패:', err);
            }
        };
        fetchRequests();
    }, []);

    return (
        <div className="senior-room-wrapper">
            <PageTitle
                title="상급자의 방"
                description="나에게 들어온 Share+ 신청서를 확인해보세요."
                showBackArrow={true}
            />
            <div className="request-list">
                {requests.length === 0 ? (
                    <p>도착한 신청서가 없습니다.</p>
                ) : (
                    requests.map((r) => (
                        <div key={r.id} className="request-card">
                            <p><strong>신청자:</strong> {r.userId}</p>
                            <p><strong>나이:</strong> {r.age}</p>
                            <p><strong>성별:</strong> {r.gender}</p>
                            <p><strong>키/몸무게:</strong> {r.height} / {r.weight}</p>
                            <p><strong>전달 메시지:</strong> {r.content || '없음'}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SeniorRoom;
