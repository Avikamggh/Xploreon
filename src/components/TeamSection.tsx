import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Mail, Award, Users, Rocket } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import StarfieldInline from "./Starfield";

// Images
import avikamImg from "../images/avikam.png";
import chaitanyaImg from "../images/chaitanya.png";
import omImg from "../images/om.png";
import pImg from "../images/p.png";
import priyanshImg from "../images/priyansh.png";
import mehulImg from "../images/mehul.png";
import nImg from "../images/n.png";
import neilImg from "../images/neil.png"; // Neel Ghoil
import mansiImg from "../images/mansi.png";
import divanshiImg from "../images/divanshi.png";
import hemantImg from "../images/hemant.png";
import harshilImg from "../images/harshil.png";
import rishitaImg from "../images/rishita.png";
import uImg from "../images/u.png";
import vishardImg from "../images/vishard.png";


// =============================
// Xploreon Team Members (updated)
// =============================
const teamMembers = [
  {
    name: "Avikam Deol",
    role: "Founder & CEO",
    department: "Leadership",
    bio:
      "Founder & CEO of Xploreon, driving a bold vision to make advanced space-tech accessible. Leads hands-on across simulation, education tools, and early R&D—building a community and culture of execution.",
    achievements: [
      "Young Scientist",
      "Founded Xploreon & Space + Tech community",
      
    ],
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
    bio:
      "Director leading spacecraft system architecture, advanced propulsion research, and AI-powered space tech. Bridges cutting-edge research with practical engineering execution.",
    achievements: [
      "Spacecraft system architecture",
      "Propulsion & controls research",
      "AI in space systems"
    ],
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
    bio:
      "Chief Innovation Officer driving breakthroughs across AI, robotics, VR, and space—building human-centric, mission-ready systems and cross-team collaboration.",
    achievements: [
      "Human-centric innovation strategy",
      "AI/Robotics/VR integrations",
      "Mission-ready productization"
    ],
    avatar: pImg,
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
    bio:
      "Leads ambitious engineering from propulsion and reusable systems to AI-powered mission control, laying the foundation for space-tech infrastructure.",
    achievements: [
      "Reusable launch systems",
      "Mission control platforms",
      "Scalable infra leadership"
    ],
    avatar: omImg,
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
    bio:
      "Builds precision CAD/CAM models and mechanical prototypes for next-gen aerospace systems with a focus on manufacturability and integration.",
    achievements: [
      "Precision CAD/CAM",
      "Mission systems modeling",
      "Design for manufacturability"
    ],
    avatar: nImg,
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
    bio:
      "Owns Xploreon web stack and community experiences. Runs the website, WhatsApp community (Xploreon: Space & Tech), and interactive quizzes.",
    achievements: [
      "Full-stack web ownership",
      "Community platform ops",
      "Interactive quiz systems"
    ],
    avatar: rishitaImg,
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
    bio:
      "Leads planning and construction of launchpad and mission-critical ground facilities, ensuring robust, scalable operations for staging and deployment.",
    achievements: [
      "Launchpad program leadership",
      "Mission ground ops design",
      "Infrastructure delivery"
    ],
    avatar: mehulImg,
    social: {
      linkedin: "#",
      twitter: "#",
      email: "mehul.agarwal@xploreon.space"
    }
  },
  {
    name: "Divanshi Manshani",
    role: "CubeSat Systems Engineer",
    department: "Engineering",
    bio:
      "CubeSat specialist with hands-on ESP32/Arduino development, multi-sensor integration (DHT11, BMP180, LDR), and IoT-based satellite comms.",
    achievements: [
      "ESP32/Arduino & embedded",
      "Sensor integration & telemetry",
      "IoT satellite communication"
    ],
    avatar: divanshiImg,
    social: {
      linkedin: "#",
      twitter: "#",
      email: "divanshi.manshani@xploreon.space"
    }
  },
  {
    name: "Vishard Makwana",
    role: "Aerospace Engineer",
    department: "Engineering",
    bio:
      "Works on propulsion and launch vehicle design; contributes to engineering that powers next-gen aerospace missions.",
    achievements: [
      "Propulsion R&D",
      "Launch vehicle design",
      "Aerospace systems"
    ],
    avatar: vishardImg,
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
    bio:
      "Specializes in spacecraft structural systems and mission trajectory analysis supporting reusable launch projects.",
    achievements: [
      "Structural systems",
      "Trajectory analysis",
      "Launch project support"
    ],
    avatar: priyanshImg,
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
    bio:
      "Focuses on rocket engine design and aerodynamics optimization to improve performance and efficiency.",
    achievements: [
      "Rocket engine design",
      "Aerodynamics optimization",
      "Performance engineering"
    ],
    avatar: harshilImg,
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
    bio:
      "Works on mission architecture, orbital mechanics, and satellite deployment systems for upcoming projects.",
    achievements: [
      "Mission planning",
      "Orbital mechanics",
      "Deployment systems"
    ],
    avatar: neilImg,
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
    bio:
      "Leads AI and data-driven innovations for control, analysis, and mission automation—bringing analytical precision to space systems.",
    achievements: [
      "AI for space control",
      "Research leadership",
      "Mission automation"
    ],
    avatar: hemantImg,
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
    bio:
      "Drives modeling for trajectory optimization, predictive analytics, and mission intelligence using mathematics and AI.",
    achievements: [
      "Trajectory optimization",
      "Predictive analytics",
      "Mission intelligence"
    ],
    avatar: uImg,
    social: {
      linkedin: "#",
      twitter: "#",
      email: "utkarsh.tripathi@xploreon.space"
    }
  },
  {
    name: "Mansi Pradyuman Shah",
    role: "Market Research Manager",
    department: "Operations",
    bio:
      "7+ years across Energy, Healthcare, and ICT. Leads syndicated/custom research, team ops, and data-driven growth strategy.",
    achievements: [
      "Syndicated & custom research",
      "Team leadership",
      "Go-to-market insights"
    ],
    avatar: mansiImg,
    social: {
      linkedin: "#",
      twitter: "#",
      email: "mansi.shah@xploreon.space"
    }
  }
  
];

// Build department summary from data
const departments = [
  { name: "Leadership", icon: <Award className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Leadership").length },
  { name: "Engineering", icon: <Rocket className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Engineering").length },
  { name: "Research & Development", icon: <Users className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Research & Development").length },
  { name: "Operations", icon: <Users className="w-5 h-5" />, count: teamMembers.filter(m => m.department === "Operations").length },
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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="font-futuristic text-5xl md:text-6xl mb-6 neon-text">Our Stellar Team</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Meet the minds shaping the next generation of space-tech at Xploreon.
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
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-space via-transparent to-transparent opacity-80"></div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <a href={member.social.linkedin} className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300" aria-label="LinkedIn">
                      <Linkedin className="w-4 h-4 text-cyan-400" />
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300" aria-label="Twitter">
                      <Twitter className="w-4 h-4 text-cyan-400" />
                    </a>
                    <a href={`mailto:${member.social.email}`} className="w-10 h-10 glass rounded-full flex items-center justify-center hover:neon-glow transition-all duration-300" aria-label="Email">
                      <Mail className="w-4 h-4 text-cyan-400" />
                    </a>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4">
                  <span className="glass px-3 py-1 rounded-full text-xs font-medium text-cyan-400">
                    {member.department}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="font-futuristic text-2xl mb-2 text-white group-hover:text-cyan-400 transition-colors">
                  {member.name}
                </h3>
                <p className="text-cyan-400 text-lg mb-4 font-medium">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{member.bio}</p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Key Achievements</h4>
                  {member.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center text-sm">
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
