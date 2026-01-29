import React from 'react';
import './SocialButton.css';

const SocialButton = ({ provider, children, onClick }) => {
    const getIcon = () => {
        switch (provider) {
            case 'google':
                return (
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        className="social-icon"
                    />
                );
            case 'facebook':
                return (
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                        alt="Facebook"
                        className="social-icon"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <button className="social-btn" onClick={onClick} type="button">
            {getIcon()}
            {children}
        </button>
    );
};

export default SocialButton;
