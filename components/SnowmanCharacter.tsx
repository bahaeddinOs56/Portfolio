'use client'

import { useEffect, useRef } from 'react'

export const SnowmanCharacter = () => {
  const eyesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const eyes = document.querySelectorAll('.snowman-eye')
      
      eyes.forEach((eye) => {
        const eyeRect = eye.getBoundingClientRect()
        const eyeCenterX = eyeRect.left + eyeRect.width / 2
        const eyeCenterY = eyeRect.top + eyeRect.height / 2
        
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX)
        const distance = Math.min(eyeRect.width / 4, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 5)
        
        const x = Math.cos(angle) * distance
        const y = Math.sin(angle) * distance
        
        const pupil = eye.querySelector('.snowman-pupil') as HTMLElement
        if (pupil) {
          pupil.style.transform = `translate(${x}px, ${y}px)`
        }
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative w-48 h-64 animate-float" aria-label="Animated snowman character">
      {/* Bottom snowball */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-40 bg-white rounded-full"></div>
      
      {/* Middle snowball */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-white rounded-full"></div>
      
      {/* Head */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full">
        {/* Eyes */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-gray-800 rounded-full snowman-eye">
          <div className="snowman-pupil absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-gray-800 rounded-full snowman-eye">
          <div className="snowman-pupil absolute top-1/2 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        
        {/* Carrot nose */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 w-8 h-8">
          <div className="w-2 h-8 bg-orange-500 rounded-full transform rotate-45 origin-bottom"></div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
      <div className="absolute top-36 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
      <div className="absolute top-44 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rounded-full"></div>
    </div>
  )
}

