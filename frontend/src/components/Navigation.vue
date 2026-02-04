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
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
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
  background: var(--color-primary);
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
  background: var(--color-primary);
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
  background: var(--color-primary-dark);
}

.hamburger.active::after {
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
    background: var(--bg-card);
    flex-direction: column;
    padding: var(--spacing-lg);
    gap: var(--spacing-xs);
    transform: translateX(100%);
    transition: transform var(--transition-smooth);
    border-top: 2px solid var(--border-color);
    max-height: calc(100vh - 72px);
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
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
}
</style>
