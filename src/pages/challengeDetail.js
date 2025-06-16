import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChallengeDetail } from '../apis/getChallenges';
import { deleteChallenge } from '../apis/deleteChallenge';
import { deleteParticipant, getParticipants, postParticipant, checkParticipation } from '../apis/challengeParticipants';
import { uploadVideoToFirebase } from '../utils/uploadVideoToFirebase';
import LoadingOverlay from '../components/LoadingOverlay';
import DefaultAvatar from '../assets/person.png';
import PageTitle from '../components/PageTitle';
import CustomButton from '../components/CustomButton';
import dayjs from 'dayjs';
import '../styles/ChallengeDetail.css';

const ChallengeDetail = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [alreadyParticipated, setAlreadyParticipated] = useState(false);
    const [videoFile, setVideoFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const fetchAll = async () => {
        const challengeData = await getChallengeDetail(id);
        const participantData = await getParticipants(id);
        setChallenge(challengeData);
        setParticipants(participantData);

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const exists = await checkParticipation(id, user.id);
            setAlreadyParticipated(exists);
        }
    };

    const handleSubmit = async () => {
        setIsLoading(true); // 로딩 시작
        if (!videoFile) {
            alert('영상을 추가해야 등록할 수 있습니다.');
            setIsLoading(false);
            return;
        }
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !commentText.trim()) {
            setIsLoading(false);
            return;
        }

        let videoUrl = null;
        if (videoFile) {
            try {
                videoUrl = await uploadVideoToFirebase(videoFile);
            } catch (err) {
                console.error('영상 업로드 실패', err);
                alert('영상 업로드 중 오류가 발생했습니다.');
                setIsLoading(false);
                return;
            }
        }

        try {
            await postParticipant({
                challengeId: id,
                writerId: user.id,
                content: commentText.trim(),
                videoUrl,
            });
            setCommentText('');
            setVideoFile(null);
            await fetchAll();
        } catch (err) {
            alert('참가 등록 중 오류가 발생했습니다.');
            console.error(err);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    if (!challenge) return <div>로딩 중...</div>;

    const isOwner = JSON.parse(localStorage.getItem('user'))?.id === challenge.writerId;

    return (
        <div className="challenge-detail-container">
            {isLoading && <LoadingOverlay visible={true} />}
            <div className="challenge-detail-header">
                <PageTitle
                    title={challenge.name}
                    showBackArrow={true}
                    description={`${challenge.nickname ?? '익명'} | ${dayjs(challenge.createdAt).format('YYYY.MM.DD')}`}
                />
                {isOwner && (
                    <div className="challenge-action-buttons">
                        <CustomButton
                            label="삭제"
                            size="small"
                            color="red"
                            onClick={async () => {
                                if (window.confirm('챌린지를 삭제하시겠습니까?')) {
                                    await deleteChallenge(challenge.id);
                                    alert('삭제되었습니다.');
                                    navigate('/challenges');
                                }
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="challenge-detail-body">
                <div className="challenge-content">
                    {challenge.videoUrl && (
                        <div className="challenge-video-wrapper">
                            <video
                                src={challenge.videoUrl}
                                autoPlay
                                muted
                                controls
                                preload="metadata"
                                style={{ width: '100%', maxWidth: '600px' }}
                            />
                        </div>
                    )}
                    <div style={{ margin: '20px' }}></div>
                    <p className="challenge-desc">{challenge.description}</p>
                </div>

                <div className="participant-section">
                    <div className="participant-list">
                        {!alreadyParticipated ? (
                            <div className="participant-form">
                                <div className="participant-form-title">챌린지에 도전해보세요!</div>
                                <textarea
                                    className="participant-textarea"
                                    placeholder="상세 내용을 작성해보세요"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />

                                <div className="participant-form-buttons">
                                    {videoFile && (
                                        <div className="video-filename-box">
                                            <span className="video-icon">🎥</span>
                                            <span className="video-filename">{videoFile.name}</span>
                                            <button className="video-remove-btn" onClick={() => setVideoFile(null)}>✕</button>
                                        </div>
                                    )}
                                    <div style={{ flexGrow: '2' }}></div>
                                    <label className="upload-button">
                                        영상 추가
                                        <input
                                            type="file"
                                            accept="video/*"
                                            onChange={(e) => {
                                                const file = e.target.files[0];
                                                if (file) {
                                                    setVideoFile(file);
                                                    e.target.value = '';
                                                }
                                            }}
                                        />
                                    </label>

                                    {/* 등록 버튼 */}
                                    <button
                                        className="participant-submit-button"
                                        onClick={handleSubmit}
                                    >
                                        등록
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <p>챌린지를 수행했습니다!</p>
                        )}
                        <hr style={{ margin: '0', border: 'none', borderTop: '1px solid #ccc' }} />
                        <h3>참가자</h3>
                        {participants.map((p) => {
                            const isMine = JSON.parse(localStorage.getItem('user'))?.id === p.writerId;
                            return (
                                <div
                                    key={p.id}
                                    className="participant-item"
                                    onClick={() => navigate(`/challenges/${id}/participants/${p.id}`)}
                                >
                                    <img
                                        className="participant-avatar"
                                        src={p.profileImgUrl || DefaultAvatar}
                                        alt="profile"
                                    />
                                    <div className="participant-body">
                                        <div className="participant-header">
                                            <div className="participant-user">
                                                <strong className="participant-nickname">{p.nickname}</strong>
                                                <span className="participant-date">{dayjs(p.writeDate).fromNow()}</span>
                                            </div>
                                            {isMine && (
                                                <button
                                                    className="participant-delete"
                                                    onClick={async (e) => {
                                                        e.stopPropagation();
                                                        if (window.confirm('정말 삭제하시겠습니까?')) {
                                                            await deleteParticipant(id, p.writerId);
                                                            fetchAll();
                                                        }
                                                    }}
                                                >
                                                    삭제
                                                </button>
                                            )}
                                        </div>
                                        <div className="participant-content">{p.content}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ChallengeDetail;
