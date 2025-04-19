import React from 'react';
import '../styles/Box.css';
import arrow from '../assets/gotodetail.png';

const Box = ({ type = 1, showArrow = false, title='' }) => {
    const boxClass = `box box-type-${type}`;

    return (
        <div className={boxClass}>
            <div className="box-header">
                <div className="box-content">{title}</div>
                {showArrow && (
                    <img
                        src={arrow}
                        alt="arrow"
                        className="box-arrow"
                    />
                )}
            </div>
        </div>
    );
};

export default Box;
