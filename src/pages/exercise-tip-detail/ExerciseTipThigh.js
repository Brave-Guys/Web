import React, { useState } from 'react';
import '../../styles/ExerciseTipThigh.css';
import ThighImage from '../../assets/thigh_front_detail.png';
import { thighExerciseDetails } from '../../constants/exerciseScript';
import PageTitle from '../../components/PageTitle';
import ExerciseModal from '../../components/ExerciseModal';

const ExerciseTipThigh = () => {
    const [selectedPart, setSelectedPart] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (exercise) => {
        setSelectedExercise(exercise);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="thigh-wrapper">
            <PageTitle title="하체 전면 부위" showBackArrow={true} />
            <div className="thigh-page">
                <div className="left-section">
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
                                <div key={idx} className="exercise-card" onClick={() => openModal(exercise)}>
                                    <div className="exercise-image" />
                                    <p className="exercise-title">{exercise.name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {isModalOpen && selectedExercise && (
                <ExerciseModal exercise={selectedExercise} onClose={closeModal} />
            )}
        </div>
    );
};

export default ExerciseTipThigh;
