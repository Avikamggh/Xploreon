// src/components/Competitions.tsx
import React, { useMemo, useState } from "react";
import { motion } from "motion/react";
import { CalendarDays, Users2, Medal, Clock, Trophy, Info, X } from "lucide-react";

type Competition = {
  id: string;
  title: string;
  slug: "space-quiz" | "story" | "ai-physics";
  tag: "Quiz" | "Writing" | "Hackathon";
  short: string;
  description: string[];
  dateRange: string;
  regDeadline: string;
  teamSize: string;
  prizes: string[];
  rules: string[];
  judging: string[];
  faq: { q: string; a: string }[];
};

const COMPETITIONS: Competition[] = [
  {
    id: "c1",
    title: "Space Quiz",
    slug: "space-quiz",
    tag: "Quiz",
    short: "Fast-paced trivia on astronomy, rockets, missions & more.",
    description: [
      "Test your knowledge across astronomy, space tech, missions, and history.",
      "Multiple rounds with increasing difficulty and live leaderboards.",
    ],
    dateRange: "Oct 12 – Oct 19, 2025",
    regDeadline: "Oct 10, 2025",
    teamSize: "Solo (individual)",
    prizes: ["🥇 $500 + Certificate", "🥈 $250 + Certificate", "🥉 $100 + Certificate"],
    rules: [
      "Individuals only; one account per participant.",
      "No external help or collaboration during the live quiz rounds.",
      "Final round is proctored; identity verification required.",
    ],
    judging: [
      "Scored by correctness & speed.",
      "Ties are decided by sudden-death questions.",
    ],
    faq: [
      { q: "Do I need a webcam?", a: "Only for the proctored final round." },
      { q: "Can I retry a round?", a: "No—each round is live and single-attempt." },
    ],
  },
  {
    id: "c2",
    title: "Interplanetary Story Contest",
    slug: "story",
    tag: "Writing",
    short: "Craft compelling sci-fi around human life beyond Earth.",
    description: [
      "Write a short story (800–2,500 words) exploring interplanetary life.",
      "Focus on believable science, strong characters, and ethical dilemmas.",
    ],
    dateRange: "Nov 1 – Nov 30, 2025",
    regDeadline: "Nov 25, 2025",
    teamSize: "Solo (individual)",
    prizes: ["🥇 $800 + Publication", "🥈 $400 + Publication", "🥉 $200 + Publication"],
    rules: [
      "Original work only; no AI-generated prose as final output.",
      "Cite factual references if used; minor world-building liberties allowed.",
      "One submission per participant; edits allowed until deadline.",
    ],
    judging: [
      "Criteria: originality, scientific plausibility, narrative craft, impact.",
      "Judges: authors + researchers (double-blind evaluation).",
    ],
    faq: [
      { q: "Accepted formats?", a: "PDF or DOCX; standard manuscript formatting." },
      { q: "Illustrations?", a: "Optional; judged primarily on writing." },
    ],
  },
  {
    id: "c3",
    title: "AI Physics Hackathon",
    slug: "ai-physics",
    tag: "Hackathon",
    short: "Build an AI model to solve a physics challenge with real data.",
    description: [
      "24-hour sprint: build, validate, and present an AI solution.",
      "Problem set released at kickoff; public datasets provided.",
    ],
    dateRange: "Dec 13 – Dec 14, 2025 (24h)",
    regDeadline: "Dec 10, 2025",
    teamSize: "Teams of 2–4",
    prizes: ["🥇 $2,000 + Incubation Call", "🥈 $1,000", "🥉 $500"],
    rules: [
      "Original code; open-source libraries allowed with proper licenses.",
      "Teams must submit code, report, and a 5-min demo video.",
      "Fair compute usage; disclose external resources.",
    ],
    judging: [
      "Technical merit (accuracy, rigor), innovation, reproducibility, and impact.",
      "Panel: ML engineers + physicists; leaderboard + live demo score.",
    ],
    faq: [
      { q: "Can we use GPUs?", a: "Yes—BYO or cloud credits (limited credits provided)." },
      { q: "Pretrained models?", a: "Allowed with clear documentation and licenses." },
    ],
  },
];

const TAGS = ["All", "Quiz", "Writing", "Hackathon"] as const;
type TagFilter = (typeof TAGS)[number];

