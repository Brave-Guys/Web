import React, { useState } from 'react';
import '../../styles/ExerciseTipAbs.css';
import AbsImage from '../../assets/abs_detail.png';
import { absExerciseDetails } from '../../constants/exerciseScript';
import ExerciseModal from '../../components/ExerciseModal'; 
import PageTitle from '../../components/PageTitle';

const ExerciseTipAbs = () => {
    const [selectedPart, setSelectedPart] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleCardClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    const closeModal = () => {
        setSelectedExercise(null);
    };

    return (
        <div className="abs-wrapper">
            <PageTitle title="복근 부위" showBackArrow={true} />
            <div className="abs-page">
                <div className="left-section">
                    <div className="abs-image-wrapper">
                        <img src={AbsImage} alt="Abs Detail" className="abs-image" />
                        <div className="area front" onClick={() => setSelectedPart('상부')} />
                        <div className="area side" onClick={() => setSelectedPart('중부')} />
                        <div className="area rear" onClick={() => setSelectedPart('하부')} />
                        <div className="area middle" onClick={() => setSelectedPart('옆구리')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 복근 운동` : '복근 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {absExerciseDetails[selectedPart].map((exercise, idx) => (
                                <div
                                    key={idx}
                                    className="exercise-card"
                                    onClick={() => handleCardClick(exercise)}
                                >
                                    <div className="exercise-image" />
                                    <p className="exercise-title">{exercise.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {selectedExercise && (
                <ExerciseModal exercise={selectedExercise} onClose={closeModal} />
            )}
        </div>
    );
};

export default ExerciseTipAbs;
