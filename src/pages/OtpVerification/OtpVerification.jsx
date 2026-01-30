import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, RefreshCw, Edit2 } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import SocialButton from '../../components/SocialButton/SocialButton';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { useApp } from '../../context/AppContext';
import './OtpVerification.css';

const OtpVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useApp();
    const email = location.state?.email || 'your email';

    const [otp, setOtp] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [resendDisabled, setResendDisabled] = useState(false);
    const [timer, setTimer] = useState(0);

    // Timer for Resend
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(interval);
        } else {
            setResendDisabled(false);
        }
    }, [timer]);

    const handleVerify = (e) => {
        e.preventDefault();
        if (!otp || otp.length < 4) {
            setError('Please enter a valid code');
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (otp === '123456') { // Mock check
                navigate('/login'); // Success -> Login
            } else {
                setError('Invalid code. Try 123456');
            }
        }, 1500);
    };

    const handleResend = () => {
        setResendDisabled(true);
        setTimer(30); // 30 seconds cooldown
        // Mock resend logic
        alert(t.otp.resent);
    };

    const handleChange = (e) => {
        const val = e.target.value;
        if (/^\d*$/.test(val) && val.length <= 6) {
            setOtp(val);
            if (error) setError('');
        }
    };

    return (
        <div className="otp-page fade-in">
            {isLoading && <LoadingSpinner fullScreen text="Verifying..." />}

            <div className="otp-container slide-up">
                <button
                    className="btn-text"
                    style={{ padding: 0, marginBottom: 20, color: 'var(--text-secondary)' }}
                    onClick={() => navigate('/signup')}
                >
                    <ArrowLeft size={20} /> <span style={{ marginLeft: 4 }}>Back</span>
                </button>

                <div className="otp-header">
                    <div className="icon-circle">
                        <Mail size={32} color="var(--primary)" />
                    </div>
                    <h1 className="otp-title">{t.otp.title}</h1>
                    <p className="otp-subtitle">
                        {t.otp.subtitle} <strong style={{ color: 'var(--text-main)' }}>{email}</strong>
                    </p>
                </div>

                <form className="otp-form" onSubmit={handleVerify}>
                    <div className="otp-input-group">
                        <Input
                            placeholder="0 0 0 0 0 0"
                            value={otp}
                            onChange={handleChange}
                            error={error}
                            style={{
                                textAlign: 'center',
                                fontSize: '24px',
                                letterSpacing: '8px',
                                fontWeight: 'bold'
                            }}
                            maxLength={6}
                        />
                    </div>

                    <div className="otp-actions">
                        <button
                            type="button"
                            className="text-btn"
                            onClick={handleResend}
                            disabled={resendDisabled}
                        >
                            <RefreshCw size={14} className={resendDisabled ? 'spin' : ''} />
                            {resendDisabled ? `Resend in ${timer}s` : t.otp.resend}
                        </button>

                        <button
                            type="button"
                            className="text-btn"
                            onClick={() => navigate('/signup')}
                        >
                            <Edit2 size={14} />
                            {t.otp.changeEmail}
                        </button>
                    </div>

                    <Button type="submit" fullWidth size="lg" style={{ marginTop: 20 }}>
                        {t.otp.verifyBtn}
                    </Button>
                </form>

                <div className="otp-divider">
                    <span>{t.otp.continue}</span>
                </div>

                <div className="social-login-row">
                    <SocialButton provider="google" onClick={() => { }}>Google</SocialButton>
                    <SocialButton provider="facebook" onClick={() => { }}>Facebook</SocialButton>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
