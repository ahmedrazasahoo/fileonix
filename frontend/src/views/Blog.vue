<template>
  <div class="blog">
    <div class="container">
      <div class="blog-header">
        <h1 class="page-title">Blog</h1>
        <p class="page-subtitle">Read our latest articles and insights</p>
      </div>

      <!-- Featured Post -->
      <div class="featured-post" @click="viewPost(posts[0])">
        <div class="featured-image">
          <img :src="posts[0].image" :alt="posts[0].title">
        </div>
        <div class="featured-content">
          <span class="post-category">{{ posts[0].category }}</span>
          <h2 class="featured-title">{{ posts[0].title }}</h2>
          <p class="featured-excerpt">{{ posts[0].excerpt }}</p>
          <div class="post-meta">
            <span class="post-author">{{ posts[0].author }}</span>
            <span class="post-date">{{ posts[0].date }}</span>
          </div>
        </div>
      </div>

      <!-- Blog Posts Grid -->
      <div class="posts-grid">
        <div 
          v-for="post in posts.slice(1)" 
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      posts: [
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
          title: 'Modern CSS Techniques',
          excerpt: 'Discover the latest CSS features and techniques to create stunning responsive designs.',
          author: 'Mike Chen',
          date: 'Jan 12, 2024',
          category: 'Design',
          image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 3,
          title: 'Building Scalable APIs',
          excerpt: 'Best practices for designing and implementing RESTful APIs that scale with your application.',
          author: 'David Park',
          date: 'Jan 10, 2024',
          category: 'Backend',
          image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 4,
          title: 'JavaScript Performance Tips',
          excerpt: 'Optimize your JavaScript code for better performance and faster load times.',
          author: 'Emily Zhang',
          date: 'Jan 8, 2024',
          category: 'Performance',
          image: 'https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 5,
          title: 'UX Design Principles',
          excerpt: 'Master the core principles of user experience design to create intuitive interfaces.',
          author: 'Lisa Anderson',
          date: 'Jan 5, 2024',
          category: 'UX',
          image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
        },
        {
          id: 6,
          title: 'DevOps Best Practices',
          excerpt: 'Learn how to streamline your development workflow with modern DevOps practices.',
          author: 'Tom Wilson',
          date: 'Jan 3, 2024',
          category: 'DevOps',
          image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800'
        }
      ]
    }
  },
  methods: {
    viewPost(post) {
      this.$router.push({ name: 'BlogPost', params: { id: post.id } })
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
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.blog-header {
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

.featured-post {
  background: var(--bg-card);
  border-radius: var(--radius-2xl);
  overflow: hidden;
  margin-bottom: var(--spacing-2xl);
  box-shadow: var(--shadow-xl);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-base);
  animation: slideInRight 0.6s ease-out 0.2s both;
}

.featured-post:hover {
  transform: translateY(-8px);
  border-color: var(--color-primary);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.featured-image {
  height: 400px;
  overflow: hidden;
  position: relative;
}

.featured-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 60%, var(--bg-card) 100%);
}

.featured-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.featured-post:hover .featured-image img {
  transform: scale(1.05);
}

.featured-content {
  padding: var(--spacing-xl);
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
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.featured-title {
  font-size: clamp(1.75rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
}

.featured-excerpt {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.post-card {
  background: var(--bg-card);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--border-color);
  cursor: pointer;
  transition: all var(--transition-base);
  animation: scaleIn 0.3s ease-out;
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
  font-size: 1.3rem;
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
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: var(--text-muted);
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
}

.post-author {
  font-weight: 600;
  color: var(--text-secondary);
}

.post-date {
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>
