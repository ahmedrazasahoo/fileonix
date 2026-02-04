<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <!-- Brand Section -->
        <div class="footer-section brand-section">
          <div class="footer-brand">
            <svg class="brand-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="url(#footerGradient)"/>
              <defs>
                <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#6366f1"/>
                  <stop offset="100%" style="stop-color:#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
            <span class="brand-name">FileOnix</span>
          </div>
          <p class="footer-description">
            Fast, free & private image conversion. Convert your files instantly with no uploads, no limits, and no watermarks.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
              </svg>
            </a>
            <a href="#" class="social-link" aria-label="Discord">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/"><span class="link-arrow">→</span> Converter</router-link></li>
            <li><router-link to="/blog"><span class="link-arrow">→</span> Blog</router-link></li>
            <li><router-link to="/about"><span class="link-arrow">→</span> About Us</router-link></li>
            <li><router-link to="/contact"><span class="link-arrow">→</span> Contact</router-link></li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="footer-section">
          <h3 class="footer-title">Legal</h3>
          <ul class="footer-links">
            <li><router-link to="/privacy"><span class="link-arrow">→</span> Privacy Policy</router-link></li>
            <li><router-link to="/terms"><span class="link-arrow">→</span> Terms of Service</router-link></li>
            <li><router-link to="/disclaimer"><span class="link-arrow">→</span> Disclaimer</router-link></li>
          </ul>
        </div>

        <!-- Features -->
        <div class="footer-section">
          <h3 class="footer-title">Features</h3>
          <ul class="footer-links features-list">
            <li>
              <svg class="feature-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>100% Private & Secure</span>
            </li>
            <li>
              <svg class="feature-icon" viewBox="0 0 24 24" fill="none">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Lightning Fast</span>
            </li>
            <li>
              <svg class="feature-icon" viewBox="0 0 24 24" fill="none">
                <path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Multiple Formats</span>
            </li>
            <li>
              <svg class="feature-icon" viewBox="0 0 24 24" fill="none">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Free Forever</span>
            </li>
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
  background: linear-gradient(180deg, var(--bg-primary) 0%, #0a0f1e 100%);
  color: var(--text-secondary);
  padding: var(--spacing-2xl) var(--spacing-lg) var(--spacing-xl);
  margin-top: auto;
  border-top: 1px solid rgba(99, 102, 241, 0.1);
  position: relative;
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--gradient-primary);
  opacity: 0.3;
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

.brand-icon {
  width: 40px;
  height: 40px;
  transition: all var(--transition-base);
}

.footer-brand:hover .brand-icon {
  filter: drop-shadow(0 0 12px rgba(99, 102, 241, 0.6));
  transform: scale(1.05);
}

.brand-name {
  font-size: 1.75rem;
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.footer-description {
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 0.95rem;
  max-width: 320px;
}

.social-links {
  display: flex;
  gap: var(--spacing-sm);
  margin-top: var(--spacing-sm);
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-secondary);
  transition: all var(--transition-base);
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.social-link:hover {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
  transform: translateY(-3px);
  box-shadow: var(--shadow-glow);
}

.footer-title {
  color: var(--text-primary);
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
}

.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.link-arrow {
  opacity: 0;
  transform: translateX(-10px);
  transition: all var(--transition-base);
  color: var(--color-primary);
}

.footer-links a:hover {
  color: var(--color-primary-light);
  transform: translateX(5px);
}

.footer-links a:hover .link-arrow {
  opacity: 1;
  transform: translateX(0);
}

.features-list {
  gap: var(--spacing-md);
}

.features-list li {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
}

.feature-icon {
  width: 20px;
  height: 20px;
  stroke: var(--color-primary);
  flex-shrink: 0;
}

.footer-bottom {
  padding-top: var(--spacing-xl);
  border-top: 1px solid rgba(148, 163, 184, 0.1);
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
  color: var(--color-primary-light);
}

.separator {
  color: var(--text-disabled);
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

@media (max-width: 480px) {
  .social-link {
    width: 36px;
    height: 36px;
  }

  .social-link svg {
    width: 18px;
    height: 18px;
  }
}
</style>
