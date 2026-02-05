<template>
  <div class="blog-post">
    <div class="container">
      <button class="back-button" @click="$router.push('/blog')">← Back to Blog</button>
      
      <div class="content-layout">
        <article class="post">
          <div class="post-header">
            <span class="post-category">{{ post.category }}</span>
            <h1 class="post-title">{{ post.title }}</h1>
            <div class="post-meta">
              <span class="post-author">By {{ post.author }}</span>
              <span class="post-date">{{ post.date }}</span>
              <span class="post-reading-time">5 min read</span>
            </div>
          </div>

          <div class="post-image">
            <img :src="post.image" :alt="post.title">
          </div>

          <div class="post-content">
            <p>{{ post.excerpt }}</p>

            <h2>Introduction</h2>
            <p>In today's digital landscape, the ability to convert and optimize media files is essential. Whether you're a content creator, web developer, or digital marketer, having the right image and video conversion tools can save you hours of work and significantly improve your workflow. This comprehensive guide covers the best tools available in 2026, ranging from free online converters to professional-grade software solutions.</p>

            <h2>Why Media Conversion Matters</h2>
            <p>Different platforms and devices require different file formats and specifications. Converting your media files ensures compatibility, reduces file sizes for faster loading times, and maintains quality across various platforms. From converting images for web optimization to transcoding videos for social media, the right tools make all the difference.</p>

            <h2>Top Image Conversion Tools</h2>
            <h3>Online Converters</h3>
            <ul>
              <li><strong>CloudConvert</strong> - Supports over 200 formats with batch processing capabilities</li>
              <li><strong>Convertio</strong> - Browser-based converter with no installation required</li>
              <li><strong>TinyPNG</strong> - Specialized in PNG and JPEG compression with excellent quality retention</li>
              <li><strong>Squoosh</strong> - Google's advanced image compression tool with real-time preview</li>
            </ul>

            <h3>Desktop Software</h3>
            <ul>
              <li><strong>Adobe Photoshop</strong> - Industry standard with extensive format support and advanced editing</li>
              <li><strong>GIMP</strong> - Free, open-source alternative with powerful conversion features</li>
              <li><strong>XnConvert</strong> - Batch processing tool supporting over 500 formats</li>
            </ul>

            <h2>Best Video Conversion Tools</h2>
            <h3>Professional Solutions</h3>
            <ul>
              <li><strong>HandBrake</strong> - Free, open-source video transcoder with preset optimizations</li>
              <li><strong>FFmpeg</strong> - Command-line tool for advanced users with unlimited flexibility</li>
              <li><strong>Adobe Media Encoder</strong> - Professional-grade encoder integrated with Creative Cloud</li>
              <li><strong>DaVinci Resolve</strong> - Free version includes powerful encoding capabilities</li>
            </ul>

            <h3>Quick Online Tools</h3>
            <ul>
              <li><strong>Cloudinary</strong> - AI-powered media optimization and delivery platform</li>
              <li><strong>Online Video Converter</strong> - Simple interface for common format conversions</li>
              <li><strong>Zamzar</strong> - Supports video, audio, and image conversions in one platform</li>
            </ul>

            <h2>Key Features to Look For</h2>
            <ul>
              <li><strong>Batch Processing</strong> - Convert multiple files simultaneously to save time</li>
              <li><strong>Quality Presets</strong> - Pre-configured settings for common use cases</li>
              <li><strong>Format Support</strong> - Wide range of input and output formats</li>
              <li><strong>Compression Options</strong> - Balance between file size and quality</li>
              <li><strong>Speed</strong> - Hardware acceleration for faster processing</li>
              <li><strong>Privacy</strong> - Local processing or secure cloud handling</li>
            </ul>

            <blockquote>
              "The right conversion tool can reduce file sizes by up to 80% while maintaining visual quality, dramatically improving website performance and user experience."
            </blockquote>

            <h2>Best Practices for Media Conversion</h2>
            <p>When converting images and videos, always keep the original files as backups. Choose the appropriate format based on your needs: WebP for modern web images, MP4 for universal video compatibility, or PNG for images requiring transparency. Consider using progressive JPEGs for better perceived loading performance on websites.</p>

            <p>For video content, pay attention to codec selection, bitrate settings, and resolution. The H.264 codec remains the most compatible choice, while H.265 (HEVC) offers better compression for newer platforms. Always preview your converted files before publishing to ensure quality meets your standards.</p>

            <h2>Emerging Trends in 2026</h2>
            <p>AI-powered conversion tools are revolutionizing the industry with intelligent upscaling, automatic format selection, and content-aware compression. Cloud-based solutions now offer real-time conversion APIs that integrate seamlessly with content management systems and workflow automation tools. The rise of WebP, AVIF, and AV1 formats continues to push the boundaries of compression efficiency.</p>

            <h2>Conclusion</h2>
            <p>Whether you need a simple online converter for occasional use or a professional suite for daily media processing, there's a tool that fits your needs. Start with free options like HandBrake or Squoosh, and upgrade to professional solutions as your requirements grow. The investment in the right conversion tools will pay dividends in improved workflow efficiency and better quality output.</p>
          </div>

          <div class="post-footer">
            <div class="tags">
              <span class="tag">Media Conversion</span>
              <span class="tag">Image Optimization</span>
              <span class="tag">Video Tools</span>
            </div>
            <div class="share-buttons">
              <button class="share-btn">Share on Twitter</button>
              <button class="share-btn">Share on Facebook</button>
            </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="sidebar">
          <!-- Success Message -->
          <div v-if="showSuccessMessage" class="success-message">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <div class="success-content">
              <h4>Thanks for your comment!</h4>
              <p>Your comment has been submitted for review.</p>
            </div>
          </div>

          <div class="sidebar-section">
            <h3 class="sidebar-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              Latest in {{ post.category }}
            </h3>
            <div class="related-posts">
              <div
                v-for="relatedPost in relatedPosts"
                :key="relatedPost.id"
                class="related-post-card"
                @click="viewPost(relatedPost)"
              >
                <div class="related-post-image">
                  <img :src="relatedPost.image" :alt="relatedPost.title">
                </div>
                <div class="related-post-content">
                  <span class="related-post-category">{{ relatedPost.category }}</span>
                  <h4 class="related-post-title">{{ relatedPost.title }}</h4>
                  <span class="related-post-date">{{ relatedPost.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Comment Toggle Button -->
      <div class="comment-toggle-container">
        <button class="comment-toggle-btn" @click="toggleCommentSection">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          {{ showComments ? 'Hide Comments' : 'Leave a Comment' }}
        </button>
      </div>

      <!-- Simple Comment Section -->
      <div class="comment-section-simple" v-if="showComments">
        <h3 class="comment-section-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
          Leave a Comment
        </h3>
        <form class="simple-comment-form" @submit.prevent="addComment">
          <div class="form-row">
            <input type="text" class="form-input" placeholder="Your name" v-model="newComment.author" required>
            <input type="email" class="form-input" placeholder="Your email" v-model="newComment.email" required>
          </div>
          <textarea class="form-textarea" placeholder="Write your comment here..." v-model="newComment.text" required></textarea>
          <button type="submit" class="submit-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Post Comment
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  data() {
    return {
      post: {
        id: 1,
        title: 'The Ultimate Guide to Image & Video Conversion Tools (2026 Edition)',
        excerpt: 'Explore the best image and video conversion tools available in 2026, from basic format converters to advanced editing solutions.',
        author: 'Sarah Johnson',
        date: 'Feb 3, 2026',
        category: 'Tools',
        image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1200'
      },
      showComments: false,
      showSuccessMessage: false,
      newComment: {
        author: '',
        email: '',
        text: ''
      },
      relatedPosts: [
        {
          id: 7,
          title: 'Top 10 Developer Tools for 2026',
          date: 'Feb 1, 2026',
          category: 'Tools',
          image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 8,
          title: 'Best Code Editors and IDEs',
          date: 'Jan 29, 2026',
          category: 'Tools',
          image: 'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 9,
          title: 'Essential Browser DevTools Tips',
          date: 'Jan 27, 2026',
          category: 'Tools',
          image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 10,
          title: 'Git Workflow Best Practices',
          date: 'Jan 25, 2026',
          category: 'Tools',
          image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ]
    }
  },
  methods: {
    toggleCommentSection() {
      this.showComments = !this.showComments
    },
    addComment() {
      // Show success message in sidebar
      this.showSuccessMessage = true

      // Clear form
      this.newComment.author = ''
      this.newComment.email = ''
      this.newComment.text = ''

      // Hide comment section and scroll to top
      this.showComments = false
      window.scrollTo({ top: 0, behavior: 'smooth' })

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        this.showSuccessMessage = false
      }, 5000)
    },
    viewPost(post) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.$router.push({ name: 'BlogPost', params: { id: post.id } })
    }
  }
}
</script>

