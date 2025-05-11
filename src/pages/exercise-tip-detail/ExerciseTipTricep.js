import React, { useState } from 'react';
import '../../styles/ExerciseTip.css';

const ExerciseTipTricep = () => {
    const [selectedPart, setSelectedPart] = useState('');

    const handleClick = (part) => {
        setSelectedPart(part);
    };

    const descriptions = {
        innerHead: '삼두 내측두 운동: 덤벨 킥백, 체스트 딥스',
        longHead: '삼두 장두 운동: 바벨 프레스, 인클라인 체스트 프레스',
        outerHead: '삼두 외측두 운동: 트라이셉스 푸시다운, 딥스',
    };

    return (
        <div className="exercise-tip-container">
            <div className="body-map">
                <img src="/images/triceps_detail.png" alt="Triceps Detail" className="body-image" />

                <div className="area innerHead" onClick={() => handleClick('innerHead')} />
                <div className="area longHead" onClick={() => handleClick('longHead')} />
                <div className="area outerHead" onClick={() => handleClick('outerHead')} />
            </div>

            <div className="hover-description scrollable">
                {selectedPart && <p>{descriptions[selectedPart]}</p>}
            </div>
        </div>
    );
};

export default ExerciseTipTricep;
