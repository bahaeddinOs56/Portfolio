"use client"

import { useState, useEffect } from "react"
import { BeeCharacter } from "../components/BeeCharacter"
import { TypingText } from "../components/TypingText"
import { Particles } from "../components/Particles"
import { SmoothScroll } from "../components/SmoothScroll"
import { SkillCircle } from "../components/SkillCircle"
import { ProjectCarousel } from "../components/ProjectCarousel"
import { HoneyPotWithBee } from "../components/HoneyPotWithBee"
import Image from "next/image"
import { SnowmanCharacter } from "../components/SnowmanCharacter"
import { ThemeToggle } from "../components/ThemeToggle"
import { AlienCharacter } from "../components/AlienCharacter"
import { SnowGlobe } from "../components/SnowGlobe"
import { SpaceScene } from "../components/SpaceScene"
import { ExperienceCard3D } from "../components/ExperienceCard3D"

export default function Home() {
  const [theme, setTheme] = useState<"bee" | "snow" | "space">("space")
  const [showSidebar, setShowSidebar] = useState(true)
  const [formState, setFormState] = useState({ success: false, message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "bee" | "snow" | "space"
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      localStorage.setItem("theme", "space")
    }
    setLoading(false)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setFormState({ success: false, message: "" })

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      setFormState({
        success: true,
        message: "Your message has been sent successfully!",
      })
      event.currentTarget.reset()
    } catch (error) {
      console.error("Error:", error)
      setFormState({
        success: true,
        message: "Your message has been sent successfully!",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMouseEnter = () => {
    setShowSidebar(true)
  }

  const handleMouseLeave = () => {
    const homeSection = document.getElementById("home")
    if (homeSection) {
      const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight
      if (window.scrollY >= homeSectionBottom) {
        setShowSidebar(false)
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home")
      if (homeSection) {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight
        setIsScrolled(window.scrollY >= homeSectionBottom)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const homeSection = document.getElementById("home")
      if (homeSection) {
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight
        if (window.scrollY >= homeSectionBottom) {
          setShowSidebar(false)
        } else {
          setShowSidebar(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "space" ? "bee" : prev === "bee" ? "snow" : "space"
      localStorage.setItem("theme", newTheme)
      return newTheme
    })
  }

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <main
          className={`min-h-screen ${
            theme === "snow"
              ? "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400"
              : theme === "space"
                ? "bg-black space-theme"
                : "bg-gradient-to-br from-[#D4A017] via-[#C68E17] to-[#B8860B]"
          } text-white relative overflow-hidden`}
        >
          <Particles theme={theme} />
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
            {/* Navigation */}
            <nav
              className={`fixed w-full z-50 ${
                theme === "snow"
                  ? "bg-blue-200/10 backdrop-blur-sm"
                  : theme === "space"
                    ? "bg-black/10 backdrop-blur-sm"
                    : "bg-[#FFD700]/10 backdrop-blur-sm"
              } ${
                showSidebar ? "translate-y-0" : "-translate-y-full"
              } ${isScrolled ? "transition-transform duration-300" : ""}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-2">
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
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <div
                    className={`${mobileMenuOpen ? "block" : "hidden"} md:flex md:items-center md:space-x-8 mt-4 md:mt-0`}
                  >
                    <a
                      href="#home"
                      className={`block py-2 ${theme === "snow" ? "hover:text-blue-300" : theme === "space" ? "hover:text-gray-300" : "hover:text-yellow-300"} transition-colors`}
                    >
                      Home
                    </a>
                    <a
                      href="#skills"
                      className={`block py-2 ${theme === "snow" ? "hover:text-blue-300" : theme === "space" ? "hover:text-gray-300" : "hover:text-yellow-300"} transition-colors`}
                    >
                      Skills
                    </a>
                    <a
                      href="#projects"
                      className={`block py-2 ${theme === "snow" ? "hover:text-blue-300" : theme === "space" ? "hover:text-gray-300" : "hover:text-yellow-300"} transition-colors`}
                    >
                      Projects
                    </a>
                    <a
                      href="#professional-experiences"
                      className={`block py-2 ${theme === "snow" ? "hover:text-blue-300" : theme === "space" ? "hover:text-gray-300" : "hover:text-yellow-300"} transition-colors`}
                    >
                      Professional Experiences
                    </a>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                      <a
                        href="https://www.linkedin.com/in/bahaeddine-m-165a74347/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${theme === "snow" ? "hover:text-blue-300" : theme === "space" ? "hover:text-gray-300" : "hover:text-yellow-300"} transition-colors`}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </a>
                      <a
                        href="#contact"
                        className={`px-6 py-2 rounded-full transition-all ${
                          theme === "snow"
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : theme === "space"
                              ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
                              : "honey-button bg-[#1A1A1A] text-[#FFD700] hover:opacity-90"
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
                <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 md:py-20">
                  <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-16 xl:space-x-24 2xl:space-x-32">
                    <div className="w-full lg:w-1/2 xl:w-2/5 mb-8 lg:mb-0 mx-auto text-center lg:text-left">
                      <div
                        className={`inline-block px-4 py-2 rounded-full mb-4 text-sm ${
                          theme === "snow"
                            ? "bg-blue-500/20"
                            : theme === "space"
                              ? "bg-gray-700/20 text-[#E6E6FA]"
                              : "bg-[#B8860B]/20"
                        }`}
                      >
                        Welcome to my Portfolio
                      </div>
                      <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
                        <h1
                          className={`text-3xl md:text-5xl font-bold mb-4 ${
                            theme === "space" ? "text-[#E6E6FA]" : "text-[#1A1A1A]"
                          } space-y-2`}
                        >
                          <div>
                            <TypingText text="Hi! I'm Bahaeddine" />
                          </div>
                          <div>
                            <TypingText text="a Software Developer!" delay={150} />
                          </div>
                        </h1>
                        <div className={`${theme === "space" ? "text-[#E6E6FA]" : "text-[#1A1A1A]"} mb-6 space-y-1`}>
                          <p className="text-base md:text-lg font-semibold">BSc in Big Data from ENSA Ibn Tofail</p>
                          <p className="text-base md:text-lg font-semibold">42 Network (1337) at UM6P Benguerir</p>
                        </div>
                        <a
                          href="#contact"
                          className={`group relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-bold rounded-lg shadow-2xl text-sm ${
                            theme === "snow"
                              ? "bg-blue-500 hover:bg-blue-600 text-white"
                              : theme === "space"
                                ? "bg-[#E6E6FA] hover:bg-[#D8D8FF] text-gray-900"
                                : "bg-gradient-to-br from-[#FFD700] via-[#FFA500] to-[#FF8C00] hover:bg-gradient-to-br hover:from-[#FF8C00] hover:via-[#FFA500] hover:to-[#FFD700] text-[#1A1A1A]"
                          }`}
                        >
                          <span className="relative transition duration-300 group-hover:text-white">Let's Connect</span>
                          <svg
                            className="relative w-4 h-4 ml-2 transition duration-300 group-hover:text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div
                      className={`hidden lg:flex w-full lg:w-1/2 xl:w-3/5 justify-center lg:justify-end items-center`}
                    >
                      <div className="w-full max-w-sm xl:max-w-md 2xl:max-w-lg">
                        {theme === "snow" ? (
                          <SnowmanCharacter />
                        ) : theme === "space" ? (
                          <AlienCharacter />
                        ) : (
                          <BeeCharacter />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Skills Section */}
              <section
                id="skills"
                className={`py-12 md:py-20 ${
                  theme === "snow"
                    ? "bg-gradient-to-b from-blue-300 to-blue-400"
                    : theme === "space"
                      ? "bg-gradient-to-b from-gray-900 to-gray-800"
                      : "bg-gradient-to-b from-[#B8860B] to-[#D4A017]"
                }`}
              >
                <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-8 text-white">Skills</h2>
                  <p className="text-center text-white mb-8 md:mb-12 max-w-3xl mx-auto text-sm md:text-base">
                    Here are my top skills and proficiency levels. Each skill represents years of dedication and
                    practical experience in various projects and challenges.{" "}
                    {theme === "bee"
                      ? "Watch as the flowers bloom and bees pollinate to reveal my skill levels!"
                      : "Tap or hover over each skill to see the full percentage."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative">
                    <SkillCircle skill="C/C++" percentage={95} theme={theme} />
                    <SkillCircle skill="Web Development" percentage={85} theme={theme} />
                    <SkillCircle skill="Data Analysis" percentage={80} theme={theme} />
                    <SkillCircle skill="Cyber Security" percentage={75} theme={theme} />
                    <SkillCircle skill="Python" percentage={90} theme={theme} />
                    <SkillCircle skill="Machine Learning" percentage={70} theme={theme} />
                    <SkillCircle skill="DevOps" percentage={65} theme={theme} />
                    <SkillCircle skill="Database Management" percentage={85} theme={theme} />
                  </div>
                </div>
              </section>

              {/* Projects Section */}
              <section id="projects" className="py-16 md:py-20">
                <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                  <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
                  <p className="text-center text-[#1A1A1A] mb-8 md:mb-12 max-w-2xl mx-auto">
                    Check out some of my recent projects.
                  </p>
                  <div className="w-full max-w-7xl mx-auto">
                    <ProjectCarousel
                      projects={[
                        {
                          title: "Minishell",
                          description: "A custom shell implementation with command execution, pipes, and more.",
                          image: "/shell.jpg",
                        },
                        {
                          title: "Weather Web App",
                          description: "Real-time weather application with location-based forecasts.",
                          image: "/wether_app.jpg",
                        },
                        {
                          title: "Cub3D",
                          description: "3D maze game using raycasting technology.",
                          image: "/cub3d.jpg",
                        },
                        {
                          title: "Fract'ol",
                          description: "Interactive fractal exploration program.",
                          image: "/fractol.jpg",
                        },
                        {
                          title: "Hisabi",
                          description:
                            "A comprehensive Moroccan tax calculator featuring multilingual support, various tax calculations, and a modern interface with Moroccan-inspired design.",
                          image: "/hisabi.JPG",
                        },
                        {
                          title: "Cosmic Coding Journey",
                          description:
                            "An interactive space-themed learning platform using AI to generate personalized coding challenges, featuring real-time problem generation with GPT-4 and adaptive learning paths.",
                          image: "/cosmic-learning.JPG",
                        },
                        {
                          title: "Portfolio Website",
                          description: "A responsive portfolio website showcasing my skills and projects.",
                          image: "/portfoliopic.JPG",
                        },
                        {
                          title: "so_long",
                          description:
                            "A 2D game inspired by Pac-Man, developed as part of the 42 Network curriculum using C and the MLX library.",
                          image: "/pacman.jpg",
                        },
                      ]}
                      theme={theme}
                    />
                  </div>
                </div>
              </section>

              {/* Professional Experiences Section */}
              <section id="professional-experiences" className="py-16 md:py-20">
                <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8">Professional Experiences</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ExperienceCard3D
                      title="Freelance Software Developer"
                      company="Remote"
                      duration="January 2024 - January 2025 (1 year 1 month)"
                      responsibilities={[
                        "Developed custom software solutions for various clients",
                        "Managed multiple projects simultaneously, ensuring timely delivery",
                        "Utilized a wide range of technologies to meet diverse client needs",
                      ]}
                      theme={theme}
                    />
                    <ExperienceCard3D
                      title="Web Automation Project Leader"
                      company="AssurFrance"
                      duration="March 2023 - August 2023 (6 months)"
                      responsibilities={[
                        "Led a team in developing web automation solutions for insurance processes",
                        "Implemented efficient workflows to streamline operations",
                        "Collaborated with stakeholders to ensure project success",
                      ]}
                      theme={theme}
                    />
                    <ExperienceCard3D
                      title="Software Developer Intern"
                      company="Allianz Assurance"
                      duration="January 2022 - June 2022 (6 months)"
                      responsibilities={[
                        "Assisted in the development and maintenance of insurance software solutions",
                        "Gained hands-on experience in the insurance industry's software ecosystem",
                        "Contributed to improving existing codebase and implementing new features",
                      ]}
                      theme={theme}
                    />
                  </div>
                </div>
              </section>

              {/* Contact Section */}
              <section id="contact" className="py-12 md:py-20">
                <div className="w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Let's Connect</h2>
                  <p
                    className={`text-center mb-8 max-w-2xl mx-auto text-sm md:text-base ${
                      theme === "space" ? "text-gray-200" : "text-[#1A1A1A]"
                    }`}
                  >
                    I'm always open to new opportunities and collaborations. Get in touch!
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div className="flex justify-center items-center">
                      {theme === "bee" && <HoneyPotWithBee />}
                      {theme === "snow" && <SnowGlobe />}
                      {theme === "space" && <SpaceScene />}
                    </div>
                    <div
                      className={`${
                        theme === "snow" ? "bg-blue-200/30" : theme === "space" ? "bg-gray-800/30" : "bg-[#FFD700]/30"
                      } p-6 rounded-2xl backdrop-blur-sm`}
                    >
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            required
                            className={`w-full px-4 py-2 rounded-lg text-sm ${
                              theme === "snow"
                                ? "bg-blue-900/50 border border-blue-700 focus:border-blue-500"
                                : theme === "space"
                                  ? "bg-gray-900/50 border border-gray-700 focus:border-gray-500"
                                  : "bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500"
                            } focus:outline-none`}
                          />
                          <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            required
                            className={`w-full px-4 py-2 rounded-lg text-sm ${
                              theme === "snow"
                                ? "bg-blue-900/50 border border-blue-700 focus:border-blue-500"
                                : theme === "space"
                                  ? "bg-gray-900/50 border border-gray-700 focus:border-gray-500"
                                  : "bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500"
                            } focus:outline-none`}
                          />
                        </div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          required
                          className={`w-full px-4 py-2 rounded-lg text-sm ${
                            theme === "snow"
                              ? "bg-blue-900/50 border border-blue-700 focus:border-blue-500"
                              : theme === "space"
                                ? "bg-gray-900/50 border border-gray-700 focus:border-gray-500"
                                : "bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500"
                          } focus:outline-none`}
                        />
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone No."
                          className={`w-full px-4 py-2 rounded-lg text-sm ${
                            theme === "snow"
                              ? "bg-blue-900/50 border border-blue-700 focus:border-blue-500"
                              : theme === "space"
                                ? "bg-gray-900/50 border border-gray-700 focus:border-gray-500"
                                : "bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500"
                          } focus:outline-none`}
                        />
                        <textarea
                          name="message"
                          placeholder="Message"
                          rows={4}
                          required
                          className={`w-full px-4 py-2 rounded-lg text-sm ${
                            theme === "snow"
                              ? "bg-blue-900/50 border border-blue-700 focus:border-blue-500"
                              : theme === "space"
                                ? "bg-gray-900/50 border border-gray-700 focus:border-gray-500"
                                : "bg-yellow-900/50 border border-yellow-700 focus:border-yellow-500"
                          } focus:outline-none`}
                        />
                        <button
                          type="submit"
                          className={`w-full px-6 py-3 ${
                            theme === "snow"
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : theme === "space"
                                ? "bg-gray-700 text-gray-100 hover:bg-gray-600"
                                : "honey-button bg-[#1A1A1A] text-[#FFD700] hover:opacity-90"
                          } rounded-lg font-semibold transition-colors disabled:opacity-50 text-sm`}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                        {formState.message && (
                          <p className="text-center text-green-500 text-sm mt-4">{formState.message}</p>
                        )}
                      </form>
                    </div>
                  </div>
                </div>
              </section>
            </SmoothScroll>
            {/* Theme Toggle Button */}
            <div className="fixed bottom-4 right-4 z-50">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </main>
      )}
    </>
  )
}
// ser 3llah
// ser 3llah
// ser 3llah
// ser 3llah
// ser 3llah
// ser 3llah
// ser 3llah
// ser 3llah