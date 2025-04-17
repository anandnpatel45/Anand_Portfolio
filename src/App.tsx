// src/App.tsx
import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Education from './pages/Education'
import Projects from './pages/Projects'
import Publications from './pages/Publications'
import Skills from './pages/Skills'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  // disable the browser's built-in scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
  }, [])
  useEffect(() => {
    // monkey‑patch scrollTo
    const origScroll = window.scrollTo;
    window.scrollTo = (...args) => {
      console.log('[SCROLL TO] ', args, new Error().stack);
      origScroll.apply(window, args);
    };
  
    // monkey‑patch scrollIntoView
    const origInto = Element.prototype.scrollIntoView;
    // @ts-ignore
    Element.prototype.scrollIntoView = function(...args) {
      console.log('[INTO VIEW] ', this.id, args, new Error().stack);
      // @ts-ignore
      origInto.apply(this, args);
    };
  }, []);

  useEffect(() => {
    // patch scrollTo
    const origScrollTo = window.scrollTo;
    window.scrollTo = (...args) => {
      console.log('[DEBUG scrollTo]', args, new Error().stack);
      origScrollTo.apply(window, args);
    };
  
    // patch scrollIntoView
    const origInto = Element.prototype.scrollIntoView;
    // @ts-ignore
    Element.prototype.scrollIntoView = function(...args) {
      console.log('[DEBUG scrollIntoView]', this.id, args, new Error().stack);
      // @ts-ignore
      origInto.apply(this, args);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
        <Navbar />
        <ScrollToTop />
        {/* this component handles both top‐of‐page and hash scrolling */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/skills" element={<Skills />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
