import React from "react";
import { Link } from "react-router-dom";
import { Satellite } from "lucide-react";

export function HeroSection() {
  const [src, setSrc] = React.useState<string>("");

  React.useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    setSrc(isMobile ? "/videos/xploreon-mobile.mp4" : "/videos/xploreon-bg.mp4");
  }, []);

  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden -mt-[72px]">
      {/* Background Video */}
      <div className="absolute inset-0 -z-10">
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          // @ts-ignore - iOS Safari fix
          webkit-playsinline="true"
          preload="auto"
          poster="/images/hero-fallback.jpg"
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-center pointer-events-none"
          onCanPlay={(e) => {
            const v = e.currentTarget;
            const p = v.play();
            if (p && typeof p.then === "function") p.catch(() => {});
          }}
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Tracker Card */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">🛰️ Live Satellite Tracker</h2>
          <p className="text-gray-300 mb-6">
            Explore real-time positions of satellites orbiting Earth. Powered by live TLE data
            from Celestrak and updated automatically.
          </p>
          <Link
            to="/tracker"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold
                       bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-md
                       hover:scale-105 transition-transform"
          >
            Open Tracker <Satellite className="w-5 h-5" />
          </Link>
        </div>

        <div className="rounded-2xl overflow-hidden border border-cyan-400/30 shadow-lg">
          <img
            src="/images/tracker-preview.jpg"
            alt="Satellite Tracker Preview"
            className="w-full h-72 object-cover"
          />
        </div>
      </div>
    </section>
  );
}
