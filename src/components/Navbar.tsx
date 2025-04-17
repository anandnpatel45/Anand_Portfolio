// src/components/Navbar.tsx
import { Home, User, GraduationCap, FolderGit2, BookText, Code, Mail, Sun, Moon, FileText } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const navItems = [
    { path: '/',           label: 'Home',         icon: Home },
    { path: '/about',      label: 'About Me',     icon: User },
    { path: '/education',  label: 'Education',    icon: GraduationCap },
    { path: '/projects',   label: 'Projects',     icon: FolderGit2 },
    { path: '/publications', label: 'Publications', icon: BookText },
    { path: '/skills',     label: 'Skills',       icon: Code },
  ]

  const handleContactClick = () => {
    const contactEl = document.getElementById('contact')
    if (contactEl) {
      // Scroll so the bottom of #contact hits the bottom of the viewport
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'end' })
    } else {
      // Fallback: scroll to absolute bottom of the page
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      })
    }
  }

  return (
    <nav className="bg-white dark:bg-dark-card shadow-md fixed w-full top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex overflow-x-auto space-x-4 no-scrollbar">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === path
                    ? 'border-blue-500 text-gray-900 dark:text-white'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            ))}

            {/* CV Download stays a normal link */}
            <a
              href="/Media/Anandkumar_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <FileText className="w-4 h-4 mr-2" />
              Download my CV
            </a>

            {/* Contact Me button: scrolls in-place to bottom */}
            <button
              onClick={handleContactClick}
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </button>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  )
}
