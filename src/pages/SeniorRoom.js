import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
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
                        <Link to={`/senior/requests/${r.id}`} key={r.id} className="request-card">
                            <p><strong>신청자 ID:</strong> {r.userId}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default SeniorRoom;
