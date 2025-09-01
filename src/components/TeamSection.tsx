import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Mail, Award, Users, Rocket } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import StarfieldInline from "./Starfield"; // adjust path if needed
import avikamImg from "../images/avikam.png";
import chaitanyaImg from "../images/chaitanya.png";
// add the rest...


// Xploreon Team Members
const teamMembers = [
  {
    name: "Avikam Deol",
    role: "Founder & CEO",
    department: "Leadership",
    bio: "Young scientist and visionary founder of Xploreon, leading the mission to pioneer reusable space technologies and global satellite services.",
    achievements: ["Founder of Xploreon", "Recognized Young Scientist at ISRO", "Semifinalist – Thiel Fellowship"],
    avatar: avikamImg,
    social: {
      linkedin: "#",
      twitter: "#",
      email: "avikam.deol@xploreon.space"
    }
  },
  {
    name: "Chaitanya Srivastava",
    role: "Director",
    department: "Leadership",
    bio: "Director at Xploreon, leading spacecraft system architecture, propulsion systems, and AI-powered space technology research.",
    achievements: ["System Architect for Spacecraft", "Advanced Propulsion Specialist", "AI Research in Space Systems"],
    avatar: chaitanyaImg,
    social: {
      linkedin: "#",
      twitter: "#",
      email: "chaitanya.srivastava@xploreon.space"
    }
  },
  {
    name: "Prayesi Agarwal",
    role: "Chief Innovation Officer",
    department: "Leadership",
    bio: "Driving innovative approaches across missions, technology, and collaboration at Xploreon.",
    achievements: ["Innovation Leadership", "Strategic R&D Direction", "Cross-team Collaboration"],
    avatar: "https://xploreon.space/team/prayesi.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "prayesi.agarwal@xploreon.space"
    }
  },
  {
    name: "Omprakash Kumar",
    role: "Head of Technology",
    department: "Engineering",
    bio: "Leading the development of mission-critical technology for reusable launch systems and spacecraft.",
    achievements: ["Technology Leadership", "Reusable Rocket Systems", "Mission-Critical Infrastructure"],
    avatar: "https://xploreon.space/team/omprakash.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "omprakash.kumar@xploreon.space"
    }
  },
  {
    name: "Narayan Kataruka",
    role: "Mission Systems CAD Designer",
    department: "Engineering",
    bio: "Designing and modeling mission systems through advanced CAD for spacecraft engineering.",
    achievements: ["CAD System Designer", "Mission Systems Specialist", "Precision Modeling"],
    avatar: "https://xploreon.space/team/narayan.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "narayan.kataruka@xploreon.space"
    }
  },
  {
    name: "Rishita Mishra",
    role: "Software Engineer",
    department: "Engineering",
    bio: "Building advanced software systems for satellite control, telemetry, and mission data pipelines.",
    achievements: ["Mission Software Development", "Telemetry Systems", "Satellite Data Engineering"],
    avatar: "https://xploreon.space/team/rishita.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "rishita.mishra@xploreon.space"
    }
  },
  {
    name: "Mehul Agarwal",
    role: "Project Manager – Launchpad & Facilities",
    department: "Operations",
    bio: "Overseeing development and management of infrastructure for rocket launches and mission facilities.",
    achievements: ["Launchpad Project Management", "Facilities Development", "Mission Infrastructure"],
    avatar: "https://xploreon.space/team/mehul.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "mehul.agarwal@xploreon.space"
    }
  },
  {
    name: "Vishard Makwana",
    role: "Aerospace Engineer",
    department: "Engineering",
    bio: "Engineer working on propulsion, aerodynamics, and structural systems for reusable spacecraft.",
    achievements: ["Aerospace Engineering", "Reusable Systems", "Propulsion Specialist"],
    avatar: "https://xploreon.space/team/vishard.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "vishard.makwana@xploreon.space"
    }
  },
  {
    name: "Priyansh Patel",
    role: "Aerospace Engineer",
    department: "Engineering",
    bio: "Contributing to the spacecraft design, propulsion systems, and structural engineering.",
    achievements: ["Satellite Design", "Propulsion Systems", "Structural Engineering"],
    avatar: "https://xploreon.space/team/priyansh.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "priyansh.patel@xploreon.space"
    }
  },
  {
    name: "Harshil Purohit",
    role: "Aerospace Engineer",
    department: "Engineering",
    bio: "Focused on satellite design, reusable launch systems, and orbital mechanics.",
    achievements: ["Reusable Launch Systems", "Satellite Engineering", "Orbital Mechanics"],
    avatar: "https://xploreon.space/team/harshil.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "harshil.purohit@xploreon.space"
    }
  },
  {
    name: "Neel Ghoil",
    role: "Aerospace Engineer",
    department: "Engineering",
    bio: "Designing and testing aerospace systems, propulsion methods, and mission safety frameworks.",
    achievements: ["Propulsion Engineering", "Mission Testing", "Safety Systems"],
    avatar: "https://xploreon.space/team/neel.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "neel.ghoil@xploreon.space"
    }
  },
  {
    name: "Hemant Sharma",
    role: "Head of AI & Research",
    department: "Research & Development",
    bio: "Driving AI innovation for space systems, including control, analysis, and mission automation.",
    achievements: ["AI Systems for Space", "Research Leadership", "Control System Development"],
    avatar: "https://xploreon.space/team/hemant.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "hemant.sharma@xploreon.space"
    }
  },
  {
    name: "Utkarsh Tripathi",
    role: "Mathematics Specialist",
    department: "Research & Development",
    bio: "Mathematical modeling expert for trajectory optimization, orbital mechanics, and mission safety.",
    achievements: ["Trajectory Optimization", "Mathematical Modeling", "Orbital Mechanics"],
    avatar: "https://xploreon.space/team/utkarsh.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "utkarsh.tripathi@xploreon.space"
    }
  },
  {
    name: "Mansi Pradyuman Shah",
    role: "Market Researcher",
    department: "Operations",
    bio: "Responsible for analyzing global space-tech market trends and supporting Xploreon’s growth strategy.",
    achievements: ["Market Analysis", "Growth Strategy", "Space-tech Research"],
    avatar: "https://xploreon.space/team/mansi.jpg",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "mansi.shah@xploreon.space"
    }
  }
];

