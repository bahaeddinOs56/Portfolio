import React from 'react'

interface ThemeToggleProps {
  theme: 'bee' | 'snow' | 'space';
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  const nextTheme = theme === 'bee' ? 'snow' : theme === 'snow' ? 'space' : 'bee';

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label={`Switch to ${nextTheme} theme`}
    >
      {nextTheme === 'snow' && (
        <div className="w-full h-full bg-blue-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm-2 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
          </svg>
        </div>
      )}
      {nextTheme === 'space' && (
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-300">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </div>
      )}
      {nextTheme === 'bee' && (
        <div className="w-full h-full bg-yellow-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
            <path d="M19.5 6l-2.618-2.618a1.5 1.5 0 00-2.121 0L12 6.121 9.239 3.36a1.5 1.5 0 00-2.121 0L4.5 6 3 7.5l2.25 2.25L3 12l1.5 1.5 2.25 2.25L3 18l1.5 1.5 2.618-2.618a1.5 1.5 0 002.121 0L12 14.121l2.761 2.761a1.5 1.5 0 002.121 0L19.5 14l1.5-1.5-2.25-2.25L21 9l-1.5-1.5-2.25-2.25L19.5 6zM9 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6-4.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </div>
      )}
    </button>
  )
}

