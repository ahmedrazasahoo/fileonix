<template>
  <div class="blog">
    <div class="container">
      <div class="blog-header">
        <h1 class="page-title">Blog</h1>
        <p class="page-subtitle">Read our latest articles and insights</p>
      </div>

      <!-- Featured Slider -->
      <div class="featured-slider">
        <div class="slider-container">
          <div
            class="featured-post"
            v-for="(post, index) in featuredPosts"
            :key="post.id"
            :class="{ active: currentSlide === index }"
            @click="viewPost(post)"
            :style="{ backgroundImage: 'url(' + post.image + ')' }"
          >
            <div class="featured-content">
              <span class="post-category">{{ post.category }}</span>
              <h2 class="featured-title">{{ post.title }}</h2>
              <p class="featured-excerpt">{{ post.excerpt }}</p>
              <div class="post-meta">
                <span class="post-author">By {{ post.author }}</span>
                <span class="post-date">{{ post.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="slider-dots">
          <button 
            v-for="(post, index) in featuredPosts" 
            :key="index"
            :class="['dot', { active: currentSlide === index }]"
            @click="goToSlide(index)"
            :aria-label="`Go to slide ${index + 1}`"
          ></button>
        </div>
      </div>

      <!-- Filter and Search Bar -->
      <div class="filter-search-bar">
        <div class="filter-section">
          <div class="filter-item">
            <button class="filter-btn" @click="toggleSortDropdown">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 6h18M7 12h10m-7 6h4"></path>
              </svg>
              <span>Sort: {{ getSortLabel }}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div v-if="showSortDropdown" class="dropdown">
              <div class="dropdown-item" @click="selectSort('latest')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                Latest
              </div>
              <div class="dropdown-item" @click="selectSort('oldest')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 8 14"></polyline>
                </svg>
                Oldest
              </div>
              <div class="dropdown-item" @click="selectSort('popular')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
                Most Popular
              </div>
              <div class="dropdown-item" @click="selectSort('title')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="21" y1="10" x2="3" y2="10"></line>
                  <line x1="21" y1="6" x2="3" y2="6"></line>
                  <line x1="21" y1="14" x2="3" y2="14"></line>
                  <line x1="21" y1="18" x2="3" y2="18"></line>
                </svg>
                Title (A-Z)
              </div>
            </div>
          </div>

          <div class="filter-item">
            <button class="filter-btn" @click="toggleCategoryDropdown">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span>{{ selectedCategory }}</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            <div v-if="showCategoryDropdown" class="dropdown">
              <div class="dropdown-item" @click="selectCategory('All')">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                </svg>
                All Categories
              </div>
              <div class="dropdown-item" v-for="cat in uniqueCategories" :key="cat" @click="selectCategory(cat)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                </svg>
                {{ cat }}
              </div>
            </div>
          </div>
        </div>

        <div class="search-section">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search articles..."
            class="search-input"
          >
          <button class="search-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="posts-section">
        <div class="section-header">
          <h2 class="section-title">All Articles</h2>
          <span class="results-count">{{ filteredPosts.length }} articles found</span>
        </div>

        <div class="posts-grid" v-if="paginatedPosts.length > 0">
          <div 
            v-for="post in paginatedPosts" 
            :key="post.id" 
            class="post-card"
            @click="viewPost(post)"
          >
            <div class="post-image">
              <img :src="post.image" :alt="post.title">
            </div>
            <div class="post-content">
              <span class="post-category">{{ post.category }}</span>
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <div class="post-meta">
                <span class="post-author">{{ post.author }}</span>
                <span class="post-date">{{ post.date }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="no-results">
          <h3>No articles found</h3>
          <p>Try adjusting your search or filters</p>
        </div>

        <!-- Pagination -->
        <div class="pagination" v-if="totalPages > 1">
          <button
            class="pagination-btn prev-next-btn"
            @click="currentPage--"
            :disabled="currentPage === 1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            Previous
          </button>

          <button
            v-for="page in visiblePages"
            :key="page"
            :class="['pagination-btn', 'page-number', { active: currentPage === page }]"
            @click="currentPage = page"
          >
            {{ page }}
          </button>

          <button
            class="pagination-btn prev-next-btn"
            @click="currentPage++"
            :disabled="currentPage === totalPages"
          >
            Next
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      currentSlide: 0,
      selectedCategory: 'All',
      sortBy: 'latest',
      searchQuery: '',
      currentPage: 1,
      postsPerPage: 16,
      autoSlideInterval: null,
      showSortDropdown: false,
      showCategoryDropdown: false,
      posts: this.generatePosts(),
      featuredPostsData: [
        {
          id: 1,
          title: 'The Ultimate Guide to Image & Video Conversion Tools (2026 Edition)',
          excerpt: 'Explore the best image and video conversion tools available in 2026, from basic format converters to advanced editing solutions.',
          author: 'Sarah Johnson',
          date: 'Feb 3, 2026',
          category: 'Tools',
          image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 2,
          title: 'Modern CSS Techniques for Responsive Design',
          excerpt: 'Discover the latest CSS features and techniques to create stunning responsive designs.',
          author: 'Mike Chen',
          date: 'Jan 28, 2026',
          category: 'Design',
          image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 3,
          title: 'Building Scalable APIs with Node.js',
          excerpt: 'Best practices for designing and implementing RESTful APIs that scale with your application.',
          author: 'David Park',
          date: 'Jan 25, 2026',
          category: 'Backend',
          image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ]
    }
  },
  computed: {
    featuredPosts() {
      return this.featuredPostsData
    },
    uniqueCategories() {
      return ['Tools', 'Design', 'Backend', 'Performance', 'UX', 'DevOps']
    },
    getSortLabel() {
      const labels = {
        latest: 'Latest',
        oldest: 'Oldest',
        popular: 'Most Popular',
        title: 'Title (A-Z)'
      }
      return labels[this.sortBy] || 'Latest'
    },
    filteredPosts() {
      let filtered = this.posts

      // Category filter
      if (this.selectedCategory !== 'All') {
        filtered = filtered.filter(post => post.category === this.selectedCategory)
      }

      // Search filter
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase()
        filtered = filtered.filter(post => 
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.author.toLowerCase().includes(query)
        )
      }

      // Sorting
      const sorted = [...filtered]
      if (this.sortBy === 'latest') {
        sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
      } else if (this.sortBy === 'oldest') {
        sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
      } else if (this.sortBy === 'title') {
        sorted.sort((a, b) => a.title.localeCompare(b.title))
      }

      return sorted
    },
    totalPages() {
      return Math.ceil(this.filteredPosts.length / this.postsPerPage)
    },
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.postsPerPage
      const end = start + this.postsPerPage
      return this.filteredPosts.slice(start, end)
    },
    visiblePages() {
      const pages = []
      const totalPages = this.totalPages
      const current = this.currentPage

      if (totalPages <= 3) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        if (current === 1) {
          pages.push(1, 2, 3)
        } else if (current === totalPages) {
          pages.push(totalPages - 2, totalPages - 1, totalPages)
        } else {
          pages.push(current - 1, current, current + 1)
        }
      }

      return pages
    }
  },
  methods: {
    generatePosts() {
      const categories = ['Tools', 'Design', 'Backend', 'Performance', 'UX', 'DevOps']
      const authors = ['Sarah Johnson', 'Mike Chen', 'David Park', 'Emily Zhang', 'Lisa Anderson', 'Tom Wilson', 'Alex Rivera', 'Jessica Lee']
      const images = [
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]

      const titles = {
        Tools: [
          'The Ultimate Guide to Image & Video Conversion Tools',
          'Top 10 Developer Tools for 2026',
          'Best Code Editors and IDEs',
          'Essential Browser DevTools Tips',
          'Command Line Tools Every Developer Should Know',
          'Git Workflow Best Practices',
          'Package Managers Comparison Guide',
          'API Testing Tools Overview',
          'Debugging Tools and Techniques',
          'Build Tools for Modern Web Development',
          'Version Control Systems Explained',
          'Cloud Development Environments',
          'Code Quality Tools and Linters',
          'Documentation Generators Guide',
          'Performance Monitoring Tools',
          'Security Testing Tools',
          'Mobile Development Tools',
          'Database Management Tools',
          'CI/CD Pipeline Tools',
          'Container Orchestration Tools'
        ],
        Design: [
          'Modern CSS Techniques for Responsive Design',
          'UI/UX Design Trends for 2026',
          'Color Theory for Web Designers',
          'Typography Best Practices',
          'Design Systems and Component Libraries',
          'Figma Tips and Tricks',
          'Wireframing and Prototyping Guide',
          'Animation Principles for Web',
          'Mobile-First Design Strategies',
          'Grid and Flexbox Layouts',
          'Dark Mode Design Patterns',
          'Accessibility in Design',
          'Icon Design Guidelines',
          'Responsive Images and SVG',
          'Design Tokens Implementation',
          'Motion Design for Web',
          'Brand Identity in Digital Design',
          'Design Collaboration Tools',
          'User Interface Patterns',
          'Design Critique Best Practices'
        ],
        Backend: [
          'Building Scalable APIs with Node.js',
          'Microservices Architecture Explained',
          'RESTful API Design Principles',
          'GraphQL vs REST Comparison',
          'Database Design Best Practices',
          'Authentication and Authorization',
          'Caching Strategies for APIs',
          'Message Queues and Event-Driven Architecture',
          'Server-Side Rendering Techniques',
          'API Security Best Practices',
          'Load Balancing and Scaling',
          'Serverless Architecture Guide',
          'WebSocket Implementation',
          'Background Jobs and Workers',
          'API Rate Limiting Strategies',
          'Data Migration Techniques',
          'Backend Testing Strategies',
          'Logging and Monitoring',
          'API Versioning Best Practices',
          'Database Optimization Tips'
        ],
        Performance: [
          'JavaScript Performance Optimization Tips',
          'Web Performance Metrics That Matter',
          'Image Optimization Techniques',
          'Code Splitting and Lazy Loading',
          'Critical Rendering Path Optimization',
          'Browser Caching Strategies',
          'Webpack Bundle Optimization',
          'Lighthouse Performance Audits',
          'Core Web Vitals Guide',
          'CDN Configuration Best Practices',
          'Asset Compression Techniques',
          'Memory Leak Detection',
          'Runtime Performance Optimization',
          'Progressive Web App Performance',
          'Network Request Optimization',
          'Third-Party Script Management',
          'Font Loading Strategies',
          'CSS Performance Tips',
          'JavaScript Bundle Size Reduction',
          'Server Response Time Optimization'
        ],
        UX: [
          'UX Design Principles Every Developer Should Know',
          'User Research Methods and Techniques',
          'Usability Testing Best Practices',
          'Information Architecture Guide',
          'User Journey Mapping',
          'Interaction Design Patterns',
          'Accessibility Standards (WCAG)',
          'Mobile UX Best Practices',
          'Form Design and Validation',
          'Error Message Design',
          'Loading States and Skeletons',
          'Onboarding Flow Design',
          'Navigation Pattern Design',
          'Search Interface Design',
          'Empty States Design',
          'Feedback and Confirmation Patterns',
          'Progressive Disclosure Techniques',
          'Microinteractions in UX',
          'User Personas Creation',
          'A/B Testing for UX'
        ],
        DevOps: [
          'DevOps Best Practices for 2026',
          'Docker Containerization Guide',
          'Kubernetes Deployment Strategies',
          'CI/CD Pipeline Implementation',
          'Infrastructure as Code with Terraform',
          'Monitoring and Alerting Setup',
          'Cloud Migration Strategies',
          'Security in DevOps (DevSecOps)',
          'GitOps Workflow Guide',
          'Blue-Green Deployment Techniques',
          'Canary Releases Best Practices',
          'Log Aggregation and Analysis',
          'Secrets Management Solutions',
          'Disaster Recovery Planning',
          'Auto-Scaling Configuration',
          'Container Security Best Practices',
          'Site Reliability Engineering',
          'Configuration Management',
          'Cloud Cost Optimization',
          'Deployment Automation Tools'
        ]
      }

      const posts = []
      let id = 1

      categories.forEach(category => {
        for (let i = 0; i < 20; i++) {
          const date = new Date(2026, 0, 1)
          date.setDate(date.getDate() - id)

          posts.push({
            id: id++,
            title: titles[category][i],
            excerpt: `Comprehensive guide to ${titles[category][i].toLowerCase()}. Learn best practices and modern techniques.`,
            author: authors[Math.floor(Math.random() * authors.length)],
            date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            category: category,
            image: images[Math.floor(Math.random() * images.length)]
          })
        }
      })

      return posts
    },
    toggleSortDropdown() {
      this.showSortDropdown = !this.showSortDropdown
      this.showCategoryDropdown = false
    },
    toggleCategoryDropdown() {
      this.showCategoryDropdown = !this.showCategoryDropdown
      this.showSortDropdown = false
    },
    selectSort(sort) {
      this.sortBy = sort
      this.showSortDropdown = false
    },
    selectCategory(category) {
      this.selectedCategory = category
      this.showCategoryDropdown = false
    },
    viewPost(post) {
      this.$router.push({ name: 'BlogPost', params: { id: post.id } })
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.featuredPosts.length
      this.resetAutoSlide()
    },
    prevSlide() {
      this.currentSlide = this.currentSlide === 0 ? this.featuredPosts.length - 1 : this.currentSlide - 1
      this.resetAutoSlide()
    },
    goToSlide(index) {
      this.currentSlide = index
      this.resetAutoSlide()
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    resetAutoSlide() {
      clearInterval(this.autoSlideInterval)
      this.startAutoSlide()
    }
  },
  mounted() {
    this.startAutoSlide()
  },
  beforeUnmount() {
    clearInterval(this.autoSlideInterval)
  },
  watch: {
    selectedCategory() {
      this.currentPage = 1
    },
    searchQuery() {
      this.currentPage = 1
    },
    sortBy() {
      this.currentPage = 1
    }
  }
}
</script>

