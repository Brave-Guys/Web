import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomParticipant } from '../apis/getParticipantDetail';
import PageTitle from '../components/PageTitle';
import dayjs from 'dayjs';
import '../styles/ParticipantDetail.css';

const WeeklyWorkout = () => {
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchRandomParticipant = async () => {
        try {
            const response = await getRandomParticipant();
            if (response) {
                setParticipant(response);
            } else {
                alert('랜덤 참가자를 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('랜덤 참가자 가져오기 실패', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRandomParticipant();
    }, []);

    if (loading) return <div>로딩 중...</div>;

    if (!participant) return <div>참가자가 없습니다.</div>;

    return (
        <div className="participant-detail-page">
            <PageTitle
                title={`${participant.nickname}님의 수행 내역`}
                description={dayjs(participant.writeDate).format('YYYY.MM.DD HH:mm')}
                showBackArrow={true}
                onBack={() => navigate(-1)}
            />
            <div className="participant-detail-wrapper">
                <div className="participant-main">
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
                </div>

                <div className="participant-comments">
                    <div className="comment-list">
                        <div className="comment-item">
                            <div className="comment-layout">
                                <img
                                    src={participant.profileImgUrl || 'default-avatar.png'}
                                    alt="avatar"
                                    className="avatar"
                                />
                                <div className="comment-main">
                                    <div className="comment-header">
                                        <span className="comment-nickname">{participant.nickname}</span>
                                        <span className="comment-time">
                                            {dayjs(participant.writeDate).fromNow()}
                                        </span>
                                    </div>
                                    <p>{participant.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyWorkout;
