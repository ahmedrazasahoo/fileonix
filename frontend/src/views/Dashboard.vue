<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-header">
        <div>
          <h1 class="page-title">Conversion Dashboard</h1>
          <p class="page-subtitle">Track your image conversion activity and performance</p>
        </div>
        <router-link to="/" class="cta-convert-btn">
          <Zap :size="20" :stroke-width="2" /> New Conversion
        </router-link>
      </div>
      
      <!-- Stats Cards -->
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Total Conversions</span>
            <span class="stat-icon"><RefreshCw :size="28" :stroke-width="1.5" /></span>
          </div>
          <div class="stat-value">{{ stats.totalConversions.toLocaleString() }}</div>
          <div class="stat-change positive">+{{ stats.conversionsGrowth }}% this month</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Data Saved</span>
            <span class="stat-icon"><HardDrive :size="28" :stroke-width="1.5" /></span>
          </div>
          <div class="stat-value">{{ formatFileSize(stats.dataSaved) }}</div>
          <div class="stat-change positive">{{ stats.averageSavings }}% avg savings</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Files Processed</span>
            <span class="stat-icon"><FolderOpen :size="28" :stroke-width="1.5" /></span>
          </div>
          <div class="stat-value">{{ stats.filesProcessed.toLocaleString() }}</div>
          <div class="stat-change positive">+{{ stats.filesGrowth }}% this week</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Avg Processing Time</span>
            <span class="stat-icon"><Zap :size="28" :stroke-width="1.5" /></span>
          </div>
          <div class="stat-value">{{ stats.avgProcessingTime }}s</div>
          <div class="stat-change positive">{{ stats.speedImprovement }}% faster</div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="charts-section">
        <div class="chart-card large">
          <h2 class="chart-title">Conversion Activity</h2>
          <p class="chart-subtitle">Last 7 days</p>
          <div class="chart-placeholder">
            <div class="bar-chart">
              <div v-for="day in activityData" :key="day.label" class="bar" :style="{ height: day.percentage + '%' }">
                <span class="bar-value">{{ day.value }}</span>
                <span class="bar-label">{{ day.label }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="chart-card">
          <h2 class="chart-title">Format Distribution</h2>
          <p class="chart-subtitle">Output formats</p>
          <div class="format-list">
            <div v-for="format in formatDistribution" :key="format.name" class="format-item">
              <div class="format-header">
                <span class="format-name">{{ format.name }}</span>
                <span class="format-percent">{{ format.percentage }}%</span>
              </div>
              <div class="format-bar">
                <div class="format-fill" :style="{ width: format.percentage + '%', background: format.color }"></div>
              </div>
              <span class="format-count">{{ format.count.toLocaleString() }} conversions</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="quick-stats-section">
        <h2 class="section-title">Quick Stats</h2>
        <div class="quick-stats-grid">
          <div class="quick-stat-card">
            <div class="quick-stat-icon"><Palette :size="40" :stroke-width="1.5" /></div>
            <div class="quick-stat-content">
              <div class="quick-stat-value">{{ stats.webpConversions.toLocaleString() }}</div>
              <div class="quick-stat-label">WebP Conversions</div>
            </div>
          </div>
          <div class="quick-stat-card">
            <div class="quick-stat-icon"><Image :size="40" :stroke-width="1.5" /></div>
            <div class="quick-stat-content">
              <div class="quick-stat-value">{{ stats.pngConversions.toLocaleString() }}</div>
              <div class="quick-stat-label">PNG Conversions</div>
            </div>
          </div>
          <div class="quick-stat-card">
            <div class="quick-stat-icon"><Camera :size="40" :stroke-width="1.5" /></div>
            <div class="quick-stat-content">
              <div class="quick-stat-value">{{ stats.jpegConversions.toLocaleString() }}</div>
              <div class="quick-stat-label">JPEG Conversions</div>
            </div>
          </div>
          <div class="quick-stat-card">
            <div class="quick-stat-icon"><Film :size="40" :stroke-width="1.5" /></div>
            <div class="quick-stat-content">
              <div class="quick-stat-value">{{ stats.gifConversions.toLocaleString() }}</div>
              <div class="quick-stat-label">GIF Conversions</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="activity-section">
        <h2 class="section-title">Recent Conversions</h2>
        <div class="activity-list">
          <div class="activity-item" v-for="activity in recentActivity" :key="activity.id">
            <div class="activity-icon">
              <component :is="getActivityIcon(activity.badge)" :size="28" :stroke-width="1.5" />
            </div>
            <div class="activity-content">
              <div class="activity-text">{{ activity.text }}</div>
              <div class="activity-meta">
                <span class="activity-time">{{ activity.time }}</span>
                <span class="activity-size">{{ activity.size }}</span>
                <span v-if="activity.savings" class="activity-savings">-{{ activity.savings }}%</span>
              </div>
            </div>
            <div class="activity-badge" :class="activity.badgeClass">{{ activity.badge }}</div>
          </div>
        </div>
      </div>

      <!-- Popular Conversions -->
      <div class="popular-section">
        <h2 class="section-title">Most Popular Conversions</h2>
        <div class="popular-grid">
          <div v-for="conversion in popularConversions" :key="conversion.id" class="popular-card">
            <div class="popular-header">
              <span class="popular-from">{{ conversion.from }}</span>
              <span class="popular-arrow">→</span>
              <span class="popular-to">{{ conversion.to }}</span>
            </div>
            <div class="popular-stats">
              <div class="popular-stat">
                <span class="popular-stat-label">Conversions</span>
                <span class="popular-stat-value">{{ conversion.count.toLocaleString() }}</span>
              </div>
              <div class="popular-stat">
                <span class="popular-stat-label">Avg Savings</span>
                <span class="popular-stat-value savings">{{ conversion.savings }}%</span>
              </div>
            </div>
            <router-link to="/" class="popular-action">Convert Now →</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Zap, RefreshCw, HardDrive, FolderOpen, Palette, Image, Camera, Film } from 'lucide-vue-next'

