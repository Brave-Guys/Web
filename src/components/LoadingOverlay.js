import React from 'react';
import '../styles/LoadingOverlay.css';
import logo from '../assets/logo.png';

const LoadingOverlay = ({ visible }) => {
    if (!visible) return null;

    return (
        <div className="loading-overlay">
            <img src={logo} alt="로딩 중" className="loading-static-logo" />
            <p className="loading-text">
                잠시만 기다려주세요
                <span className="dot-animation">
                    <span>.</span><span>.</span><span>.</span>
                </span>
            </p>
        </div>
    );
};

export default LoadingOverlay;
