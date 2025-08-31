import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo from '../images/x.webp'; // <- your logo inside src/images/

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Technology', href: '/technology' },
  { name: 'Missions', href: '/missions' },
  { name: 'Learning', href: '/learning' },       // NEW
  { name: 'Competitions', href: '/competitions' }, // NEW
  { name: 'News', href: '/news' },
  { name: 'Team', href: '/team' },
  { name: 'Contact', href: '/contact' }
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className={[
        'fixed top-0 w-full z-50 transition-all duration-500',
        // Mobile: solid (not transparent). From sm+: glass.
        scrolled
          ? 'bg-black/95 sm:bg-space-black/80 sm:backdrop-blur-xl border-b border-white/10 py-2.5'
          : 'bg-black/95 sm:bg-transparent sm:backdrop-blur-0 py-4 sm:py-6'
      ].join(' ')}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + wordmark */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Xploreon Logo" className="h-12 w-auto object-contain" />
            <span className="hidden sm:block font-futuristic tracking-wider text-white hover:text-cyan-400 transition-colors">
              XPLOREON
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, idx) => {
              const active = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href}>
                  <motion.div
                    className={[
                      'px-4 py-2 text-sm uppercase tracking-wider font-medium rounded-lg relative transition-all',
                      active
                        ? 'text-cyan-400 bg-cyan-400/10'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    ].join(' ')}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.03 * idx }}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="activeDot"
                        className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full"
                        style={{ transform: 'translateX(-50%)' }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link to="/contact">
              <motion.button
                className="px-6 py-3 rounded-lg font-medium text-white border-0
                           bg-gradient-to-r from-cyan-500 to-blue-600
                           hover:from-cyan-400 hover:to-blue-500
                           shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40
                           transition-transform"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-md flex items-center justify-center border border-white/10 bg-black/70"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-cyan-400" /> : <Menu className="w-6 h-6 text-cyan-400" />}
          </button>
        </div>

        {/* Mobile menu (opaque background) */}
        <motion.div
          className={`lg:hidden overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
          initial={false}
          animate={{ maxHeight: isOpen ? 384 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="pt-4 pb-5 space-y-3">
            {navItems.map((item, idx) => {
              const active = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    className={[
                      'block w-full text-left px-1 text-base font-medium transition-colors',
                      active ? 'text-cyan-400' : 'text-gray-200 hover:text-white'
                    ].join(' ')}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -16 }}
                    transition={{ duration: 0.25, delay: 0.04 * idx }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              );
            })}
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              <motion.button
                className="w-full mt-2 px-6 py-3 rounded-full text-white font-medium
                           bg-gradient-to-r from-cyan-500 to-blue-600"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 12 }}
                transition={{ duration: 0.25, delay: 0.25 }}
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
