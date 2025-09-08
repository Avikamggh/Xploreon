import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';

import Competitions from "./components/Competitions";  
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TechnologyPage } from './pages/TechnologyPage';
import { MissionsPage } from './pages/MissionsPage';
import { NewsPage } from './pages/NewsPage';
import { TeamPage } from './pages/TeamPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import SatelliteTracker from "./components/SatelliteTracker";  // ✅ Tracker import

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-space-black text-white">
        <Navigation />
        
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/tracker" element={<SatelliteTracker />} /> {/* ✅ New route */}
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}
