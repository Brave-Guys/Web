import React, { useState } from 'react';
import '../../styles/ExerciseTipShoulder.css';
import ShoulderImage from '../../assets/shoulder_detail.png';
import { shoulderExerciseDetails } from '../../constants/exerciseScript'; 
import PageTitle from '../../components/PageTitle';

const ExerciseTipShoulder = () => {
    const [selectedPart, setSelectedPart] = useState('');

    return (
        <div className="shoulder-wrapper">
            <PageTitle
                        title="어깨 부위"
                        showBackArrow={true}
                    />
            <div className="shoulder-page">
                <div className="left-section">
                    
                    <div className="shoulder-image-wrapper">
                        <img src={ShoulderImage} alt="Shoulder Detail" className="shoulder-image" />
                        <div className="area front" onClick={() => setSelectedPart('전면')} />
                        <div className="area side" onClick={() => setSelectedPart('측면')} />
                        <div className="area rear" onClick={() => setSelectedPart('후면')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 어깨 운동` : '어깨 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {shoulderExerciseDetails[selectedPart].map((exercise, idx) => (
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

export default ExerciseTipShoulder;
