import React, { useState } from 'react';
import '../../styles/ExerciseTipShoulder.css';
import ShoulderImage from '../../assets/shoulder_detail.png';
import { exerciseImageMap } from '../../utils/exerciseImageMap';
import { shoulderExerciseDetails } from '../../constants/exerciseScript';
import PageTitle from '../../components/PageTitle';
import ExerciseModal from '../../components/ExerciseModal';

const ExerciseTipShoulder = () => {
    const [selectedPart, setSelectedPart] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (exercise) => {
        setSelectedExercise(exercise);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="shoulder-wrapper">
            <div style = {{padding:'10px', backgroundColor : '#f7f7f7'}}></div>
            <PageTitle title="어깨 부위" showBackArrow={true} />
            <div style={{ margin: `30px` }}></div>
            <div className="shoulder-page">
                <div className="left-section">
                    <div className="shoulder-image-wrapper">
                        <img src={ShoulderImage} alt="Shoulder Detail" className="shoulder-image" />
                        <div className="area fronts" onClick={() => setSelectedPart('전면')} />
                        <div className="area sides" onClick={() => setSelectedPart('측면')} />
                        <div className="area rears" onClick={() => setSelectedPart('후면')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 어깨 운동` : '어깨 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {shoulderExerciseDetails[selectedPart].map((exercise, idx) => (
                                <div key={idx} className="exercise-card" onClick={() => openModal(exercise)}>
                                    <img
                                        src={exercise.image ? exerciseImageMap[exercise.image] : '/assets/default.jpg'}
                                        alt={exercise.name}
                                        className='exercise-image'
                                    />

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

export default ExerciseTipShoulder;
