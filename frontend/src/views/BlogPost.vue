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
            <p v-if="post.excerpt" class="post-intro">{{ post.excerpt }}</p>
            <div v-if="post.content" v-html="post.content"></div>
            <div v-else-if="isLoading" class="content-skeleton">
              <div class="skeleton-line"></div>
              <div class="skeleton-line short"></div>
              <div class="skeleton-line"></div>
              <div class="skeleton-line short"></div>
            </div>
          </div>

          <div class="post-footer">
            <div class="tags">
              <span class="tag" v-if="post.category">{{ post.category }}</span>
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

          <!-- Blogger Profile Card -->
          <div class="sidebar-section blogger-profile" v-if="currentBlogger">
            <h3 class="sidebar-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              About the Author
            </h3>
            <div class="blogger-info">
              <div class="blogger-avatar-wrapper">
                <img
                  v-if="currentBlogger.avatar"
                  :src="currentBlogger.avatar"
                  :alt="currentBlogger.full_name"
                  class="blogger-avatar"
                >
                <div v-else class="blogger-avatar-placeholder">
                  {{ bloggerInitials }}
                </div>
              </div>
              <div class="blogger-details">
                <h4 class="blogger-name">{{ currentBlogger.full_name || currentBlogger.name }}</h4>
                <p v-if="currentBlogger.short_name" class="blogger-short-name">{{ currentBlogger.short_name }}</p>
              </div>
            </div>
          </div>

          <!-- Categories -->
          <div class="sidebar-section" v-if="allCategories.length">
            <h3 class="sidebar-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Categories
            </h3>
            <div class="categories-list">
              <button
                v-for="cat in allCategories"
                :key="cat.name"
                class="category-chip"
                :class="{ active: cat.title === post.category || cat.name === post.category }"
                @click="goToCategory(cat)"
              >
                {{ cat.title || cat.name }}
              </button>
            </div>
          </div>

          <!-- Related Posts -->
          <div class="sidebar-section">
            <h3 class="sidebar-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              Latest in {{ post.category }}
            </h3>
            <div class="related-posts" v-if="relatedPosts.length">
              <div v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="related-post-card"
                @click="viewPost(relatedPost)">
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
            <p v-else class="no-related">No related posts found.</p>
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
          <textarea class="form-textarea" placeholder="Write your comment here..." v-model="newComment.text"
            required></textarea>
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
import { createListResource } from 'frappe-ui'

