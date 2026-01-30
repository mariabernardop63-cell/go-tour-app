import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import OtpVerification from './pages/OtpVerification/OtpVerification';
import { AppProvider } from './context/AppContext';
import './App.css';

function App() {
    return (
        <AppProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/otp-verification" element={<OtpVerification />} />
                </Routes>
            </BrowserRouter>
        </AppProvider>
    );
}

export default App;
