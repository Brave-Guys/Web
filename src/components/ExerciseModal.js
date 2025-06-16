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
