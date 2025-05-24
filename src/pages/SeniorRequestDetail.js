import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import DefaultAvatar from '../assets/person.png';
import '../styles/SeniorRoom.css';

const SeniorRequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/share-requests/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setRequest(res.data);

                const userRes = await axios.get(`${process.env.REACT_APP_API_URL}/users/${res.data.userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUser(userRes.data);
            } catch (err) {
                console.error('상세 신청서 또는 유저 정보 조회 실패:', err);
            }
        };

        fetchRequest();
    }, [id]);
    const handleUpdateStatus = async (status) => {
        try {
            const token = localStorage.getItem('token');
            await axios.patch(
                `${process.env.REACT_APP_API_URL}/share-requests/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert(`신청서가 ${status === 'APPROVED' ? '승인' : '거절'}되었습니다.`);
            navigate('/senior');
        } catch (err) {
            console.error('상태 업데이트 실패:', err);
            alert('처리 중 오류가 발생했습니다.');
        }
    };

    if (!request) return <div className="senior-room-wrapper">로딩 중...</div>;

    return (
        <div className="senior-room-wrapper">
            <PageTitle
                title="신청서 상세 보기"
                description="신청자의 요청 내용을 확인하세요."
                showBackArrow={true}
            />
            <div className="request-card">
                {user && (
                    <div className="request-user-profile">
                        <img
                            src={user.profileImgUrl || DefaultAvatar}
                            alt="프로필"
                            className="profile-img"
                        />
                        <p style={{ fontSize: '18px' }} className='nickname'>{user.nickname || '익명 사용자'}</p>
                    </div>
                )}
                <p><strong>나이:</strong> {request.age}</p>
                <p><strong>성별:</strong> {request.gender}</p>
                <p><strong>키:</strong> {request.height}</p>
                <p><strong>몸무게:</strong> {request.weight}</p>
                <p><strong>메시지:</strong> {request.content || '없음'}</p>
            </div>
            <div className="detail-actions">
                {request.status === 'REJECTED' ? (
                    <p className="rejected-text">이 신청을 거절했습니다.</p>
                ) : (
                    <>
                        <button className="approve-button" onClick={() => handleUpdateStatus('APPROVED')}>승인</button>
                        <button className="reject-button" onClick={() => handleUpdateStatus('REJECTED')}>거절</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default SeniorRequestDetail;
