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
<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { createListResource } from 'frappe-ui'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// ─── Resources ───────────────────────────────────────────
const postsResource = createListResource({
  doctype: 'Blog Post',
  fields: ['name', 'title', 'blog_category', 'blogger', 
           'meta_description', 'published_on', 'featured', 
           'blog_intro', 'meta_image'],
  pageLength: 200,
  auto: true,
  onSuccess(data) {
    console.log('✅ Posts loaded:', data)
  },
  onError(err) {
    console.log('❌ Posts error:', err)
  }
})

const categoriesResource = createListResource({
  doctype: 'Blog Category',
  fields: ['name', 'title', 'preview_image'],
  pageLength: 50,
  auto: true,
  onSuccess(data) {
    console.log('✅ Categories loaded:', data)
  },
})

// ─── Helpers ─────────────────────────────────────────────
const fallbackImage = 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'

function mapPost(p) {
  return {
    id: p.name,
    title: p.title || '',
    excerpt: p.blog_intro || p.meta_description || '',
    author: p.blogger || 'Admin',
    date: p.published_on
      ? new Date(p.published_on).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '',
    category: p.blog_category || 'General',
    image: p.meta_image ? `/${p.meta_image}` : fallbackImage,
    featured: !!p.featured,
  }
}

// ─── State ───────────────────────────────────────────────
const currentSlide = ref(0)
const currentPage = ref(1)
const postsPerPage = 16
const autoSlideInterval = ref(null)
const selectedCategory = ref('All')
const sortBy = ref('latest')
const searchQuery = ref('')
const showSortDropdown = ref(false)
const showCategoryDropdown = ref(false)

// ─── Computed ────────────────────────────────────────────
const posts = computed(() => (postsResource.data || []).map(mapPost))

const featuredPosts = computed(() => {
  const f = posts.value.filter(p => p.featured)
  return f.length ? f.slice(0, 5) : posts.value.slice(0, 3)
})

const uniqueCategories = computed(() =>
  (categoriesResource.data || []).map(c => c.title || c.name)
)

const isLoading = computed(() => postsResource.list?.loading)

const filteredPosts = computed(() => {
  let list = posts.value
  if (selectedCategory.value !== 'All') {
    list = list.filter(p => p.category === selectedCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
    )
  }
  const sorted = [...list]
  if (sortBy.value === 'latest') sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
  else if (sortBy.value === 'oldest') sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
  else if (sortBy.value === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title))
  return sorted
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  return filteredPosts.value.slice(start, start + postsPerPage)
})

const visiblePages = computed(() => {
  const total = totalPages.value
  const cur = currentPage.value
  if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1)
  if (cur === 1) return [1, 2, 3]
  if (cur === total) return [total - 2, total - 1, total]
  return [cur - 1, cur, cur + 1]
})

const getSortLabel = computed(() => {
  return { latest: 'Latest', oldest: 'Oldest', popular: 'Most Popular', title: 'Title (A-Z)' }[sortBy.value] || 'Latest'
})

// ─── Methods ─────────────────────────────────────────────
function viewPost(post) {
  router.push({ name: 'BlogPost', params: { id: post.id } })
}

function goToSlide(index) {
  currentSlide.value = index
  resetAutoSlide()
}

function nextSlide() {
  if (!featuredPosts.value.length) return
  currentSlide.value = (currentSlide.value + 1) % featuredPosts.value.length
}

function startAutoSlide() {
  autoSlideInterval.value = setInterval(nextSlide, 5000)
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval.value)
  startAutoSlide()
}

function toggleSortDropdown() {
  showSortDropdown.value = !showSortDropdown.value
  showCategoryDropdown.value = false
}

function toggleCategoryDropdown() {
  showCategoryDropdown.value = !showCategoryDropdown.value
  showSortDropdown.value = false
}

function selectSort(val) {
  sortBy.value = val
  showSortDropdown.value = false
  currentPage.value = 1
}

function selectCategory(val) {
  selectedCategory.value = val
  showCategoryDropdown.value = false
  currentPage.value = 1
}

// ─── Lifecycle ───────────────────────────────────────────
onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
  startAutoSlide()
})

onBeforeUnmount(() => {
  clearInterval(autoSlideInterval.value)
})
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

/* post-meta inside the hero slider (dark overlay context) */
.featured-content .post-meta {
  display: flex;
  gap: var(--spacing-lg);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  padding-top: var(--spacing-sm);
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.featured-content .post-author {
  font-weight: 600;
  color: rgba(255, 255, 255, 0.95);
}

/* post-meta inside regular cards (light background context) */
.post-card .post-meta {
  display: flex;
  gap: var(--spacing-md);
  font-size: 0.85rem;
  color: var(--text-muted);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
  margin-top: auto;
  flex-wrap: wrap;
  align-items: center;
}

.post-card .post-author {
  font-weight: 600;
  color: var(--text-secondary);
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
  grid-template-columns: repeat(auto-fill, minmax(min(320px, 100%), 1fr));
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
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: column;
  flex: 1;
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
  flex: 1;
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
