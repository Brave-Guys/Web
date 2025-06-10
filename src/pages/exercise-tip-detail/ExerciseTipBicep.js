import React, { useState } from 'react';
import '../../styles/ExerciseTipBicep.css';
import BicepImage from '../../assets/bicep_detail.png';
import { exerciseImageMap } from '../../utils/exerciseImageMap';
import { armExerciseDetails } from '../../constants/exerciseScript';
import ExerciseModal from '../../components/ExerciseModal';
import PageTitle from '../../components/PageTitle';

const ExerciseTipBicep = () => {
    const [selectedPart, setSelectedPart] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);

    const handleCardClick = (exercise) => {
        setSelectedExercise(exercise);
    };

    const closeModal = () => {
        setSelectedExercise(null);
    };

    return (
        <div className="bicep-wrapper">
            <div style = {{padding:'10px', backgroundColor : '#f7f7f7'}}></div>
            <PageTitle title="이두 부위" showBackArrow={true} />
            <div style={{ margin: `30px` }}></div>
            <div className="bicep-page">
                <div className="left-section">
                    <div className="bicep-image-wrapper">
                        <img src={BicepImage} alt="Bicep Detail" className="bicep-image" />
                        <div className="area lbicep" onClick={() => setSelectedPart('장두')} />
                        <div className="area sbicep" onClick={() => setSelectedPart('단두')} />
                        <div className="area upperbicep" onClick={() => setSelectedPart('상완요골근')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `이두 ${selectedPart} 운동` : '이두 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {armExerciseDetails['이두'][selectedPart].map((exercise, idx) => (
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

export default ExerciseTipBicep;
