export const countries = [
    { code: 'PT', name: 'Portugal', flag: '🇵🇹', dialCode: '+351', lang: 'pt' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷', dialCode: '+55', lang: 'pt' },
    { code: 'US', name: 'United States', flag: '🇺🇸', dialCode: '+1', lang: 'en-US' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', dialCode: '+44', lang: 'en-UK' },
    { code: 'FR', name: 'France', flag: '🇫🇷', dialCode: '+33', lang: 'fr' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸', dialCode: '+34', lang: 'es' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺', dialCode: '+7', lang: 'ru' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪', dialCode: '+254', lang: 'sw' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', dialCode: '+255', lang: 'sw' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪', dialCode: '+49', lang: 'en-US' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹', dialCode: '+39', lang: 'en-US' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦', dialCode: '+1', lang: 'en-US' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺', dialCode: '+61', lang: 'en-UK' },
    { code: 'IN', name: 'India', flag: '🇮🇳', dialCode: '+91', lang: 'en-UK' },
    { code: 'CN', name: 'China', flag: '🇨🇳', dialCode: '+86', lang: 'en-US' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵', dialCode: '+81', lang: 'en-US' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷', dialCode: '+82', lang: 'en-US' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦', dialCode: '+27', lang: 'en-UK' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬', dialCode: '+234', lang: 'en-UK' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽', dialCode: '+52', lang: 'es' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷', dialCode: '+54', lang: 'es' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴', dialCode: '+57', lang: 'es' },
    { code: 'AO', name: 'Angola', flag: '🇦🇴', dialCode: '+244', lang: 'pt' },
    { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', dialCode: '+258', lang: 'pt' },
    // Add more as needed, keeping it lightweight for now
];

export const getCountryByCode = (code) => countries.find(c => c.code === code) || countries.find(c => c.code === 'US');
