import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParticipantDetail } from '../apis/getParticipantDetail';
import { postReelsComment } from '../apis/postReelsComment';
import { getReelsComments } from '../apis/getReelsComments';
import { deleteReelsComment } from '../apis/deleteReelsComment';
import PageTitle from '../components/PageTitle';
import dayjs from 'dayjs';
import '../styles/ParticipantDetail.css';

const ParticipantDetail = () => {
    const { challengeId, participantId } = useParams();
    const [participant, setParticipant] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const navigate = useNavigate();
    const currentUserId = JSON.parse(localStorage.getItem('user'))?.id;

    const fetchComments = async () => {
        const data = await getReelsComments(participantId);
        setComments(data);
        console.log(data);
    };

    const handleSubmitComment = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !commentText.trim()) return;

        try {
            await postReelsComment({
                reelsId: participantId,
                writerId: user.id,
                content: commentText,
            });
            setCommentText('');
            fetchComments();
        } catch (err) {
            console.error('댓글 등록 실패', err);
            alert('댓글 등록 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getParticipantDetail(challengeId, participantId);
            setParticipant(data);
            fetchComments();
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

            <div className="comment-form">
                <textarea
                    className="comment-textarea"
                    placeholder="댓글을 입력하세요"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    maxLength={300}
                />
                <button className="comment-submit-btn" onClick={handleSubmitComment}>
                    댓글 등록
                </button>
            </div>

            <div className="comment-list">
                {comments.map((c) => {
                    const isMine = currentUserId === c.writerId;

                    return (
                        <div key={c.rcommentId} className="comment-item">
                            <div className="comment-header">
                                <strong>{c.nickname}</strong> · {dayjs(c.writeDate).fromNow()}
                                {isMine && (
                                    <button
                                        onClick={async () => {
                                            if (window.confirm('댓글을 삭제하시겠습니까?')) {
                                                try {
                                                    await deleteReelsComment(c.rcommentId);
                                                    fetchComments();
                                                } catch (err) {
                                                    console.error('댓글 삭제 실패', err);
                                                    alert('삭제 중 오류 발생');
                                                }
                                            }
                                        }}
                                        className="comment-delete-btn"
                                    >
                                        삭제
                                    </button>
                                )}
                            </div>
                            <p>{c.content}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ParticipantDetail;
