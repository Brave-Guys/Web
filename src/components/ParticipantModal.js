import React from 'react';
import dayjs from 'dayjs';
import '../styles/ParticipantModal.css';

const ParticipantModal = ({ participant, onClose }) => {
    if (!participant) return null;

    return (
        <div className="participant-modal-overlay" onClick={onClose}>
            <div className="participant-modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>닫기</button>
                <h3>{participant.nickname}</h3>
                <p>{dayjs(participant.writeDate).format('YYYY-MM-DD HH:mm')}</p>
                <p>{participant.content}</p>
                {participant.videoUrl && (
                    <div className="challenge-video-wrapper">
                        <video
                            src={participant.videoUrl}
                            autoPlay
                            muted
                            controls
                            preload="metadata"
                            style={{ width: '100%', maxWidth: '600px' }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ParticipantModal;
