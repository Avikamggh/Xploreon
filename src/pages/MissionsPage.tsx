import React from 'react';
import { motion } from 'motion/react';
import { MissionTracker } from '../components/MissionTracker';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function MissionsPage() {
  useDocumentTitle('Missions');
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen"
    >
      <MissionTracker />
    </motion.div>
  );
}