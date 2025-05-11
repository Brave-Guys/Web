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
        navigate(`/challenges/${challenge.id}`);
    };

    const expireText = challenge.endDate
        ? dayjs().isBefore(challenge.endDate)
            ? `${dayjs(challenge.endDate).fromNow(true)} 남음`
            : '만료됨'
        : '기간 미정';

    return (
        <div className="challenge-item" onClick={handleClick}>
            <div className="challenge-info">
                <div className="challenge-title">{challenge.name}</div>
                <div className="challenge-nickname">{challenge.nickname || '익명'}</div>
            </div>

            <div className="challenge-expire">{expireText}</div>
        </div>
    );
};

export default ChallengeItem;
