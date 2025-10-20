import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GlobalStyles from './components/ui/GlobalStyles.jsx';
import { LandingPage } from './pages/LandingPage.jsx';
import { AuthPage } from './pages/Auth/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';

export default function App() {
    return (
        <>
            <GlobalStyles />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/signup" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
            </Routes>
        </>
    );
}


