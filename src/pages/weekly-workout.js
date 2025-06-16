import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRandomParticipant } from '../apis/getParticipantDetail';
import CustomButton from '../components/CustomButton';
import CommentItem from '../components/CommentItem';
import { postReelsComment } from '../apis/postReelsComment';
import { ChevronRight, Play } from 'lucide-react';
import { getReelsComments } from '../apis/getReelsComments';
import PageTitle from '../components/PageTitle';
import { getChallengeDetail } from '../apis/getChallenges';
import ClipLoader from 'react-spinners/ClipLoader';
import '../styles/reels.css'

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
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);
    const [challengeInfo, setChallengeInfo] = useState(null);

    const navigate = useNavigate();

    const fetchChallengeInfo = async (challengeId) => {
        try {
            const data = await getChallengeDetail(challengeId);
            setChallengeInfo(data);
        } catch (error) {
            console.error('챌린지 정보 불러오기 실패:', error);
        }
    };

    const togglePlayback = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
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

    const fetchInitialVideo = async () => {
        try {
            const response = await getRandomParticipant([]);
            if (response) {
                setVideos([response]);
                setExcludeIds([response.id]);
                await fetchComments(response.id);
                await fetchChallengeInfo(response.challengeId);
            }
            console.log([response]);
        } catch (err) {
            console.error('초기 참가자 로드 실패', err);
        }
    };

    const fetchComments = async (participantId) => {
        const data = await getReelsComments(participantId);
        setComments(nestComments(data));
    };

    const handleNextVideo = async () => {
        setLoading(true);
        try {
            const response = await getRandomParticipant(videos.map(v => v.id));
            if (!response) {
                alert('더 이상 보여줄 영상이 없습니다.');
                return;
            }

            const updatedVideos = [...videos, response];
            if (updatedVideos.length > 10) updatedVideos.shift();

            console.log(updatedVideos);

            setVideos(updatedVideos);
            setIsPlaying(true);
            await fetchComments(response.id);
            await fetchChallengeInfo(response.challengeId);
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

    if (!videos) return <div>참가자가 없습니다.</div>;

    return (
        <div className="reels-page">
            <PageTitle
                title='금주의 운동'
                description="릴스"
                showBackArrow={true}
                onBack={() => navigate(-1)}
            />
            <div className="reels-wrapper">
                <div className="reels-main">
                    {videos.length > 0 && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="reels-container">
                                <video
                                    key={currentVideo?.id}
                                    ref={videoRef}
                                    src={currentVideo?.videoUrl}
                                    autoPlay
                                    muted
                                    onClick={togglePlayback}
                                    onCanPlay={() => setLoading(false)}
                                    className="reels-video"
                                    loop
                                    playsInline
                                />

                                {/* ▶ 재생 버튼 */}
                                {!isPlaying && !loading && (
                                    <div className="video-play-overlay">
                                        <Play size={64} />
                                    </div>
                                )}

                                {/* ▼ 하단 오버레이 */}
                                {!loading && challengeInfo && (
                                    <div className="video-bottom-overlay">
                                        <div className="video-overlay-left">
                                            <div className="video-overlay-title">{challengeInfo.name}</div>
                                            <div className="video-overlay-writer">{challengeInfo.nickname}</div>
                                        </div>
                                        <button
                                            className="video-overlay-button"
                                            onClick={() => navigate(`/challenges/${challengeInfo.id}`)}
                                        >
                                            챌린지 보기
                                        </button>
                                    </div>
                                )}

                                <button className="next-button-full" onClick={handleNextVideo}>
                                    <span>다음 영상</span>
                                    <ChevronRight size={20} />
                                </button>

                                {loading && (
                                    <div className="spinner-overlay">
                                        <ClipLoader color="#6b46c1" size={48} />
                                    </div>
                                )}
                            </div>
                        </div>

                    )}
                </div>

                <div className="reels-comments">
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

                    <div style={{ margin: '30px' }}></div>

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
            </div>
        </div>
    );
};

export default WeeklyWorkout;