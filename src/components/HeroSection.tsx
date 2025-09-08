import React from "react";

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
          key={src}                 // forces reload if src changes
          src={src}
          autoPlay
          muted
          loop
          playsInline
          // @ts-ignore - help older iOS Safari
          webkit-playsinline="true"
          preload="auto"
          poster="/images/hero-fallback.jpg"  // add a lightweight JPG/PNG
          crossOrigin="anonymous"
          className="w-full h-full object-cover object-center pointer-events-none"
          onCanPlay={(e) => {
            const v = e.currentTarget;
            const p = v.play();
            if (p && typeof p.then === "function") p.catch(() => {/* ignore */});
          }}
        />
        {/* subtle overlay */}
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
    </section>
  );
}
