import { useEffect } from 'react';
import { Home, User, GraduationCap, FolderGit2, BookText, Code, Mail, Sun, Moon , FileText} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About Me', icon: User },
    { path: '/education', label: 'Education', icon: GraduationCap },
    { path: '/projects', label: 'Projects', icon: FolderGit2 },
    { path: '/publications', label: 'Publications', icon: BookText },
    { path: '/skills', label: 'Skills', icon: Code },
  ];

  // Scroll to the section based on the hash in the URL
  useEffect(() => {
    const handleHashChange = () => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1)); // Remove the "#" from hash
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Call on initial load
    handleHashChange();

    // Listen to hash changes in the URL
    window.addEventListener('hashchange', handleHashChange);

    // Cleanup the event listener when component is unmounted
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [location]);

  return (
  <nav className="bg-white dark:bg-dark-card shadow-md fixed w-full top-0 z-50 transition-colors duration-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16">
        <div className="flex overflow-x-auto space-x-4 no-scrollbar">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={`${path}#top`}
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
          <a
            href="/Media/Anandkumar_CV.pdf" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <FileText className="w-4 h-4 mr-2" />
            Download my CV
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
          >
            <Mail className="w-4 h-4 mr-2" />
            Contact Me
          </a>
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
);


}
