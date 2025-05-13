import '../styles/InputField.css';

const InputField = ({
    label,
    guide,
    placeholder,
    value,
    onChange,
    status,
    message,
    rightElement,
    type = 'text',
    onKeyDown
}) => {
    return (
        <div className="input-wrapper">
            <div className="input-row">
                <label className="input-label">{label}</label>
                {guide && <span className="input-guide">{guide}</span>}
            </div>

            <div className="input-field-row">
                <input
                    type={type}
                    className={`input-box ${status}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                />
                {rightElement}
            </div>

            {message && (
                <p className={`input-message ${status}`}>
                    {message}
                </p>
            )}


        </div >
    );
};


export default InputField;
