import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import '../styles/SharePlus.css';

const SharePlus = () => {
    const [myRequests, setMyRequests] = useState([]);

    useEffect(() => {
        const fetchMyRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/share-requests/user/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setMyRequests(res.data);
            } catch (err) {
                console.error('나의 Share+ 신청서 불러오기 실패:', err);
            }
        };
        fetchMyRequests();
    }, []);

    return (
        <div className="shareplus-wrapper">
            <PageTitle
                title="Share+ 신청 내역"
                description="진행 중인 Share+ 신청서를 확인하세요."
                showBackArrow={true}
            />
            <div className="my-request-list">
                {myRequests.length === 0 ? (
                    <p>신청한 내역이 없습니다.</p>
                ) : (
                    myRequests.map((req) => (
                        <div key={req.id} className="my-request-card">
                            <p><strong>상급자 ID:</strong> {req.masterId}</p>
                            <p><strong>신청 상태:</strong> {req.status === 'PENDING' ? '검토 중' : req.status === 'REJECTED' ? '거절됨' : ''}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default SharePlus;
