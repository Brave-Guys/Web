import React, { useState } from 'react';
import '../../styles/ExerciseTip.css';

const ExerciseTipShoulder = () => {
    const [selectedPart, setSelectedPart] = useState('');

    const handleClick = (part) => {
        setSelectedPart(part);
    };

    const descriptions = {
        front: '전면 어깨 운동: 프론트 레이즈, 밀리터리 프레스',
        side: '측면 어깨 운동: 사이드 레터럴 레이즈, 덤벨 숄더프레스',
        rear: '후면 어깨 운동: 벤트오버 레터럴 레이즈, 리버스 플라이',
    };

    return (
        <div className="exercise-tip-container">
            <div className="body-map">
                <img src="/images/shoulder_detail.png" alt="Shoulder Detail" className="body-image" />
                
                {/* 세부 부위 클릭 영역 */}

                <div className="area front" onClick={() => handleClick('front')} />
                <div className="area side" onClick={() => handleClick('side')} />
                <div className="area rear" onClick={() => handleClick('rear')} />
            </div>

            <div className="hover-description scrollable">
                {selectedPart && <p>{descriptions[selectedPart]}</p>}
            </div>
        </div>
    );
};

export default ExerciseTipShoulder;
