import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Activity, Satellite, Clock, MapPin, Signal, Battery } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import StarfieldInline from "./Starfield"; // adjust path if needed

const developmentMilestones = [
  {
    id: "PROTO-001",
    name: "Engine Test Alpha",
    status: "In Progress",
    phase: "Ground Testing",
    completion: "78%",
    nextTest: "Jan 15, 2025",
    testType: "Static Fire Test",
    mission: "Engine performance validation",
    started: "2024-10-01"
  },
  {
    id: "PROTO-002", 
    name: "Avionics Suite",
    status: "Development",
    phase: "Integration",
    completion: "65%",
    nextTest: "Feb 3, 2025",
    testType: "System Integration",
    mission: "Flight control systems",
    started: "2024-08-15"
  },
  {
    id: "PROTO-003",
    name: "Recovery System",
    status: "Design",
    phase: "Prototyping",
    completion: "42%",
    nextTest: "Mar 20, 2025",
    testType: "Drop Test",
    mission: "Reusable landing system",
    started: "2024-11-01"
  }
];

const upcomingMilestones = [
  {
    name: "First Test Flight",
    date: "2026-Q2",
    countdown: "Estimated 18 months",
    mission: "Suborbital demonstration flight",
    vehicle: "Xploreon Demo Vehicle"
  },
  {
    name: "Orbital Test Mission", 
    date: "2026-Q4",
    countdown: "Estimated 24 months",
    mission: "First orbital insertion test",
    vehicle: "Xploreon Mk-1"
  }
];

export function MissionTracker() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMission, setSelectedMission] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-space-black to-deep-space">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero section */}
        {/* ⭐ Starfield background */}
      <StarfieldInline density={800} />
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-400/10 border border-orange-400/20 mb-6">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-orange-400 uppercase tracking-wider">Development Phase</span>
            </div>
            
            <h1 className="font-futuristic text-4xl md:text-6xl lg:text-7xl mb-8 text-white leading-tight">
              DEVELOPMENT
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                ROADMAP
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Track our progress as we develop revolutionary reusable rocket technology. 
              From engine testing to first flight, follow every milestone on our journey to space.
            </p>
            
            {/* Live time display */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 inline-block">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-cyan-400" />
                <div className="text-white font-mono text-lg">
                  {currentTime.toISOString().split('T')[1].split('.')[0]} UTC
                </div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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
                src="https://images.unsplash.com/photo-1652145595413-0a79398e5888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaXNzaW9uJTIwY29udHJvbCUyMGNlbnRlciUyMHNwYWNlJTIwaG91c3RvbnxlbnwxfHx8fDE3NTY2MDY1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Mission control center"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>

        {/* Active missions */}
        <motion.div 
          className="mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-futuristic text-3xl md:text-4xl mb-4 text-white">
              DEVELOPMENT PROJECTS
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Current engineering projects and testing phases in our rocket development program
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {developmentMilestones.map((project, index) => (
              <motion.div
                key={project.id}
                className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 cursor-pointer ${
                  selectedMission === index 
                    ? 'border-cyan-400/50 bg-cyan-400/10' 
                    : 'border-white/10 hover:border-white/20 hover:bg-white/10'
                }`}
                onClick={() => setSelectedMission(index)}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Project header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/20 flex items-center justify-center border border-cyan-400/30">
                      <Activity className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-futuristic text-white mb-1">
                        {project.name}
                      </h4>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">{project.id}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-md text-xs font-medium uppercase tracking-wider ${
                    project.status === 'In Progress' ? 'bg-green-400/20 text-green-400 border border-green-400/30' :
                    project.status === 'Development' ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30' :
                    'bg-orange-400/20 text-orange-400 border border-orange-400/30'
                  }`}>
                    {project.status}
                  </div>
                </div>

                {/* Project details */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Phase:</span>
                    <span className="text-white">{project.phase}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Started:</span>
                    <span className="text-white">{project.started}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Next Test:</span>
                    <span className="text-white">{project.nextTest}</span>
                  </div>
                  
                  {/* Progress status */}
                  <div className="pt-3 border-t border-gray-700">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-gray-400">Completion</span>
                      </div>
                      <span className="text-sm text-cyan-400">{project.completion}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-cyan-400 h-2 rounded-full transition-all duration-1000"
                        style={{ width: project.completion }}
                      />
                    </div>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-sm">
                    <span className="text-gray-400">Test Type:</span>
                    <span className="text-cyan-400 font-medium">{project.testType}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming launches */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="font-futuristic text-3xl mb-8 text-cyan-400 text-center">
            Upcoming Milestones
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingMilestones.map((milestone, index) => (
              <motion.div
                key={index}
                className="glass-card rounded-2xl p-8 hover:neon-glow transition-all duration-500"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="font-futuristic text-xl text-cyan-400 mb-2">
                      {milestone.name}
                    </h4>
                    <p className="text-gray-300 text-sm">{milestone.mission}</p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-400 animate-pulse" />
                </div>

                {/* Timeline */}
                <div className="text-center py-6">
                  <div className="font-futuristic text-3xl md:text-4xl text-white mb-2 neon-text">
                    {milestone.countdown}
                  </div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">
                    Estimated Timeline
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Target:</span>
                    <span className="text-white">{milestone.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Vehicle:</span>
                    <span className="text-cyan-400">{milestone.vehicle}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live data feed simulation */}
        <motion.div
          className="mt-16 glass-card rounded-2xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-futuristic text-2xl text-cyan-400 mb-6 text-center">
            Development Metrics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="font-futuristic text-3xl text-green-400 mb-2">
                3
              </div>
              <div className="text-sm text-gray-400">Active Projects</div>
            </div>
            <div className="text-center">
              <div className="font-futuristic text-3xl text-blue-400 mb-2">
                62%
              </div>
              <div className="text-sm text-gray-400">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="font-futuristic text-3xl text-cyan-400 mb-2">
                15+
              </div>
              <div className="text-sm text-gray-400">Team Members</div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}
