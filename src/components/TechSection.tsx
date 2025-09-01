import React from 'react';
import { motion } from 'motion/react';
import { Zap, Brain, Shield, Rocket, Satellite, Recycle, Gauge } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import StarfieldInline from "./Starfield"; // adjust path if needed

const techFeatures = [
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Reusable Launch Vehicle",
    description: "Xploreon is engineering a reusable small launch vehicle capable of carrying CubeSats and microsatellites into Low Earth Orbit (LEO). The design emphasizes reusability and low refurbishment costs.",
    specs: ["Target: 5–10 reuses", "Low Earth Orbit payload: 5–8 kg", "Cost-efficient design"],
    image: "https://images.unsplash.com/photo-1523983303491-36c348b2ef11?ixlib=rb-4.0.3&w=1080&q=80"
  },
  {
    icon: <Satellite className="w-12 h-12" />,
    title: "Xplovis-1 Satellite",
    description: "Our first spacecraft — Xplovis-1 — is a reusable satellite designed for atmospheric research and Earth observation. It can be remotely controlled like a toy and safely returned to Earth.",
    specs: ["Mass: 5–8 kg", "30-day trial mission", "Remote-controlled return"],
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&w=1080&q=80"
  },
  {
    icon: <Brain className="w-12 h-12" />,
    title: "AI-Driven Flight Systems",
    description: "We integrate AI for autonomous navigation, anomaly detection, and adaptive mission planning. These systems reduce human intervention and maximize mission safety.",
    specs: ["Trajectory optimization", "Fault detection", "Autonomous decision-making"],
    image: "https://images.unsplash.com/photo-1622234365860-c8ae2e35b56c?ixlib=rb-4.0.3&w=1080&q=80"
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Advanced Recovery Technology",
    description: "Our reusable spacecraft will employ precision landing and recovery systems, ensuring safe return for refurbishment and redeployment.",
    specs: ["Controlled descent", "Propulsive landing", "Rapid turnaround"],
    image: "https://images.unsplash.com/photo-1672011123326-444f4b0b7180?ixlib=rb-4.0.3&w=1080&q=80"
  },
  {
    icon: <Recycle className="w-12 h-12" />,
    title: "Sustainable Propulsion",
    description: "Xploreon is committed to sustainability with carbon-neutral goals. We are exploring eco-friendly fuels and debris mitigation strategies to ensure responsible space access.",
    specs: ["Carbon-neutral operations", "Eco-friendly fuels", "Debris reduction"],
    image: "https://images.unsplash.com/photo-1580428180121-cf6631fd988c?ixlib=rb-4.0.3&w=1080&q=80"
  }
];

const innovations = [
  { title: "Reusable Vehicle Design", progress: 72 },
  { title: "Xplovis-1 Satellite Systems", progress: 80 },
  { title: "AI Flight Software", progress: 65 },
  { title: "Recovery & Landing", progress: 40 },
  { title: "Eco-Friendly Propulsion", progress: 35 },
  { title: "Mission Operations Control", progress: 70 }
];

export function TechSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-space-black to-deep-space">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero section */}
              <StarfieldInline density={800} />

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400/10 border border-cyan-400/20 mb-6">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">Technology</span>
            </div>
            
            <h1 className="font-futuristic text-4xl md:text-6xl lg:text-7xl mb-8 text-white leading-tight">
              INNOVATING
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                REUSABLE SPACEFLIGHT
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Xploreon is building the next era of space technology with reusable rockets, 
              AI-powered satellites, and sustainable propulsion systems — making access to 
              space affordable, safe, and environmentally responsible.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="font-futuristic text-3xl text-cyan-400 mb-2">70%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Tech Development Complete</div>
              </div>
              <div>
                <div className="font-futuristic text-3xl text-cyan-400 mb-2">2026</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">First Orbital Mission Target</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719947695481-7978aba9d864?ixlib=rb-4.0.3&w=1080&q=80"
                alt="Xploreon Rocket Technology"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Technology showcase */}
        <div className="mb-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-futuristic text-3xl md:text-4xl mb-4 text-white">
              CORE TECHNOLOGIES IN DEVELOPMENT
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Key innovations we're developing to enable affordable, sustainable, and reusable space access.
            </p>
          </motion.div>
          
          <div className="space-y-16">
            {techFeatures.map((tech, index) => (
              <motion.div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <ImageWithFallback
                      src={tech.image}
                      alt={tech.title}
                      className="w-full h-[400px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/20">
                      <div className="text-cyan-400 scale-75">{tech.icon}</div>
                    </div>
                  </div>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-futuristic text-2xl md:text-3xl mb-4 text-white">
                        {tech.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        {tech.description}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {tech.specs.map((spec, specIndex) => (
                        <div key={specIndex} className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            <span className="text-sm text-gray-300 font-medium">{spec}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Development Progress */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 lg:p-12 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="font-futuristic text-2xl md:text-3xl mb-4 text-white">
              DEVELOPMENT PROGRESS
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Current status of Xploreon’s key engineering milestones for reusable rockets and satellite systems.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {innovations.map((innovation, index) => (
              <motion.div
                key={index}
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-futuristic text-sm uppercase tracking-wider text-white">
                    {innovation.title}
                  </span>
                  <span className="text-cyan-400 font-mono text-sm">
                    {innovation.progress}%
                  </span>
                </div>
                
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${innovation.progress}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
