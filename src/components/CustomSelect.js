import React, { useState, useRef, useEffect } from 'react';
import '../styles/CustomSelect.css';

const CustomSelect = ({ options, value, onChange, placeholder = '선택하세요' }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();

    const handleOptionClick = (option) => {
        onChange(option);
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`custom-select-ios ${open ? 'open' : ''}`} ref={ref}>
            <div className="selected" onClick={() => setOpen(!open)}>
                {value || <span className="placeholder">{placeholder}</span>}
                <span className="arrow">▾</span>
            </div>
            {open && (
                <ul className="options">
                    {options.map((option, idx) => (
                        <li
                            key={idx}
                            className={`option ${option === value ? 'selected-option' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelect;
