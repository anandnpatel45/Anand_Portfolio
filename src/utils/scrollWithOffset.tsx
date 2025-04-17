// src/utils/scrollWithOffset.ts
export function scrollWithOffset(el: HTMLElement) {
  const headerOffset = 88    // ← adjust this to your header’s height in px
  const elementPosition = el.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - headerOffset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}
