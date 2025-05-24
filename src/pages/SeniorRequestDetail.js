import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import '../styles/SeniorRoom.css';

const SeniorRequestDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [request, setRequest] = useState(null);

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/share-requests/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRequest(res.data);
            } catch (err) {
                console.error('상세 신청서 조회 실패:', err);
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
                <p><strong>신청자 ID:</strong> {request.userId}</p>
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
