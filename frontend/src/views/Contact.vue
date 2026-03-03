<template>
  <div class="contact">
    <div class="container">
      <div class="contact-header">
        <h1 class="page-title">Get In Touch</h1>
        <p class="page-subtitle">We'd love to hear from you. Send us a message!</p>
      </div>

      <div class="contact-content">
        <!-- Contact Form -->
        <div class="form-section">
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name" class="form-label">Your Name</label>
              <input 
                type="text" 
                id="name"
                class="form-input" 
                placeholder="John Doe" 
                v-model="form.name"
                required
              >
            </div>

            <div class="form-group">
              <label for="email" class="form-label">Email Address</label>
              <input 
                type="email" 
                id="email"
                class="form-input" 
                placeholder="john@example.com" 
                v-model="form.email"
                required
              >
            </div>

            <div class="form-group">
              <label for="phone" class="form-label">Phone Number</label>
              <input 
                type="tel" 
                id="phone"
                class="form-input" 
                placeholder="+1 (555) 123-4567" 
                v-model="form.phone"
              >
            </div>

            <div class="form-group">
              <label for="subject" class="form-label">Subject</label>
              <select 
                id="subject"
                class="form-input" 
                v-model="form.subject"
                required
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message" class="form-label">Message</label>
              <textarea 
                id="message"
                class="form-textarea" 
                placeholder="Tell us what's on your mind..." 
                v-model="form.message"
                required
              ></textarea>
            </div>

            <div class="form-group">
              <label class="checkbox-label">
                <input 
                  type="checkbox" 
                  v-model="form.newsletter"
                  class="checkbox-input"
                >
                <span>Subscribe to our newsletter</span>
              </label>
            </div>

            <button type="submit" class="submit-btn">
              Send Message
            </button>

            <div v-if="submitted" class="success-message">
              <Check :size="20" class="success-icon" /> Thank you! Your message has been sent successfully.
            </div>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="info-section">
          <div class="info-card">
            <div class="info-icon"><MapPin :size="48" :stroke-width="1.5" /></div>
            <h3 class="info-title">Visit Us</h3>
            <p class="info-text">Online-only service<br>Available worldwide</p>
          </div>

          <div class="info-card">
            <div class="info-icon"><Mail :size="48" :stroke-width="1.5" /></div>
            <h3 class="info-title">Email Us</h3>
            <p class="info-text">
              <a href="mailto:info@fileonix.com">info@fileonix.com</a><br>
              <a href="mailto:support@fileonix.com">support@fileonix.com</a>
            </p>
          </div>

          <div class="info-card">
            <div class="info-icon"><Phone :size="48" :stroke-width="1.5" /></div>
            <h3 class="info-title">Support</h3>
            <p class="info-text">
              <a href="mailto:support@fileonix.com">support@fileonix.com</a><br>
              Response within 24 hours
            </p>
          </div>

          <div class="info-card">
            <div class="info-icon"><Globe :size="48" :stroke-width="1.5" /></div>
            <h3 class="info-title">Follow Us</h3>
            <div class="social-links">
              <a href="https://twitter.com/fileonix" target="_blank" rel="noopener" class="social-link">Twitter</a>
              <a href="https://github.com/fileonix" target="_blank" rel="noopener" class="social-link">GitHub</a>
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="faq-section">
        <h2 class="section-title">Frequently Asked Questions</h2>
        <div class="faq-grid">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index"
            class="faq-item"
            @click="toggleFaq(index)"
          >
            <div class="faq-question">
              <span>{{ faq.question }}</span>
              <span class="faq-toggle">{{ openFaq === index ? '−' : '+' }}</span>
            </div>
            <div class="faq-answer" v-if="openFaq === index">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { MapPin, Mail, Phone, Globe, Check, Send } from 'lucide-vue-next'

