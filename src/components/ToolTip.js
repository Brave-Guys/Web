import React from 'react';
import '../styles/Tooltip.css';

const Tooltip = ({ x, y, content }) => {
    return (
        <div className="custom-tooltip" style={{ top: y + 10, left: x + 10 }}>
            {content.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
            ))}
        </div>
    );
};

export default Tooltip;
