'use client'

import { useEffect, useRef } from 'react'

interface ParticlesProps {
  isSnowTheme: boolean;
}

export const Particles: React.FC<ParticlesProps> = ({ isSnowTheme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.5
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.x = Math.random() * canvas.width
        }
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = isSnowTheme 
          ? `rgba(255, 255, 255, ${particle.opacity})`
          : `rgba(255, 215, 0, ${particle.opacity})`
        ctx.fill()
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSnowTheme])

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
    />
  )
}

