import React, { useState } from 'react';
import '../../styles/ExerciseTipChest.css';
import ChestImage from '../../assets/chest_detail.png';
import { exerciseImageMap } from '../../utils/exerciseImageMap';
import { chestExerciseDetails } from '../../constants/exerciseScript';
import ExerciseModal from '../../components/ExerciseModal';
import PageTitle from '../../components/PageTitle';

const ExerciseTipChest = () => {
    const [selectedPart, setSelectedPart] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleCardClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    const closeModal = () => {
        setSelectedExercise(null);
    };

    return (
        <div className="chest-wrapper">
            <div style = {{padding:'10px', backgroundColor : '#f7f7f7'}}></div>
            <PageTitle title="가슴 부위" showBackArrow={true} />
            <div style={{ margin: `30px` }}></div>
            <div className="chest-page">
                <div className="left-section">

                    <div className="chest-image-wrapper">
                        <img src={ChestImage} alt="Chest Detail" className="chest-image" />
                        <div className="area upperchest" onClick={() => setSelectedPart('윗 가슴')} />
                        <div className="area midchest" onClick={() => setSelectedPart('중간 가슴')} />
                        <div className="area lowerchest" onClick={() => setSelectedPart('밑 가슴')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 운동` : '가슴 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {chestExerciseDetails[selectedPart].map((exercise, idx) => (
                                <div
                                    key={idx}
                                    className="exercise-card"
                                    onClick={() => handleCardClick(exercise)}
                                >
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

            {selectedExercise && (
                <ExerciseModal exercise={selectedExercise} onClose={closeModal} />
            )}
        </div>
    );
};

export default ExerciseTipChest;
