import React from 'react';
import '../styles/ConfirmModal.css';

const ConfirmModal = ({ open, onClose, onConfirm, title, description, confirmText = "확인", cancelText = "취소" }) => {
    if (!open) return null;

    const handleOverlayClick = () => {
        onClose();
    };

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="confirm-modal-overlay" onClick={handleOverlayClick}>
            <div className="confirm-modal" onClick={handleModalClick}>
                {title && <h3>{title}</h3>}
                {description && <p>{description}</p>}
                <div className="confirm-buttons">
                    <button onClick={onClose}>{cancelText}</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
