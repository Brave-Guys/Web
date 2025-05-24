import React, { useState, useRef } from 'react';
import '../styles/FloatingInput.css';

const FloatingInput = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    onKeyDown,
    autoComplete = 'off',
}) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef(null);

    return (
        <div className="floating-input">
            <input
                id={id}
                ref={inputRef}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyDown={onKeyDown}
                autoComplete={autoComplete}
            />
            <label htmlFor={id} className={focused || value ? 'active' : ''}>
                {label}
            </label>
        </div>
    );
};

export default FloatingInput;
