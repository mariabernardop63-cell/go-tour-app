import React from 'react';
import './Button.css';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    isLoading = false,
    disabled,
    ...props
}) => {
    const className = `btn btn-${variant} btn-${size} ${fullWidth ? 'btn-full' : ''} ${isLoading ? 'btn-loading' : ''}`;

    return (
        <button className={className} disabled={disabled || isLoading} {...props}>
            {isLoading && <Loader2 className="animate-spin" size={18} />}
            {children}
        </button>
    );
};

export default Button;
