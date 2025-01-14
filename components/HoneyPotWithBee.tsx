import React from 'react';

interface HoneyPotWithBeeProps {
  isSnowTheme: boolean;
}

export const HoneyPotWithBee: React.FC<HoneyPotWithBeeProps> = ({ isSnowTheme }) => {
  return (
    <div className="relative w-full h-64">
      {isSnowTheme ? (
        // Snow Globe with Floating Snowflake
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
        </svg>
      ) : (
        // Honey Pot with Bee (unchanged)
        <>
          <svg viewBox="0 0 100 100" className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48">
            <path
              d="M20,50 Q20,20 50,20 Q80,20 80,50 L80,80 Q50,100 20,80 Z"
              fill="#FFD700"
              stroke="#B8860B"
              strokeWidth="2"
            />
            <ellipse cx="50" cy="20" rx="30" ry="10" fill="#FFD700" stroke="#B8860B" strokeWidth="2" />
            <path
              d="M30,25 Q50,35 70,25"
              fill="none"
              stroke="#B8860B"
              strokeWidth="2"
            />
          </svg>

          <svg viewBox="0 0 100 100" className="absolute w-16 h-16 left-1/2 transform -translate-x-1/2 animate-fly-updown">
            <ellipse cx="50" cy="60" rx="30" ry="20" fill="#FFD700" />
            <ellipse cx="50" cy="40" rx="20" ry="15" fill="black" />
            <circle cx="40" cy="35" r="5" fill="white" />
            <circle cx="60" cy="35" r="5" fill="white" />
            <circle cx="42" cy="35" r="2" fill="black" />
            <circle cx="62" cy="35" r="2" fill="black" />
            <path d="M30,50 Q50,60 70,50" fill="none" stroke="black" strokeWidth="2" />
            <path d="M50,40 L40,25" stroke="black" strokeWidth="2" />
            <path d="M50,40 L60,25" stroke="black" strokeWidth="2" />
            <ellipse cx="40" cy="22" rx="5" ry="10" fill="#FFD700" transform="rotate(-30 40 22)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="-30 40 22"
                to="30 40 22"
                dur="0.2s"
                repeatCount="indefinite"
                additive="sum"
              />
            </ellipse>
            <ellipse cx="60" cy="22" rx="5" ry="10" fill="#FFD700" transform="rotate(30 60 22)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="30 60 22"
                to="-30 60 22"
                dur="0.2s"
                repeatCount="indefinite"
                additive="sum"
              />
            </ellipse>
          </svg>
        </>
      )}
    </div>
  );
};

