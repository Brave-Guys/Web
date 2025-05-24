import React from 'react';
import '../styles/PageTitle.css';
import backArrow from '../assets/back-arrow.png';
import { useNavigate } from 'react-router-dom';

const PageTitle = ({ title, description, showBackArrow = false }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="page-title-container">
            {showBackArrow && (
                <div className="back-button" onClick={handleBack} style={{ cursor: 'pointer' }}>
                    <img
                        src={backArrow}
                        alt="뒤로가기"
                    />
                </div>
            )}
            <div>
                <h1 className="page-title">{title}</h1>
                <p className="page-description">{description}</p>
            </div>
        </div>
    );
};

export default PageTitle;
