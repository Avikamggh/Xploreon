import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Home, ArrowLeft } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <motion.div
            className="text-9xl font-futuristic text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text mb-4"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            404
          </motion.div>
          <h1 className="text-2xl font-futuristic text-white mb-4">
            Lost in Space
          </h1>
          <p className="text-gray-400 mb-8">
            The page you're looking for has drifted into the cosmic void.
          </p>
        </div>

        <div className="space-y-4">
          <Link to="/">
            <motion.button
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full text-white font-medium neon-glow hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-5 h-5" />
              <span>Return to Base</span>
            </motion.button>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full px-6 py-3 glass-card rounded-full text-cyan-400 font-medium hover:bg-cyan-400/10 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}