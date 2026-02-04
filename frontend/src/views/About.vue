<template>
  <div class="about-page">
    <div class="about-container">
      <!-- Hero Section -->
      <div class="about-hero">
        <div class="hero-icon"><FolderOpen :size="80" :stroke-width="1.5" /></div>
        <h1 class="hero-title">About <span class="gradient-text">FileOnix</span></h1>
        <p class="hero-subtitle">Your privacy-first image conversion solution</p>
      </div>

      <!-- Mission Section -->
      <section class="about-section">
        <h2 class="section-title">Our Mission</h2>
        <p class="section-text">
          At FileOnix, we believe that file conversion should be simple, fast, and most importantly, private. We created this tool to empower users to convert their images without sacrificing their privacy or waiting for uploads and downloads.
        </p>
        <p class="section-text">
          Unlike traditional online converters that require you to upload your files to a server, FileOnix processes everything locally in your browser. This means your images never leave your device, ensuring complete privacy and instant results.
        </p>
      </section>

      <!-- Features Grid -->
      <section class="about-section">
        <h2 class="section-title">Why Choose FileOnix?</h2>
        <div class="features-grid">
          <div class="feature-box">
            <div class="feature-icon"><Lock :size="48" :stroke-width="1.5" /></div>
            <h3>100% Private</h3>
            <p>All conversions happen in your browser. Your files never leave your device, ensuring complete privacy and security.</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon"><Zap :size="48" :stroke-width="1.5" /></div>
            <h3>Lightning Fast</h3>
            <p>No upload or download time. Instant conversions powered by modern browser technology.</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon"><Palette :size="48" :stroke-width="1.5" /></div>
            <h3>Multiple Formats</h3>
            <p>Convert between PNG, JPG, WebP, GIF, and more with adjustable quality settings.</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon"><Package :size="48" :stroke-width="1.5" /></div>
            <h3>Batch Processing</h3>
            <p>Convert multiple images at once with our powerful batch processing capabilities.</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon"><Ruler :size="48" :stroke-width="1.5" /></div>
            <h3>Resize & Optimize</h3>
            <p>Resize images and optimize file sizes while maintaining quality.</p>
          </div>
          <div class="feature-box">
            <div class="feature-icon"><DollarSign :size="48" :stroke-width="1.5" /></div>
            <h3>Free Forever</h3>
            <p>No subscriptions, no limits, no watermarks. Completely free to use.</p>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="about-section">
        <h2 class="section-title">How It Works</h2>
        <p class="section-text">
          FileOnix leverages the power of modern web browsers to perform image conversions entirely on your device. When you select an image, it's processed using HTML5 Canvas API and JavaScript, allowing us to convert, resize, and optimize your images without any server interaction.
        </p>
        <div class="steps-container">
          <div class="step-box">
            <div class="step-number">1</div>
            <h4>Select Files</h4>
            <p>Drag and drop or click to browse your images</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step-box">
            <div class="step-number">2</div>
            <h4>Choose Settings</h4>
            <p>Select format, quality, and resize options</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step-box">
            <div class="step-number">3</div>
            <h4>Convert</h4>
            <p>Instant local processing in your browser</p>
          </div>
          <div class="step-arrow">→</div>
          <div class="step-box">
            <div class="step-number">4</div>
            <h4>Download</h4>
            <p>Get your converted files immediately</p>
          </div>
        </div>
      </section>

      <!-- Technology -->
      <section class="about-section">
        <h2 class="section-title">Built With Modern Technology</h2>
        <p class="section-text">
          FileOnix is built using cutting-edge web technologies to deliver the best possible experience:
        </p>
        <ul class="tech-list">
          <li><strong>Vue 3</strong> - Progressive JavaScript framework for building user interfaces</li>
          <li><strong>HTML5 Canvas API</strong> - For high-quality image processing</li>
          <li><strong>Modern CSS</strong> - Beautiful, responsive design that works on all devices</li>
          <li><strong>Client-Side Processing</strong> - Zero server dependency for maximum privacy</li>
        </ul>
      </section>

      <!-- Commitment -->
      <section class="about-section">
        <h2 class="section-title">Our Commitment</h2>
        <p class="section-text">
          We are committed to:
        </p>
        <ul class="commitment-list">
          <li class="commitment-item"><Check :size="20" :stroke-width="2" class="commitment-check" /> Keeping the service <strong>100% free</strong> forever</li>
          <li class="commitment-item"><Check :size="20" :stroke-width="2" class="commitment-check" /> Never uploading or storing your files</li>
          <li class="commitment-item"><Check :size="20" :stroke-width="2" class="commitment-check" /> Maintaining <strong>complete transparency</strong> in how we operate</li>
          <li class="commitment-item"><Check :size="20" :stroke-width="2" class="commitment-check" /> Continuously <strong>improving</strong> the service based on user feedback</li>
          <li class="commitment-item"><Check :size="20" :stroke-width="2" class="commitment-check" /> Respecting your <strong>privacy</strong> and data rights</li>
          <li class="commitment-item"><Check :size="20" :stroke-width="2" class="commitment-check" /> Providing <strong>excellent support</strong> to our users</li>
        </ul>
      </section>

      <!-- Contact CTA -->
      <section class="about-section cta-section">
        <h2 class="section-title">Get in Touch</h2>
        <p class="section-text">
          Have questions, feedback, or suggestions? We'd love to hear from you!
        </p>
        <router-link to="/contact" class="cta-button">
          Contact Us
        </router-link>
      </section>
    </div>
  </div>
