import React, { useState } from 'react';
import '../../styles/ExerciseTipThigh.css';
import ThighImage from '../../assets/thigh_front_detail.png';
import { thighExerciseDetails } from '../../constants/exerciseScript'; // 경로는 실제 파일 위치에 맞게 조정하세요

const ExerciseTipThigh = () => {
    const [selectedPart, setSelectedPart] = useState('');

    return (
        <div className="thigh-wrapper">
            <div className="thigh-page">
                <div className="left-section">
                    <h2 className="section-title">하체 전면 부위</h2>
                    <div className="thigh-image-wrapper">
                        <img src={ThighImage} alt="Thigh Detail" className="thigh-image" />
                        <div className="area front" onClick={() => setSelectedPart('내전근')} />
                        <div className="area side" onClick={() => setSelectedPart('대퇴사두근')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 하체 전면 운동` : '하체 전면 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {thighExerciseDetails[selectedPart].map((exercise, idx) => (
                                <div key={idx} className="exercise-card">
                                    <div className="exercise-image" />
                                    <div className="exercise-description">
                                        <p className="exercise-title">{exercise.name}</p>
                                        <div className="exercise-steps">
                                            {exercise.steps.map((step, i) => (
                                                <div key={i}>{step}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExerciseTipThigh;