<style scoped>
.blog {
  min-height: 100vh;
  padding: var(--spacing-2xl) 0;
  background: var(--bg-primary);
}

.container {
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.blog-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
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
}

.page-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: var(--text-secondary);
  font-weight: 500;
}

/* Slider */
.featured-slider {
  position: relative;
  margin-bottom: var(--spacing-2xl);
  overflow: hidden;
  border-radius: var(--radius-2xl);
}

.slider-container {
  position: relative;
  height: 550px;
}

.featured-post {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.6s ease, visibility 0.6s ease;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
  cursor: pointer;
  display: flex;
  align-items: flex-end;
  position: relative;
}

.featured-post.active {
  opacity: 1;
  visibility: visible;
  z-index: 1;
}

.featured-content {
  padding: var(--spacing-2xl);
  width: 100%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.5) 60%, transparent 100%);
  z-index: 2;
}

.post-category {
  display: inline-block;
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--gradient-primary);
  color: white;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: var(--spacing-md);
  width: fit-content;
}

.featured-title {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  color: white;
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
}

.featured-excerpt {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.post-meta {
  display: flex;
  gap: var(--spacing-lg);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  padding-top: var(--spacing-sm);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.post-author {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

.slider-dots {
  position: absolute;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: var(--spacing-sm);
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: all var(--transition-base);
}

.dot.active {
  background: white;
  width: 32px;
  border-radius: 6px;
}

/* Filter and Search Bar */
.filter-search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
  background: var(--bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color);
  flex-wrap: wrap;
}

.filter-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.filter-item {
  position: relative;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: 'Poppins', sans-serif;
}

.filter-btn:hover {
  border-color: var(--color-primary);
  background: var(--bg-tertiary);
}

.filter-btn svg {
  flex-shrink: 0;
}

.dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  z-index: 100;
  animation: dropdownSlide 0.2s ease;
  overflow: hidden;
}

@keyframes dropdownSlide {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--text-secondary);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
  border-left: 3px solid transparent;
}

