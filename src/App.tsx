import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

/**
 * NOTE: Drop your existing folders into src/:
 *   - pages/, components/, hooks/, styles/
 * And ensure the following imports resolve.
 */
import { HomePage } from "./pages/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { MissionsPage } from "./pages/MissionsPage";
import { NewsPage } from "./pages/NewsPage";
import { TechnologyPage } from "./pages/TechnologyPage";
import { TeamPage } from "./pages/TeamPage";
import { ContactPage } from "./pages/ContactPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/technology" element={<TechnologyPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
