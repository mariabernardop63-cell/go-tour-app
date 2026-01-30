import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, KeyRound } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useApp } from '../../context/AppContext';
import './ForgotPassword.css';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { t } = useApp();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError(t.errors?.required || 'Required');
            return;
        }

        setIsLoading(true);
        // Mock API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/otp-verification', {
                state: {
                    email: email,
                    message: t.forgotPassword.success
                }
            });
        }, 1500);
    };

    return (
        <div className="forgot-page fade-in">
            {isLoading && <LoadingSpinner fullScreen text="Sending Code..." />}

            <div className="forgot-container slide-up">
                <button
                    className="btn-text"
                    style={{ padding: 0, marginBottom: 20, color: 'var(--text-secondary)' }}
                    onClick={() => navigate('/login')}
                >
                    <ArrowLeft size={20} /> <span style={{ marginLeft: 4 }}>{t.buttons.back}</span>
                </button>

                <div className="forgot-header">
                    <div className="icon-circle">
                        <KeyRound size={32} color="var(--primary)" />
                    </div>
                    <h1 className="forgot-title">{t.forgotPassword.title}</h1>
                    <p className="forgot-subtitle">{t.forgotPassword.subtitle}</p>
                </div>

                <form className="forgot-form" onSubmit={handleSubmit}>
                    <Input
                        label={t.forgotPassword.inputLabel}
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setError('');
                        }}
                        error={error}
                        autoFocus
                    />

                    <Button type="submit" fullWidth size="lg" style={{ marginTop: 24 }}>
                        {t.buttons.sendCode}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
