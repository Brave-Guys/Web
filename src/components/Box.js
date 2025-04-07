import React from 'react';
import '../styles/Box.css';
import arrow from '../assets/gotodetail.png'

const Box = ({ type = 1, showArrow = false, children }) => {
    const boxClass = `box box-type-${type}`;

    return (
        <div className={boxClass}>
            <div className="box-content">
                {children}
            </div>
            {showArrow && (
                <img
                    src={arrow}
                    alt="arrow"
                    className="box-arrow"
                />
            )}
        </div>
    );
};

export default Box;
