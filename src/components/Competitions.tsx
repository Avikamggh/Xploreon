// src/components/Competitions.tsx
import React, { useState, useMemo, useId, useEffect } from "react";
import { motion } from "motion/react";
import { X, Medal, Users2, Trophy, Sparkles, Info } from "lucide-react";
import StarfieldInline from "./Starfield";

type Competition = {
  id: string;
  title: string;
  slug: string;
  tag: "Quiz" | "Writing" | "Hackathon";
  short: string;
  image: string;
  status: "open" | "closed"; // ✅ open vs closed
  imageWebp?: string;
  width?: number;
  height?: number;
};

const FORM_URL = "https://forms.gle/your-form-id"; // ⬅️ replace with your real Google Form link

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
    status: "closed", // ✅ marked closed
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
    status: "open",
  },
  {
    id: "c3",
    title: "AI Physics Hackathon",
    slug: "ai-physics",
    tag: "Hackathon",
    short: "Build an AI model to solve a physics challenge and try to overcome the problem given to you and solve it in 2 hours.",
    image: "/images/hack.jpg",
    imageWebp: "/images/hack.webp",
    width: 1200,
    height: 800,
    status: "open",
  },
];

const TAGS = ["All", "Quiz", "Writing", "Hackathon"] as const;
type TagFilter = (typeof TAGS)[number];

/** Image with WebP fallback + blur skeleton */
function FastImage({ comp, eager = false }: { comp: Competition; eager?: boolean }) {
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

      <picture>
        {comp.imageWebp && <source srcSet={comp.imageWebp} type="image/webp" />}
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
    </div>
  );
}

export default function Competitions() {
  const [filter, setFilter] = useState<TagFilter>("All");
  const [showPremium, setShowPremium] = useState(false);
  const [active, setActive] = useState<Competition | null>(null);

  const STRIPE_LINK = "https://buy.stripe.com/4gM8wI1C333x1i3fdVc7u0b";

  const list = useMemo(
    () => (filter === "All" ? COMPETITIONS : COMPETITIONS.filter((c) => c.tag === filter)),
    [filter]
  );

  // Close modal on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
        document.title = "Competitions | Xploreon-Space Innovation"; // ← set custom title

  }, []);

  const buildFormUrl = (title: string) => {
    const url = new URL(FORM_URL);
    url.searchParams.set("comp", title);
    return url.toString();
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Starfield */}
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
              style={{ contentVisibility: "auto", containIntrinsicSize: "320px" }}
            >
              {/* Image */}
              <FastImage comp={c} eager={i < 3} />

              {/* Tag badge */}
              <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-black/40 px-2.5 py-1 text-[11px] uppercase tracking-wider text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                {c.tag}
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-gray-300">{c.short}</p>

                <div className="mt-5 flex gap-3">
                  {c.status === "open" ? (
                    <button
                      onClick={() => setActive(c)}
                      className="inline-flex items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/15 hover:border-cyan-400/60 transition-colors"
                    >
                      Register
                    </button>
                  ) : (
                    <button
                      onClick={() => setActive(c)}
                      className="inline-flex items-center justify-center rounded-lg border border-red-400/40 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300 cursor-not-allowed"
                    >
                      Closed
                    </button>
                  )}
                </div>
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

      {/* Register Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="register-title"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActive(null);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-lg rounded-2xl border border-cyan-400/30 bg-[#0b0f17] p-6 shadow-2xl"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setActive(null)}
              aria-label="Close registration"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-cyan-400/15 p-2 border border-cyan-400/30">
                <Info className="w-5 h-5 text-cyan-300" />
              </div>
              <div className="flex-1">
                <h3 id="register-title" className="text-2xl font-bold text-white">
                  {active.title}
                </h3>
                <p className="text-sm text-cyan-300 mt-1 uppercase tracking-wider">
                  {active.tag}
                </p>
                <p className="mt-3 text-gray-300">{active.short}</p>

                {/* Instructions */}
                <div className="mt-5 rounded-xl bg-white/[0.04] border border-white/10 p-4">
                  <h4 className="text-sm font-semibold text-cyan-200">Instructions</h4>
                  {active.status === "open" ? (
                    <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1 text-sm">
                      <li>Use your real name and email (for results & certificates).</li>
                      <li>If applicable, add your school/college/organization.</li>
                      <li>Join our Discord/Telegram community after registering.</li>
                      <li>You’ll receive event dates & rules by email.</li>
                    </ul>
                  ) : (
                    <p className="mt-2 text-red-300 text-sm">
                      Registration for this competition is closed.
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {active.status === "open" ? (
                    <>
                      <a
                        href={buildFormUrl(active.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/15 px-5 py-3 text-sm font-semibold text-cyan-100 hover:bg-cyan-400/25 hover:border-cyan-400/60 transition-colors"
                      >
                        Proceed to Registration
                      </a>
                      <button
                        onClick={() => setActive(null)}
                        className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-3 text-sm text-gray-200 hover:border-white/30"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="w-full text-center rounded-lg border border-red-400/40 bg-red-400/10 px-5 py-4 text-sm font-semibold text-red-300">
                      Registration Closed
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