export default {
  name: 'Dashboard',
  components: {
    Zap,
    RefreshCw,
    HardDrive,
    FolderOpen,
    Palette,
    Image,
    Camera,
    Film
  },
  data() {
    return {
      stats: {
        totalConversions: 15847,
        conversionsGrowth: 23,
        dataSaved: 2147483648, // 2GB in bytes
        averageSavings: 67,
        filesProcessed: 23456,
        filesGrowth: 18,
        avgProcessingTime: 1.2,
        speedImprovement: 15,
        webpConversions: 5823,
        pngConversions: 4561,
        jpegConversions: 3892,
        gifConversions: 1571
      },
      activityData: [
        { label: 'Mon', value: 245, percentage: 60 },
        { label: 'Tue', value: 312, percentage: 75 },
        { label: 'Wed', value: 189, percentage: 45 },
        { label: 'Thu', value: 356, percentage: 85 },
        { label: 'Fri', value: 298, percentage: 70 },
        { label: 'Sat', value: 378, percentage: 90 },
        { label: 'Sun', value: 267, percentage: 65 }
      ],
      formatDistribution: [
        { name: 'WebP', percentage: 42, count: 5823, color: '#C17855' },
        { name: 'PNG', percentage: 28, count: 4561, color: '#D4A574' },
        { name: 'JPEG', percentage: 22, count: 3892, color: '#E8B89A' },
        { name: 'GIF', percentage: 8, count: 1571, color: '#A55F3F' }
      ],
      recentActivity: [
        { id: 1, icon: '🖼️', text: 'Converted photo.jpg to WebP', time: '2 min ago', size: '2.4 MB → 645 KB', savings: 73, badge: 'WebP', badgeClass: 'badge-webp' },
        { id: 2, icon: '📸', text: 'Batch converted 5 images to PNG', time: '15 min ago', size: '12.8 MB → 8.1 MB', savings: 37, badge: 'PNG', badgeClass: 'badge-png' },
        { id: 3, icon: '🎨', text: 'Converted banner.png to JPEG', time: '1 hour ago', size: '5.2 MB → 1.8 MB', savings: 65, badge: 'JPEG', badgeClass: 'badge-jpeg' },
        { id: 4, icon: '🎞️', text: 'Converted animation.webp to GIF', time: '2 hours ago', size: '892 KB → 1.2 MB', savings: 0, badge: 'GIF', badgeClass: 'badge-gif' },
        { id: 5, icon: '🖼️', text: 'Converted screenshot.png to WebP', time: '3 hours ago', size: '3.1 MB → 892 KB', savings: 71, badge: 'WebP', badgeClass: 'badge-webp' }
      ],
      popularConversions: [
        { id: 1, from: 'PNG', to: 'WebP', count: 3892, savings: 72 },
        { id: 2, from: 'JPEG', to: 'WebP', count: 2945, savings: 45 },
        { id: 3, from: 'PNG', to: 'JPEG', count: 2156, savings: 68 },
        { id: 4, from: 'WebP', to: 'PNG', count: 1823, savings: 12 }
      ]
    }
  },
  methods: {
    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    },
    getActivityIcon(badge) {
      const iconMap = {
        'WebP': 'Palette',
        'PNG': 'Image',
        'JPEG': 'Camera',
        'GIF': 'Film'
      }
      return iconMap[badge] || 'Image'
    }
  }
}
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: var(--spacing-2xl) 0;
  background: var(--bg-primary);
}

