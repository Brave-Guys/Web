import React from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ 추가
import '../styles/Box.css';
import arrow from '../assets/gotodetail.png';

const Box = ({ type = 1, showArrow = false, title = '', to = '' }) => {
    const boxClass = `box box-type-${type}`;
    const navigate = useNavigate();

    const handleClick = () => {
        if (to) {
            navigate(to);
        }
    };

    return (
        <div className={boxClass}>
            <div className="box-header">
                <div className="box-content">{title}</div>
                {showArrow && (
                    <img
                        src={arrow}
                        alt="arrow"
                        className="box-arrow"
                        onClick={handleClick}
                        style={{ cursor: 'pointer' }}
                    />
                )}
            </div>
        </div>
    );
};

export default Box;
