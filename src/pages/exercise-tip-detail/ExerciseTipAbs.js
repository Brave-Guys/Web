import React, { useState } from 'react';
import '../../styles/ExerciseTip.css';

const ExerciseTipAbs = () => {
    const [selectedPart, setSelectedPart] = useState('');

    const handleClick = (part) => {
        setSelectedPart(part);
    };

    const descriptions = {
        upperAbs: '상복부 운동: 크런치, 싯업',
        midAbs: '중복부 운동: 크런치 바리에이션',
        lowerAbs: '하복부 운동: 레그레이즈, 행잉 레그레이즈',
        side: '옆구리 운동: 러시안 트위스트, 사이드 플랭크',
    };

    return (
        <div className="exercise-tip-container">
            <div className="body-map">
                <img src="/images/abs_detail.png" alt="Abs Detail" className="body-image" />

                <div className="area upperAbs" onClick={() => handleClick('upperAbs')} />
                <div className="area midAbs" onClick={() => handleClick('midAbs')} />
                <div className="area lowerAbs" onClick={() => handleClick('lowerAbs')} />
                <div className="area side" onClick={() => handleClick('side')} />
            </div>

            <div className="hover-description scrollable">
                {selectedPart && <p>{descriptions[selectedPart]}</p>}
            </div>
        </div>
    );
};

export default ExerciseTipAbs;
