// src/components/Competitions.tsx
import React, { useState, useMemo, useId } from "react";
import { motion } from "motion/react";
import { X, Medal, Users2, Trophy, Sparkles } from "lucide-react";
import StarfieldInline from "./Starfield"; // make sure this renders on a transparent canvas

type Competition = {
  id: string;
  title: string;
  slug: string;
  tag: "Quiz" | "Writing" | "Hackathon";
  short: string;
  image: string;      // jpg/png fallback
  imageWebp?: string; // optional webp for speed
  width?: number;     // intrinsic dims prevent CLS
  height?: number;
};

const COMPETITIONS: Competition[] = [
  {
    id: "c1",
    title: "Space Quiz",
    slug: "space-quiz",
    tag: "Quiz",
    short: "Fast-paced trivia on astronomy, rockets & missions.",
    image: "/images/space.jpg",
    imageWebp: "/images/space.webp",
    width: 1200,
    height: 800,
  },
  {
    id: "c2",
    title: "Interplanetary Story Contest",
    slug: "story",
    tag: "Writing",
    short: "Craft compelling sci-fi around human life beyond Earth.",
    image: "/images/story.jpg",
    imageWebp: "/images/story.webp",
    width: 1200,
    height: 800,
  },
  {
    id: "c3",
    title: "AI Physics Hackathon",
    slug: "ai-physics",
    tag: "Hackathon",
    short: "Build an AI model to solve a physics challenge.",
    image: "/images/hack.jpg",
    imageWebp: "/images/hack.webp",
    width: 1200,
    height: 800,
  },
];

const TAGS = ["All", "Quiz", "Writing", "Hackathon"] as const;
type TagFilter = (typeof TAGS)[number];

/** Small image card with blur-skeleton + fast loading hints */
function FastImage({
  comp,
  eager = false,
}: {
  comp: Competition;
  eager?: boolean; // true for first row/above the fold
}) {
  const [loaded, setLoaded] = useState(false);
  const id = useId();
  const fetchpriority = eager ? "high" : "auto";

  return (
    <div className="relative h-80 w-full overflow-hidden">
      {/* Blur skeleton */}
      <div
        aria-hidden
        className={`absolute inset-0 animate-pulse bg-[linear-gradient(110deg,rgba(255,255,255,0.06),rgba(255,255,255,0.12),rgba(255,255,255,0.06))] bg-[length:200%_100%] transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Real image with webp + jpeg fallback */}
      <picture>
        {comp.imageWebp && (
          <source srcSet={comp.imageWebp} type="image/webp" />
        )}
        <img
          id={`img-${id}`}
          src={comp.image}
          alt={comp.title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchpriority={fetchpriority as any}
          width={comp.width ?? 1200}
          height={comp.height ?? 800}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`w-full h-full object-cover transition-transform duration-500 will-change-transform ${
            loaded ? "group-hover:scale-105" : "scale-100"
          }`}
          onLoad={() => setLoaded(true)}
        />
      </picture>

      {/* soft vignette for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
    </div>
  );
}

export default function Competitions() {
  const [filter, setFilter] = useState<TagFilter>("All");
  const [showPremium, setShowPremium] = useState(false);

  const STRIPE_LINK = "https://buy.stripe.com/4gM8wI1C333x1i3fdVc7u0b";

  const list = useMemo(
    () => (filter === "All" ? COMPETITIONS : COMPETITIONS.filter((c) => c.tag === filter)),
    [filter]
  );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* === Starfield: make it visible ===
          1) render behind with a slightly lighter background (bg-black is OK)
          2) ensure the canvas has pointer-events-none and sits at z-0 or below
          3) parent must be relative; we already have it
      */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <StarfieldInline density={900} /> 
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-28 pb-10 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent 
                     bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 tracking-tight"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          Xploreon Competitions
        </motion.h1>

        <p className="mt-4 text-gray-300/90 max-w-2xl mx-auto">
          Compete, learn, and showcase your talent — full details coming soon!
        </p>

        {/* Filter Buttons */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm uppercase tracking-wide border transition-all
                ${
                  filter === t
                    ? "border-cyan-400 text-white bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,.25)]"
                    : "border-white/15 text-gray-200 hover:border-cyan-400/60 hover:text-white"
                }`}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* Competitions Grid */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <motion.article
              key={c.id}
              className="group rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md overflow-hidden 
                         hover:border-cyan-400/40 transition-all relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              style={{ contentVisibility: "auto", containIntrinsicSize: "320px" }} // speed hint
            >
              {/* Image (first three get priority) */}
              <FastImage comp={c} eager={i < 3} />

              {/* Badge */}
              <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-black/40 px-2.5 py-1 text-[11px] uppercase tracking-wider text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                {c.tag}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-gray-300">{c.short}</p>
                <p className="mt-4 inline-block rounded-md border border-white/15 px-2 py-1 text-[12px] text-cyan-300">
                  Coming Soon
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Premium Button */}
      <button
        onClick={() => setShowPremium(true)}
        className="fixed bottom-6 right-6 z-20 px-5 py-3 rounded-xl font-extrabold
                   bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 text-black
                   shadow-lg shadow-yellow-400/40 ring-1 ring-yellow-300/60
                   hover:scale-105 active:scale-95 transition-transform"
      >
        Premium
      </button>

      {/* Premium Modal */}
      {showPremium && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
          <div className="relative w-full max-w-md rounded-2xl border border-yellow-400/30 bg-[#0b0b16] p-7 shadow-2xl">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowPremium(false)}
              aria-label="Close premium"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-amber-500">
                Premium Access
              </h3>
              <p className="mt-2 text-gray-300">
                Unlock exclusive perks designed to boost your journey.
              </p>

              <div className="mt-5 rounded-xl bg-white/[0.04] border border-white/10 p-4 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-yellow-400" /> 4 live sessions per month
                </div>
                <div className="flex items-center gap-2">
                  <Users2 className="w-5 h-5 text-yellow-400" /> Mentorship from our team
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" /> Premium community access link
                </div>
              </div>

              <a
                href={STRIPE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block w-full text-center px-6 py-3 rounded-xl font-semibold
                           bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 text-black
                           hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-yellow-500/30"
              >
                $18 / month — Subscribe
              </a>

              <button
                onClick={() => setShowPremium(false)}
                className="mt-3 w-full px-6 py-3 rounded-xl border border-white/15 text-gray-200 hover:border-white/30"
              >
                Not now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
