import React from 'react';
import { motion } from 'motion/react';
import { Satellite, Cpu, Zap, Target, Globe, Rocket } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const features = [
  {
    icon: <Satellite className="w-8 h-8" />,
    title: "Reusable Spacecraft",
    description: "Xplovis-1, our 5–8 kg reusable CubeSat, is designed for atmospheric and Earth observation missions with a 30-day trial period."
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "AI Integration",
    description: "AI-powered navigation, real-time anomaly detection, and autonomous decision-making for spacecraft control."
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Sustainable Propulsion",
    description: "Developing eco-friendly fuels and recovery systems aimed at carbon-neutral launches and debris reduction."
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "Precision Engineering",
    description: "CAD-driven design and rapid prototyping to ensure safety, performance, and reusability in harsh space conditions."
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Global Services",
    description: "Future launch offerings tailored to small nations and research organizations, making space access truly global."
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Innovation First",
    description: "Partnering with IIT Roorkee’s TIDES incubator and ISRO mentors to pioneer next-gen reusable launch systems."
  }
];

export function AboutSection() {
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
              <span className="text-sm font-medium text-cyan-400 uppercase tracking-wider">About Us</span>
            </div>
            
            <h1 className="font-futuristic text-4xl md:text-6xl lg:text-7xl mb-8 text-white leading-tight">
              PIONEERING
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                REUSABLE SPACEFLIGHT
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              Founded by <span className="text-cyan-400">Avikam Deol</span>, a Young Scientist at ISRO, 
              Xploreon is building the future of affordable and sustainable space access. 
              From reusable rockets to AI-powered CubeSats, we are on a mission to 
              make Low Earth Orbit accessible to startups, researchers, and even nations 
              without existing launch capabilities.
            </p>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="font-futuristic text-3xl text-cyan-400 mb-2">2024</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Founded</div>
              </div>
              <div>
                <div className="font-futuristic text-3xl text-cyan-400 mb-2">13+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wider">Team Members</div>
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
                src="https://images.unsplash.com/photo-1712512162392-d523620fbaa2?ixlib=rb-4.0.3&w=1080&q=80"
                alt="Xploreon satellite in Earth orbit"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-16 mb-32">
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="font-futuristic text-2xl text-cyan-400 mb-4">OUR MISSION</h3>
            <p className="text-gray-300 leading-relaxed">
              To develop reusable, sustainable spacecraft and launch systems that democratize access to 
              space. By reducing costs and increasing reliability, we aim to empower researchers, 
              governments, and organizations worldwide to participate in space exploration.
            </p>
          </motion.div>
          
          <motion.div
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-futuristic text-2xl text-cyan-400 mb-4">OUR VISION</h3>
            <p className="text-gray-300 leading-relaxed">
              To establish Xploreon as a global leader in reusable spaceflight — offering launch 
              services to small countries, building AI-driven spacecraft, and advancing 
              humanity’s reach into orbit and beyond, while staying committed to sustainability.
            </p>
          </motion.div>
        </div>
        
        {/* Capabilities grid */}
        <div className="mb-32">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-futuristic text-3xl md:text-4xl mb-4 text-white">
              OUR CAPABILITIES
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              The technologies and expertise powering our next-generation missions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/30">
                    <div className="text-cyan-400">{feature.icon}</div>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-futuristic text-lg mb-2 text-white group-hover:text-cyan-400 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Stats section */}
        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { number: "1st", label: "Reusable CubeSat Mission", prefix: "" },
            { number: "13+", label: "Engineers & Researchers", prefix: "" },
            { number: "5–8kg", label: "LEO Satellite Payload", prefix: "" },
            { number: "2026", label: "First Orbital Launch Target", prefix: "" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="font-futuristic text-3xl lg:text-4xl mb-2 text-cyan-400">
                {stat.prefix}{stat.number}{stat.suffix}
              </div>
              <div className="text-gray-400 uppercase tracking-wider text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
