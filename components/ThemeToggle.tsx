import type React from "react"
import { Snowflake, Bug, Sparkles } from "lucide-react"

interface ThemeToggleProps {
  theme: "bee" | "snow" | "space"
  toggleTheme: () => void
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`
        p-3 rounded-full shadow-lg transition-all duration-300 
        hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 
        animate-pulse
        ${
          theme === "bee"
            ? "bg-yellow-400 text-yellow-900 focus:ring-yellow-500 hover:bg-yellow-300"
            : theme === "snow"
              ? "bg-blue-200 text-blue-600 focus:ring-blue-500 hover:bg-blue-100"
              : "bg-gray-800 text-yellow-300 focus:ring-yellow-500 hover:bg-gray-700"
        }
      `}
      aria-label="Toggle theme"
    >
      <div className="flex items-center space-x-2">
        {theme === "bee" && <Bug size={24} />}
        {theme === "snow" && <Snowflake size={24} />}
        {theme === "space" && <Sparkles size={24} />}
        <span className="text-base font-medium">Theme</span>
      </div>
    </button>
  )
}

