import React from 'react';
import '../styles/ExerciseModal.css';
import tempImg from '../assets/temp.gif'

const ExerciseModal = ({ exercise, onClose }) => {
    if (!exercise) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>✖</button>
                <div className="modal-left">
                    {/* exercise.image 가 있다면 이미지를 보여줌 */}
                    {/* {exercise.image ? (
                        <img src={tempImg} alt={exercise.name} className="exercise-image" />
                    ) : (
                        <div className="exercise-image-placeholder">이미지 없음</div>
                    )} */}
                    <img src={tempImg} alt={exercise.name}/>
                </div>
                <div className="modal-right">
                    <h2 className="modal-title">{exercise.name}</h2>
                    <ul className="modal-steps">
                        {exercise.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default ExerciseModal;
