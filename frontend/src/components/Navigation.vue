<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="url(#gradient)"/>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#6366f1"/>
              <stop offset="100%" style="stop-color:#8b5cf6"/>
            </linearGradient>
          </defs>
        </svg>
        <span class="logo-text">FileOnix</span>
      </router-link>

      <button class="mobile-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="hamburger" :class="{ 'active': mobileMenuOpen }"></span>
      </button>

      <ul class="nav-menu" :class="{ 'mobile-active': mobileMenuOpen }">
        <li>
          <router-link to="/" class="nav-link converter-highlight" @click="closeMobileMenu">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Converter</span>
          </router-link>
        </li>
        <li>
          <router-link to="/api-docs" class="nav-link api-highlight" @click="closeMobileMenu">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>API Docs</span>
          </router-link>
        </li>
        <li>
          <router-link to="/blog" class="nav-link" @click="closeMobileMenu">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Blog</span>
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="nav-link" @click="closeMobileMenu">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>About</span>
          </router-link>
        </li>
        <li>
          <router-link to="/contact" class="nav-link" @click="closeMobileMenu">
            <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Contact</span>
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      mobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  }
}
</script>

<style scoped>
.navbar {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 1rem 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4), 0 0 1px rgba(99, 102, 241, 0.2);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
}

.nav-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 1.5rem;
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  transition: all var(--transition-base);
  color: var(--text-primary);
}

.logo:hover {
  transform: scale(1.05);
}

.logo:hover .logo-icon {
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6));
}

.logo-icon {
  width: 32px;
  height: 32px;
  transition: all var(--transition-base);
}

.logo-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.mobile-toggle {
  display: none;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  cursor: pointer;
  padding: var(--spacing-sm);
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-base);
}

.mobile-toggle:hover {
  background: var(--bg-hover);
  border-color: var(--color-primary);
}

.hamburger {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  position: relative;
  transition: all var(--transition-base);
  border-radius: 2px;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: all var(--transition-base);
  border-radius: 2px;
}

.hamburger::before {
  top: -7px;
}

.hamburger::after {
  top: 7px;
}

.hamburger.active {
  background: transparent;
}

.hamburger.active::before {
  top: 0;
  transform: rotate(45deg);
  background: var(--color-primary);
}

.hamburger.active::after {
  top: 0;
  transform: rotate(-45deg);
  background: var(--color-primary);
}

.nav-menu {
  display: flex;
  gap: var(--spacing-xs);
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 0.95rem;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  position: relative;
}

.nav-link .icon {
  width: 18px;
  height: 18px;
  transition: all var(--transition-base);
}

.nav-link:hover {
  background: rgba(99, 102, 241, 0.1);
  color: var(--color-primary-light);
  transform: translateY(-2px);
}

.nav-link:hover .icon {
  transform: scale(1.1);
}

.nav-link.router-link-active {
  background: rgba(99, 102, 241, 0.15);
  color: var(--color-primary-light);
}

.nav-link.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: 2px;
}

.converter-highlight {
  background: var(--gradient-primary);
  color: white !important;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.converter-highlight .icon {
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
}

.converter-highlight:hover {
  background: var(--gradient-primary);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.5);
}

.converter-highlight.router-link-active::after {
  display: none;
}

.api-highlight {
  background: var(--gradient-secondary);
  color: white !important;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
}

.api-highlight .icon {
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.5));
}

.api-highlight:hover {
  background: var(--gradient-secondary);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(236, 72, 153, 0.5);
}

.api-highlight.router-link-active::after {
  display: none;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .mobile-toggle {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    top: 72px;
    left: 0;
    right: 0;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    flex-direction: column;
    padding: var(--spacing-lg);
    gap: var(--spacing-xs);
    transform: translateX(100%);
    transition: transform var(--transition-slow);
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    border-top: 1px solid rgba(99, 102, 241, 0.2);
    max-height: calc(100vh - 72px);
    overflow-y: auto;
  }

  .nav-menu.mobile-active {
    transform: translateX(0);
  }

  .nav-link {
    width: 100%;
    padding: var(--spacing-md);
    justify-content: flex-start;
    border-radius: var(--radius-lg);
    font-size: 1rem;
  }

  .nav-link .icon {
    width: 20px;
    height: 20px;
  }

  .nav-link.router-link-active::after {
    display: none;
  }

  .nav-container {
    padding: 0 var(--spacing-md);
  }

  .logo-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 1.1rem;
  }

  .logo-icon {
    width: 28px;
    height: 28px;
  }
}
</style>
