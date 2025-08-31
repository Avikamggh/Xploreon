import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function HomePage() {
  useDocumentTitle('Home');
  
  return (
    <div>
      <HeroSection />
    </div>
  );
}