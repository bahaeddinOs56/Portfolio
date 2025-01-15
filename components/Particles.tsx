'use client'

import { useEffect, useRef } from 'react'

interface ParticlesProps {
  theme: 'bee' | 'snow' | 'space';
}

export const Particles: React.FC<ParticlesProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Regular star particles
    const particles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      opacity: number
    }> = []

    // Colored light particles (only for space theme)
    const lightParticles: Array<{
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      active: boolean
      targetX: number
      targetY: number
    }> = []

    // Initialize regular stars
    const particleCount = theme === 'space' ? 200 : 50
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: theme === 'space' ? Math.random() * 2 + 0.1 : Math.random() * 3 + 1,
        speedX: theme === 'space' ? 0 : Math.random() * 0.5 - 0.25,
        speedY: theme === 'space' ? 0 : Math.random() * 0.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.5
      })
    }

    // Initialize colored lights only for space theme
    if (theme === 'space') {
      const createLightParticle = (color: string) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 4,
        speedX: 0,
        speedY: 0,
        color,
        active: false,
        targetX: 0,
        targetY: 0
      })

      lightParticles.push(
        createLightParticle('rgba(0, 255, 255, 0.8)'), // Blue light
        createLightParticle('rgba(255, 0, 255, 0.8)')  // Pink light
      )
    }

    let lastLightMove = 0
    const LIGHT_MOVE_INTERVAL = 5000 // 5 seconds

    const animate = (timestamp: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Animate regular stars
      particles.forEach(particle => {
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        if (particle.y > canvas.height) {
          particle.y = 0
          particle.x = Math.random() * canvas.width
        }
        
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        
        if (theme === 'bee') {
          ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`
        } else if (theme === 'snow') {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        } else if (theme === 'space') {
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`
        }
        
        ctx.fill()
      })
      
      // Animate colored lights only for space theme
      if (theme === 'space') {
        if (timestamp - lastLightMove > LIGHT_MOVE_INTERVAL) {
          lightParticles.forEach(light => {
            light.active = true
            light.targetX = Math.random() * canvas.width
            light.targetY = Math.random() * canvas.height
            const angle = Math.atan2(light.targetY - light.y, light.targetX - light.x)
            const speed = 15
            light.speedX = Math.cos(angle) * speed
            light.speedY = Math.sin(angle) * speed
          })
          lastLightMove = timestamp
        }

        lightParticles.forEach(light => {
          if (light.active) {
            light.x += light.speedX
            light.y += light.speedY

            // Create trail effect
            const gradient = ctx.createRadialGradient(
              light.x, light.y, 0,
              light.x, light.y, light.size * 4
            )
            gradient.addColorStop(0, light.color)
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

            ctx.beginPath()
            ctx.arc(light.x, light.y, light.size * 4, 0, Math.PI * 2)
            ctx.fillStyle = gradient
            ctx.fill()

            // Check if light reached its target
            const dx = light.targetX - light.x
            const dy = light.targetY - light.y
            if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
              light.active = false
              light.speedX = 0
              light.speedY = 0
            }
          }
        })
      }
      
      requestAnimationFrame(animate)
    }

    animate(0)

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [theme])

  return (
    <canvas 
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
    />
  )
}

