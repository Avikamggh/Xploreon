// src/components/Competitions.tsx
import React, { useState, useMemo } from "react";
import { motion } from "motion/react";
import { X, Medal, Users2, Trophy } from "lucide-react";
import StarfieldInline from "./Starfield"; // stars background

type Competition = {
  id: string;
  title: string;
  slug: string;
  tag: "Quiz" | "Writing" | "Hackathon";
  short: string;
  image: string; // image for card
};

const COMPETITIONS: Competition[] = [
  {
    id: "c1",
    title: "Space Quiz",
    slug: "space-quiz",
    tag: "Quiz",
    short: "Fast-paced trivia on astronomy, rockets & missions.",
    image: "/images/space.png", // replace with your image
  },
  {
    id: "c2",
    title: "Interplanetary Story Contest",
    slug: "story",
    tag: "Writing",
    short: "Craft compelling sci-fi around human life beyond Earth.",
    image: "/images/story.png",
  },
  {
    id: "c3",
    title: "AI Physics Hackathon",
    slug: "ai-physics",
    tag: "Hackathon",
    short: "Build an AI model to solve a physics challenge.",
    image: "/images/ai-physics.jpg",
  },
];

const TAGS = ["All", "Quiz", "Writing", "Hackathon"] as const;
type TagFilter = (typeof TAGS)[number];

export default function Competitions() {
  const [filter, setFilter] = useState<TagFilter>("All");
  const [showPremium, setShowPremium] = useState(false);

  const STRIPE_LINK = "https://buy.stripe.com/4gM8wI1C333x1i3fdVc7u0b";

  const list = useMemo(
    () =>
      filter === "All"
        ? COMPETITIONS
        : COMPETITIONS.filter((c) => c.tag === filter),
    [filter]
  );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 -z-10">
        <StarfieldInline />
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-12 px-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent 
                     bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Xploreon Competitions
        </motion.h1>
        <p className="mt-4 text-gray-300/90 max-w-2xl mx-auto">
          🚀 Compete, learn, and showcase your talent — full details coming soon!
        </p>

        {/* Filter Buttons */}
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
      </section>

      {/* Competitions Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <motion.div
              key={c.id}
              className="rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-md overflow-hidden hover:border-cyan-400/40 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
            >
              {/* Image */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={c.image}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold">{c.title}</h3>
                <p className="mt-2 text-gray-300">{c.short}</p>
                <p className="mt-4 text-cyan-300 font-semibold">Coming Soon</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Button */}
      <button
        onClick={() => setShowPremium(true)}
        className="fixed bottom-6 right-6 z-40 px-5 py-3 rounded-xl font-extrabold
                   bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-600 text-black
                   shadow-lg shadow-yellow-400/40 ring-1 ring-yellow-300/60
                   hover:scale-105 active:scale-95 transition-transform"
      >
        Premium
      </button>

      {/* Premium Modal */}
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

