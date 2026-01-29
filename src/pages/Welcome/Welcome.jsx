import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import Button from '../../components/Button/Button';
import './Welcome.css';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="welcome-page fade-in">
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
