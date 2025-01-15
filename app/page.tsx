'use client'

import { useState, useEffect } from 'react'
import { BeeCharacter } from '../components/BeeCharacter'
import { TypingText } from '../components/TypingText'
import { Particles } from '../components/Particles'
import { SmoothScroll } from '../components/SmoothScroll'
import { SkillCircle } from '../components/SkillCircle'
import { ProjectCarousel } from '../components/ProjectCarousel'
import { HoneyPotWithBee } from '../components/HoneyPotWithBee'
import Image from 'next/image'
import { SnowmanCharacter } from '../components/SnowmanCharacter'
import { ThemeToggle } from '../components/ThemeToggle'
import { AlienCharacter } from '../components/AlienCharacter'
import { SnowGlobe } from '../components/SnowGlobe'
import { SpaceScene } from '../components/SpaceScene'

export default function Home() {
  const [theme, setTheme] = useState<'bee' | 'snow' | 'space'>('bee')
  const [showSidebar, setShowSidebar] = useState(true)
  const [formState, setFormState] = useState({ success: false, message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'bee' | 'snow' | 'space'
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          to: 'bmestini@gmail.com'
        }),
      })

      if (response.ok) {
        setFormState({ success: true, message: 'Your message has been sent successfully!' })
        event.currentTarget.reset()
      } else {
        setFormState({ success: false, message: 'Failed to send message. Please try again.' })
      }
    } catch (error) {
      console.error('Error:', error)
      setFormState({ success: false, message: 'An error occurred. Please try again later.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMouseEnter = () => {
    setShowSidebar(true);
  };

  const handleMouseLeave = () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
      if (window.scrollY >= homeSectionBottom) {
        setShowSidebar(false);
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
        setIsScrolled(window.scrollY >= homeSectionBottom);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById('home');
      if (homeSection) {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
        if (window.scrollY >= homeSectionBottom) {
          setShowSidebar(false);
        } else {
          setShowSidebar(true);
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'bee' ? 'snow' : prev === 'snow' ? 'space' : 'bee'
      localStorage.setItem('theme', newTheme)
      return newTheme
    })
  }

  return (
    <main className={`min-h-screen ${
      theme === 'snow'
        ? 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400'
        : theme === 'space'
        ? 'bg-black space-theme'
        : 'bg-gradient-to-br from-[#D4A017] via-[#C68E17] to-[#B8860B]'
    } text-white relative overflow-hidden`}>
      
      <Particles theme={theme} />
      
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 ${
          theme === 'snow'
            ? 'bg-blue-200/10 backdrop-blur-sm'
            : theme === 'space'
            ? 'bg-black/10 backdrop-blur-sm'
            : 'bg-[#FFD700]/10 backdrop-blur-sm'
        } ${
          showSidebar ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'transition-transform duration-300' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center justify-between">
              <div className="relative w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-full border-2 border-yellow-300 shadow-lg">
                <Image 
                  src="/profile.jpeg"
                  alt="Bahaeddine"
                  width={80}
                  height={80}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover hover:scale-110 transition-transform duration-300 rounded-full"
                  priority
                />
              </div>
              <button 
                className="md:hidden text-white focus:outline-none"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
            <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex md:items-center md:space-x-8 mt-4 md:mt-0`}>
              <a href="#home" className={`block py-2 ${theme === 'snow' ? 'hover:text-blue-300' : theme === 'space' ? 'hover:text-gray-300' : 'hover:text-yellow-300'} transition-colors`}>Home</a>
              <a href="#skills" className={`block py-2 ${theme === 'snow' ? 'hover:text-blue-300' : theme === 'space' ? 'hover:text-gray-300' : 'hover:text-yellow-300'} transition-colors`}>Skills</a>
              <a href="#projects" className={`block py-2 ${theme === 'snow' ? 'hover:text-blue-300' : theme === 'space' ? 'hover:text-gray-300' : 'hover:text-yellow-300'} transition-colors`}>Projects</a>
              <a href="#portfolio-description" className={`block py-2 ${theme === 'snow' ? 'hover:text-blue-300' : theme === 'space' ? 'hover:text-gray-300' : 'hover:text-yellow-300'} transition-colors`}>About</a>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <a href="#" className={`${theme === 'snow' ? 'hover:text-blue-300' : theme === 'space' ? 'hover:text-gray-300' : 'hover:text-yellow-300'} transition-colors`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="#" className={`${theme === 'snow' ? 'hover:text-blue-300' : theme === 'space' ? 'hover:text-gray-300' : 'hover:text-yellow-300'} transition-colors`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" className={`${theme === 'snow' ? 'hover:text-blue-300' : theme === 'space' ? 'hover:text-gray-300' : 'hover:text-yellow-300'} transition-colors`}>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                <a 
                  href="#contact" 
                  className={`px-6 py-2 rounded-full transition-all ${
                    theme === 'snow'
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : theme === 'space'
                      ? 'bg-gray-800 text-gray-100 hover:bg-gray-700'
                      : 'honey-button bg-[#1A1A1A] text-[#FFD700] hover:opacity-90'
                  }`}
                >
                  Let's Connect
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div 
        className="fixed top-0 left-0 w-full h-16 z-40 bg-transparent"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <SmoothScroll>
        {/* Hero Section */}
        <section id="home" className="min-h-screen pt-20 relative overflow-hidden">
          <div className="container mx-auto px-4 py-12 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className={`inline-block px-4 py-2 rounded-full mb-4 md:mb-6 text-sm md:text-base ${
                  theme === 'snow' ? 'bg-blue-500/20' : theme === 'space' ? 'bg-gray-700/20 text-[#E6E6FA]' : 'bg-[#B8860B]/20'
                }`}>
                  Welcome to my Portfolio
                </div>
                <h1 className={`text-4xl md:text-6xl font-bold mb-4 md:mb-6 ${
                  theme === 'space' ? 'text-[#E6E6FA]' : 'text-[#1A1A1A]'
                } space-y-2 md:space-y-4`}>
                  <div>
                    <TypingText text="Hi! I'm Bahaeddine" />
                  </div>
                  <div>
                    <TypingText 
                      text="a Software Developer!" 
                      delay={150}
                    />
                  </div>
                </h1>
                <div className={`${
                  theme === 'space' ? 'text-[#E6E6FA]' : 'text-[#1A1A1A]'
                } mb-6 md:mb-8 space-y-1 md:space-y-2`}>
                  <p className="text-lg md:text-xl font-semibold">BSc in Big Data from ENSA Ibn Tofail</p>
                  <p className="text-lg md:text-xl font-semibold">42 Network (1337) at UM6P Benguerir</p>
                </div>
                <a 
                  href="#contact" 
                  className={`group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold rounded-lg shadow-2xl text-sm md:text-base ${
                    theme === 'snow'
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : theme === 'space'
                      ? 'bg-[#E6E6FA] hover:bg-[#D8D8FF] text-gray-900'
                      : 'bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] hover:bg-gradient-to-br hover:from-[#FF8C00] hover:via-[#FFA500] hover:to-[#FFD700] text-[#1A1A1A]'
                  }`}
                >
                  <span className="relative transition duration-300 group-hover:text-white">Let's Connect</span>
                  <svg className="relative w-4 h-4 ml-2 transition duration-300 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
              <div className="relative flex items-center justify-center mt-8 md:mt-0">
                {theme === 'snow' ? <SnowmanCharacter /> : theme === 'space' ? <AlienCharacter /> : <BeeCharacter />}
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className={`py-16 md:py-20 ${
          theme === 'snow'
            ? 'bg-gradient-to-b from-blue-300 to-blue-400'
            : theme === 'space'
            ? 'bg-gradient-to-b from-gray-900 to-gray-800'
            : 'bg-gradient-to-b from-[#B8860B] to-[#D4A017]'
        }`}>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8 text-white">Skills</h2>
            <p className="text-center text-white mb-12 md:mb-16 max-w-3xl mx-auto text-base md:text-xl">
              Here are my top skills and proficiency levels. Each skill represents years of dedication and practical experience in various projects and challenges. Tap or hover over each circle to see the full percentage.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              <SkillCircle skill="C/C++" percentage={95} theme={theme} />
              <SkillCircle skill="Web Development" percentage={85} theme={theme} />
              <SkillCircle skill="Data Analysis" percentage={80} theme={theme} />
              <SkillCircle skill="Cyber Security" percentage={75} theme={theme} />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
            <p className="text-center text-[#1A1A1A] mb-8 md:mb-12 max-w-2xl mx-auto">
              Check out some of my recent projects.
            </p>
            <ProjectCarousel
              projects={[
                {
                  title: "Minishell",
                  description: "A custom shell implementation with command execution, pipes, and more.",
                  image: "/shell.jpg"
                },
                {
                  title: "Weather Web App",
                  description: "Real-time weather application with location-based forecasts.",
                  image: "/wether_app.jpg"
                },
                {
                  title: "Cub3D",
                  description: "3D maze game using raycasting technology.",
                  image: "/cub3d.jpg"
                },
                {
                  title: "Fract'ol",
                  description: "Interactive fractal exploration program.",
                  image: "/fractol.jpg"
                },
                {
                  title: "Portfolio Website",
                  description: "A responsive portfolio website showcasing my skills and projects.",
                  image: "/portfoliopic.JPG"
                },
                {
                  title: "so_long",
                  description: "A 2D game inspired by Pac-Man, developed as part of the 42 Network curriculum using C and the MLX library.",
                  image: "/pacman.jpg"
                }
              ]}
              theme={theme}
            />
          </div>
        </section>

        {/* Portfolio Project Description */}
        <section id="portfolio-description" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8">
              About This Portfolio
            </h2>
            <div className={`${
              theme === 'snow' ? 'bg-blue-200/10' : theme === 'space' ? 'bg-gray-800/10' : 'bg-white/10'
            } backdrop-blur-md rounded-lg p-6 md:p-8 text-white`}>
              <h3 className="text-2xl font-semibold mb-4">Technologies Used:</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Next.js 13 with App Router</li>
                <li>React 18</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion for animations</li>
                <li>React Hook Form for form handling</li>
                <li>Custom React hooks</li>
              </ul>
              <h3 className="text-2xl font-semibold mb-4">Key Features:</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Responsive design for all device sizes</li>
                <li>Interactive particle background</li>
                <li>Animated bee character with eye-tracking</li>
                <li>Smooth scrolling between sections</li>
                <li>Dynamic skill circles with hover animations</li>
                <li>Project carousel for showcasing work</li>
                <li>Contact form with client-side validation</li>
                <li>Honey-themed UI elements and animations</li>
                <li>Theme switching between bee and snow themes</li>
              </ul>
              <p className="text-lg">
                This portfolio website was built to showcase my skills as a software developer, 
                combining modern web technologies with creative design elements. The bee theme 
                represents my work ethic and ability to collaborate effectively in team environments,
                while the snow theme demonstrates versatility and adaptability in design.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-4">Let's Connect</h2>
            <p className="text-center text-[#1A1A1A] mb-8 md:mb-12 max-w-2xl mx-auto">
              I'm always open to new opportunities and collaborations. Get in touch!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="flex justify-center items-center">
                {theme === 'bee' && <HoneyPotWithBee />}
                {theme === 'snow' && <SnowGlobe />}
                {theme === 'space' && <SpaceScene />}
              </div>
              <div className={`${
                theme === 'snow' ? 'bg-blue-200/30' : theme === 'space' ? 'bg-gray-800/30' : 'bg-[#FFD700]/30'
              } p-6 md:p-8 rounded-2xl backdrop-blur-sm`}>
                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    <input 
                      type="text" 
                      name="firstName" 
                      placeholder="First Name" 
                      required 
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'snow' 
                          ? 'bg-blue-900/50 border border-blue-700 focus:border-blue-500' 
                          : theme === 'space'
                          ? 'bg-gray-900/50 border border-gray-700 focus:border-gray-500'
                          : 'bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500'
                      } focus:outline-none`}
                    />
                    <input 
                      type="text" 
                      name="lastName" 
                      placeholder="Last Name" 
                      required 
                      className={`w-full px-4 py-3 rounded-lg ${
                        theme === 'snow' 
                          ? 'bg-blue-900/50 border border-blue-700 focus:border-blue-500' 
                          : theme === 'space'
                          ? 'bg-gray-900/50 border border-gray-700 focus:border-gray-500'
                          : 'bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500'
                      } focus:outline-none`}
                    />
                  </div>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address" 
                    required 
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'snow' 
                        ? 'bg-blue-900/50 border border-blue-700 focus:border-blue-500' 
                        : theme === 'space'
                        ? 'bg-gray-900/50 border border-gray-700 focus:border-gray-500'
                        : 'bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500'
                    } focus:outline-none`}
                  />
                  <input 
                    type="tel" 
                    name="phone" 
                    placeholder="Phone No." 
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'snow' 
                        ? 'bg-blue-900/50 border border-blue-700 focus:border-blue-500' 
                        : theme === 'space'
                        ? 'bg-gray-900/50 border border-gray-700 focus:border-gray-500'
                        : 'bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500'
                    } focus:outline-none`}
                  />
                  <textarea 
                    name="message" 
                    placeholder="Message" 
                    rows={4} 
                    required 
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'snow' 
                        ? 'bg-blue-900/50 border border-blue-700 focus:border-blue-500' 
                        : theme === 'space'
                        ? 'bg-gray-900/50 border border-gray-700 focus:border-gray-500'
                        : 'bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500'
                    } focus:outline-none`}
                  />
                  <button 
                    type="submit" 
                    className={`w-full px-6 py-3 ${
                      theme === 'snow'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : theme === 'space'
                        ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
                        : 'honey-button bg-[#1A1A1A] text-[#FFD700] hover:opacity-90'
                    } rounded-lg font-semibold transition-colors disabled:opacity-50`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {formState.message && (
                    <p className={`text-center ${formState.success ? 'text-green-500' : 'text-red-500'}`}>
                      {formState.message}
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </SmoothScroll>
    </main>
  )
}

