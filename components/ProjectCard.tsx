import React from 'react';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image }) => {
  return (
    <div className="rounded-2xl overflow-hidden group relative">
      <Image src={image} alt={title} width={400} height={250} className="w-full h-64 object-cover"/>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
        <div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-yellow-100">{description}</p>
        </div>
      </div>
    </div>
  );
};

