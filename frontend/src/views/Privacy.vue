<template>
  <div class="legal-page">
    <div class="legal-container">
      <div class="legal-header">
        <h1 class="page-title">Privacy Policy</h1>
        <p class="last-updated">Last Updated: February 4, 2026</p>
      </div>

      <div class="legal-content">
        <section class="legal-section">
          <h2>Introduction</h2>
          <p>Welcome to FileOnix. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we handle your data when you use our image conversion service.</p>
        </section>

        <section class="legal-section">
          <h2>Information We Collect</h2>
          <h3>Client-Side Processing</h3>
          <p>FileOnix processes all image conversions locally in your browser. This means:</p>
          <ul>
            <li><strong>Your files never leave your device</strong> - All conversions happen on your computer</li>
            <li><strong>No file uploads</strong> - We do not receive, store, or have access to your images</li>
            <li><strong>Complete privacy</strong> - Your data remains 100% private and secure</li>
          </ul>

          <h3>Automatically Collected Information</h3>
          <p>When you visit our website, we may automatically collect certain information including:</p>
          <ul>
            <li>Browser type and version</li>
            <li>Operating system</li>
            <li>IP address (anonymized)</li>
            <li>Time and date of visit</li>
            <li>Pages viewed</li>
            <li>Referring website</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to improve your experience:</p>
          
          <h3>Essential Cookies</h3>
          <ul>
            <li><strong>Theme Preference</strong> - Stores your dark/light mode choice</li>
            <li><strong>Session Data</strong> - Maintains your session state</li>
          </ul>

          <h3>Analytics Cookies</h3>
          <p>We may use analytics services to understand how visitors use our site. This helps us improve our service.</p>
        </section>

        <section class="legal-section">
          <h2>Third-Party Services</h2>
          
          <h3>Google AdSense</h3>
          <p>We use Google AdSense to display advertisements. Google may use cookies to serve ads based on your prior visits to our website or other websites. You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener">Google's Ads Settings</a>.</p>

          <h3>Analytics</h3>
          <p>We may use analytics services such as Google Analytics to collect information about your use of our website. These services may collect information such as how often you visit, what pages you visit, and what other sites you used prior to coming to our website.</p>
        </section>

        <section class="legal-section">
          <h2>How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To provide and maintain our service</li>
            <li>To improve user experience</li>
            <li>To analyze usage patterns and trends</li>
            <li>To detect and prevent technical issues</li>
            <li>To display relevant advertisements</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Data Security</h2>
          <p>Since all file conversions happen locally in your browser, we never have access to your files. We implement appropriate security measures to protect any information we do collect from unauthorized access, alteration, disclosure, or destruction.</p>
        </section>

        <section class="legal-section">
          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Withdraw consent at any time</li>
            <li>Opt-out of marketing communications</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Children's Privacy</h2>
          <p>Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.</p>
        </section>

        <section class="legal-section">
          <h2>International Data Transfers</h2>
          <p>Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.</p>
        </section>

        <section class="legal-section">
          <h2>Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
        </section>

        <section class="legal-section">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>Via our <router-link to="/contact">Contact Page</router-link></li>
            <li>By email: privacy@fileonix.com</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Privacy'
}
</script>

<style scoped>
.legal-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: var(--spacing-2xl) var(--spacing-md);
}

.legal-container {
  max-width: 900px;
  margin: 0 auto;
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
  animation: fadeIn 0.6s ease-out;
  transition: all var(--transition-base);
}

.legal-container:hover {
  border-color: var(--color-primary);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.legal-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  padding-bottom: var(--spacing-xl);
  border-bottom: 2px solid var(--color-primary);
}

.page-title {
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3));
}

.last-updated {
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
}

.legal-content {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-2xl);
}

.legal-section h2 {
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
}

.legal-section h3 {
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  color: var(--text-primary);
  margin: var(--spacing-lg) 0 var(--spacing-sm);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.legal-section p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
  font-size: 1rem;
}

.legal-section ul {
  margin: var(--spacing-md) 0;
  padding-left: var(--spacing-xl);
}

.legal-section li {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-sm);
}

.legal-section a {
  color: var(--color-primary-light);
  text-decoration: none;
  font-weight: 600;
  transition: all var(--transition-base);
}

.legal-section a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.legal-section strong {
  color: var(--text-primary);
  font-weight: 700;
}

/* Responsive */
@media (max-width: 768px) {
  .legal-page {
    padding: var(--spacing-lg) var(--spacing-sm);
  }

  .legal-container {
    padding: var(--spacing-lg);
  }

  .page-title {
    font-size: 2rem;
  }

  .legal-section h2 {
    font-size: 1.5rem;
  }

  .legal-section h3 {
    font-size: 1.2rem;
  }
}
</style>
