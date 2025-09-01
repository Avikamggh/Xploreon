import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../images/x.webp";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Technology", href: "/technology" },
  { name: "Missions", href: "/missions" },
  
  { name: "Learning", href: "/learning" },
  { name: "Competitions", href: "/competitions" },
  { name: "News", href: "/news" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 
        backdrop-blur-xl border-b border-white/10
        ${scrolled ? "bg-black/70 py-3" : "bg-transparent py-5"}
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Xploreon Logo"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <span className="font-bold text-white tracking-wider text-lg">
              XPLOREON
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item, idx) => {
              const active = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <motion.div
                    className={`relative px-3 py-2 text-sm font-medium uppercase tracking-wide transition-colors
                      ${active ? "text-cyan-300" : "text-gray-200 hover:text-white"}
                    `}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.03 * idx }}
                  >
                    {item.name}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.5 rounded 
                        ${active ? "bg-cyan-300" : "bg-transparent group-hover:bg-white/50"}
                      `}
                    />
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md bg-white/10 border border-white/20"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-cyan-300" />
            ) : (
              <Menu className="w-6 h-6 text-cyan-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-white/10 shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item, idx) => {
                const active = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: 0.05 * idx }}
                  >
                    <Link
                      to={item.href}
                      className={`block text-base font-medium tracking-wide
                        ${active ? "text-cyan-300" : "text-gray-300 hover:text-white"}
                      `}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
