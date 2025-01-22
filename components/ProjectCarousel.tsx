"use client"

import type React from "react"
import { useState } from "react"
import { ProjectCard } from "./ProjectCard"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Project {
  title: string
  description: string
  image: string
}

interface ProjectCarouselProps {
  projects: Project[]
  theme: "bee" | "snow" | "space"
  itemsPerPage?: number
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projects, theme, itemsPerPage = 3 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex - itemsPerPage + projects.length) % projects.length)
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex justify-between items-center">
        <button
          onClick={prevProject}
          className={`p-2 rounded-full ${
            theme === "snow"
              ? "bg-blue-500/50 text-white hover:bg-blue-600/70"
              : theme === "space"
                ? "bg-gray-700/50 text-white hover:bg-gray-600/70"
                : "bg-yellow-900/50 text-white hover:bg-yellow-900/70"
          } transition-colors`}
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>
        <div className={`grid grid-cols-1 md:grid-cols-${itemsPerPage} gap-4 md:gap-6 lg:gap-8 mx-4`}>
          {projects.slice(currentIndex, currentIndex + itemsPerPage).map((project, index) => (
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
            theme === "snow"
              ? "bg-blue-500/50 text-white hover:bg-blue-600/70"
              : theme === "space"
                ? "bg-gray-700/50 text-white hover:bg-gray-600/70"
                : "bg-yellow-900/50 text-white hover:bg-yellow-900/70"
          } transition-colors`}
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

