import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowLeft, Globe, ChevronDown } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import SocialButton from '../../components/SocialButton/SocialButton';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import ReCAPTCHA from 'react-google-recaptcha';
import { countries } from '../../data/countries';
import { languages } from '../../data/translations';
import { useApp } from '../../context/AppContext';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const { langCode, setLangCode, nationality, setNationality, t } = useApp();
    const [isLoading, setIsLoading] = useState(false);
    const [showLangMenu, setShowLangMenu] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        password: '',
        confirmPassword: ''
    });
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const [errors, setErrors] = useState({});

    // Password Strength
    const [passwordStrength, setPasswordStrength] = useState(0); // 0-3

    // Update phone placeholder/code when nationality changes (Initial sync)
    useEffect(() => {
        // If nationality changes via Context, we might want to reset phone or just prefix
    }, [nationality]);

    const getCurrentCountry = () => countries.find(c => c.code === nationality) || countries[0];

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Detailed Password Strength Calc
        if (name === 'password') {
            let strength = 0;
            if (value.length > 5) strength += 1; // Good length
            if (/[A-Z]/.test(value) && /[0-9]/.test(value)) strength += 1; // Mixed chars
            if (/[^A-Za-z0-9]/.test(value)) strength += 1; // Special chars
            setPasswordStrength(strength);
        }

        // Phone Validation (Input constraints)
        if (name === 'phone') {
            if (!/^\d*$/.test(value)) return;
            if (value.length > 9) return;
        }

        setFormData({ ...formData, [name]: value });
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleNationalityChange = (e) => {
        setNationality(e.target.value);
    };

    const handleLanguageSelect = (code) => {
        setLangCode(code);
        setShowLangMenu(false);
    };

    const handleCaptchaChange = (value) => {
        setCaptchaVerified(!!value);
        if (!!value && errors.captcha) {
            setErrors(prev => ({ ...prev, captcha: '' }));
        }
    };

    const handleTermsChange = (e) => {
        setTermsAccepted(e.target.checked);
        if (e.target.checked && errors.terms) {
            setErrors(prev => ({ ...prev, terms: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        // Name Validation: Space + Vowels
        const nameTrimmed = formData.fullName.trim();
        const hasSpace = nameTrimmed.indexOf(' ') > 0;
        const hasVowel = /[aeiouAEIOU]/.test(nameTrimmed);

        if (!formData.fullName) {
            newErrors.fullName = `${t.fullName} ${t.errors.required}`;
        } else if (!hasSpace || !hasVowel) {
            newErrors.fullName = t.errors.name;
        }

        if (!formData.email) newErrors.email = t.errors.email;
        if (!nationality) newErrors.nationality = `${t.nationality} ${t.errors.required}`;
        if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) newErrors.dob = `${t.dob} ${t.errors.required}`;

        // Phone exact 9 digits
        if (!formData.phone) {
            // Optional but strict if entered? Assuming required for now as per "Show validation message"
        } else if (formData.phone.length !== 9) {
            newErrors.phone = t.errors.phoneLen;
        }

        if (!formData.password) newErrors.password = t.errors.required;
        if (formData.password.length < 6) newErrors.password = t.errors.passwordLen;
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t.errors.match;

        if (!termsAccepted) newErrors.terms = t.errors.terms;
        if (!captchaVerified) newErrors.captcha = t.errors.captcha;

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
        setTimeout(() => {
            setIsLoading(false);
            // Navigate to OTP with email in state
            navigate('/otp-verification', { state: { email: formData.email } });
        }, 2000);
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const currentLang = languages.find(l => l.code === langCode);
    const activeCountry = getCurrentCountry();

    const getStrengthLabel = () => {
        if (!formData.password) return '';
        if (passwordStrength <= 1) return t.weak;
        if (passwordStrength === 2) return t.good;
        return t.veryGood;
    };

    const getStrengthColor = () => {
        if (!formData.password) return 'transparent';
        if (passwordStrength <= 1) return '#ef4444'; // Red
        if (passwordStrength === 2) return '#f59e0b'; // Yellow
        return '#10b981'; // Green
    };

    return (
        <div className="signup-page fade-in">
            {isLoading && <LoadingSpinner fullScreen text="Processing..." />}

            {/* Language Switcher */}
            <div className={`lang-switcher ${showLangMenu ? 'active' : ''}`}>
                <button className="lang-btn" onClick={() => setShowLangMenu(!showLangMenu)} type="button">
                    <span className="lang-flag">{currentLang?.flag}</span>
                    <span className="lang-name">{currentLang?.code.toUpperCase()}</span>
                    <ChevronDown size={14} className={`lang-arrow ${showLangMenu ? 'rotate' : ''}`} />
                </button>

                {showLangMenu && (
                    <div className="lang-menu scale-in">
                        {languages.map(l => (
                            <div key={l.code} className="lang-option" onClick={() => handleLanguageSelect(l.code)}>
                                <span className="lang-flag">{l.flag}</span>
                                {l.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="signup-container slide-up">
                <button
                    className="btn-text"
                    style={{ padding: 0, marginBottom: 10, color: 'var(--text-secondary)' }}
                    onClick={() => navigate('/')}
                >
                    <ArrowLeft size={20} /> <span style={{ marginLeft: 4 }}>Back</span>
                </button>

                <div className="signup-header">
                    <h1 className="signup-title">{t.title}</h1>
                    <p className="signup-subtitle">{t.subtitle}</p>
                </div>

                <form className="signup-form" onSubmit={handleRegister}>
                    {/* Personal Info */}
                    <div className="form-section-title">{t.personalInfo}</div>
                    <Input
                        label={t.fullName}
                        name="fullName"
                        placeholder={t.fullNamePlaceholder}
                        icon={User}
                        value={formData.fullName}
                        onChange={handleChange}
                        error={errors.fullName}
                    />

                    <Input
                        label={t.email}
                        name="email"
                        type="email"
                        icon={Mail}
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                    />

                    {/* Nationality Select */}
                    <div className="input-group">
                        <div className="input-wrapper">
                            <span className="input-icon" style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {activeCountry?.flag || <Globe size={20} />}
                            </span>
                            <select
                                name="nationality"
                                className={`input-field has-icon has-value`}
                                value={nationality}
                                onChange={handleNationalityChange}
                            >
                                <option value="" disabled></option>
                                {countries.map(c => (
                                    <option key={c.code} value={c.code}>{c.name}</option>
                                ))}
                            </select>
                            <label className="input-label with-icon">{t.nationality}</label>
                            <div className="input-border"></div>
                        </div>
                        {errors.nationality && <span className="input-error-msg">{errors.nationality}</span>}
                    </div>

                    {/* Phone Input with Fixed Code */}
                    <div className="input-group">
                        <div className="input-wrapper phone-wrapper">
                            <div className="phone-prefix">
                                {activeCountry?.dialCode || '+00'}
                            </div>
                            <input
                                name="phone"
                                type="tel"
                                className="input-field phone-field"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="999999999"
                                maxLength={9}
                            />
                            <div className="input-icon" style={{ left: 'auto', right: '16px' }}>
                                <Phone size={20} />
                            </div>
                        </div>
                        <label className="input-label-static" style={{ marginTop: 4, visibility: 'hidden' }}>{t.phone}</label>
                        <div style={{ position: 'absolute', top: '-22px', fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>{t.phone}</div>

                        {errors.phone && <span className="input-error-msg">{errors.phone}</span>}
                    </div>

                    {/* Date of Birth */}
                    <div className="input-group">
                        <label className="input-label-static">{t.dob}</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '80px 100px 1fr', gap: 10 }}>
                            <div className="input-wrapper">
                                <select name="dobDay" className="input-field" value={formData.dobDay} onChange={handleChange} style={{ paddingLeft: '16px' }}>
                                    <option value="">DD</option>
                                    {days.map(d => <option key={d} value={d}>{d}</option>)}
                                </select>
                            </div>
                            <div className="input-wrapper">
                                <select name="dobMonth" className="input-field" value={formData.dobMonth} onChange={handleChange} style={{ paddingLeft: '16px' }}>
                                    <option value="">MM</option>
                                    {months.map((m, i) => <option key={m} value={i + 1}>{m}</option>)}
                                </select>
                            </div>
                            <div className="input-wrapper">
                                <select name="dobYear" className="input-field" value={formData.dobYear} onChange={handleChange} style={{ paddingLeft: '16px' }}>
                                    <option value="">YYYY</option>
                                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                                </select>
                            </div>
                        </div>
                        {errors.dob && <span className="input-error-msg">{errors.dob}</span>}
                    </div>

                    {/* Security */}
                    <div className="form-section-title">{t.security}</div>
                    <Input
                        label={t.password}
                        name="password"
                        type="password"
                        icon={Lock}
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                    />

                    {/* Password Strength Meter */}
                    {formData.password && (
                        <div className="password-strength">
                            <div className="strength-bar">
                                <div
                                    className="strength-fill"
                                    style={{
                                        width: `${((passwordStrength + 1) / 4) * 100}%`,
                                        backgroundColor: getStrengthColor()
                                    }}
                                ></div>
                            </div>
                            <span className="strength-text" style={{ color: getStrengthColor() }}>
                                {t.passwordStrength} {getStrengthLabel()}
                            </span>
                        </div>
                    )}

                    <Input
                        label={t.confirmPassword}
                        name="confirmPassword"
                        type="password"
                        icon={Lock}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                    />

                    {/* Terms & Conditions */}
                    <div className="terms-container" style={{ margin: '16px 0' }}>
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={termsAccepted}
                                onChange={handleTermsChange}
                                className="custom-checkbox"
                            />
                            <span className="checkmark"></span>
                            <span className="terms-text">
                                {t.terms.agree}
                                <span className="terms-link" onClick={(e) => { e.preventDefault(); alert("Open Terms Modal"); }}>
                                    {t.terms.link}
                                </span>
                            </span>
                        </label>
                        {errors.terms && <div className="input-error-msg" style={{ marginTop: 4 }}>{errors.terms}</div>}
                    </div>

                    {/* CAPTCHA */}
                    <div className="captcha-container" style={{ marginBottom: 20 }}>
                        <ReCAPTCHA
                            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Test Key
                            onChange={handleCaptchaChange}
                        />
                        {errors.captcha && <div className="input-error-msg" style={{ marginTop: 4 }}>{errors.captcha}</div>}
                    </div>

                    <Button type="submit" fullWidth size="lg" style={{ marginTop: 10 }}>{t.registerBtn}</Button>

                    <div className="divider">{t.orSignup}</div>

                    <div style={{ display: 'flex', gap: 12 }}>
                        <SocialButton provider="google" onClick={() => { }}>Google</SocialButton>
                        <SocialButton provider="facebook" onClick={() => { }}>Facebook</SocialButton>
                    </div>
                </form>

                <footer className="auth-footer" style={{ paddingTop: 20 }}>
                    {t.alreadyAccount} <span className="auth-link" onClick={() => navigate('/login')}>{t.loginLink}</span>
                </footer>
            </div>
        </div>
    );
};

export default Signup;
