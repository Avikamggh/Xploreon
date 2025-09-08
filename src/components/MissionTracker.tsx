import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Ruler, Layers3, Cpu, Wrench, Clock } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import StarfieldInline from "./Starfield";

const milestones = [
  {
    id: "DES-001",
    name: "Mission Requirements",
    status: "In Progress",
    phase: "Definition",
    completion: 70,
    focus: "Clear objectives, constraints, interfaces",
    icon: Ruler,
  },
  {
    id: "DES-002",
    name: "Structure & CAD",
    status: "In Progress",
    phase: "Design",
    completion: 45,
    focus: "Frame + solar layout",
    icon: Layers3,
  },
  {
    id: "DES-003",
    name: "Avionics Architecture",
    status: "Exploration",
    phase: "System Design",
    completion: 30,
    focus: "Compute, power, comms",
    icon: Cpu,
  },
  {
    id: "DES-004",
    name: "Prototype Electronics",
    status: "Planned",
    phase: "Prototyping",
    completion: 10,
    focus: "PCB bring-up for power + MCU",
    icon: Wrench,
  },
];

export function MissionTracker() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const isoTime = now.toISOString().split("T")[1]?.split(".")[0];

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-space-black to-deep-space">
      <StarfieldInline density={500} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-5">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-cyan-300 uppercase tracking-wider">
                Early Design Phase
              </span>
            </div>

            <h1 className="font-futuristic text-4xl md:text-6xl lg:text-7xl mb-6 text-white leading-tight">
              MISSION
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                DEVELOPMENT
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
              We’ve started designing our first satellite. This page tracks only
              the design and prototyping work in progress — no launch claims yet.
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10 inline-flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-400" />
              <div className="text-white font-mono text-sm md:text-base">
                {isoTime} UTC
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1652145595413-0a79398e5888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW9uJTIwY29udHJvbCUyMGNlbnRlciUyMHNwYWNlJTIwaG91c3RvbnxlbnwxfHx8fDE3NTY2MDY1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Mission control center"
                className="w-full h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-10">
            <h2 className="font-futuristic text-3xl md:text-4xl mb-3 text-white">
              Current Workstreams
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Concrete tasks we’re advancing in design and prototyping
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {milestones.map((m, idx) => {
              const Icon = m.icon;
              const statusStyle =
                m.status === "In Progress"
                  ? "bg-green-400/15 text-green-300 border border-green-400/25"
                  : m.status === "Exploration"
                  ? "bg-yellow-400/15 text-yellow-300 border border-yellow-400/25"
                  : "bg-orange-400/15 text-orange-300 border border-orange-400/25";

              return (
                <motion.div
                  key={m.id}
                  className="text-left bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center border border-cyan-400/30">
                        <Icon className="w-5 h-5 text-cyan-300" />
                      </div>
                      <div>
                        <h4 className="font-futuristic text-white leading-tight">
                          {m.name}
                        </h4>
                        <p className="text-[11px] text-gray-400 uppercase tracking-wider">
                          {m.id}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-md text-[11px] font-medium uppercase tracking-wider ${statusStyle}`}
                    >
                      {m.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Phase</span>
                      <span className="text-white">{m.phase}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm text-cyan-300">
                          {m.completion}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-cyan-400 h-2 rounded-full transition-all duration-700"
                          style={{ width: `${m.completion}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Focus</span>
                      <span className="text-cyan-300 text-right max-w-[60%]">
                        {m.focus}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
