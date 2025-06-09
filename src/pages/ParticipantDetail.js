import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParticipantDetail } from '../apis/getParticipantDetail';
import { getChallengeDetail } from '../apis/getChallenges';
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
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const [challengeName, setChallengeName] = useState('');
    const navigate = useNavigate();

    const fetchComments = async () => {
        const data = await getReelsComments(participantId);
        setComments(nestComments(data));
    };


    const handleSubmitComment = async (parentId = null) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !commentText.trim()) return;

        try {
            await postReelsComment({
                reelsId: participantId,
                writerId: user.id,
                content: commentText,
                parentId: parentId,
            });
            setCommentText('');
            fetchComments();
        } catch (err) {
            console.error('댓글 등록 실패', err);
            alert('댓글 등록 중 오류가 발생했습니다.');
        }
    };

    const handleSubmitReply = async (parentId, replyText) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !replyText.trim()) return;

        try {
            await postReelsComment({
                reelsId: participantId,
                writerId: user.id,
                content: replyText,
                parentId: parentId,
            });
            setReplyText('');
            setReplyingTo(null);
            fetchComments();
        } catch (err) {
            console.error('답글 등록 실패', err);
            alert('답글 등록 중 오류가 발생했습니다.');
        }
    };

    const nestComments = (comments) => {
        const map = {};
        const roots = [];
        comments.forEach((c) => {
            c.replies = [];
            map[c.rcommentId] = c;
        });
        comments.forEach((c) => {
            if (c.parentId) {
                if (map[c.parentId]) map[c.parentId].replies.push(c);
            } else {
                roots.push(c);
            }
        });
        return roots;
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = await getParticipantDetail(challengeId, participantId);
            setParticipant(data);
            fetchComments();
            try {
                const challenge = await getChallengeDetail(challengeId);
                setChallengeName(challenge.name);
            } catch (err) {
                console.error('챌린지 정보 로딩 실패', err);
            }
        };
        fetchData();
    }, [challengeId, participantId]);


    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
    };

    if (!participant) return <div>로딩 중...</div>;

    return (
        <div className="participant-detail-page">
            <PageTitle
                title={`${challengeName} → ${participant.nickname}님의 수행 내역`}
                description={dayjs(participant.writeDate).format('YYYY.MM.DD HH:mm')}
                showBackArrow={true}
                onBack={() => navigate(-1)}
            />
            <div style={{ margin: `50px` }}></div>
            <div className="participant-detail-wrapper">
                <div className="participant-main">
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
                    <p className="participant-detail-content">{participant.content}</p>
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
                                    onClick={() => handleSubmitComment()}
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
                                onReplySubmit={(replyText) => handleSubmitReply(c.rcommentId, replyText)}
                                depth={0}
                                writerId={c.writerId}
                                onDeleteSuccess={fetchComments}
                                onEditSuccess={fetchComments}
                                profileImgUrl={c.profileImgUrl}
                                isChallenge={true}
                                onReplyClick={() => handleReplyClick(c.rcommentId)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantDetail;
