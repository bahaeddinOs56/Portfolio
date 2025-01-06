'use client'

import { useState, useEffect } from 'react'

interface TypingTextProps {
  text: string
  delay?: number
  className?: string
}

export const TypingText: React.FC<TypingTextProps> = ({ text, delay = 100, className = '' }) => {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.substring(0, index + 1))
        index++
      } else {
        clearInterval(timer)
      }
    }, delay)

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => {
      clearInterval(timer)
      clearInterval(cursorTimer)
    }
  }, [text, delay])

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
    </span>
  )
}

