<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Brand Section -->
        <div class="footer-section brand-section">
          <div class="footer-brand">
            <span class="brand-name">FileOnix</span>
          </div>
          <p class="footer-description">
            Fast, free & private image conversion. Convert your files instantly with no uploads, no limits, and no watermarks.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/">Converter</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="footer-section">
          <h3 class="footer-title">Legal</h3>
          <ul class="footer-links">
            <li><router-link to="/privacy">Privacy Policy</router-link></li>
            <li><router-link to="/terms">Terms of Service</router-link></li>
            <li><router-link to="/disclaimer">Disclaimer</router-link></li>
          </ul>
        </div>

        <!-- Features -->
        <div class="footer-section">
          <h3 class="footer-title">Features</h3>
          <ul class="footer-links features-list">
            <li><span class="feature-dot">•</span> 100% Private & Secure</li>
            <li><span class="feature-dot">•</span> Lightning Fast</li>
            <li><span class="feature-dot">•</span> Multiple Formats</li>
            <li><span class="feature-dot">•</span> Free Forever</li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="footer-bottom">
        <p class="copyright">
          © {{ currentYear }} FileOnix. All rights reserved.
        </p>
        <div class="footer-bottom-links">
          <router-link to="/privacy">Privacy</router-link>
          <span class="separator">•</span>
          <router-link to="/terms">Terms</router-link>
          <span class="separator">•</span>
          <router-link to="/contact">Contact</router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  color: var(--text-secondary);
  padding: var(--spacing-2xl) var(--spacing-lg) var(--spacing-xl);
  margin-top: auto;
  border-top: 2px solid var(--border-color);
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: var(--spacing-2xl);
  margin-bottom: var(--spacing-2xl);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.brand-section {
  gap: var(--spacing-lg);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.brand-name {
  font-size: 1.75rem;
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
  color: var(--color-primary-dark);
  letter-spacing: -0.02em;
}

.footer-description {
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 0.95rem;
  max-width: 320px;
}

.footer-title {
  color: var(--color-primary-dark);
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  margin-bottom: var(--spacing-xs);
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer-links li {
  font-size: 0.95rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-base);
  position: relative;
  display: inline-block;
}

.footer-links a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--color-primary);
  transition: width var(--transition-base);
}

.footer-links a:hover {
  color: var(--color-primary);
}

.footer-links a:hover::after {
  width: 100%;
}

.features-list li {
  gap: var(--spacing-sm);
}

.feature-dot {
  color: var(--color-primary);
  font-weight: bold;
  font-size: 1.2rem;
}

.footer-bottom {
  padding-top: var(--spacing-xl);
  border-top: 2px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.copyright {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 0.9rem;
}

.footer-bottom-links a {
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-base);
}

.footer-bottom-links a:hover {
  color: var(--color-primary);
}

.separator {
  color: var(--text-muted);
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--spacing-xl);
  }

  .brand-section {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: var(--spacing-2xl) var(--spacing-md) var(--spacing-lg);
  }

  .footer-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .brand-section {
    grid-column: 1;
  }

  .footer-description {
    max-width: 100%;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    padding-top: var(--spacing-lg);
  }
}
</style>
