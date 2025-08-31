import React from 'react';
import { motion } from 'motion/react';
import { TeamSection } from '../components/TeamSection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function TeamPage() {
  useDocumentTitle('Team');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen"
    >
      <TeamSection />
    </motion.div>
  );
}