.container {
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
  flex-wrap: wrap;
  gap: var(--spacing-lg);
}

.page-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.02em;
}

.page-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.cta-convert-btn {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-glow);
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.cta-convert-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.stat-card {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
  border-color: var(--color-primary);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.stat-label {
  font-size: 0.95rem;
  color: var(--text-muted);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.stat-icon {
  font-size: 1.75rem;
  filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.3));
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.02em;
}

.stat-change {
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
}

.stat-change.positive {
  color: var(--color-success);
  background: rgba(16, 185, 129, 0.1);
}

.charts-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-2xl);
}

.chart-card {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-base);
}

.chart-card:hover {
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.chart-title {
  font-size: 1.4rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.chart-subtitle {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
}

.chart-placeholder {
  height: 280px;
}

.bar-chart {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 100%;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg) 0;
}

.bar {
  flex: 1;
  background: var(--gradient-primary);
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-height: 20%;
  transition: all var(--transition-base);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.bar:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5);
}

.bar-value {
  position: absolute;
  top: -28px;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-primary);
}

.bar-label {
  position: absolute;
  bottom: -28px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 600;
}

.format-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.format-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.format-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.format-name {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
}

.format-percent {
  font-weight: 700;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.format-bar {
  height: 12px;
  background: var(--bg-secondary);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.format-fill {
  height: 100%;
  transition: width var(--transition-slow);
  border-radius: var(--radius-full);
}

.format-count {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.quick-stats-section {
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: 1.75rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
}

.quick-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-lg);
}

.quick-stat-card {
  background: var(--bg-card);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  border: 1px solid var(--border-color);
  transition: all var(--transition-base);
}

.quick-stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.quick-stat-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 2px 8px rgba(99, 102, 241, 0.3));
}

.quick-stat-content {
  flex: 1;
}

.quick-stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--text-primary);
  font-family: 'Poppins', sans-serif;
  letter-spacing: -0.02em;
}

.quick-stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 600;
}

