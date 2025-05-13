import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomParticipant } from '../apis/getParticipantDetail';
import CustomButton from '../components/CustomButton';
import CommentItem from '../components/CommentItem';
import { postReelsComment } from '../apis/postReelsComment';
import { getReelsComments } from '../apis/getReelsComments';
import PageTitle from '../components/PageTitle';
import dayjs from 'dayjs';
import '../styles/ParticipantDetail.css';

const WeeklyWorkout = () => {
    const [participant, setParticipant] = useState(null);
    const [comments, setComments] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [loading, setLoading] = useState(true);  // 로딩 상태 추가
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);
    const navigate = useNavigate();

    // 댓글을 계층 구조로 변환하는 함수
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

    // 랜덤 참가자를 가져오고 그에 맞는 댓글도 가져오는 함수
    const fetchRandomParticipant = async () => {
        try {
            const response = await getRandomParticipant(); // 랜덤 참가자 호출
            if (response) {
                setParticipant(response);
                await fetchComments(response.writerId);  // 참가자 ID에 맞는 댓글을 가져옴                
            } else {
                alert('랜덤 참가자를 가져오는 데 실패했습니다.');
            }
        } catch (error) {
            console.error('랜덤 참가자 가져오기 실패', error);
        } finally {
            setLoading(false);  // 로딩 완료
        }
    };

    // 해당 참가자의 댓글을 가져오는 함수
    const fetchComments = async (participantId) => {
        const data = await getReelsComments(participantId);
        setComments(nestComments(data));  // 댓글을 계층 구조로 변환
    };

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
    };

    // 댓글 등록 함수
    const handleSubmitComment = async (parentId = null) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !commentText.trim()) return;

        try {
            await postReelsComment({
                reelsId: participant.id,
                writerId: user.id,
                content: commentText,
                parentId: parentId,
            });
            setCommentText('');
            fetchComments(participant.id);  // 댓글을 새로 불러옴
        } catch (err) {
            console.error('댓글 등록 실패', err);
            alert('댓글 등록 중 오류가 발생했습니다.');
        }
    };

    // 답글 등록 함수
    const handleSubmitReply = async (parentId, replyText) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !replyText.trim()) return;

        try {
            await postReelsComment({
                reelsId: participant.id,
                writerId: user.id,
                content: replyText,
                parentId: parentId,
            });
            setReplyText('');
            setReplyingTo(null);
            fetchComments(participant.id);  // 댓글을 새로 불러옴
        } catch (err) {
            console.error('답글 등록 실패', err);
            alert('답글 등록 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchRandomParticipant();  // 랜덤 참가자 가져오기
    }, []);

    if (loading) return <div>로딩 중...</div>;

    if (!participant) return <div>참가자가 없습니다.</div>;

    return (
        <div className="participant-detail-page">
            <PageTitle
                title='금주의 운동'
                description={dayjs(participant.writeDate).format('YYYY.MM.DD HH:mm')}
                showBackArrow={true}
                onBack={() => navigate(-1)}
            />
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

export default WeeklyWorkout;