<style scoped>
.blog-post {
  min-height: 100vh;
  padding: 1rem 0;
  background: var(--bg-primary);
}

.container {
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 0 1rem;
}

.content-layout {
  display: grid;
  grid-template-columns: 1fr 480px;
  gap: 1rem;
  align-items: start;
}

.back-button {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  transition: all var(--transition-base);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.back-button:hover {
  background: var(--bg-tertiary);
  border-color: var(--color-primary);
  transform: translateX(-4px);
}

.post {
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-xl);
  transition: all var(--transition-base);
}

.post-header {
  margin-bottom: var(--spacing-xl);
}

.post-category {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  box-shadow: var(--shadow-glow);
}

.post-title {
  font-size: clamp(2rem, 5vw, 2.5rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  line-height: 1.2;
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
}

.post-meta {
  display: flex;
  gap: var(--spacing-lg);
  font-size: 0.9rem;
  color: var(--text-muted);
  flex-wrap: wrap;
}

.post-author {
  font-weight: 600;
  color: var(--text-secondary);
}

.post-reading-time {
  color: var(--text-muted);
}

.post-image {
  width: 100%;
  height: 450px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--spacing-xl);
  box-shadow: var(--shadow-lg);
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  line-height: 1.8;
  color: var(--text-secondary);
}

