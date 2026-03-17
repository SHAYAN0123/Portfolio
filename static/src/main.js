/**
 * Portfolio - Modern Frontend with Alpine.js
 * Reactive, accessible, and performant
 */

import Alpine from 'alpinejs'
import intersect from '@alpinejs/intersect'
import collapse from '@alpinejs/collapse'
import focus from '@alpinejs/focus'

// Register Alpine plugins
Alpine.plugin(intersect)
Alpine.plugin(collapse)
Alpine.plugin(focus)

// Global Alpine data stores
Alpine.store('theme', {
  dark: true,
  toggle() {
    this.dark = !this.dark
    document.documentElement.classList.toggle('dark', this.dark)
    localStorage.setItem('theme', this.dark ? 'dark' : 'light')
  },
  init() {
    const stored = localStorage.getItem('theme')
    this.dark = stored ? stored === 'dark' : true
    document.documentElement.classList.toggle('dark', this.dark)
  }
})

Alpine.store('nav', {
  open: false,
  toggle() {
    this.open = !this.open
  },
  close() {
    this.open = false
  }
})

// Custom Alpine components
Alpine.data('navbar', () => ({
  scrolled: false,
  init() {
    this.checkScroll()
    window.addEventListener('scroll', () => this.checkScroll(), { passive: true })
  },
  checkScroll() {
    this.scrolled = window.scrollY > 50
  }
}))

Alpine.data('counter', (target, duration = 2000) => ({
  count: 0,
  target: parseInt(target),
  animated: false,
  animate() {
    if (this.animated) return
    this.animated = true
    
    const increment = this.target / (duration / 16)
    const updateCount = () => {
      this.count += increment
      if (this.count < this.target) {
        requestAnimationFrame(updateCount)
      } else {
        this.count = this.target
      }
    }
    requestAnimationFrame(updateCount)
  }
}))

Alpine.data('tiltCard', () => ({
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  handleMouseMove(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    
    const rect = this.$el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    this.rotateX = (y - centerY) / 10
    this.rotateY = (centerX - x) / 10
    this.scale = 1.02
  },
  handleMouseLeave() {
    this.rotateX = 0
    this.rotateY = 0
    this.scale = 1
  },
  get transform() {
    return `perspective(1000px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) scale(${this.scale})`
  }
}))

Alpine.data('magneticButton', () => ({
  x: 0,
  y: 0,
  handleMouseMove(e) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    
    const rect = this.$el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    this.x = (e.clientX - centerX) * 0.2
    this.y = (e.clientY - centerY) * 0.2
  },
  handleMouseLeave() {
    this.x = 0
    this.y = 0
  },
  get transform() {
    return `translate(${this.x}px, ${this.y}px)`
  }
}))

Alpine.data('typewriter', (text, speed = 50) => ({
  displayText: '',
  index: 0,
  started: false,
  start() {
    if (this.started) return
    this.started = true
    this.type()
  },
  type() {
    if (this.index < text.length) {
      this.displayText += text.charAt(this.index)
      this.index++
      setTimeout(() => this.type(), speed)
    }
  }
}))

Alpine.data('parallax', (speed = 0.5) => ({
  offset: 0,
  init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    
    window.addEventListener('scroll', () => {
      const rect = this.$el.getBoundingClientRect()
      const scrolled = window.scrollY
      this.offset = scrolled * speed
    }, { passive: true })
  },
  get transform() {
    return `translateY(${this.offset}px)`
  }
}))

Alpine.data('cursorGlow', () => ({
  x: 0,
  y: 0,
  visible: false,
  init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    
    document.addEventListener('mousemove', (e) => {
      this.x = e.clientX
      this.y = e.clientY
      this.visible = true
    })
    
    document.addEventListener('mouseleave', () => {
      this.visible = false
    })
  }
}))

Alpine.data('contactForm', () => ({
  form: {
    name: '',
    email: '',
    subject: '',
    message: ''
  },
  errors: {},
  loading: false,
  success: false,
  
  validate() {
    this.errors = {}
    
    if (!this.form.name.trim()) {
      this.errors.name = 'Name is required'
    }
    
    if (!this.form.email.trim()) {
      this.errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) {
      this.errors.email = 'Please enter a valid email'
    }
    
    if (!this.form.message.trim()) {
      this.errors.message = 'Message is required'
    } else if (this.form.message.trim().length < 10) {
      this.errors.message = 'Message must be at least 10 characters'
    }
    
    return Object.keys(this.errors).length === 0
  },
  
  async submit() {
    if (!this.validate()) return
    
    this.loading = true
    
    try {
      const response = await fetch('/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(this.form)
      })
      
      if (response.ok) {
        this.success = true
        this.form = { name: '', email: '', subject: '', message: '' }
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      this.errors.submit = 'Failed to send message. Please try again.'
    } finally {
      this.loading = false
    }
  }
}))

// Utility functions
window.utils = {
  // Smooth scroll to element
  scrollTo(selector) {
    const element = document.querySelector(selector)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },
  
  // Copy to clipboard
  async copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  },
  
  // Format date
  formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date))
  },
  
  // Debounce function
  debounce(fn, delay) {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => fn(...args), delay)
    }
  },
  
  // Throttle function
  throttle(fn, limit) {
    let inThrottle
    return (...args) => {
      if (!inThrottle) {
        fn(...args)
        inThrottle = true
        setTimeout(() => inThrottle = false, limit)
      }
    }
  }
}

Alpine.data('journeyTimeline', () => ({
  revealed: 0,
  reveal(el) {
    el.classList.add('journey-visible')
    this.revealed++
  }
}))

// Initialize Alpine
Alpine.start()

// Expose Alpine for debugging
window.Alpine = Alpine

// Initialize cursor glow effect
document.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    initCursorGlow()
    initParticles()
  }
})

function initCursorGlow() {
  const glow = document.createElement('div')
  glow.className = 'fixed w-64 h-64 rounded-full pointer-events-none z-50 mix-blend-screen opacity-0 transition-opacity duration-300'
  glow.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)'
  glow.style.transform = 'translate(-50%, -50%)'
  document.body.appendChild(glow)
  
  let mouseX = 0, mouseY = 0
  let glowX = 0, glowY = 0
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    glow.style.opacity = '1'
  })
  
  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0'
  })
  
  function animate() {
    glowX += (mouseX - glowX) * 0.1
    glowY += (mouseY - glowY) * 0.1
    glow.style.left = glowX + 'px'
    glow.style.top = glowY + 'px'
    requestAnimationFrame(animate)
  }
  animate()
}

function initParticles() {
  const container = document.createElement('div')
  container.className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden'
  container.setAttribute('aria-hidden', 'true')
  document.body.prepend(container)
  
  const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981']
  
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div')
    particle.className = 'absolute rounded-full animate-float'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 100 + '%'
    const size = Math.random() * 6 + 2
    particle.style.width = size + 'px'
    particle.style.height = size + 'px'
    particle.style.background = colors[Math.floor(Math.random() * colors.length)]
    particle.style.opacity = (Math.random() * 0.3 + 0.1).toString()
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's'
    particle.style.animationDelay = (Math.random() * 5) + 's'
    container.appendChild(particle)
  }
}

console.log('🚀 Portfolio frontend loaded with Alpine.js + Tailwind CSS')
