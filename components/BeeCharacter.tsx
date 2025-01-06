'use client'

import { useEffect, useRef } from 'react'

export const BeeCharacter = () => {
  const eyesRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eyes = document.querySelectorAll('.eye')
      
      eyes.forEach((eye) => {
        const eyeRect = eye.getBoundingClientRect()
        const eyeCenterX = eyeRect.left + eyeRect.width / 2
        const eyeCenterY = eyeRect.top + eyeRect.height / 2
        
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)
        const distance = Math.min(eyeRect.width / 4, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 5)
        
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        
        const pupil = eye.querySelector('.pupil') as HTMLElement
        if (pupil) {
          pupil.style.transform = `translate(${x}px, ${y}px)`
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative w-48 h-32 animate-float" aria-label="Animated bee character">
      {/* Main body */}
      <div className="absolute w-full h-full bg-[#FFB700] rounded-[50px] overflow-hidden">
        {/* Stripes */}
        <div className="absolute inset-0 flex flex-col">
          <div className="h-1/5 bg-black" />
          <div className="h-1/5 bg-[#FFB700]" />
          <div className="h-1/5 bg-black" />
          <div className="h-1/5 bg-[#FFB700]" />
          <div className="h-1/5 bg-black" />
        </div>
      </div>
      
      {/* Wings */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
        <div className="relative">
          <div className="absolute w-24 h-20 bg-[#FFD700]/60 rounded-full -left-28 animate-wing" />
          <div className="absolute w-24 h-20 bg-[#FFD700]/60 rounded-full left-4 animate-wing" />
        </div>
      </div>
      
      {/* Eyes Container */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-10 flex justify-between">
        {/* Left Eye */}
        <div className="eye w-10 h-10 bg-white rounded-full border-2 border-black relative overflow-hidden">
          <div className="pupil absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out" />
        </div>
        {/* Right Eye */}
        <div className="eye w-10 h-10 bg-white rounded-full border-2 border-black relative overflow-hidden">
          <div className="pupil absolute top-1/2 left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out" />
        </div>
      </div>
      
      {/* Smile */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-4 border-b-4 border-black rounded-full" />
      
      {/* Antennae */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16">
        <div className="absolute left-0 w-1 h-6 bg-black transform -rotate-15" />
        <div className="absolute right-0 w-1 h-6 bg-black transform rotate-15" />
      </div>
    </div>
  )
}

