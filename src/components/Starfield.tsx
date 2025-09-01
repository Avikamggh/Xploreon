// src/components/Starfield.tsx
import React, { useMemo } from "react";

type Props = {
  /** dots per screen; ~60–120 looks good */
  density?: number;
  /** turn twinkle on/off */
  twinkle?: boolean;
  /** Tailwind color/opacity for stars */
  className?: string;
};

export default function Starfield({
  density = 80,
  twinkle = true,
  className = "text-white/40",
}: Props) {
  const stars = useMemo(() => {
    // stable-ish distribution per render
    return Array.from({ length: density }).map((_, i) => ({
      key: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() < 0.85 ? 1 : 2, // most tiny, some a bit bigger
      delay: `${Math.random() * 5}s`,
      dur: `${3 + Math.random() * 4}s`,
    }));
  }, [density]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((s) => (
        <span
          key={s.key}
          className={`absolute rounded-full ${twinkle ? "animate-star-twinkle" : ""}`}
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: "currentColor",
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        />
      ))}
    </div>
  );
}
