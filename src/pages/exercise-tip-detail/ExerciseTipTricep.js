import React, { useState } from 'react';
import '../../styles/ExerciseTipTricep.css';
import TricepImage from '../../assets/tricep_detail.png';
import { armExerciseDetails } from '../../constants/exerciseScript'; 

const ExerciseTipTricep = () => {
    const [selectedPart, setSelectedPart] = useState('');

    return (
        <div className="tricep-wrapper">
            <div className="tricep-page">
                <div className="left-section">
                    <h2 className="section-title">삼두 부위</h2>
                    <div className="tricep-image-wrapper">
                        <img src={TricepImage} alt="tricep Detail" className="tricep-image" />
                        {/* 문자열로 정확히 지정 */}
                        <div className="area front" onClick={() => setSelectedPart('장두')} />
                        <div className="area side" onClick={() => setSelectedPart('외측두')} />
                        <div className="area rear" onClick={() => setSelectedPart('내측두')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `삼두 (${selectedPart}) 운동` : '삼두 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {armExerciseDetails['삼두'][selectedPart].map((exercise, idx) => (
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

export default ExerciseTipTricep;
