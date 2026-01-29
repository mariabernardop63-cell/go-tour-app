import React from 'react';
import './Input.css';

const Input = ({
    label,
    error,
    icon: Icon,
    ...props
}) => {
    return (
        <div className="input-group">
            {label && <label className="input-label">{label}</label>}
            <div className="input-wrapper">
                {Icon && <Icon className="input-icon" size={20} />}
                <input
                    className={`input-field ${Icon ? 'has-icon' : ''} ${error ? 'error' : ''}`}
                    {...props}
                />
            </div>
            {error && <span className="input-error">{error}</span>}
        </div>
    );
};

export default Input;
