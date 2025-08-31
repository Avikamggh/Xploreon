import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X, Rocket } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Technology', href: '/technology' },
  { name: 'Missions', href: '/missions' },
  { name: 'News', href: '/news' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClose = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-space-black/95 backdrop-blur-xl border-b border-white/10 py-3' 
          : 'bg-transparent py-6'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <motion.div
              className="flex items-center space-x-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-2xl shadow-cyan-500/25">
                  <Rocket className="w-7 h-7 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-sm"></div>
              </div>
              <div>
                <h1 className="font-futuristic tracking-wider text-white group-hover:text-cyan-400 transition-colors duration-300">
                  XPLOREON
                </h1>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
                  Space Innovation
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Link key={item.name} to={item.href}>
                <motion.div
                  className={`px-4 py-2 text-sm uppercase tracking-wider font-medium transition-all duration-300 relative group rounded-lg ${
                    location.pathname === item.href 
                      ? 'text-cyan-400 bg-cyan-400/10' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  {item.name}
                  {location.pathname === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-1 h-1 bg-cyan-400 rounded-full"
                      layoutId="activeNav"
                      style={{ transform: 'translateX(-50%)' }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* CTA Button (Desktop) */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 border border-cyan-400/30"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 glass rounded-full flex items-center justify-center"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6 text-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`lg:hidden overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
          initial={false}
          animate={{ maxHeight: isOpen ? 384 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-6 pb-4 space-y-4">
            {navItems.map((item, index) => (
              <Link key={item.name} to={item.href} onClick={handleMenuClose}>
                <motion.div
                  className={`block w-full text-left text-gray-300 hover:text-cyan-400 font-medium transition-colors py-2 ${
                    location.pathname === item.href ? 'text-cyan-400' : ''
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isOpen ? 1 : 0, 
                    x: isOpen ? 0 : -20 
                  }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
            <Link to="/contact" onClick={handleMenuClose}>
              <motion.button
                className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: isOpen ? 1 : 0, 
                  y: isOpen ? 0 : 20 
                }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                Launch Project
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}