.dropdown-item:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-left-color: var(--color-primary);
}

.dropdown-item svg {
  flex-shrink: 0;
  opacity: 0.7;
}

.search-section {
  display: flex;
  gap: var(--spacing-sm);
  flex: 1;
  max-width: 500px;
}

.search-input {
  flex: 1;
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.95rem;
  transition: all var(--transition-base);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.search-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--gradient-primary);
  border: none;
  border-radius: var(--radius-md);
  color: white;
  cursor: pointer;
  transition: all var(--transition-base);
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

/* Posts Section */
.posts-section {
  margin-bottom: var(--spacing-2xl);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--border-color);
}

.section-title {
  font-size: clamp(1.75rem, 3vw, 2rem);
  color: var(--text-primary);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.results-count {
  font-size: 0.95rem;
  color: var(--text-muted);
  font-weight: 500;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-2xl);
}

.post-card {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-base);
}

.post-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}

.post-image {
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.post-card:hover .post-image img {
  transform: scale(1.05);
}

.post-content {
  padding: var(--spacing-lg);
}

.post-title {
  font-size: 1.25rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  line-height: 1.3;
}

.post-excerpt {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
  font-size: 0.95rem;
}

.no-results {
  text-align: center;
  padding: var(--spacing-2xl);
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-color);
}

