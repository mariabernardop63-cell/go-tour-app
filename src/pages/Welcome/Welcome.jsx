import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Button from '../../components/Button/Button';
import LanguageSwitcher from '../../components/LanguageSwitcher/LanguageSwitcher';
import './Welcome.css';

const images = [
    'https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Lion in Zoo
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Japan
    'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80', // Safari/Nature (Backup)
];

const Welcome = () => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="welcome-page">
            <LanguageSwitcher />
            {/* Background Slideshow */}
            {images.map((img, index) => (
                <div
                    key={index}
                    className={`welcome-bg ${index === currentImageIndex ? 'active' : ''}`}
                    style={{ backgroundImage: `url(${img})` }}
                ></div>
            ))}

            <div className="welcome-overlay"></div>

            <div className="logo-overlay fade-in">
                <MapPin size={24} /> GO TOUR
            </div>

            <div className="welcome-content slide-up">
                <h1 className="welcome-title">Explore the World <br />Like a Local</h1>
                <p className="welcome-subtitle">
                    Your personal intelligent travel companion. Discover hidden gems, meet new people, and travel smarter.
                </p>

                <div className="welcome-actions">
                    <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        onClick={() => navigate('/signup')}
                    >
                        Get Started
                    </Button>
                    <Button
                        variant="secondary"
                        size="lg"
                        fullWidth
                        onClick={() => navigate('/login')}
                        style={{ backgroundColor: 'transparent', color: 'white', borderColor: 'white', backdropFilter: 'blur(4px)' }}
                    >
                        I already have an account
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
