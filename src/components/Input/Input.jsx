import React from 'react';
import './Input.css';

const Input = ({
    label,
    error,
    icon: Icon,
    value,
    ...props
}) => {
    return (
        <div className={`input-group ${error ? 'has-error' : ''}`}>
            <div className="input-wrapper">
                {Icon && <Icon className="input-icon" size={20} />}
                <input
                    className={`input-field ${Icon ? 'has-icon' : ''} ${value ? 'has-value' : ''}`}
                    value={value}
                    placeholder=" " /* Required for :placeholder-shown trick */
                    {...props}
                />
                {label && <label className={`input-label ${Icon ? 'with-icon' : ''}`}>{label}</label>}
                <div className="input-border"></div>
            </div>
            {error && <span className="input-error-msg">{error}</span>}
        </div>
    );
};

export default Input;
