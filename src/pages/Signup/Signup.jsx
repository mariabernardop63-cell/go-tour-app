import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, ArrowLeft, Globe, ChevronDown } from 'lucide-react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import SocialButton from '../../components/SocialButton/SocialButton';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { countries } from '../../data/countries';
import { translations, languages } from '../../data/translations';
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [langCode, setLangCode] = useState('en-US');
    const [showLangMenu, setShowLangMenu] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        nationality: '', // Stores country code
        dobDay: '',
        dobMonth: '',
        dobYear: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const t = translations[langCode] || translations['en-US'];

    // IP Detection
    useEffect(() => {
        const detectIP = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                if (data && data.country_code) {
                    const detectedCountry = countries.find(c => c.code === data.country_code);
                    if (detectedCountry) {
                        setFormData(prev => ({
                            ...prev,
                            nationality: detectedCountry.code,
                            phone: detectedCountry.dialCode + ' '
                        }));

                        // Set language if matches known mapping
                        if (detectedCountry.lang && translations[detectedCountry.lang]) {
                            setLangCode(detectedCountry.lang);
                        }
                    }
                }
            } catch (error) {
                console.error("IP Detection failed:", error);
                // Silently fail to defaults
            }
        };
        detectIP();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const handleNationalityChange = (e) => {
        const code = e.target.value;
        const country = countries.find(c => c.code === code);
        setFormData(prev => ({
            ...prev,
            nationality: code,
            phone: country ? country.dialCode + ' ' : prev.phone
        }));
    };

    const handleLanguageSelect = (code) => {
        setLangCode(code);
        setShowLangMenu(false);
    };

    const validate = () => {
        const newErrors = {};

        // Name Validation: First + Last + Vowels
        const nameTrimmed = formData.fullName.trim();
        const hasSpace = nameTrimmed.indexOf(' ') > 0;
        const hasVowel = /[aeiouAEIOU]/.test(nameTrimmed); // Basic vowel check

        if (!formData.fullName) {
            newErrors.fullName = `${t.fullName} ${t.errors.required}`;
        } else if (!hasSpace || !hasVowel) {
            newErrors.fullName = t.errors.name;
        }

        if (!formData.email) newErrors.email = t.errors.email;
        if (!formData.nationality) newErrors.nationality = `${t.nationality} ${t.errors.required}`;
        if (!formData.dobDay || !formData.dobMonth || !formData.dobYear) newErrors.dob = `${t.dob} ${t.errors.required}`;

        if (!formData.password) newErrors.password = t.errors.required;
        if (formData.password.length < 6) newErrors.password = t.errors.passwordLen;
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t.errors.match;

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
            alert("Registration Successful!"); // Translation needed?
            navigate('/login');
        }, 2000);
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    const currentLang = languages.find(l => l.code === langCode);

    return (
        <div className="signup-page fade-in">
            {isLoading && <LoadingSpinner fullScreen text="Creating Account..." />}

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
                        placeholder={t.fullNamePlaceholder} // Use translations for placeholders too if Input supports it visible
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

                    {/* Nationality Select (Replaces CountryDropdown) */}
                    <div className="input-group">
                        <div className="input-wrapper">
                            <span className="input-icon" style={{ fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {formData.nationality ? countries.find(c => c.code === formData.nationality)?.flag : <Globe size={20} />}
                            </span>
                            <select
                                name="nationality"
                                className={`input-field has-icon ${formData.nationality ? 'has-value' : ''}`}
                                value={formData.nationality}
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

                    <Input
                        label={t.phone}
                        name="phone"
                        type="tel"
                        icon={Phone}
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    {/* Date of Birth */}
                    <div className="input-group">
                        <label className="input-label-static">{t.dob}</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '80px 100px 1fr', gap: 10 }}>
                            <div className="input-wrapper">
                                <select
                                    name="dobDay"
                                    className="input-field"
                                    value={formData.dobDay}
                                    onChange={handleChange}
                                    style={{ paddingLeft: '16px' }}
                                >
                                    <option value="">DD</option>
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
                                    <option value="">MM</option>
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

                    <Input
                        label={t.confirmPassword}
                        name="confirmPassword"
                        type="password"
                        icon={Lock}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                    />

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