.post-content h2 {
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  color: var(--text-primary);
  margin: var(--spacing-xl) 0 var(--spacing-md);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--border-color);
}

.post-content h3 {
  font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  color: var(--text-primary);
  margin: var(--spacing-lg) 0 var(--spacing-sm);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.post-content p {
  margin-bottom: var(--spacing-lg);
  font-size: 1.05rem;
}

.post-content ul {
  margin: var(--spacing-lg) 0;
  padding-left: var(--spacing-xl);
}

.post-content li {
  margin-bottom: var(--spacing-sm);
  color: var(--text-secondary);
}

.post-content blockquote {
  border-left: 4px solid var(--color-primary);
  padding-left: var(--spacing-lg);
  margin: var(--spacing-xl) 0;
  font-style: italic;
  color: var(--text-secondary);
  font-size: 1.15rem;
  background: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-md);
}

.post-content strong {
  color: var(--text-primary);
  font-weight: 700;
}

.post-footer {
  margin-top: 1rem;
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--border-color);
}

.tags {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.tag {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;
  transition: all var(--transition-base);
}

.tag:hover {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
}

.share-buttons {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.share-btn {
  padding: var(--spacing-sm) var(--spacing-lg);
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
}

.share-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

/* Comment Toggle Button */
.comment-toggle-container {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.comment-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md) 1rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: 1.05rem;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-lg);
}

.comment-toggle-btn:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-glow);
}

.comment-toggle-btn svg {
  flex-shrink: 0;
}

/* Simple Comment Section */
.comment-section-simple {
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  padding: 1rem;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
  margin-top: 1rem;
}

.comment-section-title {
  font-size: clamp(1.5rem, 3vw, 1.8rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.comment-section-title svg {
  color: var(--color-primary);
}

.simple-comment-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-md);
}

.form-input {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: inherit;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all var(--transition-base);
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.form-textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-family: inherit;
  background: var(--bg-secondary);
  color: var(--text-primary);
  transition: all var(--transition-base);
  min-height: 140px;
  resize: vertical;
}

.form-textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.submit-btn {
  padding: var(--spacing-sm) 1rem;
  background: var(--gradient-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-glow);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  align-self: flex-start;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.submit-btn svg {
  flex-shrink: 0;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: var(--spacing-lg);
}

/* Success Message */
.success-message {
  background: linear-gradient(135deg, #C17855, #D4A574);
  color: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: var(--shadow-glow);
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
  animation: slideInRight 0.5s ease-out;
}

.success-message svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.success-content h4 {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 var(--spacing-xs);
  color: white;
}

.success-content p {
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.95;
  color: white;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.sidebar-section {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
  border: 1px solid var(--border-color);
  box-shadow: var(--shadow-lg);
}

.sidebar-title {
  font-size: 1rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--border-color);
}

.sidebar-title svg {
  color: var(--color-primary);
}

.related-posts {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.related-post-card {
  display: flex;
  gap: var(--spacing-sm);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  border: 1px solid transparent;
}

.related-post-card:hover {
  background: var(--bg-secondary);
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.related-post-image {
  width: 120px;
  height: 100px;
  flex-shrink: 0;
  border-radius: var(--radius-sm);
  overflow: hidden;
}

.related-post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.related-post-card:hover .related-post-image img {
  transform: scale(1.1);
}

.related-post-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.related-post-category {
  font-size: 0.7rem;
  color: var(--color-primary);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.related-post-title {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-post-date {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: auto;
}

/* Responsive */
@media (max-width: 1024px) {
  .content-layout {
    grid-template-columns: 1fr;
  }

  .sidebar {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .blog-post {
    padding: var(--spacing-lg) 0;
  }

  .container {
    padding: 0 var(--spacing-md);
  }

  .post {
    padding: var(--spacing-lg);
  }

  .post-image {
    height: 250px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .comment-toggle-btn {
    padding: var(--spacing-sm) var(--spacing-xl);
    font-size: 0.95rem;
  }
}
</style>