export default {
  name: 'Contact',
  components: {
    MapPin,
    Mail,
    Phone,
    Globe,
    Check,
    Send
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      },
      submitted: false,
      openFaq: null,
      faqs: [
        {
          question: 'How do I convert an image?',
          answer: 'Simply go to the home page, drag and drop your image (or click to browse), choose your desired output format and quality settings, then click Convert. Your file will be processed instantly in your browser.'
        },
        {
          question: 'How quickly do you respond to inquiries?',
          answer: 'We aim to respond to all email inquiries within 24 hours. Use the contact form above or email us directly at support@fileonix.com.'
        },
        {
          question: 'Are my files uploaded to your servers?',
          answer: 'No. FileOnix processes all conversions locally in your browser using the HTML5 Canvas API. Your files never leave your device and we have zero access to them.'
        },
        {
          question: 'What image formats are supported?',
          answer: 'FileOnix supports PNG, JPG/JPEG, WebP, and GIF formats for both input and output. You can also resize images and adjust quality settings during conversion.'
        },
        {
          question: 'Is FileOnix really free?',
          answer: 'Yes, FileOnix is completely free with no subscriptions, no limits, and no watermarks. We display ads via Google AdSense to keep the service free for everyone.'
        },
        {
          question: 'What should I include in my support request?',
          answer: 'Please describe the issue clearly, including which browser and device you are using, the image format you are trying to convert, and any error messages you see.'
        }
      ]
    }
  },
  methods: {
    submitForm() {
      const subject = encodeURIComponent(`[FileOnix Contact] ${this.form.subject || 'General Inquiry'}`)
      const body = encodeURIComponent(
        `Name: ${this.form.name}\nEmail: ${this.form.email}\nPhone: ${this.form.phone || 'N/A'}\n\nMessage:\n${this.form.message}`
      )
      window.location.href = `mailto:info@fileonix.com?subject=${subject}&body=${body}`
      this.submitted = true
      setTimeout(() => {
        this.submitted = false
        this.form = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          newsletter: false
        }
      }, 3000)
    },
    toggleFaq(index) {
      this.openFaq = this.openFaq === index ? null : index
    }
  }
}
</script>

<style scoped>
.contact {
  min-height: 100vh;
  padding: var(--spacing-2xl) 0;
  background: var(--bg-primary);
}

.container {
  max-width: 1300px;
  width: 95%;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.contact-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  animation: fadeIn 0.6s ease-out;
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
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

.page-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  font-weight: 500;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
  animation: slideInRight 0.6s ease-out 0.2s both;
}

/* ================================
   COMPREHENSIVE RESPONSIVE DESIGN
   ================================ */

/* Tablet Landscape - 1024px and below */
@media (max-width: 1024px) {
  .container {
    max-width: 960px;
    padding: 0 var(--spacing-md);
  }

  .contact-content {
    gap: var(--spacing-lg);
  }

  .info-card {
    padding: var(--spacing-lg);
  }

  .faq-section {
    padding: var(--spacing-lg);
  }
}

/* Tablet Portrait - 768px and below */
@media (max-width: 768px) {
  .container {
    padding: 0 var(--spacing-sm);
  }

  .contact {
    padding: var(--spacing-xl) 0;
  }

  .contact-header {
    margin-bottom: var(--spacing-xl);
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .contact-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-xl);
  }

  .contact-form {
    padding: var(--spacing-lg);
  }

  .form-group {
    margin-bottom: var(--spacing-md);
  }

  .form-label {
    font-size: 0.95rem;
  }

  .form-input,
  .form-textarea {
    padding: 12px;
    font-size: 0.95rem;
  }

  .form-textarea {
    min-height: 120px;
  }

  .submit-btn {
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 1rem;
  }

  .info-card {
    padding: var(--spacing-md);
  }

  .info-icon svg {
    width: 40px;
    height: 40px;
  }

  .info-title {
    font-size: 1.2rem;
  }

  .info-text {
    font-size: 0.95rem;
  }

  .faq-section {
    padding: var(--spacing-md);
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-lg);
  }

  .faq-grid {
    gap: var(--spacing-sm);
  }

  .faq-item {
    padding: var(--spacing-md);
  }

  .faq-question {
    font-size: 1rem;
  }

  .faq-toggle {
    font-size: 1.35rem;
  }

  .faq-answer {
    margin-top: var(--spacing-sm);
    padding-top: var(--spacing-sm);
    font-size: 0.9rem;
  }
}

