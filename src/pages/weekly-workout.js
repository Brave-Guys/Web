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
    const [videos, setVideos] = useState([])
    const [excludeIds, setExcludeIds] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    let currentVideo = videos[videos.length - 1];

    const [isFocused, setIsFocused] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [replyText, setReplyText] = useState('');
    const [replyingTo, setReplyingTo] = useState(null);

    const navigate = useNavigate();

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

    const fetchInitialVideo = async () => {
        try {
            const response = await getRandomParticipant([]);
            if (response) {
                setVideos([response]);
                setExcludeIds([response.id]);
                await fetchComments(response.id);
            }
            console.log([response]);
        } catch (err) {
            console.error('초기 참가자 로드 실패', err);
        } finally {
            setLoading(false);
        }
    };


    const fetchComments = async (participantId) => {
        const data = await getReelsComments(participantId);
        setComments(nestComments(data));
    };

    const handleNextVideo = async () => {
        try {
            const response = await getRandomParticipant(videos.map(v => v.id));
            if (!response) {
                alert('더 이상 보여줄 영상이 없습니다.');
                return;
            }

            const updatedVideos = [...videos, response];
            if (updatedVideos.length > 10) updatedVideos.shift();

            setVideos(updatedVideos);
            await fetchComments(response.id);
            console.log(updatedVideos);
        } catch (error) {
            console.error('새 영상 로딩 실패', error);
        }
    };

    const handleReplyClick = (commentId) => {
        setReplyingTo(commentId);
    };

    const handleSubmitComment = async (parentId = null) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !commentText.trim()) return;

        try {
            currentVideo = videos[videos.length - 1];
            await postReelsComment({
                reelsId: currentVideo.id,
                writerId: user.id,
                content: commentText,
                parentId: parentId,
            });
            setCommentText('');
            fetchComments(currentVideo.id);
        } catch (err) {
            console.error('댓글 등록 실패', err);
            alert('댓글 등록 중 오류가 발생했습니다.');
        }
    };

    const handleSubmitReply = async (parentId, replyText) => {
        currentVideo = videos[videos.length - 1];
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !replyText.trim()) return;

        try {
            await postReelsComment({
                reelsId: currentVideo.id,
                writerId: user.id,
                content: replyText,
                parentId: parentId,
            });
            setReplyText('');
            setReplyingTo(null);
            fetchComments(currentVideo.id);
        } catch (err) {
            console.error('답글 등록 실패', err);
            alert('답글 등록 중 오류가 발생했습니다.');
        }
    };

    useEffect(() => {
        fetchInitialVideo();
    }, []);

    if (loading) return <div>로딩 중...</div>;

    if (!videos) return <div>참가자가 없습니다.</div>;

    return (
        <div className="participant-detail-page">
            <div className="participant-detail-wrapper">
                <PageTitle
                    title='금주의 운동'
                    description="릴스"
                    showBackArrow={true}
                    onBack={() => navigate(-1)}
                />
                <div className="participant-main">
                    {videos.length > 0 && (
                        <div className="participant-video-wrapper">
                            <video
                                src={currentVideo.videoUrl}
                                autoPlay
                                muted
                                controls
                                preload="metadata"
                                style={{ width: '100%', maxWidth: '640px' }}
                            />
                            <div className="video-controls">
                                <button onClick={handleNextVideo}>다음</button>
                            </div>
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
                                onDeleteSuccess={() => { fetchComments(currentVideo.id) }}
                                onEditSuccess={() => { fetchComments(currentVideo.id) }}
                                profileImgUrl={c.profileImgUrl}
                                isChallenge={true}
                                onReplyClick={() => handleReplyClick(c.rcommentId)}
                            />
                        ))}
                    </div>

                </div>
                <div style={{ flexGrow: '1' }}></div>
            </div>
        </div>
    );
};

export default WeeklyWorkout;
