import React, { useState } from 'react';
import '../../styles/ExerciseTip.css';

const ExerciseTipHamstring = () => {
    const [selectedPart, setSelectedPart] = useState('');

    const handleClick = (part) => {
        setSelectedPart(part);
    };

    const descriptions = {
        glutes: '둔근 운동: 힙 쓰러스트, 스쿼트, 런지',
        hamstrings: '햄스트링 운동: 레그 컬, 루마니안 데드리프트',
        calves: '비복근 운동: 종아리 raises, 점프 로프',
    };

    return (
        <div className="exercise-tip-container">
            <div className="body-map">
                <img src="/images/leg_back_detail.png" alt="Leg Back Detail" className="body-image" />

                <div className="area glutes" onClick={() => handleClick('glutes')} />
                <div className="area hamstrings" onClick={() => handleClick('hamstrings')} />
                <div className="area calves" onClick={() => handleClick('calves')} />
            </div>

            <div className="hover-description scrollable">
                {selectedPart && <p>{descriptions[selectedPart]}</p>}
            </div>
        </div>
    );
};

export default ExerciseTipHamstring;
