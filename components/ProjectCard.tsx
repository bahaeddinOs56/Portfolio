import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  isSnowTheme: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, isSnowTheme }) => {
  return (
    <div className="rounded-2xl overflow-hidden group relative">
      <Image src={image} alt={title} width={400} height={250} className="w-full h-64 object-cover"/>
      <div className={`absolute inset-0 ${
        isSnowTheme
          ? 'bg-gradient-to-t from-blue-900/90 to-transparent'
          : 'bg-gradient-to-t from-yellow-900/90 to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6`}>
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className={`${isSnowTheme ? 'text-blue-100' : 'text-yellow-100'}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

