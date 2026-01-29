import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ fullScreen = false, text = 'Processing...' }) => {
    if (fullScreen) {
        return (
            <div className="spinner-overlay">
                <div className="spinner-content">
                    <div className="spinner" />
                    {text && <p className="spinner-text">{text}</p>}
                </div>
            </div>
        );
    }

    return <div className="spinner" style={{ width: 24, height: 24, borderWidth: 2 }} />;
};

export default LoadingSpinner;
