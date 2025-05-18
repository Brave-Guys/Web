import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import { Link } from 'react-router-dom';
import '../styles/SeniorRoom.css';

const SeniorRoom = () => {
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [otherRequests, setOtherRequests] = useState([]);

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
                const approved = res.data.filter(r => r.status === 'APPROVED');
                const others = res.data.filter(r => r.status !== 'APPROVED');
                setApprovedRequests(approved);
                setOtherRequests(others);
            } catch (err) {
                console.error('Share+ 요청 조회 실패:', err);
            }
        };
        fetchRequests();
    }, []);

    const getStatusText = (status) => {
        if (status === 'PENDING') return '검토 중';
        if (status === 'REJECTED') return '거절됨';
        return '';
    };

    return (
        <div className="senior-room-wrapper">
            <PageTitle
                title="상급자의 방"
                description="내게 들어온 Share+ 신청서를 관리해보세요."
                showBackArrow={true}
            />

            <h3>나의 수강생</h3>
            <div className="request-list">
                {approvedRequests.length === 0 ? (
                    <p>승인된 요청이 없습니다.</p>
                ) : (
                    approvedRequests.map((r) => (
                        <Link to={`/share/${r.id}/chat`} key={r.id} className="request-card">
                            <p><strong>신청자 ID:</strong> {r.userId}</p>
                        </Link>
                    ))
                )}
            </div>

            <h3 style={{ marginTop: '32px' }}>Share+ 요청</h3>
            <div className="request-list">
                {otherRequests.length === 0 ? (
                    <p>검토 중이거나 거절된 요청이 없습니다.</p>
                ) : (
                    otherRequests.map((r) => (
                        <Link to={`/senior/requests/${r.id}`} key={r.id} className="request-card">
                            <p><strong>신청자 ID:</strong> {r.userId}</p>
                            <p><strong>상태:</strong> {getStatusText(r.status)}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default SeniorRoom;
