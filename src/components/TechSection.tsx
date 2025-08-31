import React from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Brain, Shield, Radio, Gauge } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const techFeatures = [
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Reusable Rocket Engine",
    description: "Developing next-generation rocket engines designed for multiple flights with minimal refurbishment between launches.",
    specs: ["Target: 10+ reuses", "50% cost reduction", "Rapid turnaround"],
    image: "https://images.unsplash.com/photo-1597120081843-631bddc57076?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHNhdGVsbGl0ZSUyMG9yYml0fGVufDF8fHx8MTc1NjYwNTMyNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Brain className="w-12 h-12" />,
    title: "Autonomous Flight Systems",
    description: "Advanced guidance and control algorithms for precision landing and autonomous mission operations.",
    specs: ["AI-powered navigation", "Real-time adaptation", "Fault detection"],
    image: "https://images.unsplash.com/photo-1622234365860-c8ae2e35b56c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Ryb25hdXQlMjBzcGFjZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzU2NjA1MzMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Advanced Recovery System",
    description: "Innovative propulsive landing technology enabling precise vehicle recovery and refurbishment for future missions.",
    specs: ["Vertical landing", "Grid fin control", "Engine throttling"],
    image: "https://images.unsplash.com/photo-1672011123326-444f4b0b7180?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMHN0YXRpb24lMjBlYXJ0aCUyMG9yYml0fGVufDF8fHx8MTc1NjYwNTMzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

const innovations = [
  { title: "Engine Design", progress: 78 },
  { title: "Fuel System", progress: 85 },
  { title: "Landing System", progress: 42 },
  { title: "Flight Software", progress: 91 },
  { title: "Recovery Operations", progress: 35 },
  { title: "Vehicle Integration", progress: 58 }
];

export function TechSection() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-space-black to-deep-space">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Hero section */}
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
              NEXT-GEN
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                PROPULSION
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              We're developing revolutionary reusable rocket technology that will combine cutting-edge engineering 
              with sustainable design principles to dramatically reduce launch costs and 
              environmental impact.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="font-futuristic text-3xl text-cyan-400 mb-2">50%</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Target Cost Reduction</div>
              </div>
              <div>
                <div className="font-futuristic text-3xl text-cyan-400 mb-2">2026</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">First Flight Target</div>
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
                src="https://images.unsplash.com/photo-1719947695481-7978aba9d864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByb2NrZXQlMjBlbmdpbmUlMjB0ZWNobm9sb2d5JTIwY2xvc2V1cHxlbnwxfHx8fDE3NTY2MDY0ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Modern rocket engine technology"
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
              Key innovations we're developing to enable affordable and sustainable space access
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
                      <div className="text-cyan-400 scale-75">
                        {tech.icon}
                      </div>
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
              Current status of our key engineering projects and milestones
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