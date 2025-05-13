import React, { useState } from 'react';
import '../../styles/ExerciseTipBicep.css';
import BicepImage from '../../assets/bicep_detail.png';
import { armExerciseDetails } from '../../constants/exerciseScript'; 

const ExerciseTipBicep = () => {
    const [selectedPart, setSelectedPart] = useState('');

    return (
        <div className="bicep-wrapper">
            <div className="bicep-page">
                <div className="left-section">
                    <h2 className="section-title">이두 부위</h2>
                    <div className="bicep-image-wrapper">
                        <img src={BicepImage} alt="Bicep Detail" className="bicep-image" />
                        {/* 문자열로 정확히 지정 */}
                        <div className="area front" onClick={() => setSelectedPart('장두')} />
                        <div className="area side" onClick={() => setSelectedPart('단두')} />
                        <div className="area rear" onClick={() => setSelectedPart('상완요골근')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `이두 (${selectedPart}) 운동` : '이두 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {armExerciseDetails['이두'][selectedPart].map((exercise, idx) => (
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

export default ExerciseTipBicep;
