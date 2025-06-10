import React, { useState } from 'react';
import '../../styles/ExerciseTipAbs.css';
import AbsImage from '../../assets/abs_detail.png';
import { exerciseImageMap } from '../../utils/exerciseImageMap';
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
            <div style = {{padding:'10px', backgroundColor : '#f7f7f7'}}></div>
            <PageTitle title="복근 부위" showBackArrow={true} />
            <div style={{ margin: `30px` }}></div>
            <div className="abs-page">
                <div className="left-section">
                    <div className="abs-image-wrapper">
                        <img src={AbsImage} alt="Abs Detail" className="abs-image" />
                        <div className="area upperabs" onClick={() => setSelectedPart('상부')} />
                        <div className="area middleabs" onClick={() => setSelectedPart('중부')} />
                        <div className="area lowerabs" onClick={() => setSelectedPart('하부')} />
                        <div className="area sideabs" onClick={() => setSelectedPart('옆구리')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 운동` : '복근 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {absExerciseDetails[selectedPart].map((exercise, idx) => (
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

export default ExerciseTipAbs;
