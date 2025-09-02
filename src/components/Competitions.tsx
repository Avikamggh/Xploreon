// src/components/Competitions.tsx
import React from "react";
import { motion } from "motion/react";
import StarfieldInline from "./Starfield"; // ← star background

const COMPETITIONS = [
  { id: "c1", title: "Space Quiz" },
  { id: "c2", title: "Interplanetary Story Contest" },
  { id: "c3", title: "AI Physics Hackathon" },
];

export default function Competitions() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Starfield Background */}
      <div className="absolute inset-0 -z-10">
        <StarfieldInline />
      </div>

      {/* Hero */}
      <section className="relative pt-28 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
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
            🚀 Explore upcoming challenges — details will be revealed soon!
          </p>
        </div>
      </section>

      {/* Competitions Grid */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COMPETITIONS.map((c, i) => (
            <motion.div
              key={c.id}
              className="rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md p-6 
                         flex flex-col items-center justify-center text-center hover:border-cyan-400/40 
                         transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
            >
              <h3 className="text-xl font-bold text-white">{c.title}</h3>
              <p className="mt-3 text-gray-400">Coming Soon</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
