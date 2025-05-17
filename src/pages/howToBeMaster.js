import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HowToBeMaster.css';
import PageTitle from '../components/PageTitle';

const HowToBeMaster = () => {
    return (
        <div className="howto-wrapper">
            <PageTitle
                title="상급자가 되는 법"
                description="운동 실력을 인정받는 상급자가 되어보세요!"
                showBackArrow={true}
            />

            <div style={{ margin: '50px' }}></div>

            <div className="howto-section">
                <h3>1. 인증된 챌린지 5회 이상 성공</h3>
                <p>꾸준히 챌린지를 성공하고 운영진의 인증을 받으면 상급자 자격을 신청할 수 있습니다.</p>
            </div>

            <div className="howto-section">
                <h3>2. 상급자 가이드라인 숙지</h3>
                <p>상급자는 타인을 이끄는 입장이므로 가이드라인 숙지와 책임감 있는 행동이 요구됩니다.</p>
            </div>

            <div className="howto-section">
                <h3>3. 긍정적인 커뮤니티 활동</h3>
                <p>댓글, 피드백, 질문 답변 등 커뮤니티 활동에서 친절하고 건설적인 태도를 유지해야 합니다.</p>
            </div>

            <div className="howto-section">
                <h3>4. 최근 30일 내 활동 이력</h3>
                <p>최근 30일 이내에 최소 3회 이상 챌린지 참여 또는 커뮤니티 활동 이력이 있어야 합니다.</p>
            </div>

            <div className="howto-section">
                <h3>5. 상급자 신청서 제출</h3>
                <p>상단 메뉴의 "상급자 신청" 버튼을 통해 신청서를 작성하면, 운영진의 검토 후 상급자로 등업됩니다.</p>
            </div>

            <div className="howto-note">
                📌 *상급자는 피드백 권한과 함께 상급자 목록에 이름이 올라갑니다.
            </div>

            <div className="apply-button-wrapper">
                <Link to="/apply-master" className="apply-button">
                    도전! 상급자 신청
                </Link>
            </div>
        </div>
    );
};

export default HowToBeMaster;
