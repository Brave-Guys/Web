import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChallengeItem.css';

const ChallengeItem = ({ challenge }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/challenge/${challenge._id}`); // 상세 페이지 경로
    };

    return (
        <div className="challenge-item" onClick={handleClick}>
            <div className="challenge-title">{challenge.name}</div>
            <div className="challenge-meta">
                <span>작성자: {challenge.nickname || '익명'}</span>
                <span>참여 {challenge.participants?.length ?? 0}명</span>
            </div>
            <div className="challenge-description">
                {challenge.description ?? '설명이 없습니다.'}
            </div>
        </div>
    );
};

export default ChallengeItem;
