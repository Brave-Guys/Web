import React, { useState } from 'react';
import '../../styles/ExerciseTip.css';

const ExerciseTipChest = () => {
    const [selectedPart, setSelectedPart] = useState('');

    const handleClick = (part) => {
        setSelectedPart(part);
    };

    const descriptions = {
        upper: '윗가슴 운동: 인클라인 벤치프레스, 인클라인 덤벨프레스',
        middle: '중간가슴 운동: 벤치프레스, 체스트 플라이',
        lower: '밑가슴 운동: 디클라인 벤치프레스, 딥스',
    };

    return (
        <div className="exercise-tip-container">
            <div className="body-map">
                <img src="/images/chest_detail.png" alt="Chest Detail" className="body-image" />
                
                {/* 세부 부위 클릭 영역 */}
                <div className="area upper" onClick={() => handleClick('upper')} />
                <div className="area middle" onClick={() => handleClick('middle')} />
                <div className="area lower" onClick={() => handleClick('lower')} />
            </div>

            <div className="hover-description scrollable">
                {selectedPart && <p>{descriptions[selectedPart]}</p>}
            </div>
        </div>
    );
};

export default ExerciseTipChest;
