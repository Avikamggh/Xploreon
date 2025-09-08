import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
import SatelliteTracker from './components/SatelliteTracker'; // import tracker

// A wrapper to check current path
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  // Hide Nav + Footer ONLY on /tracker
  const hideLayout = location.pathname === "/tracker";

  return (
    <>
      {!hideLayout && <Navigation />}
      <main className={hideLayout ? "" : "pt-20"}>{children}</main>
      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-space-black text-white">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/technology" element={<TechnologyPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/competitions" element={<Competitions />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/tracker" element={<SatelliteTracker />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
}
