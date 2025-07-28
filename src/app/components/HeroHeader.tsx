// src/app/components/HeroHeader.tsx
import { FaChevronDown } from 'react-icons/fa';

export const HeroHeader = () => {
  return (
    <div className="hero-header">
      <a
        href="#main-content"
        className="absolute bottom-10 right-1/32 -translate-x-1/2 z-10"
        aria-label="Scroll down to main content" 
      >
        <FaChevronDown className="text-6xl" />
      </a>
    </div>
  );
};