export default {
  name: 'BlogPost',
  data() {
    return {
      showComments: false,
      showSuccessMessage: false,
      newComment: { author: '', email: '', text: '' },
      currentPostResource: null,
      relatedPostsResource: null,
      bloggersResource: null,
      categoriesResource: null,
    }
  },
  computed: {
    rawPost() {
      return this.currentPostResource?.data?.[0] || null
    },
    post() {
      const p = this.rawPost
      if (!p) return { title: '', category: '', author: '', date: '', image: '', excerpt: '', content: '' }
      const blogger = (this.bloggersResource?.data || []).find(b => b.name === p.blogger)
      return {
        title: p.title || '',
        category: p.blog_category || '',
        author: blogger?.full_name || p.blogger || 'Admin',
        date: p.published_on
          ? new Date(p.published_on).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          : '',
        image: p.meta_image || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        excerpt: p.blog_intro || p.meta_description || '',
        content: p.content || '',
      }
    },
    currentBlogger() {
      if (!this.rawPost?.blogger) return null
      return (this.bloggersResource?.data || []).find(b => b.name === this.rawPost.blogger) || null
    },
    bloggerInitials() {
      const name = this.currentBlogger?.full_name || this.currentBlogger?.name || ''
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    },
    allCategories() {
      return this.categoriesResource?.data || []
    },
    relatedPosts() {
      const currentId = this.$route.params.id
      return (this.relatedPostsResource?.data || [])
        .filter(p => p.name !== currentId)
        .slice(0, 4)
        .map(p => ({
          id: p.name,
          title: p.title,
          category: p.blog_category,
          date: p.published_on
            ? new Date(p.published_on).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            : '',
          image: p.meta_image || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
        }))
    },
    isLoading() {
      return !this.currentPostResource || this.currentPostResource.loading
    },
  },
  created() {
    this.fetchPost()
    this.fetchBloggers()
    this.fetchCategories()
  },
  watch: {
    '$route.params.id'(newId) {
      if (newId) this.fetchPost()
    },
    rawPost(p) {
      if (p?.blog_category) this.fetchRelatedPosts(p.blog_category)
    },
  },
  methods: {
    fetchPost() {
      const postName = this.$route.params.id
      this.currentPostResource = createListResource({
        doctype: 'Blog Post',
        fields: ['name', 'title', 'blog_category', 'blogger', 'meta_description', 'published_on', 'blog_intro', 'content', 'meta_image'],
        filters: { name: postName },
        pageLength: 1,
        auto: true,
      })
    },
    fetchRelatedPosts(category) {
      this.relatedPostsResource = createListResource({
        doctype: 'Blog Post',
        fields: ['name', 'title', 'blog_category', 'published_on', 'meta_image'],
        filters: { blog_category: category },
        orderBy: 'published_on desc',
        pageLength: 5,
        auto: true,
      })
    },
    fetchBloggers() {
      this.bloggersResource = createListResource({
        doctype: 'Blogger',
        fields: ['name', 'full_name', 'avatar', 'short_name'],
        pageLength: 50,
        auto: true,
      })
    },
    fetchCategories() {
      this.categoriesResource = createListResource({
        doctype: 'Blog Category',
        fields: ['name', 'title', 'preview_image'],
        pageLength: 50,
        auto: true,
      })
    },
    goToCategory(cat) {
      this.$router.push({ name: 'Blog', query: { category: cat.title || cat.name } })
    },
    viewPost(relatedPost) {
      this.$router.push({ name: 'BlogPost', params: { id: relatedPost.id } })
    },
    toggleCommentSection() {
      this.showComments = !this.showComments
    },
    addComment() {
      this.showComments = false
      this.showSuccessMessage = true
      this.newComment = { author: '', email: '', text: '' }
      setTimeout(() => { this.showSuccessMessage = false }, 5000)
    },
  },
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
  padding: var(--spacing-lg);
  margin: var(--spacing-xl) 0;
  font-style: italic;
  color: var(--text-secondary);
  font-size: 1.15rem;
  background: var(--bg-secondary);
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
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

/* Success Message */
.success-message {
  background: linear-gradient(135deg, #C17855, #D4A574);
  color: white;
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);
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
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* Sidebar Sections */
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

/* Blogger Profile Card */
.blogger-profile .blogger-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.blogger-avatar-wrapper {
  flex-shrink: 0;
}

.blogger-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--color-primary);
}

.blogger-avatar-placeholder {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--gradient-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.blogger-details {
  flex: 1;
  min-width: 0;
}

.blogger-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
  font-family: 'Poppins', sans-serif;
  margin: 0 0 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.blogger-short-name {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Categories */
.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.category-chip {
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  font-size: 0.82rem;
  color: var(--text-secondary);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  font-family: 'Poppins', sans-serif;
}

.category-chip:hover,
.category-chip.active {
  background: var(--gradient-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Related Posts */
.related-posts {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.no-related {
  font-size: 0.9rem;
  color: var(--text-muted);
  text-align: center;
  padding: var(--spacing-md) 0;
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

/* Skeleton loader */
.content-skeleton {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg) 0;
}

.skeleton-line {
  height: 16px;
  background: linear-gradient(90deg, var(--bg-secondary) 25%, var(--bg-tertiary) 50%, var(--bg-secondary) 75%);
  background-size: 200% 100%;
  border-radius: var(--radius-sm);
  animation: shimmer 1.5s infinite;
}

.skeleton-line.short {
  width: 60%;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
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
