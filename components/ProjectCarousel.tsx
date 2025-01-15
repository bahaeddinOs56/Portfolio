'use client'

import React, { useState } from 'react'
import { ProjectCard } from './ProjectCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface Project {
  title: string
  description: string
  image: string
}

interface ProjectCarouselProps {
  projects: Project[]
  theme: 'bee' | 'snow' | 'space'
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, theme }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <button
          onClick={prevProject}
          className={`p-2 rounded-full ${
            theme === 'snow'
              ? 'bg-blue-500/50 text-white hover:bg-blue-600/70'
              : theme === 'space'
              ? 'bg-gray-700/50 text-white hover:bg-gray-600/70'
              : 'bg-yellow-900/50 text-white hover:bg-yellow-900/70'
          } transition-colors`}
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="grid grid-cols-3 gap-8 mx-4">
          {projects.slice(currentIndex, currentIndex + 3).map((project, index) => (
            <ProjectCard
              key={`${project.title}-${currentIndex + index}`}
              title={project.title}
              description={project.description}
              image={project.image}
              theme={theme}
            />
          ))}
        </div>
        <button
          onClick={nextProject}
          className={`p-2 rounded-full ${
            theme === 'snow'
              ? 'bg-blue-500/50 text-white hover:bg-blue-600/70'
              : theme === 'space'
              ? 'bg-gray-700/50 text-white hover:bg-gray-600/70'
              : 'bg-yellow-900/50 text-white hover:bg-yellow-900/70'
          } transition-colors`}
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

