import React from 'react';
import '../styles/InputField.css';

const InputField = ({
    label,
    guide,
    placeholder,
    value,
    onChange,
    status, // 'default' | 'error' | 'success'
    message, // 에러/성공 메시지
    rightElement, // optional: ReactNode
    type = 'text' // 추가: 'text' | 'password' | 'email' 등등
}) => {
    return (
        <div className="input-wrapper">
            <div className="input-row">
                <label className="input-label">{label}</label>
                <span className="input-guide">{guide}</span>
                <div style={{ flexGrow: 1 }} />
                {message && (
                    <p className={`input-message ${status}`}>
                        {message}
                    </p>
                )}
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                    type={type}
                    className={`input-box ${status}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {rightElement && rightElement}
            </div>
        </div>
    );
};


export default InputField;
