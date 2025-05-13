import React, { useState } from 'react';
import '../../styles/ExerciseTipHamstring.css';
import hamstringImage from '../../assets/thigh_back_detail.png';
import { lowerBackExerciseDetails } from '../../constants/exerciseScript';

const ExerciseTipHamstring = () => {
    const [selectedPart, setSelectedPart] = useState('');

    return (
        <div className="hamstring-wrapper">
            <div className="hamstring-page">
                <div className="left-section">
                    <h2 className="section-title">하체 후면 부위</h2>
                    <div className="hamstring-image-wrapper">
                        <img src={hamstringImage} alt="Hamstring Detail" className="hamstring-image" />
                        <div className="area front" onClick={() => setSelectedPart('햄스트링')} />
                        <div className="area side" onClick={() => setSelectedPart('둔근')} />
                        <div className="area rear" onClick={() => setSelectedPart('비복근근')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 하체 후면 운동` : '하체 후면 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {lowerBackExerciseDetails[selectedPart].map((exercise, idx) => (
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

export default ExerciseTipHamstring;
