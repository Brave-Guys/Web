import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChallenges } from '../apis/getChallenges';
import { CheckSquare } from 'lucide-react';
import PageTitle from '../components/PageTitle';
import CustomButton from '../components/CustomButton';
import ChallengeItem from '../components/ChallengeItem';
import ClipLoader from 'react-spinners/ClipLoader';
import '../styles/ChallengeBoard.css';

const ChallengeBoard = () => {
    const navigate = useNavigate();
    const [challenges, setChallenges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSenior, setIsSenior] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user?.role === 'SENIOR') {
            setIsSenior(true);
        }

        const fetchChallenges = async () => {
            try {
                setIsLoading(true);
                const data = await getChallenges();
                setChallenges(data);
            } catch (err) {
                console.error('챌린지 불러오기 실패', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    return (
        <div className="challenge-board">
            <div className="challenge-header">
                <PageTitle
                    title="챌린지"
                    showBackArrow={true}
                    description="다른 사람들과 함께 도전하고, 기록을 남겨보세요!"
                />
                {isSenior && (
                    <CustomButton
                        label="챌린지 만들기"
                        size="small"
                        color="purple"
                        onClick={() => navigate('/create-challenge')}
                    />
                )}
            </div>

            <div className="challenge-link-wrapper">
                <div className="challenge-link" onClick={() => navigate('/mychallengehistory')}>
                    <CheckSquare className="challenge-icon" size={18} />
                    <span className="challenge-text">이전 챌린지 수행 내역</span>
                </div>
            </div>

            <div className="desktop" style={{ margin: '70px' }}></div>

            <div className={isLoading ? 'challenge-list loading' : 'challenge-list'}>
                {isLoading ? (
                    <ClipLoader size={40} color="#6b46c1" />
                ) : challenges.length > 0 ? (
                    challenges.map((item) => (
                        <ChallengeItem key={item.id} challenge={item} />
                    ))
                ) : (
                    <p>등록된 챌린지가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default ChallengeBoard;
