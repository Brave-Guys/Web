import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParticipantDetail } from '../apis/getParticipantDetail';
import { postReelsComment } from '../apis/postReelsComment';
import { getReelsComments } from '../apis/getReelsComments';
import PageTitle from '../components/PageTitle';
import CustomButton from '../components/CustomButton';
import CommentItem from '../components/CommentItem';
import dayjs from 'dayjs';
import '../styles/ParticipantDetail.css';

const ParticipantDetail = () => {
    const { challengeId, participantId } = useParams();
    const [participant, setParticipant] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const navigate = useNavigate();

    const fetchComments = async () => {
        const data = await getReelsComments(participantId);
        setComments(data);
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
                    <div className="comment-form">
                        <textarea
                            className={`comment-textarea ${isFocused || commentText ? 'expanded' : ''}`}
                            placeholder="댓글을 입력하세요"
                            value={commentText}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                if (!commentText.trim()) setIsFocused(false);
                            }}
                            onChange={(e) => setCommentText(e.target.value)}
                            maxLength={300}
                        />
                        {isFocused && (
                            <div
                                className="comment-action-buttons visible"
                                style={{
                                    justifyContent: 'flex-end',
                                    gap: '6px',
                                    marginTop: '6px'
                                }}
                            >
                                <CustomButton
                                    label="취소"
                                    size="small"
                                    color="gray"
                                    onClick={() => {
                                        setCommentText('');
                                        setIsFocused(false);
                                    }}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '13px',
                                        height: '32px',
                                        maxWidth: '20%',
                                    }}
                                />
                                <CustomButton
                                    label="등록"
                                    size="small"
                                    onClick={handleSubmitComment}
                                    style={{
                                        padding: '4px 10px',
                                        fontSize: '13px',
                                        height: '32px',
                                        maxWidth: '20%',
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <div style={{ margin: '20px' }}></div>

                    <div className="comment-list">
                        {comments.map((c) => (
                            <CommentItem
                                key={c.rcommentId}
                                commentId={c.rcommentId}
                                name={c.nickname}
                                time={c.writeDate}
                                content={c.content}
                                likes={c.likes || 0}
                                replies={c.replies || []}
                                onReplySubmit={handleSubmitComment}
                                depth={0}
                                writerId={c.writerId}
                                onDeleteSuccess={fetchComments}
                                onEditSuccess={fetchComments}
                                profileImgUrl={c.profileImgUrl}
                                isChallenge={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantDetail;
