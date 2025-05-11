import React, { useState } from 'react';
import '../../styles/ExerciseTip.css';

const ExerciseTipBack = () => {
    const [selectedPart, setSelectedPart] = useState('');

    const handleClick = (part) => {
        setSelectedPart(part);
    };

    const descriptions = {
        upperBack: '상부 등 운동: 풀업, 바벨로우',
        lowerBack: '하부 등 운동: 데드리프트, 백 익스텐션',
    };

    return (
        <div className="exercise-tip-container">
            <div className="body-map">
                <img src="/images/back_detail.png" alt="Back Detail" className="body-image" />

                <div className="area upperBack" onClick={() => handleClick('upperBack')} />
                <div className="area lowerBack" onClick={() => handleClick('lowerBack')} />
            </div>

            <div className="hover-description scrollable">
                {selectedPart && <p>{descriptions[selectedPart]}</p>}
            </div>
        </div>
    );
};

export default ExerciseTipBack;
