import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import CustomButton from '../components/CustomButton';
import ChallengeItem from '../components/ChallengeItem'; // 챌린지 항목 하나를 표시할 컴포넌트
import '../styles/ChallengeBoard.css';

const ChallengeBoard = () => {
    const navigate = useNavigate();
    const [challenges, setChallenges] = useState([]);

    useEffect(() => {
        // TODO: API 호출해서 챌린지 목록 받아오기
    }, []);

    return (
        <div className="challenge-board">
            <div className="challenge-header">
                <PageTitle
                    title="챌린지"
                    description="다른 사람들과 함께 도전하고, 기록을 남겨보세요!"
                />
                <CustomButton
                    label="챌린지 만들기"
                    size="small"
                    color="purple"
                    onClick={() => navigate('/create-challenge')}
                />
            </div>

            <div className="challenge-list">
                {/* 챌린지 아이템들 렌더링 */}
                {challenges.length > 0 ? (
                    challenges.map((item) => (
                        <ChallengeItem key={item._id} challenge={item} />
                    ))
                ) : (
                    <p>등록된 챌린지가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default ChallengeBoard;
