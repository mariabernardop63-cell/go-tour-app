import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { languages } from '../../data/translations';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
    const { langCode, setLangCode } = useApp();
    const [showMenu, setShowMenu] = useState(false);
    const wrapperRef = useRef(null);

    const currentLang = languages.find(l => l.code === langCode) || languages[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (code) => {
        setLangCode(code);
        setShowMenu(false);
    };

    return (
        <div className="language-switcher-global" ref={wrapperRef}>
            <button
                className="lang-toggle-btn"
                onClick={() => setShowMenu(!showMenu)}
                type="button"
                aria-label="Select Language"
            >
                <span className="lang-flag">{currentLang.flag}</span>
                <span className="lang-code">{currentLang.code.split('-')[0].toUpperCase()}</span>
                <ChevronDown size={14} className={`lang-chevron ${showMenu ? 'open' : ''}`} />
            </button>

            {showMenu && (
                <div className="lang-dropdown-menu">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            className={`lang-option ${langCode === lang.code ? 'active' : ''}`}
                            onClick={() => handleSelect(lang.code)}
                            type="button"
                        >
                            <span className="lang-flag-opt">{lang.flag}</span>
                            <span className="lang-name-opt">{lang.name}</span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;
