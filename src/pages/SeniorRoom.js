import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import DefaultAvatar from '../assets/person.png';
import { Link } from 'react-router-dom';
import '../styles/SeniorRoom.css';

const SeniorRoom = () => {
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [otherRequests, setOtherRequests] = useState([]);
    const [userMap, setUserMap] = useState({});

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const token = localStorage.getItem('token');
                const user = JSON.parse(localStorage.getItem('user'));
                const res = await axios.get(
                    `${process.env.REACT_APP_API_URL}/share-requests/master/${user.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                const approved = res.data.filter(r => r.status === 'APPROVED');
                const others = res.data.filter(r => r.status !== 'APPROVED');
                setApprovedRequests(approved);
                setOtherRequests(others);

                const allUserIds = [...approved, ...others].map(r => r.userId);
                const uniqueUserIds = [...new Set(allUserIds)];
                const userResponses = await Promise.all(
                    uniqueUserIds.map(id =>
                        axios.get(`${process.env.REACT_APP_API_URL}/users/${id}`, {
                            headers: { Authorization: `Bearer ${token}` }
                        })
                    )
                );
                const userInfoMap = {};
                uniqueUserIds.forEach((id, i) => {
                    userInfoMap[id] = userResponses[i].data;
                });
                setUserMap(userInfoMap);

            } catch (err) {
                console.error('요청 또는 유저 정보 조회 실패:', err);
            }
        };
        fetchRequests();
    }, []);


    const getStatusText = (status) => {
        if (status === 'PENDING') return '신청자가 승인을 기다리고 있어요!';
        if (status === 'REJECTED') return '이 신청서를 거절했습니다.';
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
                            {userMap[r.userId] && (
                                <div className="request-user-profile">
                                    <img
                                        src={userMap[r.userId].profileImgUrl || DefaultAvatar}
                                        alt="프로필"
                                        className="profile-img"
                                    />
                                    <p className="nickname">{userMap[r.userId].nickname || '익명'}</p>
                                </div>
                            )}
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
                            {userMap[r.userId] && (
                                <div className="request-user-info">
                                    <img
                                        src={userMap[r.userId].profileImgUrl || DefaultAvatar}
                                        alt="프로필"
                                        className="profile-img"
                                    />
                                    <div className="request-user-texts">
                                        <p className="nickname">{userMap[r.userId].nickname || '익명'}</p>
                                        <p className={`status-text ${r.status.toLowerCase()}`}>
                                            {getStatusText(r.status)}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default SeniorRoom;
