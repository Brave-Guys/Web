import React from 'react';
import '../styles/LoadingOverlay.css';
import logo from '../assets/logo.png';

const LoadingOverlay = ({ visible }) => {
    if (!visible) return null;

    return (
        <div className="loading-overlay">
            <img src={logo} alt="로딩 중" className="loading-pulse-logo" />
            <div stlye={{ margin: '30px' }}></div>
            <p className="loading-text">잠시만 기다려주세요!</p>
        </div>
    );
};

export default LoadingOverlay;
