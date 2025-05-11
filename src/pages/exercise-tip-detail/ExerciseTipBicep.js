import React, { useState } from 'react';
import '../../styles/ExerciseTip.css';

const ExerciseTipBicep = () => {
    const [selectedPart, setSelectedPart] = useState('');

    const handleClick = (part) => {
        setSelectedPart(part);
    };

    const descriptions = {
        long: '이두 장두 운동: 인클라인 덤벨컬, 해머컬',
        short: '이두 단두 운동: 컨센트레이션 컬, 바벨컬',
        forearm: '전완근 운동: 리스트 컬, 리버스 컬',
    };

    return (
        <div className="exercise-tip-container">
            <div className="body-map">
                <img src="/images/bicep_detail.png" alt="Bicep Detail" className="body-image" />

                {/* 세부 부위 클릭 영역 */}
                <div className="area long" onClick={() => handleClick('long')} />
                <div className="area short" onClick={() => handleClick('short')} />
                <div className="area forearm" onClick={() => handleClick('forearm')} />
            </div>

            <div className="hover-description scrollable">
                {selectedPart && <p>{descriptions[selectedPart]}</p>}
            </div>
        </div>
    );
};

export default ExerciseTipBicep;
