import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageTitle from '../components/PageTitle';
import '../styles/SeniorRoom.css';

const SeniorRequestDetail = () => {
    const { id } = useParams();
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
        </div>
    );
};

export default SeniorRequestDetail;