.no-results h3 {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-family: 'Poppins', sans-serif;
}

.no-results p {
  color: var(--text-secondary);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.pagination-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  min-width: 44px;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  background: var(--bg-tertiary);
}

.pagination-btn.active {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
}

.pagination-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
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

  .slider-container {
    height: 450px;
  }

  .featured-content {
    padding: var(--spacing-xl);
  }

  .posts-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-lg);
  }

  .filter-search-bar {
    padding: var(--spacing-md);
  }
}

/* Tablet Portrait - 768px and below */
@media (max-width: 768px) {
  .blog {
    padding: var(--spacing-xl) 0;
  }

  .container {
    padding: 0 var(--spacing-sm);
  }

  .blog-header {
    margin-bottom: var(--spacing-xl);
  }

  .page-title {
    font-size: 2rem;
  }

  .page-subtitle {
    font-size: 1rem;
  }

  .slider-container {
    height: 400px;
  }

  .featured-slider {
    margin-bottom: var(--spacing-xl);
  }

  .featured-content {
    padding: var(--spacing-lg);
  }

  .featured-title {
    font-size: 1.75rem;
  }

  .featured-excerpt {
    font-size: 1rem;
    margin-bottom: var(--spacing-md);
  }

  .post-meta {
    gap: var(--spacing-md);
    font-size: 0.85rem;
  }

  .slider-dots {
    bottom: var(--spacing-md);
  }

  .filter-search-bar {
    flex-direction: column;
    align-items: stretch;
    padding: var(--spacing-md);
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
  }

  .filter-section {
    justify-content: space-between;
    width: 100%;
    gap: var(--spacing-sm);
  }

  .filter-btn {
    font-size: 0.9rem;
    padding: 10px var(--spacing-md);
  }

  .dropdown {
    min-width: 200px;
  }

  .dropdown-item {
    font-size: 0.9rem;
    padding: 10px 12px;
  }

  .search-section {
    max-width: none;
    width: 100%;
  }

  .search-input {
    font-size: 0.9rem;
  }

  .section-header {
    margin-bottom: var(--spacing-lg);
  }

  .section-title {
    font-size: 1.5rem;
  }

  .results-count {
    font-size: 0.85rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
  }

  .post-card {
    max-width: none;
  }

  .post-image {
    height: 180px;
  }

  .post-content {
    padding: var(--spacing-md);
  }

  .post-title {
    font-size: 1.15rem;
  }

  .post-excerpt {
    font-size: 0.9rem;
  }

  .post-category {
    font-size: 0.8rem;
    padding: 6px 12px;
  }

  .pagination {
    gap: 8px;
  }

  .pagination-btn {
    padding: 10px 12px;
    font-size: 0.9rem;
    min-width: 40px;
  }

  .prev-next-btn {
    padding: 10px 16px;
  }
}

