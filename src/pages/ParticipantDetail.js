import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParticipantDetail } from '../apis/getParticipantDetail';
import PageTitle from '../components/PageTitle';
import dayjs from 'dayjs';
import '../styles/ParticipantDetail.css';

const ParticipantDetail = () => {
    const { challengeId, participantId } = useParams();
    const [participant, setParticipant] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getParticipantDetail(challengeId, participantId);
            setParticipant(data);
        };
        fetchData();
    }, [challengeId, participantId]);

    if (!participant) return <div>로딩 중...</div>;

    return (
        <div className="participant-detail-container">
            <PageTitle
                title={`${participant.nickname}님의 수행 내역`}
                showBackArrow={true}
                onBack={() => navigate(-1)}
            />
            <p className="participant-detail-date">{dayjs(participant.writeDate).format('YYYY.MM.DD HH:mm')}</p>
            <p className="participant-detail-content">{participant.content}</p>
            {participant.videoUrl && (
                <div className="participant-video-wrapper">
                    <video
                        src={participant.videoUrl}
                        autoPlay
                        muted
                        controls
                        preload="metadata"
                        style={{ width: '100%', maxWidth: '640px' }}
                    />
                </div>
            )}
            {/* 향후 댓글, 좋아요 영역도 여기 추가 가능 */}
        </div>
    );
};

export default ParticipantDetail;
