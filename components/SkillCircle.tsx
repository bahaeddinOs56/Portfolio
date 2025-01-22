"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface SkillCircleProps {
  skill: string
  percentage: number
  theme: "bee" | "snow" | "space"
}

export const SkillCircle: React.FC<SkillCircleProps> = ({ skill, percentage, theme }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const skillRef = useRef<HTMLDivElement>(null)
  const controls = useAnimation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          controls.start("visible")
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 },
    )

    if (skillRef.current) {
      observer.observe(skillRef.current)
    }

    return () => {
      if (skillRef.current) {
        observer.unobserve(skillRef.current)
      }
    }
  }, [controls])

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = ((100 - percentage) / 100) * circumference

  if (theme === "snow") {
    return (
      <motion.div
        ref={skillRef}
        className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 bg-blue-100 bg-opacity-30 backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="snowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E0F7FA" />
                <stop offset="100%" stopColor="#B2EBF2" />
              </linearGradient>
              <radialGradient id="iceGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E0F7FA" stopOpacity="0.3" />
              </radialGradient>
              <filter id="snowFilter">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" />
              </filter>
              <filter id="iceFilter">
                <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* Ice effect */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="url(#iceGradient)"
              filter="url(#iceFilter)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />

            {/* Frost circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />

            {/* Shimmering effect */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#iceGradient)"
              strokeWidth="4"
              strokeDasharray="5 10"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />

            {/* Snowflakes */}
            {[...Array(6)].map((_, index) => (
              <motion.path
                key={index}
                d="M0 0 L0 -40 M0 0 L20 -34.64 M0 0 L-20 -34.64"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                transform={`translate(50, 50) rotate(${index * 60})`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
              />
            ))}
          </svg>

          {/* Percentage and skill name */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <span className="text-4xl font-bold text-blue-900">{percentage}%</span>
          </motion.div>
        </div>
        <motion.h3
          className="mt-4 text-xl font-semibold text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {skill}
        </motion.h3>
      </motion.div>
    )
  }

  if (theme === "bee") {
    return (
      <motion.div
        ref={skillRef}
        className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 bg-yellow-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative w-40 h-40">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="honeyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF176" />
                <stop offset="100%" stopColor="#FFD54F" />
              </linearGradient>
            </defs>

            {/* Honeycomb background */}
            <path
              d="M25,3.5 L75,3.5 L97,50 L75,96.5 L25,96.5 L3,50 Z"
              fill="url(#honeyGradient)"
              stroke="#FFB300"
              strokeWidth="2"
            />

            {/* Honey level */}
            <motion.path
              d={`M25,${96.5 - percentage * 0.93} L75,${96.5 - percentage * 0.93} L75,96.5 L25,96.5 Z`}
              fill="#FFD54F"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />

            {/* Bee */}
            <motion.g
              initial={{ x: -50, y: 50 }}
              animate={{ x: 50, y: 50 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", ease: "easeInOut" }}
            >
              <ellipse cx="0" cy="0" rx="8" ry="5" fill="#FDD835" />
              <ellipse cx="0" cy="0" rx="6" ry="4" fill="#212121" />
              <circle cx="-3" cy="-1" r="1" fill="#FFFFFF" />
              <circle cx="3" cy="-1" r="1" fill="#FFFFFF" />
            </motion.g>
          </svg>

          {/* Percentage and skill name */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <span className="text-4xl font-bold text-yellow-900">{percentage}%</span>
          </motion.div>
        </div>
        <motion.h3
          className="mt-4 text-xl font-semibold text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {skill}
        </motion.h3>
      </motion.div>
    )
  }

  // Space theme
  return (
    <motion.div
      ref={skillRef}
      className="flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 bg-gray-800 bg-opacity-30 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-40 h-40">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <radialGradient id="spaceGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="#8C9EFF" />
              <stop offset="100%" stopColor="#3D5AFE" />
            </radialGradient>
          </defs>

          {/* Space background */}
          <circle cx="50" cy="50" r="45" fill="url(#spaceGradient)" />

          {/* Stars */}
          {[...Array(20)].map((_, index) => (
            <motion.circle
              key={index}
              cx={Math.random() * 100}
              cy={Math.random() * 100}
              r={Math.random() * 1.5 + 0.5}
              fill="#FFFFFF"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: Math.random() * 2,
              }}
            />
          ))}

          {/* Skill progress */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeDasharray={`${percentage * 2.51} ${251 - percentage * 2.51}`}
            strokeDashoffset="62.75"
            initial={{ rotate: -90 }}
            animate={{ rotate: 270 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Percentage and skill name */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <span className="text-4xl font-bold text-white">{percentage}%</span>
        </motion.div>
      </div>
      <motion.h3
        className="mt-4 text-xl font-semibold text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        {skill}
      </motion.h3>
    </motion.div>
  )
}

