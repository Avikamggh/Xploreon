// src/components/Navigation.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import logo from '../public/images/x.webp'; // adjust path if needed

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Technology', href: '/technology' },
  { name: 'Missions', href: '/missions' },
  { name: 'Tracker', href: '/tracker' },
  { name: 'Learning', href: '/learning' },
  { name: 'Competitions', href: '/competitions' },
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
      className={`fixed top-0 w-full z-50 transition-all duration-500 
        backdrop-blur-md border-b border-black/30 
        ${scrolled ? 'bg-white/20 py-3' : 'bg-white/10 py-5'}
      `}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + wordmark */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Xploreon Logo" className="h-12 sm:h-14 w-auto object-contain" />
            <span className="block font-futuristic tracking-wider text-white hover:text-cyan-300 transition-colors text-base sm:text-lg">
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
                      'px-4 py-2 text-sm uppercase tracking-wider font-medium rounded-lg relative transition-colors',
                      active
                        ? 'text-cyan-300 bg-cyan-300/10'
                        : 'text-gray-100/85 hover:text-white hover:bg-white/10'
                    ].join(' ')}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.03 * idx }}
                  >
                    {item.name}
                    {active && (
                      <motion.span
                        layoutId="activeDot"
                        className="absolute -bottom-1 left-1/2 w-1.5 h-1.5 bg-cyan-300 rounded-full"
                        style={{ transform: 'translateX(-50%)' }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 rounded-md flex items-center justify-center border border-white/20 bg-white/10 backdrop-blur-md"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-cyan-300" /> : <Menu className="w-6 h-6 text-cyan-300" />}
          </button>
        </div>

        {/* Mobile menu */}
        <motion.div
          className={`lg:hidden overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
          initial={false}
          animate={{ maxHeight: isOpen ? 384 : 0 }}
          transition={{ duration: 0.28 }}
        >
          <div className="pt-4 pb-5 space-y-3">
            {navItems.map((item, idx) => {
              const active = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href} onClick={() => setIsOpen(false)}>
                  <motion.div
                    className={[
                      'block w-full text-left px-1 text-base font-medium',
                      active ? 'text-cyan-300' : 'text-gray-100/85 hover:text-white'
                    ].join(' ')}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -16 }}
                    transition={{ duration: 0.22, delay: 0.04 * idx }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