// Departments
const departments = [
  { name: "Leadership", icon: <Award className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Leadership").length },
  { name: "Engineering", icon: <Rocket className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Engineering").length },
  { name: "Research & Development", icon: <Users className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Research & Development").length },
  { name: "Operations", icon: <Users className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Operations").length }
];

export function TeamSection() {
  const [selectedDepartment, setSelectedDepartment] = React.useState("All");

  const filteredMembers =
    selectedDepartment === "All"
      ? teamMembers
      : teamMembers.filter((member) => member.department === selectedDepartment);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background animation */}
            <StarfieldInline density={800} />

      <div className="absolute inset-0 bg-gradient-to-br from-space-black via-deep-space to-nebula-blue/20">
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{ y: [0, -20, 0], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <h2 className="font-futuristic text-5xl md:text-6xl mb-6 neon-text">Our Stellar Team</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet the brilliant minds pioneering the future of space exploration and satellite technology at Xploreon.
          </p>
        </motion.div>

        {/* Department filter */}
        <motion.div className="flex flex-wrap justify-center gap-4 mb-12" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }}>
          <button onClick={() => setSelectedDepartment("All")} className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedDepartment === "All" ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white neon-glow' : 'glass text-gray-300 hover:text-cyan-400 hover:neon-border'}`}>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>All ({teamMembers.length})</span>
            </div>
          </button>
          {departments.map((dept) => (
            <button key={dept.name} onClick={() => setSelectedDepartment(dept.name)} className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${selectedDepartment === dept.name ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white neon-glow' : 'glass text-gray-300 hover:text-cyan-400 hover:neon-border'}`}>
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
            <motion.div key={member.name} className="glass-card rounded-3xl overflow-hidden hover:neon-glow transition-all duration-500 group cursor-pointer" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ scale: 1.03 }}>
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback src={member.avatar} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <a href={member.social.linkedin} className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300">
                      <Linkedin className="w-4 h-4 text-cyan-400" />
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300">
                      <Twitter className="w-4 h-4 text-cyan-400" />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300">
                      <Mail className="w-4 h-4 text-cyan-400" />
                    </a>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="glass px-3 py-1 rounded-full text-xs font-medium text-cyan-400">{member.department}</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-futuristic text-2xl mb-2 text-white group-hover:text-cyan-400 transition-colors">{member.name}</h3>
                <p className="text-cyan-400 text-lg mb-4 font-medium">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{member.bio}</p>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Key Achievements</h4>
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
      </div>
    </section>
  );
}
