'use client'
import { useEffect, useRef } from 'react'

export const AlienCharacter = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eyes = document.querySelectorAll('.alien-eye')
      
      eyes.forEach((eye) => {
        const eyeRect = eye.getBoundingClientRect()
        const eyeCenterX = eyeRect.left + eyeRect.width / 2
        const eyeCenterY = eyeRect.top + eyeRect.height / 2
        
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)
        const distance = Math.min(5, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10)
        
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        
        const pupil = eye.querySelector('.alien-pupil') as HTMLElement
        if (pupil) {
          pupil.style.transform = `translate(${x}px, ${y}px)`
        }
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="w-48 h-48" aria-label="Animated alien character">
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Head - perfect circle with green fill */}
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          fill="#4CAF50"
        />
        
        {/* Left Eye */}
        <g className="alien-eye">
          <ellipse 
            cx="30" 
            cy="40" 
            rx="15" 
            ry="20" 
            fill="black" 
          />
          <circle 
            className="alien-pupil"
            cx="35" 
            cy="40" 
            r="5" 
            fill="white" 
          />
          <circle 
            cx="25" 
            cy="35" 
            r="3" 
            fill="white" 
            opacity="0.5"
          />
        </g>

        {/* Right Eye */}
        <g className="alien-eye">
          <ellipse 
            cx="70" 
            cy="40" 
            rx="15" 
            ry="20" 
            fill="black" 
          />
          <circle 
            className="alien-pupil"
            cx="75" 
            cy="40" 
            r="5" 
            fill="white" 
          />
          <circle 
            cx="65" 
            cy="35" 
            r="3" 
            fill="white" 
            opacity="0.5"
          />
        </g>

        {/* Nose - small line */}
        <path
          d="M48,55 L50,57 L52,55"
          stroke="black"
          fill="none"
          strokeWidth="1"
        />

        {/* Mouth - simple line */}
        <line 
          x1="40" 
          y1="65" 
          x2="60" 
          y2="65" 
          stroke="black" 
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

