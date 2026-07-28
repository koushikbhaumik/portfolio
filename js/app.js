let skillsGsapTween = null;
let projectsGsapTween = null;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypewriter();
  initNavbar();
  initScrollSpy();
  initSkillsFilters();
  initProjectFilters();
  initContactForm();
  initGsapAnimations();
});

/* ==========================================================================
   DARK / LIGHT MODE THEME TOGGLER (SETTINGS BUTTON)
   ========================================================================== */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = localStorage.getItem('portfolio-theme');

  // Load theme preference on load
  if (currentTheme === 'dark') {
    document.body.classList.add('dark');
    updateThemeIcon(true);
  } else {
    updateThemeIcon(false);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
      updateThemeIcon(isDark);
    });
  }

  function updateThemeIcon(isDark) {
    if (!themeToggleBtn) return;
    if (isDark) {
      themeToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-theme"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg>`;
      themeToggleBtn.style.color = 'var(--accent)';
      themeToggleBtn.style.borderColor = 'var(--accent)';
      themeToggleBtn.style.backgroundColor = 'var(--bg-secondary)';
    } else {
      themeToggleBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-theme"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;
      themeToggleBtn.style.color = 'var(--text-secondary)';
      themeToggleBtn.style.borderColor = 'var(--border-color)';
      themeToggleBtn.style.backgroundColor = 'var(--bg-card)';
    }
  }
}

/* ==========================================================================
   TYPEWRITER EFFECT (HERO WORD CHANGER)
   ========================================================================== */
function initTypewriter() {
  const textSpan = document.getElementById('typewriter-text');
  if (!textSpan || typeof gsap === 'undefined') return;

  // Clear original text for animation start
  textSpan.textContent = '';

  const roles = [
    "WordPress Developer",
    "Front-End Developer",
    //"WooCommerce Specialist"
  ];

  const mainTimeline = gsap.timeline({ repeat: -1 });

  roles.forEach((role) => {
    const roleTimeline = gsap.timeline({ yoyo: true, repeat: 1, repeatDelay: 2 });
    roleTimeline.to(textSpan, {
      duration: 1.5,
      text: role,
      ease: "none"
    });
    mainTimeline.add(roleTimeline);
  });
}

/* ==========================================================================
   NAVIGATION BAR FUNCTIONS (STIKY & MOBILE MENU)
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-nav');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenuLinks = document.getElementById('nav-menu-links');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky Navbar on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle Mobile Menu
  if (mobileMenuBtn && navMenuLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenuLinks.classList.toggle('open');
      
      // Update hamburger icon visual
      const isOpen = navMenuLinks.classList.contains('open');
      mobileMenuBtn.innerHTML = isOpen 
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-menu"><line x1="18" x2="6" y1="6" y2="18"></line><line x1="6" x2="18" y1="6" y2="18"></line></svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-menu"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`;
    });

    // Close Mobile Menu on Nav Link Click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenuLinks.classList.remove('open');
        // Reset icon
        mobileMenuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-menu"><line x1="4" x2="20" y1="12" y2="12"></line><line x1="4" x2="20" y1="6" y2="6"></line><line x1="4" x2="20" y1="18" y2="18"></line></svg>`;
      });
    });
  }
}

/* ==========================================================================
   SCROLL SPY (ACTIVE LINK HIGHLIGHT)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section, footer');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 120; // offset corresponding to header height + buffer

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   PORTFOLIO FILTER ENGINE
   ========================================================================== */
