import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getChallengeDetail } from '../apis/getChallenges'; // 추후 생성
import '../styles/ChallengeDetail.css';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';

dayjs.extend(relativeTime);
dayjs.locale('ko');

const ChallengeDetail = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getChallengeDetail(id);
                setChallenge(data);
            } catch (err) {
                console.error('챌린지 상세 조회 실패', err);
            }
        };
        fetchData();
    }, [id]);

    if (!challenge) return <div>로딩 중...</div>;

    const expireText = dayjs().isBefore(challenge.endDate)
        ? `${dayjs(challenge.endDate).fromNow(true)} 남음`
        : '만료됨';

    return (
        <div className="challenge-detail">
            <h1 className="challenge-title">{challenge.name}</h1>
            <div className="challenge-meta">
                <span>{challenge.nickname || '익명'}</span>
                <span>{expireText}</span>
            </div>
            <p className="challenge-description">{challenge.description}</p>

            {/* 아래는 이후 구현 */}
            <hr />
            <h3>참여 내역</h3>
            <div className="challenge-participants">
                {/* 참가자 리스트 출력 예정 */}
            </div>

            <div className="challenge-reply-box">
                <textarea placeholder="수행 내역을 남겨보세요" />
                <button>등록</button>
            </div>
        </div>
    );
};

export default ChallengeDetail;
