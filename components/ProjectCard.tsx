import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  theme: 'bee' | 'snow' | 'space';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, theme }) => {
  return (
    <div className="rounded-2xl overflow-hidden group relative">
      <Image src={image || "/placeholder.svg"} alt={title} width={400} height={250} className="w-full h-64 object-cover"/>
      <div className={`absolute inset-0 ${
        theme === 'snow'
          ? 'bg-gradient-to-t from-blue-900/90 to-transparent'
          : theme === 'space'
          ? 'bg-gradient-to-t from-gray-900/90 to-transparent'
          : 'bg-gradient-to-t from-yellow-900/90 to-transparent'
      } opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6`}>
        <div>
          <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
          <p className={`${
            theme === 'snow'
              ? 'text-blue-100'
              : theme === 'space'
              ? 'text-gray-300'
              : 'text-yellow-100'
          }`}>{description}</p>
        </div>
      </div>
    </div>
  );
};

