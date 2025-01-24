import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Briefcase, Calendar, ChevronRight } from "lucide-react"

interface ExperienceCardProps {
  title: string
  company: string
  duration: string
  responsibilities: string[]
  theme: "bee" | "snow" | "space"
}

export const ExperienceCard3D: React.FC<ExperienceCardProps> = ({
  title,
  company,
  duration,
  responsibilities,
  theme,
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const cardStyle = {
    bee: "bg-gradient-to-br from-yellow-100 to-yellow-300 text-yellow-900",
    snow: "bg-gradient-to-br from-blue-100 to-blue-300 text-blue-900",
    space: "bg-gradient-to-br from-gray-900 to-indigo-900 text-white",
  }

  const iconColor = theme === "space" ? "text-blue-400" : "text-gray-600"

  return (
    <div className="perspective-1000 w-full h-[400px] cursor-pointer group" onClick={handleFlip}>
      <motion.div
        className="w-full h-full relative transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of the card */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl p-6 ${cardStyle[theme]} 
                         shadow-lg backdrop-blur-sm bg-opacity-30 border border-opacity-30 
                         ${theme === "space" ? "border-blue-500" : "border-gray-300"}
                         transition-all duration-300 group-hover:shadow-2xl`}
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">{title}</h3>
              <p className="text-lg mb-2 flex items-center">
                <Briefcase className={`mr-2 ${iconColor}`} size={18} />
                {company}
              </p>
              <p className="text-sm mb-4 flex items-center">
                <Calendar className={`mr-2 ${iconColor}`} size={18} />
                {duration}
              </p>
            </div>
            <p className="text-sm flex items-center justify-end">
              Click to see more details
              <ChevronRight className={`ml-1 ${iconColor}`} size={18} />
            </p>
          </div>
        </div>

        {/* Back of the card */}
        <div
          className={`absolute w-full h-full backface-hidden rounded-xl p-6 ${cardStyle[theme]} 
                         shadow-lg backdrop-blur-sm bg-opacity-30 border border-opacity-30 
                         ${theme === "space" ? "border-blue-500" : "border-gray-300"}
                         transition-all duration-300 group-hover:shadow-2xl rotate-y-180`}
        >
          <div className="flex flex-col h-full justify-between">
            <div>
              <h4 className="text-xl font-semibold mb-4">Responsibilities:</h4>
              <ul className="list-disc list-inside space-y-2">
                {responsibilities.map((responsibility, index) => (
                  <li key={index} className="text-sm">
                    {responsibility}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm flex items-center justify-end">
              Click to flip back
              <ChevronRight className={`ml-1 ${iconColor}`} size={18} />
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

