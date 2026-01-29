import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowLeft } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import CountryDropdown from '../../components/CountryDropdown/CountryDropdown';
import SocialButton from '../../components/SocialButton/SocialButton';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear error for this field
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleCountryChange = (countryCode) => {
        setFormData({ ...formData, country: countryCode });
        if (errors.country) setErrors({ ...errors, country: '' });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) newErrors.dob = 'Date of birth is required';

        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 chars';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

        return newErrors;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsLoading(true);
        // Mock API
        setTimeout(() => {
            setIsLoading(false);
            alert("Registration Successful! (Mock)");
            navigate('/login');
        }, 2000);
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return (
        <div className="signup-page fade-in">
            {isLoading && <LoadingSpinner fullScreen text="Creating Account..." />}

            <div className="signup-container slide-up">
                <button
                    className="btn-text"
                    style={{ padding: 0, marginBottom: 10, color: 'var(--text-secondary)' }}
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft size={20} /> <span style={{ marginLeft: 4 }}>Back</span>
                </button>

                <div className="signup-header">
                    <h1 className="signup-title">Create Account</h1>
                    <p className="signup-subtitle">Join the community of explorers today.</p>
                </div>

                <form className="signup-form" onSubmit={handleRegister}>
                    {/* Personal Info */}
                    <div className="form-section-title">Personal Information</div>
                    <Input
                        label="Full Name"
                        name="fullName"
                        icon={User}
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                    />

                    <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        icon={Mail}
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    <Input
                        label="Phone Number (Optional)"
                        name="phone"
                        type="tel"
                        icon={Phone}
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <CountryDropdown
                        label="Country of Birth"
                        value={formData.country}
                        onChange={handleCountryChange}
                    />
                    {errors.country && <span className="input-error-msg" style={{ marginTop: -12 }}>{errors.country}</span>}

                    {/* Date of Birth */}
                    <div className="input-group">
                        <label className="input-label-static">Date of Birth</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '80px 100px 1fr', gap: 10 }}>
                            <div className="input-wrapper">
                                <select
                                    name="dobDay"
                                    className="input-field"
                                    value={formData.dobDay}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '16px' }}
                                >
                                    <option value="">Day</option>
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="input-wrapper">
                                <select
                                    name="dobMonth"
                                    className="input-field"
                                    value={formData.dobMonth}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '16px' }}
                                >
                                    <option value="">Month</option>
                                    {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                                </select>
                            </div>
                            <div className="input-wrapper">
                                <select
                                    name="dobYear"
                                    className="input-field"
                                    value={formData.dobYear}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '16px' }}
                                >
                                    <option value="">Year</option>
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                        </div>
                        {errors.dob && <span className="input-error-msg">{errors.dob}</span>}
                    </div>

                    {/* Security */}
                    <div className="form-section-title">Security</div>
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        icon={Lock}
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    <Input
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        icon={Lock}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                    />

                    <Button type="submit" fullWidth size="lg" style={{ marginTop: 10 }}>Register</Button>

                    <div className="divider">or sign up with</div>

                    <div style={{ display: 'flex', gap: 12 }}>
                        <SocialButton provider="google" onClick={() => { }}>Google</SocialButton>
                        <SocialButton provider="facebook" onClick={() => { }}>Facebook</SocialButton>
                    </div>
                </form>

                <footer className="auth-footer" style={{ paddingTop: 20 }}>
                    Already have an account? <span className="auth-link" onClick={() => navigate('/login')}>Log In</span>
                </footer>
            </div>
        </div>
    );
};

export default Signup;
