import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Mail, Phone, MapPin, Twitter, Linkedin, Youtube, Instagram } from 'lucide-react';
import logo from "../images/x.webp"; // adjust path to your image

const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About Us", href: "#About" },
      { name: "Our Mission", href: "/mission" },
      { name: "Leadership", href: "/team" },
      { name: "Careers", href: "#contact" },
      { name: "Press", href: "#news" }
    ]
  },
  {
    title: "Technology",
    links: [
      { name: "Reusable Satellites", href: "#technology" },
      { name: "AI Navigation", href: "#technology" },
      { name: "Propulsion Systems", href: "#technology" },
      { name: "Mission Control", href: "#missions" },
      { name: "Research Papers", href: "#news" }
    ]
  },
  {
    title: "Services",
    links: [
      { name: "Satellite Deployment", href: "#contact" },
      { name: "Mission Planning", href: "#contact" },
      { name: "Technology Licensing", href: "#contact" },
      { name: "Consulting", href: "/contact" },
      { name: "Support", href: "/contact" }
    ]
  }
];

const socialLinks = [
  { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/XploreonXn", name: "Twitter" },
  { icon: <Linkedin className="w-5 h-5" />, href: "https://in.linkedin.com/company/xploreon?trk=public_profile_topcard-current-company", name: "LinkedIn" },
  { icon: <Youtube className="w-5 h-5" />, href: "https://www.youtube.com/@Xploreonspace", name: "YouTube" },
  { icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/xploreon_/?__pwa=1", name: "Instagram" }
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative py-16 overflow-hidden bg-gradient-to-b from-deep-space to-space-black border-t border-white/10">

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          {/* Company info */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img
    src={logo}
    alt="Xploreon Logo"
    className="w-10 h-10 object-contain rounded-lg"
  />
              <div>
                <h3 className="font-futuristic tracking-wider text-white">
                  XPLOREON
                </h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">Space Innovation</p>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Advancing human civilization through sustainable space technology 
              and revolutionary satellite systems.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>xploreonteam@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>+91 7906822047</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>India</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all duration-300 group border border-white/10 hover:border-cyan-400/30"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-gray-400 group-hover:text-cyan-400 transition-colors">
                    {social.icon}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer sections */}
          {footerSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: (sectionIndex + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-futuristic text-sm uppercase tracking-wider mb-6 text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm text-left"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <motion.div
          className="border-t border-white/10 pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-xs text-gray-500">
              <span>© 2025 Xploreon Space Technologies. All rights reserved.</span>
              <div className="flex gap-6">
                <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a>
              </div>
            </div>
            
            <div className="text-xs text-gray-500">
              Made with <span className="text-cyan-400">♥</span> for space exploration
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
