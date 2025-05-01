import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChallengeDetail } from '../apis/getChallenges';
import { getParticipants, postParticipant, checkParticipation } from '../apis/challengeParticipants';
import dayjs from 'dayjs';
import '../styles/ChallengeDetail.css';

const ChallengeDetail = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [participants, setParticipants] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [alreadyParticipated, setAlreadyParticipated] = useState(false);

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
        await postParticipant({
            challengeId: id,
            writerId: user._id,
            content: commentText.trim(),
        });
        setCommentText('');
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
            <p className="challenge-desc">{challenge.description}</p>

            <hr />

            <div className="participant-section">
                <h3>참가자 내역</h3>
                {participants.map((p) => (
                    <div key={p._id} className="participant-item">
                        <div className="participant-meta">
                            <strong>{p.nickname}</strong> · {dayjs(p.writeDate).fromNow()}
                        </div>
                        <div className="participant-content">{p.content}</div>
                    </div>
                ))}

                {!alreadyParticipated && (
                    <div className="participant-form">
                        <input
                            type="text"
                            placeholder="나의 챌린지 수행 내역을 작성하세요"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button onClick={handleSubmit}>등록</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChallengeDetail;