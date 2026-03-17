export const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

export const debounce = (fn, ms) => {
  let timer
  return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms) }
}

export const throttle = (fn, ms) => {
  let last = 0
  return (...args) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...args) } }
}
