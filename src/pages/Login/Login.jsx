import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import SocialButton from '../../components/SocialButton/SocialButton';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        setIsLoading(true);

        // Mock login API call
        setTimeout(() => {
            setIsLoading(false);
            console.log('Logged in:', formData);
            alert("Login Successful! (Mock)");
        }, 1500);
    };

    return (
        <div className="auth-page fade-in">
            <LanguageSwitcher />
            {isLoading && <LoadingSpinner fullScreen text="Logging in..." />}

            <div className="auth-container slide-up">
                <button
                    className="btn-text"
                    style={{ marginBottom: 24, padding: 0, color: 'var(--text-secondary)' }}
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft size={20} /> <span style={{ marginLeft: 4 }}>Back</span>
                </button>

                <header className="auth-header">
                    <h1 className="auth-title">Welcome Back! 👋</h1>
                    <p className="auth-subtitle">Enter your credentials to continue your journey.</p>
                </header>

                <form className="auth-form" onSubmit={handleLogin}>
                    <Input
                        label="Email or Username"
                        name="email"
                        type="email"
                        icon={Mail}
                        value={formData.email}
                        onChange={handleChange}
                        error={error && !formData.email ? 'Email is required' : ''}
                    />

                    <div>
                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            icon={Lock}
                            value={formData.password}
                            onChange={handleChange}
                            error={error && !formData.password ? 'Password is required' : ''}
                        />
                        <span className="forgot-password" onClick={() => navigate('/forgot-password')}>
                            Forgot Password?
                        </span>
                    </div>

                    <div className="auth-actions">
                        <Button type="submit" fullWidth size="lg">Log In</Button>

                        <div className="divider">or continue with</div>

                        <div style={{ display: 'flex', gap: 12 }}>
                            <SocialButton provider="google" onClick={() => { }}>Google</SocialButton>
                            <SocialButton provider="facebook" onClick={() => { }}>Facebook</SocialButton>
                        </div>
                    </div>
                </form>

                <footer className="auth-footer">
                    Don't have an account? <span className="auth-link" onClick={() => navigate('/signup')}>Register</span>
                </footer>
            </div>
        </div>
    );
};

export default Login;
