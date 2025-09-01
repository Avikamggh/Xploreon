import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import bg from '../images/xploreon.webp';
import { Link } from "react-router-dom";


export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden -mt-[72px]">
  {/* Background */}
  <div className="absolute inset-0">
    <img
      src={bg}
      alt="Rocket launch"
      className="w-full h-full object-cover object-top"
    />
  </div>

      {/* Star specks */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Title */}
        <motion.h1
  className="
    font-extrabold leading-tight tracking-tight
    text-4xl sm:text-6xl md:text-7xl lg:text-8xl
    bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-500
    bg-clip-text text-transparent
    drop-shadow-[0_0_25px_rgba(56,189,248,0.45)]
  "
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  whileHover={{
    scale: 1.05,
    textShadow: "0px 0px 20px rgba(56,189,248,0.9)",
  }}
>
  Welcome To Xploreon
</motion.h1>


        {/* Subtitle */}
        <motion.p
          className="mt-3 sm:mt-4 text-base sm:text-xl md:text-2xl text-gray-200 max-w-xl sm:max-w-2xl px-1 sm:px-0 font-light"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
        >
          Igniting humanity’s interplanetary evolution through deep-tech innovation.
        </motion.p>

        {/* CTA (pulled up) */}
        <motion.div
          className="mt-5 sm:mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <Link to="/technology">
          <Button
            size="lg"
            className="
              px-6 sm:px-8 py-3 sm:py-4 font-medium border-0
              bg-gradient-to-r from-cyan-500 to-blue-600
              hover:from-cyan-400 hover:to-blue-500
              text-white shadow-lg shadow-cyan-500/25
              hover:shadow-cyan-500/40 transition-all duration-300
              hover:scale-105 group
            "
          >
            Our Vision &amp; Technology
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Button>
            </Link>
        </motion.div>

       
      </div>
    </section>
  );
}
