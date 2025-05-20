import React from 'react';
import PageTitle from '../components/PageTitle';
import axios from 'axios';
import '../styles/SharePlan.css';

const SharePlan = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userPlanType = user?.userPlanType;

    const handlePlanChange = async (planName) => {
        const confirmed = window.confirm(`정말 ${planName} 플랜으로 신청하시겠습니까?`);
        if (!confirmed) return;

        try {
            const token = localStorage.getItem('token');
            const res = await axios.patch(
                `${process.env.REACT_APP_API_URL}/users/${user.id}/plan`,
                { userPlanType: planName.toUpperCase() },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            // 성공 시 로컬스토리지 정보도 갱신
            const updatedUser = { ...user, userPlanType: planName.toUpperCase() };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            alert(`${planName} 플랜으로 신청이 완료되었습니다.`);
            window.location.reload();
        } catch (err) {
            alert('신청 중 오류가 발생했습니다.');
            console.error(err);
        }
    };

    const renderButton = (planName) => {
        const isCurrentPlan = userPlanType === planName.toUpperCase();
        if (isCurrentPlan) {
            return (
                <button className="plan-button disabled" disabled>
                    내 플랜
                </button>
            );
        }
        return (
            <button className={`plan-button ${planName.toLowerCase()}`} onClick={() => handlePlanChange(planName)}>
                신청
            </button>
        );
    };

    return (
        <div className="shareplan-wrapper">
            <PageTitle title="Share+ 플랜" description="등급별 혜택을 알아보세요." showBackArrow={true} />

            <div className="plan-cards">
                {/* BEGINNER */}
                <div className="plan-card">
                    <h2 className="plan-title beginner">BEGINNER</h2>
                    <p className="plan-price">무료</p>
                    <div className="plan-description">
                        <ul className="plan-features">
                            <li>Share+ 외 모든 기능</li>
                        </ul>
                    </div>
                    {renderButton('beginner')}
                </div>

                {/* AMATEUR */}
                <div className="plan-card">
                    <h2 className="plan-title amateur">Amateur</h2>
                    <p className="plan-price">월 8,800원</p>
                    <div className="plan-description">
                        <ul className="plan-features">
                            <li>Share+ 사용 가능</li>
                            <li>텍스트 질문 및 피드백</li>
                            <li>일일 질문 10회 제한</li>
                            <li>상급자 최대 2명</li>
                        </ul>
                    </div>
                    {renderButton('amateur')}
                </div>

                {/* PRO */}
                <div className="plan-card">
                    <h2 className="plan-title pro">Pro</h2>
                    <p className="plan-price">월 15,000원</p>
                    <div className="plan-description">
                        <ul className="plan-features">
                            <li>이미지 질문 및 피드백</li>
                            <li>일일 질문 30회 제한</li>
                            <li>상급자 최대 4명</li>
                        </ul>
                    </div>
                    {renderButton('pro')}
                </div>
            </div>
        </div>
    );
};

export default SharePlan;
