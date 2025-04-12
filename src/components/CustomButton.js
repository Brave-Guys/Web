import React from 'react';
import '../styles/CustomButton.css';

const CustomButton = ({
    label,
    size = 'large',         // 'large' or 'small'
    color = 'purple',        // 'purple' | 'gray' | 'green' | 'red'
    rounded = 'square',      // 'square' or 'pill'
    onClick,
}) => {
    const sizeClass = size === 'large' ? 'btn-large' : 'btn-small';
    const colorClass = `btn-${color}`;
    const radiusClass = rounded === 'pill' ? 'btn-pill' : 'btn-square';

    return (
        <button
            className={`custom-button ${sizeClass} ${colorClass} ${radiusClass}`}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export default CustomButton;