</template>

<script>
import { FolderOpen, Lock, Zap, Palette, Package, Ruler, DollarSign, Check } from 'lucide-vue-next'

export default {
  name: 'About',
  components: {
    FolderOpen,
    Lock,
    Zap,
    Palette,
    Package,
    Ruler,
    DollarSign,
    Check
  }
}
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: var(--spacing-2xl) 0;
}

.about-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

/* Hero Section */
.about-hero {
  text-align: center;
  padding: var(--spacing-2xl) 0;
  margin-bottom: var(--spacing-2xl);
  animation: fadeIn 0.6s ease-out;
}

.hero-icon {
  display: inline-flex;
  color: var(--color-primary);
  margin-bottom: var(--spacing-lg);
  filter: drop-shadow(0 4px 12px rgba(193, 120, 85, 0.3));
  animation: pulse 2s ease-in-out infinite;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.03em;
}

.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3));
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  color: var(--text-secondary);
  font-weight: 500;
}

/* Sections */
.about-section {
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  transition: all var(--transition-base);
  animation: slideInRight 0.6s ease-out;
}

.about-section:hover {
  border-color: var(--color-primary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.section-title {
  font-size: clamp(1.75rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.section-text {
  font-size: 1.05rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-md);
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.feature-box {
  background: var(--bg-secondary);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  text-align: center;
  transition: all var(--transition-base);
  border: 1px solid var(--border-color);
}

.feature-box:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
  background: var(--bg-tertiary);
}

.feature-icon {
  display: inline-flex;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.feature-box h3 {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.feature-box p {
  color: var(--text-secondary);
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Steps Container */
.steps-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--spacing-xl);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.step-box {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-lg);
  border-radius: var(--radius-xl);
  text-align: center;
  flex: 1;
  min-width: 150px;
  box-shadow: var(--shadow-glow);
  transition: all var(--transition-base);
}

.step-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.step-number {
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0 auto var(--spacing-md);
}

.step-box h4 {
  font-size: 1.1rem;
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.step-box p {
  font-size: 0.9rem;
  opacity: 0.95;
}

.step-arrow {
  font-size: 2rem;
  color: var(--color-primary);
  font-weight: bold;
}

/* Lists */
.tech-list,
.commitment-list {
  margin-top: var(--spacing-lg);
  padding-left: var(--spacing-lg);
}

.tech-list li,
.commitment-list li {
  list-style: none;
}

.commitment-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-sm);
  font-size: 1.05rem;
}

.commitment-check {
  color: var(--color-primary);
  flex-shrink: 0;
}

.tech-list strong,
.commitment-list strong {
  color: var(--text-primary);
  font-weight: 700;
}

/* CTA Section */
.cta-section {
  background: var(--gradient-primary);
  color: white;
  text-align: center;
  box-shadow: var(--shadow-glow);
}

.cta-section:hover {
  transform: translateY(-4px);
}

.cta-section .section-title {
  color: white;
}

.cta-section .section-text {
  color: rgba(255, 255, 255, 0.95);
}

.cta-button {
  display: inline-block;
  background: white;
  color: var(--color-primary);
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  margin-top: var(--spacing-md);
  transition: all var(--transition-base);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  color: var(--color-primary-dark);
}

/* Responsive */
@media (max-width: 768px) {
  .about-page {
    padding: var(--spacing-lg) 0;
  }

  .about-container {
    padding: 0 var(--spacing-md);
  }

  .hero-icon {
    font-size: 4rem;
  }

  .about-section {
    padding: var(--spacing-lg);
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .steps-container {
    flex-direction: column;
  }

  .step-arrow {
    transform: rotate(90deg);
  }
}
</style>
