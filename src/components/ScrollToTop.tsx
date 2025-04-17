// src/components/ScrollToTop.tsx
import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    // only jump to the top on pure path changes (no fragment)
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash])

  return null
}
