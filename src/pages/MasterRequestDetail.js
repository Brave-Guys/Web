import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMasterRequestById } from '../apis/getMasterRequest';
import { approveMasterRequest, rejectMasterRequest } from '../apis/updateMasterRequest';
import '../styles/MasterRequestDetail.css';
import axios from 'axios';

const MasterRequestDetail = () => {
    const { id } = useParams();
    const [request, setRequest] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            const data = await getMasterRequestById(id);
            setRequest(data);
        };
        fetch();
    }, [id]);

    const handleApprove = async () => {
        try {
            await approveMasterRequest(request.id, request.userId);
            alert('승인 완료!');
            navigate('/admin');
        } catch (e) {
            alert('승인 실패');
        }
    };

    const handleReject = async () => {
        try {
            await rejectMasterRequest(request.id);
            alert('거절 완료!');
            navigate('/admin');
        } catch (e) {
            alert('거절 실패');
        }
    };

    if (!request) return <div>로딩 중...</div>;

    return (
        <div className="detail-wrapper">
            <h2>상급자 신청 상세보기</h2>
            <div className="detail-box">
                <p><strong>이름:</strong> {request.name}</p>
                <p><strong>연락처:</strong> {request.phone}</p>
                <p><strong>주력 부위:</strong> {request.parts}</p>
                <p><strong>경력:</strong> {request.career}</p>
                <p><strong>소개:</strong> {request.intro}</p>
                <p><strong>링크:</strong> {request.link || '없음'}</p>
                <p><strong>자격증:</strong></p>
                <ul>
                    {request.certFileUrls?.split(',').map((url, i) => (
                        <li key={i}><a href={url} target="_blank" rel="noreferrer">[자격증 {i + 1}]</a></li>
                    ))}
                </ul>
                <p><strong>포트폴리오:</strong></p>
                <ul>
                    {request.portfolioUrls?.split(',').map((url, i) => (
                        <li key={i}><a href={url} target="_blank" rel="noreferrer">[포트폴리오 {i + 1}]</a></li>
                    ))}
                </ul>
            </div>

            <div className="detail-actions">
                <button className="approve-button" onClick={handleApprove}>승인</button>
                <button className="reject-button" onClick={handleReject}>거절</button>
            </div>
        </div>
    );
};

export default MasterRequestDetail;
