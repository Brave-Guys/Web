import React, { useState } from 'react';
import '../../styles/ExerciseTipChest.css';
import ChestImage from '../../assets/chest_detail.png';
import { chestExerciseDetails } from '../../constants/exerciseScript'; 

const ExerciseTipChest = () => {
    const [selectedPart, setSelectedPart] = useState('');

    return (
        <div className="chest-wrapper">
            <div className="chest-page">
                <div className="left-section">
                    <h2 className="section-title">가슴 부위</h2>
                    <div className="chest-image-wrapper">
                        <img src={ChestImage} alt="Chest Detail" className="chest-image" />
                        <div className="area front" onClick={() => setSelectedPart('윗 가슴')} />
                        <div className="area side" onClick={() => setSelectedPart('중간 가슴')} />
                        <div className="area rear" onClick={() => setSelectedPart('밑 가슴')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 가슴 운동` : '가슴 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {chestExerciseDetails[selectedPart].map((exercise, idx) => (
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

export default ExerciseTipChest;
