import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChallengeDetail } from '../apis/getChallenges';
import { deleteParticipant, getParticipants, postParticipant, checkParticipation } from '../apis/challengeParticipants';
import { uploadVideoToFirebase } from '../utils/uploadVideoToFirebase';
import ParticipantModal from '../components/ParticipantModal';
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

    const fetchAll = async () => {
        const challengeData = await getChallengeDetail(id);
        const participantData = await getParticipants(id);
        setChallenge(challengeData);
        setParticipants(participantData);

        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const exists = await checkParticipation(id, user._id);
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
            writerId: user._id,
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

    return (
        <div className="challenge-detail">
            <h2>{challenge.name}</h2>
            <p className="challenge-meta">
                작성자: {challenge.nickname ?? '익명'} | 생성일: {dayjs(challenge.createdAt).format('YYYY.MM.DD')}
            </p>

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

            <hr />

            <div className="participant-section">
                <h3>참가자 내역</h3>                
                {participants.map((p) => {
                    const isMine = JSON.parse(localStorage.getItem('user'))?._id === p.writerId;
                    return (
                        <div
                            key={p._id}
                            className="participant-item"
                            onClick={() => setSelectedParticipant(p)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="participant-meta">
                                <strong>{p.nickname}</strong> · {dayjs(p.writeDate).fromNow()}
                                {isMine && (
                                    <span
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            if (window.confirm('정말 삭제하시겠습니까?')) {
                                                await deleteParticipant(id, p.writerId);
                                                fetchAll();
                                            }
                                        }}
                                        style={{
                                            marginLeft: '10px',
                                            color: 'red',
                                            cursor: 'pointer',
                                            fontSize: '13px'
                                        }}
                                    >
                                        삭제
                                    </span>
                                )}
                            </div>
                            <div className="participant-content">{p.content}</div>
                        </div>
                    );
                })}

                {/* 모달 */}
                {selectedParticipant && (
                    <ParticipantModal
                        participant={selectedParticipant}
                        onClose={() => setSelectedParticipant(null)}
                    />
                )}

                {!alreadyParticipated && (
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
                )}
            </div>
        </div>
    );
};

export default ChallengeDetail;