/* Mobile Portrait - 480px and below */
@media (max-width: 480px) {
  .contact {
    padding: var(--spacing-lg) 0;
  }

  .contact-header {
    margin-bottom: var(--spacing-lg);
  }

  .page-title {
    font-size: 1.75rem;
    margin-bottom: 8px;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }

  .contact-content {
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
  }

  .contact-form {
    padding: var(--spacing-md);
  }

  .form-group {
    margin-bottom: var(--spacing-sm);
  }

  .form-label {
    font-size: 0.9rem;
    margin-bottom: 8px;
  }

  .form-input,
  .form-textarea {
    padding: 10px 12px;
    font-size: 0.9rem;
  }

  .form-textarea {
    min-height: 100px;
  }

  .checkbox-label {
    font-size: 0.85rem;
    gap: 8px;
  }

  .checkbox-input {
    width: 16px;
    height: 16px;
  }

  .submit-btn {
    padding: 12px var(--spacing-md);
    font-size: 0.95rem;
  }

  .success-message {
    padding: 12px;
    font-size: 0.9rem;
    gap: 8px;
  }

  .success-icon {
    width: 18px;
    height: 18px;
  }

  .info-section {
    gap: var(--spacing-md);
  }

  .info-card {
    padding: var(--spacing-md);
  }

  .info-icon svg {
    width: 36px;
    height: 36px;
  }

  .info-title {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }

  .info-text {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .social-links {
    gap: 8px;
  }

  .social-link {
    padding: 8px 12px;
    font-size: 0.85rem;
  }

  .faq-section {
    padding: var(--spacing-md);
  }

  .section-title {
    font-size: 1.35rem;
    margin-bottom: var(--spacing-md);
  }

  .faq-grid {
    gap: 10px;
  }

  .faq-item {
    padding: 12px;
  }

  .faq-question {
    font-size: 0.9rem;
    gap: 10px;
  }

  .faq-toggle {
    font-size: 1.25rem;
    min-width: 20px;
  }

  .faq-answer {
    margin-top: 10px;
    padding-top: 10px;
    font-size: 0.85rem;
    line-height: 1.5;
  }
}

/* Extra Small Mobile - 360px and below */
@media (max-width: 360px) {
  .page-title {
    font-size: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .contact-form,
  .info-card,
  .faq-section {
    padding: 12px;
  }

  .form-input,
  .form-textarea,
  .submit-btn {
    font-size: 0.85rem;
  }

  .info-title,
  .faq-question {
    font-size: 1rem;
  }

  .social-links {
    flex-direction: column;
    align-items: stretch;
  }

  .social-link {
    width: 100%;
    text-align: center;
  }
}

.form-section,
.info-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.contact-form {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  transition: all var(--transition-base);
}

.contact-form:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-xl);
}

.form-group {
  margin-bottom: var(--spacing-lg);
}

.form-label {
  display: block;
  margin-bottom: var(--spacing-sm);
  font-weight: 600;
  color: var(--text-secondary);
  font-family: 'Poppins', sans-serif;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: inherit;
  transition: all var(--transition-base);
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.form-input:hover {
  border-color: var(--border-light);
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-textarea {
  min-height: 150px;
  resize: vertical;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: pointer;
  color: var(--text-secondary);
}

.checkbox-input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--color-primary);
}

.submit-btn {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-xl);
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-glow);
}

.submit-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.success-message {
  margin-top: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--color-success);
  color: white;
  border-radius: var(--radius-md);
  text-align: center;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  animation: scaleIn 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.success-icon {
  flex-shrink: 0;
}

.info-card {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  text-align: center;
  transition: all var(--transition-base);
}

.info-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-xl);
}

.info-icon {
  display: inline-flex;
  color: var(--color-primary);
  margin-bottom: var(--spacing-md);
}

.info-title {
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.info-text {
  color: var(--text-secondary);
  line-height: 1.8;
}

.info-text a {
  color: var(--color-primary-light);
  text-decoration: none;
  transition: color var(--transition-base);
}

.info-text a:hover {
  color: var(--color-primary);
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.social-link {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all var(--transition-base);
  border: 1px solid var(--border-color);
}

.social-link:hover {
  background: var(--gradient-primary);
  color: white;
  transform: translateY(-2px);
  border-color: transparent;
}

.faq-section {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-2xl);
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  animation: slideInLeft 0.6s ease-out 0.4s both;
}

.section-title {
  font-size: clamp(1.75rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.faq-grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.faq-item {
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  cursor: pointer;
  transition: all var(--transition-base);
  background: var(--bg-secondary);
}

.faq-item:hover {
  border-color: var(--color-primary);
  transform: translateX(8px);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  color: var(--text-primary);
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
}

.faq-toggle {
  font-size: 1.5rem;
  color: var(--color-primary);
  font-weight: 700;
}

.faq-answer {
  margin-top: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  line-height: 1.6;
  animation: fadeIn 0.3s ease-out;
}
</style>
