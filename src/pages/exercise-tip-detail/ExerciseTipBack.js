import React, { useState } from 'react';
import '../../styles/ExerciseTipBack.css';
import BackImage from '../../assets/back_detail.png';
import { backExerciseDetails } from '../../constants/exerciseScript'; 

const ExerciseTipBack = () => {
    const [selectedPart, setSelectedPart] = useState('');

    return (
        <div className="back-wrapper">
            <div className="back-page">
                <div className="left-section">
                    <h2 className="section-title">등 부위</h2>
                    <div className="back-image-wrapper">
                        <img src={BackImage} alt="Back Detail" className="back-image" />
                        <div className="area front" onClick={() => setSelectedPart('등 상부')} />
                        <div className="area side" onClick={() => setSelectedPart('등 하부')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 등 운동` : '등 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {backExerciseDetails[selectedPart].map((exercise, idx) => (
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

export default ExerciseTipBack;
