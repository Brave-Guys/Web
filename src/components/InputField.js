import React from 'react';
import '../styles/InputField.css';

const InputField = ({
    label,
    guide,
    placeholder,
    value,
    onChange,
    status, // 'default' | 'error' | 'success'
    message // 에러/성공 메시지
}) => {
    return (
        <div className="input-wrapper">
            <div className="input-row">
                <label className="input-label">{label}</label>
                <span className="input-guide">{guide}</span>
            </div>
            <input
                className={`input-box ${status}`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {message && (
                <p className={`input-message ${status}`}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default InputField;
