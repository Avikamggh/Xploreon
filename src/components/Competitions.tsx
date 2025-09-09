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
  status: "open" | "closed";
  imageWebp?: string;
  width?: number;
  height?: number;
  /** NEW: per-competition registration link */
  formUrl?: string;
};

const STRIPE_LINK = "https://buy.stripe.com/4gM8wI1C333x1i3fdVc7u0b";

/** 
 * Optional helper to prefill Google Forms (use when you know entry IDs).
 * Example:
 *   prefillGoogleForm(
 *     "https://docs.google.com/forms/d/e/....../viewform",
 *     { "entry.111111": comp.title, "entry.222222": comp.tag }
 *   )
 */
function prefillGoogleForm(base: string, params?: Record<string, string>) {
  const url = new URL(base);
  // If it's a Google Form, use pp_url (keeps the form in prefill mode)
  if (url.hostname.includes("docs.google.com")) {
    url.searchParams.set("usp", "pp_url");
  }
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, v);
    }
  }
  return url.toString();
}

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
    status: "closed",
    // formUrl: "https://forms.gle/your-space-quiz-form", // add when open
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
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLScd9rYSxESxwKvhs0WVjXBiHiDCc4U5LSQN4Rp3Evr60i6HKQ/viewform?usp=dialog",
  },
  {
    id: "c3",
    title: "AI Physics Hackathon",
    slug: "ai-physics",
    tag: "Hackathon",
    short: "Build an AI model to solve a physics challenge in 2 hours.",
    image: "/images/hack.jpg",
    imageWebp: "/images/hack.webp",
    width: 1200,
    height: 800,
    status: "open",
    // formUrl: "https://forms.gle/your-hackathon-form",
  },
];

const TAGS = ["All", "Quiz", "Writing", "Hackathon"] as const;
type TagFilter = (typeof TAGS)[number];

/** Image with WebP fallback */
function FastImage({ comp, eager = false }: { comp: Competition; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const id = useId();
  const fetchpriority = eager ? "high" : "auto";

  return (
    <div className="relative h-80 w-full overflow-hidden">
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
          className={`w-full h-full object-cover transition-transform duration-500 ${
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

  const list = useMemo(
    () => (filter === "All" ? COMPETITIONS : COMPETITIONS.filter((c) => c.tag === filter)),
    [filter]
  );

  // ESC closes modals
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(null);
        setShowPremium(false);
      }
    };
    document.title = "Competitions | Xploreon - Space Innovation";
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock scroll when premium open
  useEffect(() => {
    if (showPremium) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [showPremium]);

  /** Build the final registration link for a competition */
  const buildRegistrationHref = (comp: Competition) => {
    if (!comp.formUrl) return "";
    // If you know Google Form entry IDs, pass them here:
    // return prefillGoogleForm(comp.formUrl, {
    //   "entry.111111": comp.title,
    //   "entry.222222": comp.tag,
    // });
    return comp.formUrl;
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Starfield */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-80">
        <StarfieldInline density={1800} />
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
            >
              <FastImage comp={c} eager={i < 3} />
              <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-black/40 px-2.5 py-1 text-[11px] uppercase tracking-wider text-cyan-300">
                <Sparkles className="w-3.5 h-3.5" />
                {c.tag}
              </div>
              <div className="p-5">
                <h3 className="text-lg md:text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-gray-300">{c.short}</p>
                <div className="mt-5 flex gap-3">
                  {c.status === "open" && c.formUrl ? (
                    <button
                      onClick={() => setActive(c)}
                      className="inline-flex items-center justify-center rounded-lg border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 hover:bg-cyan-400/15 hover:border-cyan-400/60 transition-colors"
                    >
                      Register
                    </button>
                  ) : c.status === "open" && !c.formUrl ? (
                    <button
                      disabled
                      className="inline-flex items-center justify-center rounded-lg border border-yellow-400/40 bg-yellow-400/10 px-4 py-2 text-sm font-semibold text-yellow-200 cursor-not-allowed"
                      title="Registration link coming soon"
                    >
                      Coming Soon
                    </button>
                  ) : (
                    <button
                      disabled
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
        className="fixed bottom-6 right-6 z-20 px-6 py-3 rounded-2xl font-extrabold
             bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 text-black
             shadow-[0_0_20px_rgba(255,200,0,0.5)] ring-2 ring-yellow-300/70
             hover:scale-110 hover:shadow-[0_0_40px_rgba(255,200,0,0.8)]
             active:scale-95 transition-transform duration-300"
        aria-label="Open Xploreon Premium"
      >
        🌟 Premium
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
              aria-label="Close registration modal"
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
                <div className="mt-5 rounded-xl bg-white/[0.04] border border-white/10 p-4">
                  <h4 className="text-sm font-semibold text-cyan-200">Instructions</h4>
                  {active.status === "open" ? (
                    <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1 text-sm">
                      <li>Use your real name and email (for results & certificates).</li>
                      <li>If applicable, add your school/college/organization.</li>
                      <li>Join our Discord/Telegram after registering.</li>
                      <li>You’ll receive event dates & rules by email.</li>
                    </ul>
                  ) : (
                    <p className="mt-2 text-red-300 text-sm">Registration closed.</p>
                  )}
                </div>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {active.status === "open" && active.formUrl ? (
                    <>
                      <a
                        href={buildRegistrationHref(active)}
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

      {/* Premium Modal */}
      {showPremium && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="premium-title"
          className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/70 backdrop-blur-md px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPremium(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.22 }}
            className="relative w-full max-w-lg rounded-2xl border border-yellow-400/40 bg-[#0b0f17] p-6 shadow-2xl"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              onClick={() => setShowPremium(false)}
              aria-label="Close premium modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-4">
              <h3 id="premium-title" className="text-2xl font-extrabold text-white">
                Xploreon Premium
              </h3>
              <p className="mt-1 text-sm text-gray-300">
                Level up with live learning, a private community, and hands-on mentorship.
              </p>
            </div>

            <div className="mb-5 flex items-center justify-between rounded-xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3">
              <div className="text-sm text-yellow-200">Monthly plan</div>
              <div className="text-right">
                <div className="text-2xl font-extrabold text-yellow-300">$18</div>
                <div className="text-[12px] text-yellow-200/80">per month • cancel anytime</div>
              </div>
            </div>

            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 text-yellow-300" />
                <span><span className="font-semibold text-white">4 live sessions</span> every month (interactive Q&A + recordings)</span>
              </li>
              <li className="flex items-start gap-3">
                <Users2 className="mt-0.5 h-4 w-4 text-yellow-300" />
                <span><span className="font-semibold text-white">Premium community access</span> with peers & experts</span>
              </li>
              <li className="flex items-start gap-3">
                <Medal className="mt-0.5 h-4 w-4 text-yellow-300" />
                <span><span className="font-semibold text-white">Mentorship</span> from the Xploreon team on projects & careers</span>
              </li>
            </ul>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={STRIPE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center rounded-lg border border-yellow-400/60 bg-yellow-400/15 px-5 py-3 text-sm font-semibold text-yellow-200 hover:bg-yellow-400/25 transition-colors"
              >
                Upgrade for $18/month
              </a>
              <button
                onClick={() => setShowPremium(false)}
                className="inline-flex items-center justify-center rounded-lg border border-white/15 px-5 py-3 text-sm text-gray-200 hover:border-white/30"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
