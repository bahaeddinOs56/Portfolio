import React from 'react';

export const SpaceScene: React.FC = () => {
  return (
    <div className="relative w-full h-64">
      <svg viewBox="0 0 100 100" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48">
        {/* Space background */}
        <rect width="100" height="100" fill="#000033" />

        {/* Stars */}
        <circle cx="10" cy="10" r="1" fill="white" />
        <circle cx="20" cy="30" r="0.5" fill="white" />
        <circle cx="30" cy="15" r="0.7" fill="white" />
        <circle cx="40" cy="40" r="0.6" fill="white" />
        <circle cx="60" cy="20" r="0.8" fill="white" />
        <circle cx="70" cy="35" r="0.5" fill="white" />
        <circle cx="80" cy="25" r="0.7" fill="white" />
        <circle cx="90" cy="10" r="0.6" fill="white" />

        {/* Planet */}
        <circle cx="50" cy="50" r="20" fill="#1a237e" />
        <ellipse cx="50" cy="50" rx="20" ry="5" fill="#3949ab" />

        {/* Rings */}
        <ellipse cx="50" cy="50" rx="30" ry="5" fill="none" stroke="#9fa8da" strokeWidth="0.5" />
        <ellipse cx="50" cy="50" rx="28" ry="4" fill="none" stroke="#7986cb" strokeWidth="0.5" />

        {/* UFO */}
        <ellipse cx="70" cy="30" rx="10" ry="3" fill="#bdbdbd" className="animate-float" />
        <ellipse cx="70" cy="29" rx="5" ry="4" fill="#4fc3f7" className="animate-float" />
      </svg>
    </div>
  );
};

