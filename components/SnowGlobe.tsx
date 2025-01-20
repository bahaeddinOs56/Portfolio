import React from 'react';

export const SnowGlobe: React.FC = () => {
  return (
    <div className="relative w-full h-64">
      <svg viewBox="0 0 100 100" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48">
        {/* Snow Globe */}
        <circle cx="50" cy="60" r="38" fill="none" stroke="#B8C4CF" strokeWidth="2" />
        <path d="M12,60 Q12,90 50,90 Q88,90 88,60" fill="#B8C4CF" />
        <rect x="45" y="90" width="10" height="10" fill="#7A8B99" />
        <rect x="40" y="100" width="20" height="5" fill="#7A8B99" />

        {/* Snowflake */}
        <g className="animate-float">
          <path d="M50 30 L50 70 M40 35 L60 65 M60 35 L40 65 M35 50 L65 50" stroke="white" strokeWidth="2" />
          <circle cx="50" cy="50" r="2" fill="white" />
        </g>

        {/* Additional snowflakes */}
        <circle cx="30" cy="40" r="1" fill="white" className="animate-snowfall" />
        <circle cx="70" cy="50" r="1" fill="white" className="animate-snowfall" style={{animationDelay: '1s'}} />
        <circle cx="40" cy="60" r="1" fill="white" className="animate-snowfall" style={{animationDelay: '2s'}} />
        <circle cx="60" cy="30" r="1" fill="white" className="animate-snowfall" style={{animationDelay: '3s'}} />
      </svg>
    </div>
  );
};

