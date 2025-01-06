'use client'

import React, { useState, useEffect } from 'react';

interface SkillCircleProps {
  skill: string;
  percentage: number;
}

export const SkillCircle: React.FC<SkillCircleProps> = ({ skill, percentage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const circumference = 2 * Math.PI * 70; // Radius is 70
  const strokeDasharray = circumference;
  const strokeDashoffset = ((100 - (isHovered ? percentage : 0)) / 100 * circumference).toFixed(2);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="flex flex-col items-center justify-center p-8 bg-yellow-100 rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-48 h-48">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-yellow-300"
          />
          <circle
            cx="96"
            cy="96"
            r="70"
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-yellow-600"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={isVisible ? strokeDashoffset : circumference}
            style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-4xl font-bold text-yellow-900">{percentage}%</span>
        </div>
      </div>
      <h3 className="mt-4 text-2xl font-bold text-yellow-900">{skill}</h3>
    </div>
  );
};