export default function Competitions() {
  const [filter, setFilter] = useState<TagFilter>("All");
  const [active, setActive] = useState<Competition | null>(null);

  // premium modal state
  const [showPremium, setShowPremium] = useState(false);
  const STRIPE_LINK = "https://buy.stripe.com/4gM8wI1C333x1i3fdVc7u0b"; // ← replace with your Stripe checkout URL

  const list = useMemo(
    () => (filter === "All" ? COMPETITIONS : COMPETITIONS.filter((c) => c.tag === filter)),
    [filter]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a1a] via-[#1a0a2a] to-[#0a1a3a] text-white">
      {/* Hero */}
      <section className="relative pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Xploreon Competitions
          </motion.h1>
          <p className="mt-4 text-gray-200/90 max-w-2xl mx-auto">
            Compete, learn, and showcase your talent across science, storytelling, and AI.
          </p>

          {/* Filter */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {TAGS.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm uppercase tracking-wide border transition-all
                  ${
                    filter === t
                      ? "border-cyan-400 text-white bg-cyan-400/10"
                      : "border-white/15 text-gray-200 hover:border-cyan-400/60 hover:text-white"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <motion.div
              key={c.id}
              className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md p-5 hover:border-cyan-400/40 transition-all group"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs uppercase tracking-wide bg-cyan-400/15 text-cyan-300 border border-cyan-400/30">
                  {c.tag}
                </span>
                <span className="text-sm text-gray-300 flex items-center gap-1">
                  <CalendarDays className="w-4 h-4" /> {c.dateRange}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold">{c.title}</h3>
              <p className="mt-2 text-gray-300">{c.short}</p>

              <div className="mt-4 grid grid-cols-3 gap-3 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Users2 className="w-4 h-4" /> {c.teamSize}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Reg by {c.regDeadline}
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Top prizes
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => setActive(c)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-sm transition-all"
                >
                  View Details
                </button>
                <button
                  className="px-4 py-2 rounded-lg border border-white/20 hover:border-cyan-400/50 text-sm transition-all"
                  onClick={() => alert(`Register link for ${c.title} coming soon`)}
                >
                  Register
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Golden Premium Button (corner) ===== */}
      <button
        onClick={() => setShowPremium(true)}
        className="fixed bottom-6 right-6 z-40 px-5 py-3 rounded-xl font-extrabold
                   bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 text-black
                   shadow-lg shadow-yellow-400/40 ring-1 ring-yellow-300/60
                   hover:scale-105 active:scale-95 transition-transform"
        aria-label="Open premium"
        title="Premium"
      >
        Premium
      </button>

      {/* ===== Premium Modal ===== */}
      {showPremium && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md px-4">
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
                Unlock exclusive rounds, early registration, and members-only competitions.
              </p>

              <div className="mt-5 rounded-xl bg-white/[0.04] border border-white/10 p-4 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <Medal className="w-5 h-5 text-yellow-400" /> Priority leaderboard badges
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" /> Extra prizes & invites
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-yellow-400" /> Early access windows
                </div>
              </div>

              {/* Stripe CTA */}
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

      {/* ===== Details Modal (existing) ===== */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-3xl rounded-2xl border border-white/10 bg-[#0b0b16] p-6">
            <button
              onClick={() => setActive(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              ✖
            </button>

            <div className="flex items-center gap-2 text-cyan-300">
              <Info className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wide">{active.tag}</span>
            </div>

            <h2 className="mt-2 text-2xl font-extrabold">{active.title}</h2>
            <div className="mt-1 text-sm text-gray-300 flex flex-wrap gap-3">
              <span className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> {active.dateRange}</span>
              <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> Reg by {active.regDeadline}</span>
              <span className="flex items-center gap-2"><Users2 className="w-4 h-4" /> {active.teamSize}</span>
              <span className="flex items-center gap-2"><Medal className="w-4 h-4" /> Prizes: {active.prizes.join(" • ")}</span>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-white/90">Overview</h3>
                <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                  {active.description.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
                <h3 className="mt-5 font-semibold text-white/90">Rules</h3>
                <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                  {active.rules.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white/90">Judging</h3>
                <ul className="mt-2 list-disc list-inside text-gray-300 space-y-1">
                  {active.judging.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
                <h3 className="mt-5 font-semibold text-white/90">FAQ</h3>
                <div className="mt-2 space-y-2">
                  {active.faq.map((f, i) => (
                    <details key={i} className="group rounded-lg bg-white/[0.06] border border-white/10 p-3">
                      <summary className="cursor-pointer list-none font-medium text-white/90">
                        {f.q}
                      </summary>
                      <p className="mt-2 text-sm text-gray-300">{f.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white"
                onClick={() => alert(`Register link for ${active.title} coming soon`)}
              >
                Register Now
              </button>
              <button
                className="px-5 py-2 rounded-lg border border-white/20 hover:border-cyan-400/50"
                onClick={() => setActive(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
