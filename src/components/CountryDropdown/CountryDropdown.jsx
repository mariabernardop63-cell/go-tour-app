import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import './CountryDropdown.css';

const COUNTRIES = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
];

const CountryDropdown = ({ value, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (country) => {
        onChange(country);
        setIsOpen(false);
    };

    const selectedCountry = COUNTRIES.find(c => c.code === value);

    return (
        <div className="input-group" ref={wrapperRef}>
            {label && <label className="input-label">{label}</label>}
            <div className="country-select-wrapper">
                <button
                    type="button"
                    className={`country-select-btn ${isOpen ? 'open' : ''}`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedCountry ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span className="country-flag">{selectedCountry.flag}</span>
                            {selectedCountry.name}
                        </span>
                    ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Select Country</span>
                    )}
                    <ChevronDown size={16} color="var(--text-muted)" />
                </button>

                {isOpen && (
                    <div className="country-dropdown-menu">
                        {COUNTRIES.map((country) => (
                            <div
                                key={country.code}
                                className={`country-option ${value === country.code ? 'selected' : ''}`}
                                onClick={() => handleSelect(country.code)}
                            >
                                <span className="country-flag">{country.flag}</span>
                                {country.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CountryDropdown;
