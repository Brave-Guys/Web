import React, { useState } from 'react';
import '../../styles/ExerciseTipHamstring.css';
import hamstringImage from '../../assets/thigh_back_detail.png';
import { exerciseImageMap } from '../../utils/exerciseImageMap';
import { lowerBackExerciseDetails } from '../../constants/exerciseScript';
import ExerciseModal from '../../components/ExerciseModal';
import PageTitle from '../../components/PageTitle';

const ExerciseTipHamstring = () => {
    const [selectedPart, setSelectedPart] = useState('');
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (exercise) => {
        setSelectedExercise(exercise);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="hamstring-wrapper">
            <div style = {{padding:'10px', backgroundColor : '#f7f7f7'}}></div>
            <PageTitle title="하체 후면 부위" showBackArrow={true} />
            <div style={{ margin: `30px` }}></div>
            <div className="hamstring-page">
                <div className="left-section">
                    <div className="hamstring-image-wrapper">
                        <img src={hamstringImage} alt="Hamstring Detail" className="hamstring-image" />
                        <div className="area dhamstring" onClick={() => setSelectedPart('햄스트링')} />
                        <div className="area hip" onClick={() => setSelectedPart('둔근')} />
                        <div className="area cal" onClick={() => setSelectedPart('비복근')} />
                    </div>
                </div>

                <div className="right-section">
                    <h2 className="section-title">
                        {selectedPart ? `${selectedPart} 운동` : '하체 후면 부위를 선택해보세요!'}
                    </h2>
                    {selectedPart && (
                        <div className="exercise-list">
                            {lowerBackExerciseDetails[selectedPart].map((exercise, idx) => (
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

export default ExerciseTipHamstring;
