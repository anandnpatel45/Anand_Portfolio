// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ScrollToTop from './components/ScrollToTop'
import './index.css'

// Disable browser’s native scroll restoration so it won’t fight our custom logic
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

// ——————————————
// Image URL fixer (mutation observer)
// ——————————————

// Grab the correct BASE_URL ("/" in dev, "/Anand_Portfolio/" in prod)
const base = import.meta.env.BASE_URL

// Watch for any <img> whose src starts with "/Media/" and hasn’t been fixed yet
const observer = new MutationObserver(() => {
  document
    .querySelectorAll('img[src^="/Media/"]:not([data-fixed])')
    .forEach((img) => {
      img.setAttribute('data-fixed', 'true')             // mark as fixed
      const relPath = img.getAttribute('src')!.slice(1)   // drop leading "/"
      img.src = base + relPath                            // prepend the right base
    })
})

// Start observing the entire document for new nodes
observer.observe(document.documentElement, {
  childList: true,
  subtree: true,
})

// ——————————————
// Mount React application
// ——————————————

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    {/* Handles scroll-to-top and hash-based scrolling */}
    <ScrollToTop />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)