function initProjectFilters() {
  const filterContainer = document.getElementById('project-filters');
  const projectGrid = document.getElementById('projects-grid');
  
  if (!filterContainer || !projectGrid) return;
  
  const filterBtns = filterContainer.querySelectorAll('.filter-btn');
  const projectCards = projectGrid.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Kill entrance animation to prevent layout conflict
      if (projectsGsapTween) {
        if (projectsGsapTween.scrollTrigger) {
          projectsGsapTween.scrollTrigger.kill(true);
        }
        projectsGsapTween.kill();
        projectsGsapTween = null;
        // Reset properties to default CSS
        projectCards.forEach(c => gsap.set(c, { clearProps: 'transform,opacity' }));
      }

      const filterValue = btn.getAttribute('data-filter');

      // Animate cards filtering using GSAP
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          gsap.killTweensOf(card);
          card.style.display = 'flex';
          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(card, { clearProps: 'transform,opacity' });
              ScrollTrigger.refresh();
            }
          });
        } else {
          gsap.killTweensOf(card);
          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              card.style.display = 'none';
              ScrollTrigger.refresh();
            }
          });
        }
      });
    });
  });
}

/* ==========================================================================
   TECHNICAL SKILLS FILTER ENGINE
   ========================================================================== */
function initSkillsFilters() {
  const filterBtns = document.querySelectorAll('.skills-filter-btn');
  const skillsCards = document.querySelectorAll('.skills-card');
  
  if (filterBtns.length === 0 || skillsCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Kill entrance animation to prevent layout conflict
      if (skillsGsapTween) {
        if (skillsGsapTween.scrollTrigger) {
          skillsGsapTween.scrollTrigger.kill(true);
        }
        skillsGsapTween.kill();
        skillsGsapTween = null;
        // Reset properties to default CSS
        skillsCards.forEach(c => {
          gsap.set(c, { clearProps: 'transform,opacity' });
          c.classList.remove('hidden-card');
        });
      }

      const filterValue = btn.getAttribute('data-filter');

      // Animate card entries/exits using GSAP
      skillsCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const fill = card.querySelector('.skill-progress-bar-fill');
        
        if (filterValue === 'all' || cardCategory === filterValue) {
          gsap.killTweensOf(card);
          
          if (card.classList.contains('hidden-card')) {
            card.classList.remove('hidden-card');
            gsap.set(card, { opacity: 0, scale: 0.95 });
          }

          gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              gsap.set(card, { clearProps: 'transform,opacity' });
              ScrollTrigger.refresh();
            }
          });

          // Animate progress bar fill if present
          if (fill) {
            const progress = fill.getAttribute('data-progress');
            gsap.killTweensOf(fill);
            gsap.to(fill, {
              width: `${progress}%`,
              duration: 0.8,
              ease: 'power2.out',
              delay: 0.1
            });
          }
        } else {
          gsap.killTweensOf(card);
          
          // Reset progress bar width
          if (fill) {
            gsap.killTweensOf(fill);
            gsap.set(fill, { width: '0%' });
          }

          gsap.to(card, {
            opacity: 0,
            scale: 0.95,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              card.classList.add('hidden-card');
              ScrollTrigger.refresh();
            }
          });
        }
      });
    });
  });
}

