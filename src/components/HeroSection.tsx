import React from 'react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden -mt-[72px]">
      
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/xploreon-bg.webm" type="video/webm" />
          <source src="/videos/xploreon-bg.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay for better look */}
        <div className="absolute inset-0 bg-black/40" />
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
