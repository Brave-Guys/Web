import React from 'react';
import PageTitle from '../components/PageTitle';
import '../styles/SharePlan.css';

const SharePlan = () => {
    const userPlanType = JSON.parse(localStorage.getItem('user'))?.userPlanType;

    return (
        <div className="shareplan-wrapper">
            <PageTitle title="Share+ 플랜" description="등급별 혜택을 알아보세요." showBackArrow={true} />

            <div className="plan-cards">
                {/* BEGINNER */}
                <div className="plan-card">
                    <h2 className="plan-title beginner">BEGINNER</h2>
                    <p className="plan-price">무료</p>
                    <div className='plan-description'>
                        <ul className="plan-features">
                            <li>Share+ 외 모든 기능</li>
                        </ul>
                    </div>
                    <button className="plan-button disabled" disabled>
                        내 플랜
                    </button>
                </div>

                {/* AMATEUR */}
                <div className="plan-card">
                    <h2 className="plan-title amateur">Amateur</h2>
                    <p className="plan-price">월 8,800원</p>
                    <div className='plan-description'>
                        <ul className="plan-features">
                            <li>Share+ 사용 가능</li>
                            <li>텍스트 질문 및 피드백</li>
                            <li>일일 질문 10회 제한</li>
                            <li>상급자 최대 2명</li>
                        </ul>
                    </div>
                    <button className="plan-button amateur">신청</button>
                </div>

                {/* PRO */}
                <div className="plan-card">
                    <h2 className="plan-title pro">Pro</h2>
                    <p className="plan-price">월 15,000원</p>
                    <div className='plan-description'>
                        <ul className="plan-features">
                            <li>이미지 질문 및 피드백</li>
                            <li>일일 질문 30회 제한</li>
                            <li>상급자 최대 4명</li>
                        </ul>
                    </div>
                    <button className="plan-button pro">신청</button>
                </div>
            </div>
        </div>
    );
};

export default SharePlan;