/* ==========================================================================
   CONTACT FORM VALIDATION & INTERACTIVITY
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const successOverlay = document.getElementById('form-success-message');
  const dismissBtn = document.getElementById('success-dismiss-btn');
  
  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('form-name'),
      error: document.getElementById('error-name'),
      validate: (val) => val.trim().length > 0
    },
    email: {
      input: document.getElementById('form-email'),
      error: document.getElementById('error-email'),
      validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(val.trim());
      }
    },
    subject: {
      input: document.getElementById('form-subject'),
      error: document.getElementById('error-subject'),
      validate: (val) => val.trim().length > 0
    },
    message: {
      input: document.getElementById('form-message'),
      error: document.getElementById('error-message'),
      validate: (val) => val.trim().length > 5
    }
  };

  // Live input cleanup validation
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    field.input.addEventListener('input', () => {
      const parent = field.input.closest('.form-group');
      if (field.validate(field.input.value)) {
        parent.classList.remove('has-error');
      }
    });

    if (field.input.tagName === 'SELECT') {
      field.input.addEventListener('change', () => {
        const parent = field.input.closest('.form-group');
        if (field.validate(field.input.value)) {
          parent.classList.remove('has-error');
        }
      });
    }
  });

  // Submit Handler
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isFormValid = true;

    // Check all fields
    Object.keys(fields).forEach(key => {
      const field = fields[key];
      const isValid = field.validate(field.input.value);
      const parent = field.input.closest('.form-group');

      if (!isValid) {
        parent.classList.add('has-error');
        isFormValid = false;
      } else {
        parent.classList.remove('has-error');
      }
    });

    if (isFormValid) {
      const submitBtn = document.getElementById('form-submit-btn');
      const submitSpan = submitBtn.querySelector('span');
      const originalText = submitSpan.textContent;
      
      // Visual feedback: Sending state
      submitBtn.disabled = true;
      submitSpan.textContent = 'Sending Message...';
      submitBtn.style.opacity = '0.8';

      // Mock network call
      setTimeout(() => {
        // Show success overlay
        successOverlay.classList.add('show');
        successOverlay.setAttribute('aria-hidden', 'false');
        
        // Reset submit button
        submitBtn.disabled = false;
        submitSpan.textContent = originalText;
        submitBtn.style.opacity = '1';
        
        // Clear all values
        form.reset();
      }, 1500);
    }
  });

  // Dismiss Success Overlay
  if (dismissBtn && successOverlay) {
    dismissBtn.addEventListener('click', () => {
      successOverlay.classList.remove('show');
      successOverlay.setAttribute('aria-hidden', 'true');
    });
  }
}

/* ==========================================================================
   GSAP ENTRANCE ANIMATIONS
   ========================================================================== */
function initGsapAnimations() {
  // Check if GSAP and ScrollTrigger are loaded correctly (fallback protection)
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.log('GSAP not loaded. Relying on default CSS transitions.');
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Content Animations
  const heroTl = gsap.timeline();
  heroTl.from('.hero-badge', {
    opacity: 0,
    y: -20,
    duration: 0.6,
    ease: 'power3.out'
  })
  .from('.hero-title', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.4')
  .from('.hero-subtitle', {
    opacity: 0,
    y: 20,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.hero-ctas .btn', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.hero-image-side', {
    opacity: 0,
    x: 40,
    duration: 0.8,
    ease: 'power3.out'
  }, '-=0.6')
  .from('.metrics-strip', {
    opacity: 0,
    y: 40,
    duration: 1,
    ease: 'power4.out'
  }, '-=0.4');

  // 2. Scroll Triggered Sections
  
  // About Section
  gsap.from('.about-text-content', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -50,
    duration: 1,
    ease: 'power3.out'
  });

  gsap.from('.about-highlights-wrapper', {
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: 50,
    duration: 1,
    ease: 'power3.out'
  });

  // Skills Grid
  skillsGsapTween = gsap.from('.skills-card', {
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
    onComplete: function(self) {
      const card = self.targets()[0];
      if (card) {
        const fill = card.querySelector('.skill-progress-bar-fill');
        if (fill) {
          const progress = fill.getAttribute('data-progress');
          gsap.to(fill, {
            width: `${progress}%`,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      }
    },
    onCompleteParams: ['{self}']
  });

  // Experience Timeline
  gsap.from('.timeline-block', {
    scrollTrigger: {
      trigger: '#experience',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out'
  });

  gsap.from('.timeline-item', {
    scrollTrigger: {
      trigger: '#experience',
      start: 'top 70%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -20,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // Projects Grid
  projectsGsapTween = gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    clearProps: 'transform,opacity'
  });

  // Project Registry
  gsap.from('.project-registry-box', {
    scrollTrigger: {
      trigger: '.project-registry-box',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out'
  });

  // Services Grid
  gsap.from('.service-card', {
    scrollTrigger: {
      trigger: '#services',
      start: 'top 75%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out'
  });

  // Footer Content and Form
  gsap.from('.footer-info', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: -30,
    duration: 0.8,
    ease: 'power3.out'
  });

  gsap.from('.footer-form-wrapper', {
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: 'power3.out'
  });
}
