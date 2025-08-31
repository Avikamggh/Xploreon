import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Mail, Award, Users, Rocket } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const teamMembers = [
  {
    name: "Dr. Sarah Chen",
    role: "Chief Executive Officer",
    department: "Leadership",
    bio: "Visionary leader with 15+ years in aerospace engineering and space technology innovation.",
    achievements: ["MIT Aerospace PhD", "Former NASA Engineer", "3 Patents in Propulsion"],
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332e234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjYwNTU4M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: {
      linkedin: "#",
      twitter: "#", 
      email: "sarah.chen@xploreon.space"
    }
  },
  {
    name: "Marcus Rodriguez",
    role: "Chief Technology Officer",
    department: "Engineering",
    bio: "Pioneering aerospace engineer specializing in reusable satellite systems and AI integration.",
    achievements: ["Stanford Engineering MS", "SpaceX Veteran", "50+ Successful Launches"],
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2MDU1ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "marcus.rodriguez@xploreon.space"
    }
  },
  {
    name: "Dr. Aisha Patel",
    role: "Head of AI Research",
    department: "Research & Development",
    bio: "Leading expert in autonomous navigation systems and machine learning for space applications.",
    achievements: ["Cambridge AI PhD", "IEEE Fellow", "20+ Research Papers"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGluZGlhbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjYwNTU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "aisha.patel@xploreon.space"
    }
  },
  {
    name: "Captain Jake Morrison",
    role: "Mission Director",
    department: "Operations",
    bio: "Former astronaut with extensive experience in space operations and mission planning.",
    achievements: ["US Air Force", "3 Space Missions", "Mission Specialist"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2MDU1OTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "jake.morrison@xploreon.space"
    }
  },
  {
    name: "Elena Volkov",
    role: "Lead Propulsion Engineer",
    department: "Engineering",
    bio: "Expert in ion propulsion technology and advanced spacecraft propulsion systems.",
    achievements: ["Moscow Institute PhD", "ESA Collaborator", "Propulsion Innovation Award"],
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjYwNTYwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "elena.volkov@xploreon.space"
    }
  },
  {
    name: "Dr. James Liu",
    role: "Chief Sustainability Officer",
    department: "Sustainability",
    bio: "Environmental scientist focused on sustainable space technology and orbital debris mitigation.",
    achievements: ["Berkeley Environmental PhD", "UN Space Committee", "Green Tech Award"],
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBhc2lhbiUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjYwNTYwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "james.liu@xploreon.space"
    }
  }
];

const departments = [
  { name: "Leadership", icon: <Award className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Leadership").length },
  { name: "Engineering", icon: <Rocket className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Engineering").length },
  { name: "Research & Development", icon: <Users className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Research & Development").length },
  { name: "Operations", icon: <Users className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Operations").length },
  { name: "Sustainability", icon: <Users className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Sustainability").length }
];

export function TeamSection() {
  const [selectedDepartment, setSelectedDepartment] = React.useState("All");

  const filteredMembers = selectedDepartment === "All" 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-space-black via-deep-space to-nebula-blue/20">
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-futuristic text-5xl md:text-6xl mb-6 neon-text">
            Our Stellar Team
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet the brilliant minds pioneering the future of space exploration and satellite technology.
          </p>
        </motion.div>

        {/* Department filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => setSelectedDepartment("All")}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedDepartment === "All"
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white neon-glow'
                : 'glass text-gray-300 hover:text-cyan-400 hover:neon-border'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>All ({teamMembers.length})</span>
            </div>
          </button>
          {departments.map((dept) => (
            <button
              key={dept.name}
              onClick={() => setSelectedDepartment(dept.name)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedDepartment === dept.name
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white neon-glow'
                  : 'glass text-gray-300 hover:text-cyan-400 hover:neon-border'
              }`}
            >
              <div className="flex items-center space-x-2">
                {dept.icon}
                <span>{dept.name} ({dept.count})</span>
              </div>
            </button>
          ))}
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="glass-card rounded-3xl overflow-hidden hover:neon-glow transition-all duration-500 group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Profile image */}
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent opacity-80"></div>
                
                {/* Social links overlay */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <a
                      href={member.social.linkedin}
                      className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4 text-cyan-400" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300"
                    >
                      <Twitter className="w-4 h-4 text-cyan-400" />
                    </a>
                    <a
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300"
                    >
                      <Mail className="w-4 h-4 text-cyan-400" />
                    </a>
                  </div>
                </div>

                {/* Department badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="glass px-3 py-1 rounded-full text-xs font-medium text-cyan-400">
                    {member.department}
                  </span>
                </div>
              </div>

              {/* Profile info */}
              <div className="p-8">
                <h3 className="font-futuristic text-2xl mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-cyan-400 text-lg mb-4 font-medium">
                  {member.role}
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Achievements */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                    Key Achievements
                  </h4>
                  {member.achievements.map((achievement, achievementIndex) => (
                    <div key={achievementIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 opacity-60"></div>
                      <span className="text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Team stats */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-3xl p-12">
            <h3 className="font-futuristic text-3xl text-center mb-12 text-cyan-400">
              Team Excellence
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 glass-card rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="font-futuristic text-3xl mb-2 neon-text">150+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Team Members</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 glass-card rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="font-futuristic text-3xl mb-2 neon-text">25+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">PhD Holders</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 glass-card rounded-full flex items-center justify-center">
                  <Rocket className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="font-futuristic text-3xl mb-2 neon-text">100+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Years Combined Experience</div>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 glass-card rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-cyan-400" />
                </div>
                <div className="font-futuristic text-3xl mb-2 neon-text">15</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">Countries Represented</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Join team CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="glass-card rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="font-futuristic text-3xl mb-6 text-cyan-400">
              Join Our Mission
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to push the boundaries of space exploration? We're always looking for 
              brilliant minds to join our team and shape the future of humanity among the stars.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full neon-glow hover:scale-105 transition-all duration-300 font-medium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Open Positions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}