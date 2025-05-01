import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChallengeItem.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const ChallengeItem = ({ challenge }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/challenge/${challenge._id}`);
    };

    // 종료까지 남은 시간 계산
    const expireText = challenge.endDate
        ? dayjs().isBefore(challenge.endDate)
            ? `${dayjs(challenge.endDate).fromNow(true)} 남음` // 예: "5일 남음"
            : '만료됨'
        : '기간 미정';

    return (
        <div className="challenge-item" onClick={handleClick}>
            <div className="challenge-title">{challenge.name}</div>
            <div className="challenge-meta">
                <span>{challenge.nickname || '익명'}</span>
                <span className="challenge-expire">{expireText}</span>
            </div>
            <div className="challenge-description">
                {challenge.description ?? '설명이 없습니다.'}
            </div>
        </div>
    );
};

export default ChallengeItem;