/* Mobile Portrait - 480px and below */
@media (max-width: 480px) {
  .blog {
    padding: var(--spacing-lg) 0;
  }

  .blog-header {
    margin-bottom: var(--spacing-lg);
  }

  .page-title {
    font-size: 1.75rem;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }

  .slider-container {
    height: 350px;
  }

  .featured-slider {
    margin-bottom: var(--spacing-lg);
  }

  .featured-content {
    padding: var(--spacing-md);
  }

  .post-category {
    font-size: 0.75rem;
    padding: 4px 10px;
    margin-bottom: 12px;
  }

  .featured-title {
    font-size: 1.5rem;
    margin-bottom: 12px;
  }

  .featured-excerpt {
    font-size: 0.95rem;
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .post-meta {
    gap: 12px;
    font-size: 0.8rem;
    padding-top: 8px;
  }

  .slider-dots {
    bottom: 12px;
  }

  .dot {
    width: 10px;
    height: 10px;
  }

  .dot.active {
    width: 28px;
  }

  .filter-search-bar {
    padding: 12px;
    gap: 12px;
    margin-bottom: var(--spacing-lg);
  }

  .filter-section {
    flex-direction: column;
    gap: 8px;
  }

  .filter-item {
    width: 100%;
  }

  .filter-btn {
    width: 100%;
    font-size: 0.85rem;
    padding: 10px 12px;
    justify-content: space-between;
  }

  .filter-btn span {
    flex: 1;
    text-align: left;
  }

  .dropdown {
    min-width: 100%;
    left: 0;
    right: 0;
  }

  .dropdown-item {
    font-size: 0.85rem;
    padding: 10px 12px;
  }

  .dropdown-item svg {
    width: 16px;
    height: 16px;
  }

  .search-section {
    flex-direction: column;
    gap: 8px;
  }

  .search-input {
    font-size: 0.85rem;
    padding: 10px 12px;
  }

  .search-btn {
    width: 100%;
    padding: 10px;
  }

  .posts-section {
    margin-bottom: var(--spacing-lg);
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: var(--spacing-md);
  }

  .section-title {
    font-size: 1.35rem;
  }

  .results-count {
    font-size: 0.8rem;
  }

  .posts-grid {
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }

  .post-image {
    height: 200px;
  }

  .post-content {
    padding: 12px;
  }

  .post-title {
    font-size: 1rem;
    margin-bottom: 8px;
  }

  .post-excerpt {
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 12px;
  }

  .post-meta {
    gap: 10px;
    padding-top: 8px;
  }

  .post-author,
  .post-date {
    font-size: 0.75rem;
  }

  .no-results {
    padding: var(--spacing-xl);
  }

  .no-results h3 {
    font-size: 1.25rem;
    margin-bottom: 8px;
  }

  .no-results p {
    font-size: 0.9rem;
  }

  .pagination {
    gap: 6px;
    flex-wrap: wrap;
  }

  .pagination-btn {
    padding: 8px 10px;
    font-size: 0.85rem;
    min-width: 36px;
  }

  .prev-next-btn {
    padding: 8px 12px;
    flex: 1 1 100%;
    justify-content: center;
  }

  .prev-next-btn:first-child {
    order: -1;
  }

  .prev-next-btn:last-child {
    order: 1;
  }

  .page-number {
    flex: 0 1 auto;
  }
}

/* Extra Small Mobile - 360px and below */
@media (max-width: 360px) {
  .slider-container {
    height: 300px;
  }

  .page-title {
    font-size: 1.5rem;
  }

  .featured-title {
    font-size: 1.35rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .filter-search-bar,
  .featured-content,
  .post-content,
  .no-results {
    padding: 10px;
  }

  .post-image {
    height: 180px;
  }

  .pagination-btn {
    font-size: 0.8rem;
    padding: 6px 8px;
    min-width: 32px;
  }

  .prev-next-btn {
    font-size: 0.8rem;
    padding: 8px;
  }
}
</style>
