<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="logo">
        <span class="logo-text">FileOnix</span>
      </router-link>

      <button class="mobile-toggle" @click="toggleMobileMenu" aria-label="Toggle menu">
        <span class="hamburger" :class="{ 'active': mobileMenuOpen }"></span>
      </button>

      <ul class="nav-menu" :class="{ 'mobile-active': mobileMenuOpen }">
        <li>
          <router-link to="/api-docs" class="nav-link" @click="closeMobileMenu">
            API Docs
          </router-link>
        </li>
        <li>
          <router-link to="/blog" class="nav-link" @click="closeMobileMenu">
            Blog
          </router-link>
        </li>
        <li>
          <router-link to="/about" class="nav-link" @click="closeMobileMenu">
            About
          </router-link>
        </li>
        <li>
          <router-link to="/contact" class="nav-link" @click="closeMobileMenu">
            Contact
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
  background: var(--bg-card);
  padding: 1rem 0;
  border-bottom: 2px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(10px);
}

.nav-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 32px;
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
  color: var(--color-primary-dark);
}

.logo:hover {
  color: var(--color-primary);
  transform: scale(1.02);
}

.logo-text {
  color: var(--color-primary-dark);
  letter-spacing: -0.02em;
}

.mobile-toggle {
  display: none;
  background: linear-gradient(135deg, rgba(var(--color-primary-rgb, 99, 102, 241), 0.12), rgba(var(--color-primary-rgb, 99, 102, 241), 0.06));
  border: 1.5px solid rgba(var(--color-primary-rgb, 99, 102, 241), 0.25);
  border-radius: 12px;
  cursor: pointer;
  padding: 0;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.mobile-toggle::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
  opacity: 0;
  transition: opacity 0.25s ease;
  border-radius: inherit;
}

.mobile-toggle:hover::before {
  opacity: 1;
}

.mobile-toggle:hover .hamburger,
.mobile-toggle:hover .hamburger::before,
.mobile-toggle:hover .hamburger::after {
  background: #fff;
}

.mobile-toggle:hover {
  box-shadow: 0 4px 16px rgba(var(--color-primary-rgb, 99, 102, 241), 0.35);
  border-color: transparent;
  transform: scale(1.05);
}

.hamburger {
  display: block;
  width: 18px;
  height: 2px;
  background: var(--color-primary);
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
  z-index: 1;
}

.hamburger::before,
.hamburger::after {
  content: '';
  position: absolute;
  height: 2px;
  background: var(--color-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 2px;
  left: 0;
}

.hamburger::before {
  width: 24px;
  top: -7px;
}

.hamburger::after {
  width: 13px;
  top: 7px;
}

.hamburger.active {
  background: transparent;
  width: 24px;
}

.hamburger.active::before {
  width: 24px;
  top: 0;
  transform: rotate(45deg);
  background: var(--color-primary-dark);
}

.hamburger.active::after {
  width: 24px;
  top: 0;
  transform: rotate(-45deg);
  background: var(--color-primary-dark);
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

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: all var(--transition-base);
  transform: translateX(-50%);
  border-radius: 2px;
}

.nav-link:hover {
  background: var(--bg-hover);
  color: var(--color-primary);
}

.nav-link:hover::after {
  width: 60%;
}

.nav-link.router-link-active {
  background: var(--color-primary);
  color: var(--bg-card);
  font-weight: 600;
}

.nav-link.router-link-active::after {
  display: none;
}

/* Tablet Responsive */
@media (max-width: 1024px) {
  .nav-container {
    max-width: 1024px;
    padding: 0 24px;
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .navbar {
    position: sticky;
    overflow: visible;
  }

  .nav-container {
    max-width: 768px;
    padding: 0 16px;
    position: relative;
  }

  .logo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .logo:hover {
    transform: translateX(-50%) scale(1.02);
  }

  .logo-text {
    font-size: 1.25rem;
  }

  .mobile-toggle {
    display: flex;
    margin-left: auto;
  }

  .nav-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 16px;
    right: 16px;
    background: var(--bg-card);
    flex-direction: column;
    padding: var(--spacing-md);
    gap: 4px;
    border: 2px solid var(--border-color);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-xl);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition: opacity var(--transition-base), transform var(--transition-base), visibility var(--transition-base);
    pointer-events: none;
    z-index: 999;
  }

  .nav-menu.mobile-active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: all;
  }

  .nav-link {
    width: 100%;
    padding: var(--spacing-sm) var(--spacing-md);
    justify-content: flex-start;
    border-radius: var(--radius-lg);
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    max-width: 480px;
    padding: 0 12px;
  }

  .nav-menu {
    left: 12px;
    right: 12px;
  }

  .logo-text {
    font-size: 1.1rem;
  }
}
</style>
