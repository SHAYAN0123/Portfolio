/**
 * Portfolio Website - Main JavaScript
 * Accessible, WCAG 2.1 Compliant, with Amazing Animations
 */

(function() {
    'use strict';

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initFlashMessages();
        initAccessibility();
        initScrollAnimations();
        initCursorGlow();
        initParticles();
        initTiltCards();
        initMagneticButtons();
        initRippleEffects();
        initSkillBars();
        initCounterAnimations();
        initParallax();
    });

    /**
     * Mobile Navigation Menu
     */
    function initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const menu = document.querySelector('.nav-menu');

        if (!toggle || !menu) return;

        toggle.addEventListener('click', function() {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('is-open');
            
            // Animate hamburger to X
            toggle.classList.toggle('is-active');
        });

        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && menu.classList.contains('is-open')) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');
                toggle.classList.remove('is-active');
                toggle.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!toggle.contains(e.target) && !menu.contains(e.target)) {
                toggle.setAttribute('aria-expanded', 'false');
                menu.classList.remove('is-open');
                toggle.classList.remove('is-active');
            }
        });
    }

    /**
     * Flash Messages - Auto dismiss with animation
     */
    function initFlashMessages() {
        const flashMessages = document.querySelectorAll('.flash-message');

        flashMessages.forEach(function(message, index) {
            // Animate in
            message.style.animation = 'fadeInRight 0.5s ease forwards ' + (index * 0.1) + 's';
            
            // Add close button functionality
            const closeBtn = message.querySelector('.flash-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    message.style.animation = 'fadeInRight 0.3s ease reverse forwards';
                    setTimeout(() => message.remove(), 300);
                });
            }

            // Auto-dismiss after 5 seconds
            setTimeout(function() {
                message.style.animation = 'fadeInRight 0.3s ease reverse forwards';
                setTimeout(function() {
                    message.remove();
                }, 300);
            }, 5000);
        });
    }

    /**
     * Scroll-triggered Animations
     */
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll, .stagger-children, .skill-bar-fill');
        
        if (!animatedElements.length) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: unobserve after animation
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function(el) {
            observer.observe(el);
        });

        // Also add animation classes to sections automatically
        document.querySelectorAll('section, .container > *').forEach(function(el, index) {
            if (!el.classList.contains('animate-on-scroll')) {
                el.classList.add('animate-on-scroll');
                el.classList.add('animate-delay-' + Math.min(index % 5 + 1, 5));
                observer.observe(el);
            }
        });
    }

    /**
     * Cursor Glow Effect
     */
    function initCursorGlow() {
        // Respect reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const glow = document.createElement('div');
        glow.className = 'cursor-glow';
        document.body.appendChild(glow);

        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth follow animation
        function animateGlow() {
            glowX += (mouseX - glowX) * 0.1;
            glowY += (mouseY - glowY) * 0.1;
            glow.style.left = glowX + 'px';
            glow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }

    /**
     * Floating Particles Background
     */
    function initParticles() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const container = document.createElement('div');
        container.className = 'particles';
        container.setAttribute('aria-hidden', 'true');
        document.body.appendChild(container);

        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 8 + 4) + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            container.appendChild(particle);
        }
    }

    /**
     * 3D Tilt Card Effect
     */
    function initTiltCards() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const cards = document.querySelectorAll('.tilt-card, .interactive-card, .project-card');

        cards.forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px)';
            });

            card.addEventListener('mouseleave', function() {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }

    /**
     * Magnetic Button Effect
     */
    function initMagneticButtons() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const buttons = document.querySelectorAll('.magnetic-btn, .btn-primary, .btn-secondary');

        buttons.forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                btn.style.transform = 'translate(' + (x * 0.3) + 'px, ' + (y * 0.3) + 'px)';
            });

            btn.addEventListener('mouseleave', function() {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    /**
     * Ripple Effect on Click
     */
    function initRippleEffects() {
        const rippleElements = document.querySelectorAll('.btn, .ripple, .nav-menu a');

        rippleElements.forEach(function(el) {
            el.classList.add('ripple');
            
            el.addEventListener('click', function(e) {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';

                el.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    /**
     * Animated Skill Bars
     */
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');
        
        skillBars.forEach(function(bar) {
            const width = bar.getAttribute('data-width') || bar.style.width;
            bar.style.setProperty('--skill-width', width);
        });
    }

    /**
     * Counter Animations
     */
    function initCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        if (!counters.length) return;

        const observerOptions = {
            threshold: 0.5
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const endValue = parseInt(target.getAttribute('data-counter'));
                    animateCounter(target, 0, endValue, 2000);
                    observer.unobserve(target);
                }
            });
        }, observerOptions);

        counters.forEach(function(counter) {
            observer.observe(counter);
        });
    }

    function animateCounter(element, start, end, duration) {
        let startTime = null;
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            const current = Math.floor(start + (end - start) * easeProgress);
            element.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animation);
            }
        }
        
        requestAnimationFrame(animation);
    }

    /**
     * Parallax Scrolling Effect
     */
    function initParallax() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (!parallaxElements.length) return;

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(function(el) {
                const speed = parseFloat(el.getAttribute('data-parallax')) || 0.5;
                const yPos = -(scrolled * speed);
                el.style.transform = 'translate3d(0, ' + yPos + 'px, 0)';
            });
        });
    }

    /**
     * Accessibility Enhancements
     */
    function initAccessibility() {
        // Focus management for main content
        const main = document.getElementById('main-content');
        if (main && window.location.hash === '') {
            // Don't focus main on initial load, only on skip link activation
        }

        // Announce flash messages to screen readers
        const flashContainer = document.querySelector('.flash-messages');
        if (flashContainer) {
            flashContainer.setAttribute('aria-live', 'polite');
        }

        // Enhance form validation messages
        const forms = document.querySelectorAll('form');
        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                const invalidInputs = form.querySelectorAll('.is-invalid');
                if (invalidInputs.length > 0) {
                    invalidInputs[0].focus();
                }
            });
        });
    }

})();
