import React from 'react';
import '../styles/CustomButton.css';

const CustomButton = ({
    label,
    size = 'large',
    color = 'purple',
    rounded = 'square',
    onClick,
    style,
    disabled = false
}) => {
    const sizeClass = size === 'large' ? 'btn-large' : 'btn-small';
    const colorClass = `btn-${color}`;
    const radiusClass = rounded === 'pill' ? 'btn-pill' : 'btn-square';

    return (
        <button
            className={`custom-button ${sizeClass} ${colorClass} ${radiusClass}`}
            onClick={onClick}
            style={style}
            disabled={disabled}
        >
            {label}
        </button>
    );
};


export default CustomButton;
