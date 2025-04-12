import React from 'react';
import '../styles/CustomSelect.css';

const CustomSelect = ({ value, onChange, options, width = '150px', height = '50px' }) => {
    return (
        <select
            value={value}
            onChange={onChange}
            className="custom-select"
            style={{ width, height }}
        >
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default CustomSelect;
