import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Box.css';
import arrow from '../assets/gotodetail.png';

const Box = ({ type = 1, showArrow = false, title = '', to = '', children }) => {
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

            {/* 아래에 children 콘텐츠 출력 */}
            <div className="box-children">
                {children}
            </div>
        </div>
    );
};

export default Box;
