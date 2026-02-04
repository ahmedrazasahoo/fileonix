<template>
  <div class="legal-page">
    <div class="legal-container">
      <div class="legal-header">
        <h1 class="page-title">Terms of Service</h1>
        <p class="last-updated">Last Updated: February 4, 2026</p>
      </div>

      <div class="legal-content">
        <section class="legal-section">
          <h2>Agreement to Terms</h2>
          <p>By accessing and using FileOnix ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.</p>
        </section>

        <section class="legal-section">
          <h2>Description of Service</h2>
          <p>FileOnix provides a free, browser-based image conversion tool that allows users to convert images between different formats including PNG, JPG, WebP, and GIF. All conversions are processed locally in your browser.</p>
        </section>

        <section class="legal-section">
          <h2>Use License</h2>
          <p>Permission is granted to use our Service for personal and commercial purposes, subject to the following restrictions:</p>
          <ul>
            <li>You may not use the Service for any illegal purpose</li>
            <li>You may not attempt to reverse engineer or copy the Service</li>
            <li>You may not use the Service to upload malicious files or content</li>
            <li>You may not attempt to bypass or interfere with the Service's security features</li>
            <li>You may not use automated tools to access the Service without permission</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>User Responsibilities</h2>
          <p>When using FileOnix, you agree to:</p>
          <ul>
            <li>Use the Service in compliance with all applicable laws and regulations</li>
            <li>Not upload or convert files containing illegal, harmful, or copyrighted content without permission</li>
            <li>Not use the Service to distribute malware, viruses, or harmful code</li>
            <li>Respect intellectual property rights of others</li>
            <li>Not attempt to interfere with or disrupt the Service</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Intellectual Property Rights</h2>
          <p>The Service and its original content, features, and functionality are owned by FileOnix and are protected by international copyright, trademark, and other intellectual property laws.</p>
          
          <h3>Your Content</h3>
          <p>Since all file conversions happen locally in your browser, we never have access to your files. You retain all rights to the images you convert using our Service.</p>
        </section>

        <section class="legal-section">
          <h2>Privacy and Data Protection</h2>
          <p>All image conversions are performed locally in your browser. Your files are never uploaded to our servers. For more information about how we handle data, please review our <router-link to="/privacy">Privacy Policy</router-link>.</p>
        </section>

        <section class="legal-section">
          <h2>Third-Party Services</h2>
          <p>Our Service may contain links to third-party websites or services that are not owned or controlled by FileOnix. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.</p>
          
          <h3>Advertising</h3>
          <p>We use Google AdSense to display advertisements. These advertisers may use cookies and web beacons to collect information. Please refer to Google's privacy policy for more information.</p>
        </section>

        <section class="legal-section">
          <h2>Disclaimer of Warranties</h2>
          <p>The Service is provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied, including but not limited to:</p>
          <ul>
            <li>Implied warranties of merchantability</li>
            <li>Fitness for a particular purpose</li>
            <li>Non-infringement</li>
            <li>Accuracy or reliability of results</li>
            <li>That the Service will be uninterrupted or error-free</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Limitation of Liability</h2>
          <p>In no event shall FileOnix, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, or other intangible losses resulting from:</p>
          <ul>
            <li>Your access to or use of or inability to access or use the Service</li>
            <li>Any conduct or content of any third party on the Service</li>
            <li>Any content obtained from the Service</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Indemnification</h2>
          <p>You agree to defend, indemnify, and hold harmless FileOnix and its licensee and licensors, and their employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from:</p>
          <ul>
            <li>Your use and access of the Service</li>
            <li>Your violation of any term of these Terms</li>
            <li>Your violation of any third-party right, including intellectual property rights</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Service Availability</h2>
          <p>We reserve the right to:</p>
          <ul>
            <li>Modify or discontinue the Service at any time without notice</li>
            <li>Refuse service to anyone for any reason at any time</li>
            <li>Implement usage limits or restrictions</li>
            <li>Remove or modify features without prior notice</li>
          </ul>
        </section>

        <section class="legal-section">
          <h2>Governing Law</h2>
          <p>These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.</p>
        </section>

        <section class="legal-section">
          <h2>Changes to Terms</h2>
          <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
        </section>

        <section class="legal-section">
          <h2>Severability</h2>
          <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.</p>
        </section>

        <section class="legal-section">
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms of Service, please contact us:</p>
          <ul>
            <li>Via our <router-link to="/contact">Contact Page</router-link></li>
            <li>By email: legal@fileonix.com</li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Terms'
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
