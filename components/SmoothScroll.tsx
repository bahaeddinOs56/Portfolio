'use client'

import React, { useEffect, useRef, useState } from 'react'

interface SmoothScrollProps {
  children: React.ReactNode
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState(0)
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sectionsRef.current.findIndex((section) => section === entry.target)
          if (index !== -1) {
            setActiveSection(index)
          }
        }
      })
    }

    const observer = new IntersectionObserver(handleScroll, {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    })

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (activeSection < sectionsRef.current.length - 1) {
        e.preventDefault()
        const direction = e.deltaY > 0 ? 1 : -1
        const nextSection = Math.min(Math.max(activeSection + direction, 0), sectionsRef.current.length - 1)
        sectionsRef.current[nextSection]?.scrollIntoView({ behavior: 'smooth' })
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [activeSection])

  return (
    <div>
      {React.Children.map(children, (child, index) => (
        <div 
          key={index}
          ref={(el) => {
            if (el) {
              sectionsRef.current[index] = el
            }
          }}
          className="min-h-screen"
        >
          {child}
        </div>
      ))}
    </div>
  )
}