.activity-section {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  margin-bottom: var(--spacing-2xl);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.activity-item {
  display: flex;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
  transition: all var(--transition-base);
  align-items: center;
  border: 1px solid transparent;
}

.activity-item:hover {
  background: var(--bg-tertiary);
  border-color: var(--color-primary);
  transform: translateX(4px);
}

.activity-icon {
  font-size: 1.75rem;
  flex-shrink: 0;
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  font-weight: 600;
}

.activity-meta {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  align-items: center;
}

.activity-time,
.activity-size {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.activity-savings {
  font-size: 0.8rem;
  color: white;
  background: var(--color-success);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-full);
  font-weight: 700;
}

.activity-badge {
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  font-weight: 700;
  flex-shrink: 0;
}

.badge-webp {
  background: rgba(16, 185, 129, 0.2);
  color: var(--color-success);
}

.badge-png {
  background: rgba(99, 102, 241, 0.2);
  color: var(--color-primary-light);
}

.badge-jpeg {
  background: rgba(245, 158, 11, 0.2);
  color: var(--color-warning);
}

.badge-gif {
  background: rgba(236, 72, 153, 0.2);
  color: var(--color-accent);
}

.popular-section {
  background: var(--bg-card);
  padding: var(--spacing-xl);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
}

.popular-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.popular-card {
  background: var(--bg-secondary);
  padding: var(--spacing-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.popular-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.popular-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-content: center;
  padding: var(--spacing-md);
  background: var(--bg-tertiary);
  border-radius: var(--radius-md);
}

.popular-from,
.popular-to {
  font-size: 1.1rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  color: var(--text-primary);
  padding: var(--spacing-xs) var(--spacing-md);
  background: var(--bg-card);
  border-radius: var(--radius-sm);
}

.popular-arrow {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.popular-stats {
  display: flex;
  gap: var(--spacing-md);
}

.popular-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.popular-stat-label {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
}

.popular-stat-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--text-primary);
  font-family: 'Poppins', sans-serif;
}

.popular-stat-value.savings {
  color: var(--color-success);
}

.popular-action {
  text-align: center;
  padding: var(--spacing-sm);
  background: var(--gradient-primary);
  color: white;
  text-decoration: none;
  border-radius: var(--radius-md);
  font-weight: 700;
  transition: all var(--transition-base);
  font-family: 'Poppins', sans-serif;
}

.popular-action:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow);
}

/* Responsive */
@media (max-width: 1024px) {
  .charts-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard {
    padding: var(--spacing-lg) 0;
  }

  .container {
    padding: 0 var(--spacing-md);
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-md);
  }

  .page-title {
    font-size: 1.75rem;
  }

  .page-subtitle {
    font-size: 0.95rem;
  }

  .stats-cards {
    grid-template-columns: 1fr 1fr;
  }

  .charts-section {
    gap: var(--spacing-md);
  }

  .chart-card {
    padding: var(--spacing-lg);
  }

  .quick-stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .popular-grid {
    grid-template-columns: 1fr;
  }

  .activity-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .activity-meta {
    width: 100%;
  }

  .section-title {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  .dashboard {
    padding: var(--spacing-md) 0;
  }

  .container {
    padding: 0 var(--spacing-sm);
  }

  .page-title {
    font-size: 1.5rem;
  }

  .page-subtitle {
    font-size: 0.9rem;
  }

  .cta-convert-btn {
    width: 100%;
    justify-content: center;
    padding: var(--spacing-sm) var(--spacing-md);
    font-size: 0.95rem;
  }

  .stats-cards {
    grid-template-columns: 1fr;
  }

  .stat-card {
    padding: var(--spacing-md);
  }

  .stat-value {
    font-size: 1.75rem;
  }

  .chart-card {
    padding: var(--spacing-md);
  }

  .chart-title {
    font-size: 1.1rem;
  }

  .quick-stats-grid {
    grid-template-columns: 1fr;
  }

  .quick-stat-card {
    padding: var(--spacing-md);
  }

  .quick-stat-value {
    font-size: 1.4rem;
  }

  .activity-section,
  .popular-section {
    padding: var(--spacing-md);
  }

  .section-title {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-md);
  }

  .popular-card {
    padding: var(--spacing-md);
  }

  .bar-chart .bar {
    min-width: 24px;
  }
}

@media (max-width: 360px) {
  .page-title {
    font-size: 1.3rem;
  }

  .stat-value {
    font-size: 1.5rem;
  }

  .quick-stat-value {
    font-size: 1.25rem;
  }

  .container {
    padding: 0 10px;
  }
}
</style>
