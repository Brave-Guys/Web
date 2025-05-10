import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getChallengeDetail } from '../apis/getChallenges';
import { deleteChallenge } from '../apis/deleteChallenge';
import { deleteParticipant, getParticipants, postParticipant, checkParticipation } from '../apis/challengeParticipants';
import { uploadVideoToFirebase } from '../utils/uploadVideoToFirebase';
import DefaultAvatar from '../assets/person.png';
import ParticipantModal from '../components/ParticipantModal';
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
    const [selectedParticipant, setSelectedParticipant] = useState(null);

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
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !commentText.trim()) return;

        let videoUrl = null;
        if (videoFile) {
            try {
                videoUrl = await uploadVideoToFirebase(videoFile);
            } catch (err) {
                console.error('영상 업로드 실패', err);
                alert('영상 업로드 중 오류가 발생했습니다.');
                return;
            }
        }

        await postParticipant({
            challengeId: id,
            writerId: user.id,
            content: commentText.trim(),
            videoUrl,
        });

        setCommentText('');
        setVideoFile(null);
        fetchAll();
    };

    useEffect(() => {
        fetchAll();
    }, []);

    if (!challenge) return <div>로딩 중...</div>;

    const isOwner = JSON.parse(localStorage.getItem('user'))?.id === challenge.writerId;

    return (
        <div className="challenge-detail-container">
            <div className="challenge-detail-header">
                <PageTitle
                    title={challenge.name}
                    showBackArrow={true}
                    description={`작성자: ${challenge.nickname ?? '익명'} | 생성일: ${dayjs(challenge.createdAt).format('YYYY.MM.DD')}`}
                />
                {isOwner && (
                    <div className="challenge-action-buttons">
                        <CustomButton
                            label="수정"
                            size="small"
                            onClick={() => navigate(`/edit-challenge/${challenge.id}`)}
                        />
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
                    <p className="challenge-desc">{challenge.description}</p>
                </div>

                <div className="participant-section">
                    <h3>참가자 내역</h3>
                    <div className="participant-list">
                        {!alreadyParticipated ? (
                            <div className="participant-form">
                                <input
                                    type="text"
                                    placeholder="나의 챌린지 수행 내역을 작성하세요"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                />
                                <button onClick={handleSubmit}>등록</button>
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={(e) => setVideoFile(e.target.files[0])}
                                />
                            </div>
                        ) : (
                            <p>챌린지를 수행했습니다!</p>
                        )}
                        {participants.map((p) => {
                            const isMine = JSON.parse(localStorage.getItem('user'))?.id === p.writerId;
                            return (
                                <div
                                    key={p.id}
                                    className="participant-item"
                                    onClick={() => setSelectedParticipant(p)}
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

                    {selectedParticipant && (
                        <ParticipantModal
                            participant={selectedParticipant}
                            onClose={() => setSelectedParticipant(null)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChallengeDetail;
