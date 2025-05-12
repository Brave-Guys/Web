import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import { getMyChallengeParticipants } from '../apis/getMyChallengeParticipants';
import '../styles/ChallengeBoard.css';

const MyChallengeHistory = () => {
    const [challenges, setChallenges] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyChallenges = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user) return;
            try {
                const data = await getMyChallengeParticipants(user.id);
                setChallenges(data);
            } catch (err) {
                console.error('내 챌린지 불러오기 실패', err);
            }
        };
        fetchMyChallenges();
    }, []);

    return (
        <div className="challenge-board">
            <div className="challenge-header">
                <PageTitle
                    title="완료한 챌린지"
                    showBackArrow={true}
                    description="내가 수행한 챌린지들이에요."
                />
            </div>
            <div className="challenge-card-list">
                {challenges.map((challenge) => (
                    <div
                        key={challenge.id}
                        className="challenge-card"
                        onClick={() => navigate(`/challenges/${challenge.challengeId}/participants/${challenge.id}`)}
                    >
                        <img
                            src={challenge.thumbnailUrl || 'https://via.placeholder.com/120x80'}
                            alt="thumbnail"
                            className="challenge-thumbnail"
                        />
                        <div className="challenge-info">
                            <h4 className="challenge-title">{challenge.content}</h4>
                            <p className="challenge-date">{new Date(challenge.writeDate).toLocaleDateString()}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyChallengeHistory;
