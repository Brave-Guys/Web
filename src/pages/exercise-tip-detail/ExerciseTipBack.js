import React, { useState } from 'react';
import '../../styles/ExerciseTipBack.css';
import BackImage from '../../assets/back_detail.png';
import Image from '../../assets/person.png'; // 기본 이미지 대체용
import { backExerciseDetails } from '../../constants/exerciseScript';
import ExerciseModal from '../../components/ExerciseModal'; 
import PageTitle from '../../components/PageTitle';

const ExerciseTipBack = () => {
    const [selectedPart, setSelectedPart] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleCardClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    const closeModal = () => {
        setSelectedExercise(null);
    };

    return (
        <div className="back-wrapper">
            <PageTitle title="등 부위" showBackArrow={true} />
            <div style={{ margin: `30px` }}></div>
            <div className="back-page">
                <div className="left-section">
                    <div className="back-image-wrapper">
                        <img src={BackImage} alt="Back Detail" className="back-image" />
                        <div className="area front" onClick={() => setSelectedPart('등 상부')} />
                        <div className="area side" onClick={() => setSelectedPart('등 하부')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 운동` : '등 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {backExerciseDetails[selectedPart].map((exercise, idx) => (
                                <div
                                    key={idx}
                                    className="exercise-card"
                                    onClick={() => handleCardClick(exercise)}
                                >
                                    <img
                                        src={exercise.image || Image}
                                        alt={exercise.name}
                                        className="exercise-image"
                                    />
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

export default ExerciseTipBack;
