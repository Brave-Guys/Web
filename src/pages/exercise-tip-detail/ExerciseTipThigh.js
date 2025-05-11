import React, { useState } from 'react';
import '../../styles/ExerciseTip.css';

const ExerciseTipThigh = () => {
    const [selectedPart, setSelectedPart] = useState('');

    const handleClick = (part) => {
        setSelectedPart(part);
    };

    const descriptions = {
        inner: '내전근 운동: 스모 스쿼트, 힙 어덕션',
        quadriceps: '대퇴사두근 운동: 스쿼트, 레그프레스',
    };

    return (
        <div className="exercise-tip-container">
            <div className="body-map">
                <img src="/images/thigh_detail.png" alt="Thigh Detail" className="body-image" />

                <div className="area inner" onClick={() => handleClick('inner')} />
                <div className="area quadriceps" onClick={() => handleClick('quadriceps')} />
            </div>

            <div className="hover-description scrollable">
                {selectedPart && <p>{descriptions[selectedPart]}</p>}
            </div>
        </div>
    );
};

export default ExerciseTipThigh;
