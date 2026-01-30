import React, { createContext, useContext, useState, useEffect } from 'react';
import { countries } from '../data/countries';
import { translations } from '../data/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [langCode, setLangCode] = useState('en-US');
    const [nationality, setNationality] = useState(''); // Stores ISO code
    const [loadingIP, setLoadingIP] = useState(true);

    useEffect(() => {
        const detectIP = async () => {
            try {
                // Check if already set manually recently? For now, we run once on mount.
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                if (data && data.country_code) {
                    const detectedCountry = countries.find(c => c.code === data.country_code);
                    if (detectedCountry) {
                        setNationality(detectedCountry.code);
                        if (detectedCountry.lang && translations[detectedCountry.lang]) {
                            setLangCode(detectedCountry.lang);
                        }
                    } else {
                        // Default fallback
                        setNationality('US');
                    }
                }
            } catch (error) {
                console.error("IP Detection failed:", error);
                setNationality('US');
            } finally {
                setLoadingIP(false);
            }
        };

        detectIP();
    }, []);

    const value = {
        langCode,
        setLangCode,
        nationality,
        setNationality,
        loadingIP,
        t: translations[langCode] || translations['en-US']
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
