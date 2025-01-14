import React from 'react'

interface ThemeToggleProps {
  isSnowTheme: boolean;
  toggleTheme: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ isSnowTheme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full overflow-hidden shadow-lg transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label={isSnowTheme ? "Switch to bee theme" : "Switch to snow theme"}
    >
      {isSnowTheme ? (
        <div className="w-full h-full bg-blue-200 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4zm-2 0c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2z"/>
          </svg>
        </div>
      ) : (
        <div className="w-full h-full bg-yellow-400 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
            <path d="M19.5 6l-2.618-2.618a1.5 1.5 0 00-2.121 0L12 6.121 9.239 3.36a1.5 1.5 0 00-2.121 0L4.5 6 3 7.5l2.25 2.25L3 12l1.5 1.5 2.25 2.25L3 18l1.5 1.5 2.618-2.618a1.5 1.5 0 002.121 0L12 14.121l2.761 2.761a1.5 1.5 0 002.121 0L19.5 14l1.5-1.5-2.25-2.25L21 9l-1.5-1.5-2.25-2.25L19.5 6zM9 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6-4.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
          </svg>
        </div>
      )}
    </button>
  )
}

