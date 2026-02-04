<template>
  <div class="converter-page" :class="{ 'dark-theme': isDarkMode }">
    <div class="converter-container">
      <!-- Header Section -->
      <header class="converter-header">
        <div class="header-content">
          <h1 class="main-title">
            <span class="gradient-text">FileOnix</span> Converter
          </h1>
          <p class="main-subtitle">Convert images instantly - Fast, free & private</p>
        </div>
        <button class="theme-toggle" @click="toggleTheme" :title="isDarkMode ? 'Light mode' : 'Dark mode'">
          <span v-if="isDarkMode">☀️</span>
          <span v-else>🌙</span>
        </button>
      </header>

      <!-- Upload Zone -->
      <div 
        class="upload-zone"
        :class="{ 'dragging': isDragging, 'has-files': selectedFiles.length > 0 }"
        @dragover.prevent="handleDragOver"
        @dragleave.prevent="handleDragLeave"
        @drop.prevent="handleDrop"
        @click="triggerFileInput"
      >
        <input 
          type="file" 
          ref="fileInput"
          @change="handleFileSelect"
          accept="image/*"
          multiple
          hidden
        >
        
        <div v-if="selectedFiles.length === 0" class="upload-placeholder">
          <div class="upload-icon">📁</div>
          <h3 class="upload-title">Drop your images here</h3>
          <p class="upload-subtitle">or click to browse</p>
          <div class="supported-formats">
            <span class="format-badge">PNG</span>
            <span class="format-badge">JPG</span>
            <span class="format-badge">WebP</span>
            <span class="format-badge">GIF</span>
            <span class="format-badge">BMP</span>
          </div>
        </div>

        <div v-else class="files-preview">
          <div class="files-header">
            <h3>{{ selectedFiles.length }} file{{ selectedFiles.length > 1 ? 's' : '' }} selected</h3>
            <button class="clear-btn" @click.stop="clearFiles">Clear all</button>
          </div>
          <div class="files-grid">
            <div 
              v-for="(file, index) in selectedFiles" 
              :key="index"
              class="file-card"
            >
              <div class="file-preview">
                <img :src="file.preview" :alt="file.name">
                <button class="remove-file" @click.stop="removeFile(index)">×</button>
              </div>
              <div class="file-info">
                <p class="file-name">{{ truncateFileName(file.name) }}</p>
                <p class="file-size">{{ formatFileSize(file.size) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Conversion Options -->
      <div v-if="selectedFiles.length > 0" class="conversion-options">
        <h3 class="options-title">Conversion Settings</h3>
        
        <div class="options-grid">
          <!-- Output Format -->
          <div class="option-group">
            <label class="option-label">Output Format</label>
            <div class="format-buttons">
              <button 
                v-for="format in outputFormats" 
                :key="format.value"
                class="format-btn"
                :class="{ 'active': selectedFormat === format.value }"
                @click="selectedFormat = format.value"
              >
                {{ format.label }}
              </button>
            </div>
          </div>

          <!-- Quality -->
          <div class="option-group">
            <label class="option-label">
              Quality: {{ quality }}%
            </label>
            <input 
              type="range" 
              v-model.number="quality" 
              min="1" 
              max="100"
              class="quality-slider"
            >
            <div class="quality-presets">
              <button @click="quality = 60" class="preset-btn">Low (60%)</button>
              <button @click="quality = 80" class="preset-btn">Medium (80%)</button>
              <button @click="quality = 100" class="preset-btn">High (100%)</button>
            </div>
          </div>

          <!-- Resize Options -->
          <div class="option-group">
            <label class="option-label">
              <input type="checkbox" v-model="enableResize" class="checkbox">
              Resize Images
            </label>
            <div v-if="enableResize" class="resize-inputs">
              <input 
                type="number" 
                v-model.number="resizeWidth" 
                placeholder="Width"
                class="dimension-input"
              >
              <span>×</span>
              <input 
                type="number" 
                v-model.number="resizeHeight" 
                placeholder="Height"
                class="dimension-input"
              >
              <label class="maintain-ratio">
                <input type="checkbox" v-model="maintainRatio" class="checkbox">
                Keep ratio
              </label>
            </div>
          </div>
        </div>

        <!-- Convert Button -->
        <button 
          class="convert-btn"
          @click="convertFiles"
          :disabled="isConverting"
        >
          <span v-if="!isConverting">
            ⚡ Convert {{ selectedFiles.length }} file{{ selectedFiles.length > 1 ? 's' : '' }}
          </span>
          <span v-else class="converting-text">
            <span class="spinner"></span>
            Converting... {{ conversionProgress }}%
          </span>
        </button>
      </div>

      <!-- Conversion Results -->
      <div v-if="convertedFiles.length > 0" class="results-section">
        <div class="results-header">
          <h3 class="results-title">✅ Conversion Complete!</h3>
          <button class="download-all-btn" @click="downloadAll">
            Download All ({{ convertedFiles.length }})
          </button>
        </div>

        <div class="results-grid">
          <div 
            v-for="(file, index) in convertedFiles"
            :key="index"
            class="result-card"
          >
            <div class="result-preview">
              <img :src="file.url" :alt="file.name">
            </div>
            <div class="result-info">
              <p class="result-name">{{ file.name }}</p>
              <div class="result-meta">
                <span class="meta-item">{{ file.format.toUpperCase() }}</span>
                <span class="meta-item">{{ formatFileSize(file.size) }}</span>
                <span class="meta-item savings" v-if="file.savings > 0">
                  -{{ file.savings }}%
                </span>
              </div>
            </div>
            <div class="result-actions">
              <button class="compare-btn" @click="showComparison(index)">
                👁 Compare
              </button>
              <button class="download-btn" @click="downloadFile(file)">
                ⬇ Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Comparison Modal -->
      <div v-if="comparisonMode && compareIndex !== null" class="comparison-modal" @click="closeComparison">
        <div class="comparison-content" @click.stop>
          <button class="close-modal" @click="closeComparison">×</button>
          <h2 class="comparison-title">Before & After Comparison</h2>

          <div class="comparison-images">
            <div class="comparison-side">
              <h3>Original</h3>
              <div class="comparison-img-wrapper">
                <img :src="convertedFiles[compareIndex].originalUrl" alt="Original">
              </div>
              <div class="comparison-stats">
                <p class="stat-item">
                  <span class="stat-label">File:</span>
                  <span class="stat-value">{{ convertedFiles[compareIndex].originalName }}</span>
                </p>
                <p class="stat-item">
                  <span class="stat-label">Size:</span>
                  <span class="stat-value">{{ formatFileSize(convertedFiles[compareIndex].originalSize) }}</span>
                </p>
              </div>
            </div>

            <div class="comparison-arrow">→</div>

            <div class="comparison-side">
              <h3>Converted</h3>
              <div class="comparison-img-wrapper">
                <img :src="convertedFiles[compareIndex].url" alt="Converted">
              </div>
              <div class="comparison-stats">
                <p class="stat-item">
                  <span class="stat-label">Format:</span>
                  <span class="stat-value">{{ convertedFiles[compareIndex].format.toUpperCase() }}</span>
                </p>
                <p class="stat-item">
                  <span class="stat-label">Size:</span>
                  <span class="stat-value">{{ formatFileSize(convertedFiles[compareIndex].size) }}</span>
                </p>
                <p class="stat-item">
                  <span class="stat-label">Dimensions:</span>
                  <span class="stat-value">{{ convertedFiles[compareIndex].width }} × {{ convertedFiles[compareIndex].height }}</span>
                </p>
                <p class="stat-item savings-highlight" v-if="convertedFiles[compareIndex].savings > 0">
                  <span class="stat-label">Savings:</span>
                  <span class="stat-value">{{ convertedFiles[compareIndex].savings }}%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="features-section">
        <h2 class="features-title">Why Choose FileOnix?</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔒</div>
            <h3>100% Private</h3>
            <p>All conversions happen in your browser. Your files never leave your device.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Instant conversion with no upload time. Process multiple files simultaneously.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎨</div>
            <h3>High Quality</h3>
            <p>Advanced algorithms ensure your images look perfect at any quality level.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">💰</div>
            <h3>Free Forever</h3>
            <p>No limits, no watermarks, no hidden fees. Convert unlimited files for free.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertImage, convertImages, cleanupBlobUrl } from '../utilities/imageConverter'

export default {
  name: 'Home',
  data() {
    return {
      isDarkMode: true,
      isDragging: false,
      selectedFiles: [],
      convertedFiles: [],
      isConverting: false,
      conversionProgress: 0,
      comparisonMode: false,
      compareIndex: null,

      // Conversion settings
      selectedFormat: 'png',
      quality: 90,
      enableResize: false,
      resizeWidth: null,
      resizeHeight: null,
      maintainRatio: true,

      outputFormats: [
        { label: 'PNG', value: 'png' },
        { label: 'JPG', value: 'jpeg' },
        { label: 'WebP', value: 'webp' },
        { label: 'GIF', value: 'gif' }
      ]
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light')
    },

    handleDragOver(e) {
      this.isDragging = true
    },

    handleDragLeave(e) {
      this.isDragging = false
    },

    handleDrop(e) {
      this.isDragging = false
      const files = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'))
      this.processFiles(files)
    },

    triggerFileInput() {
      this.$refs.fileInput.click()
    },

    handleFileSelect(e) {
      const files = Array.from(e.target.files)
      this.processFiles(files)
    },

    processFiles(files) {
      files.forEach(file => {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.selectedFiles.push({
            file: file,
            name: file.name,
            size: file.size,
            preview: e.target.result,
            type: file.type
          })
        }
        reader.readAsDataURL(file)
      })
    },

    removeFile(index) {
      this.selectedFiles.splice(index, 1)
    },

    clearFiles() {
      // Clean up blob URLs to prevent memory leaks
      this.convertedFiles.forEach(file => {
        if (file.url) {
          cleanupBlobUrl(file.url)
        }
      })
      this.selectedFiles = []
      this.convertedFiles = []
      this.comparisonMode = false
      this.compareIndex = null
    },

    async convertFiles() {
      this.isConverting = true
      this.conversionProgress = 0

      // Clean up previous conversions
      this.convertedFiles.forEach(file => {
        if (file.url) {
          cleanupBlobUrl(file.url)
        }
      })
      this.convertedFiles = []

      const totalFiles = this.selectedFiles.length

      for (let i = 0; i < totalFiles; i++) {
        const fileData = this.selectedFiles[i]
        try {
          const options = {
            format: this.selectedFormat,
            quality: this.quality,
            maintainRatio: this.maintainRatio
          }

          if (this.enableResize) {
            if (this.resizeWidth) options.width = this.resizeWidth
            if (this.resizeHeight) options.height = this.resizeHeight
          }

          const result = await convertImage(fileData.preview, options)

          const originalSize = fileData.size
          const newSize = result.size
          const savings = Math.round(((originalSize - newSize) / originalSize) * 100)

          const baseName = fileData.name.replace(/\.[^/.]+$/, '')
          const newName = `${baseName}_converted.${this.selectedFormat}`

          this.convertedFiles.push({
            url: result.url,
            blob: result.blob,
            name: newName,
            format: this.selectedFormat,
            size: result.size,
            width: result.width,
            height: result.height,
            savings: savings > 0 ? savings : 0,
            originalUrl: fileData.preview,
            originalSize: originalSize,
            originalName: fileData.name
          })
        } catch (error) {
          console.error('Conversion error:', error)
          // Add error handling UI feedback if needed
        }

        this.conversionProgress = Math.round(((i + 1) / totalFiles) * 100)
      }

      this.isConverting = false
    },

    downloadFile(file) {
      const link = document.createElement('a')
      link.href = file.url
      link.download = file.name
      link.click()
    },

    downloadAll() {
      this.convertedFiles.forEach((file, index) => {
        setTimeout(() => {
          this.downloadFile(file)
        }, index * 200)
      })
    },

    showComparison(index) {
      this.compareIndex = index
      this.comparisonMode = true
    },

    closeComparison() {
      this.comparisonMode = false
      this.compareIndex = null
    },

    formatFileSize(bytes) {
      if (bytes === 0) return '0 B'
      const k = 1024
      const sizes = ['B', 'KB', 'MB', 'GB']
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
    },

    truncateFileName(name) {
      if (name.length <= 20) return name
      return name.substring(0, 17) + '...' + name.split('.').pop()
    }
  },
  mounted() {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark'
    }
  },
  beforeUnmount() {
    // Clean up all blob URLs when component is destroyed
    this.convertedFiles.forEach(file => {
      if (file.url) {
        cleanupBlobUrl(file.url)
      }
    })
  }
}
</script>

<style scoped>
.converter-page {
  min-height: 100vh;
  background: var(--bg-primary);
  padding: var(--spacing-2xl) var(--spacing-md);
  transition: background var(--transition-base);
}

.converter-page.dark-theme {
  background: var(--bg-primary);
}

.converter-container {
  max-width: 1280px;
  margin: 0 auto;
}

/* Header */
.converter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-2xl);
  animation: fadeIn 0.6s ease-out;
}

.header-content {
  text-align: center;
  flex: 1;
}

.main-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: 800;
  letter-spacing: -0.03em;
}

.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3));
}

.main-subtitle {
  color: var(--text-secondary);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 500;
}

.theme-toggle {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  font-size: 1.5rem;
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: var(--bg-hover);
  border-color: var(--color-primary);
  transform: scale(1.1) rotate(15deg);
  box-shadow: var(--shadow-glow);
}

/* Upload Zone */
.upload-zone {
  background: var(--bg-card);
  border: 2px dashed var(--border-color);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-2xl);
  text-align: center;
  cursor: pointer;
  transition: all var(--transition-base);
  margin-bottom: var(--spacing-xl);
  position: relative;
  overflow: hidden;
  animation: slideInRight 0.6s ease-out 0.2s both;
}

.upload-zone::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
  transition: left 0.5s;
}

.upload-zone:hover::before {
  left: 100%;
}

.dark-theme .upload-zone {
  background: var(--bg-card);
  border-color: var(--border-color);
}

.upload-zone:hover {
  border-color: var(--color-primary);
  background: var(--bg-secondary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.dark-theme .upload-zone:hover {
  background: var(--bg-secondary);
}

.upload-zone.dragging {
  border-color: var(--color-primary);
  background: rgba(99, 102, 241, 0.1);
  transform: scale(1.02);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.3);
}

.upload-placeholder {
  pointer-events: none;
}

.upload-icon {
  font-size: 4rem;
  margin-bottom: var(--spacing-lg);
  filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3));
  animation: pulse 2s ease-in-out infinite;
}

.upload-title {
  font-family: 'Poppins', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
}

.dark-theme .upload-title {
  color: var(--text-primary);
}

.upload-subtitle {
  color: var(--text-muted);
  font-size: clamp(1rem, 2vw, 1.15rem);
  margin-bottom: var(--spacing-lg);
}

.supported-formats {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.format-badge {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  transition: all var(--transition-base);
}

.format-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.4);
}

/* Files Preview */
.files-preview {
  text-align: left;
}

.files-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.files-header h3 {
  color: var(--text-primary);
  font-size: 1.3rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}

.dark-theme .files-header h3 {
  color: var(--text-primary);
}

.clear-btn {
  background: var(--color-error);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-base);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.clear-btn:hover {
  background: #dc2626;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(239, 68, 68, 0.4);
}

.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
}

.file-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
}

.dark-theme .file-card {
  background: var(--bg-secondary);
}

.file-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.file-preview {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
  background: #e2e8f0;
}

.file-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-file {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(239, 68, 68, 0.9);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  font-size: 1.5rem;
  cursor: pointer;
  line-height: 1;
  transition: all 0.2s;
}

.remove-file:hover {
  background: #dc2626;
  transform: scale(1.1);
}

.file-info {
  padding: 0.75rem;
}

.file-name {
  font-size: 0.85rem;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.dark-theme .file-name {
  color: var(--text-primary);
}

.file-size {
  font-size: 0.75rem;
  color: var(--text-muted);
}

/* Conversion Options */
.conversion-options {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  animation: slideInLeft 0.6s ease-out 0.4s both;
}

.dark-theme .conversion-options {
  background: var(--bg-card);
}

.options-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
}

.dark-theme .options-title {
  color: var(--text-primary);
}

.options-grid {
  display: grid;
  gap: 2rem;
  margin-bottom: 2rem;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.option-label {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.dark-theme .option-label {
  color: var(--text-secondary);
}

.format-buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.format-btn {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  color: var(--text-secondary);
  font-family: 'Poppins', sans-serif;
}

.dark-theme .format-btn {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-secondary);
}

.format-btn:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  background: var(--bg-hover);
}

.format-btn.active {
  background: var(--gradient-primary);
  border-color: transparent;
  color: white;
  box-shadow: var(--shadow-glow);
}

.quality-slider {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #e2e8f0;
  outline: none;
  -webkit-appearance: none;
}

.quality-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  cursor: pointer;
}

.quality-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
  cursor: pointer;
  border: none;
}

.quality-presets {
  display: flex;
  gap: 0.5rem;
}

.preset-btn {
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--transition-base);
  color: var(--text-secondary);
}

.dark-theme .preset-btn {
  background: var(--bg-tertiary);
  border-color: var(--border-color);
  color: var(--text-secondary);
}

.preset-btn:hover {
  background: var(--color-primary);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--color-primary);
}

.resize-inputs {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.dimension-input {
  width: 120px;
  padding: var(--spacing-sm);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: all var(--transition-base);
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.dark-theme .dimension-input {
  background: var(--bg-secondary);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.dimension-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.maintain-ratio {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
}

/* Convert Button */
.convert-btn {
  width: 100%;
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: var(--radius-xl);
  font-size: 1.2rem;
  font-weight: 700;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-glow);
  position: relative;
  overflow: hidden;
}

.convert-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s;
}

.convert-btn:hover:not(:disabled)::before {
  left: 100%;
}

.convert-btn:hover:not(:disabled) {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(99, 102, 241, 0.5);
}

.convert-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.converting-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Results Section */
.results-section {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
  animation: scaleIn 0.5s ease-out;
}

.dark-theme .results-section {
  background: var(--bg-card);
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.results-title {
  font-family: 'Poppins', sans-serif;
  font-size: 1.8rem;
  color: var(--text-primary);
  font-weight: 700;
}

.dark-theme .results-title {
  color: var(--text-primary);
}

.download-all-btn {
  background: var(--gradient-success);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.download-all-btn:hover {
  background: #059669;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.result-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
}

.dark-theme .result-card {
  background: var(--bg-secondary);
}

.result-card:hover {
  transform: translateY(-4px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.result-preview {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #e2e8f0;
}

.result-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.result-info {
  padding: 1rem;
}

.result-name {
  font-size: 0.9rem;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
  word-break: break-word;
}

.dark-theme .result-name {
  color: var(--text-primary);
}

.result-meta {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.meta-item {
  font-size: 0.75rem;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-weight: 600;
}

.dark-theme .meta-item {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}

.meta-item.savings {
  background: var(--color-success);
  color: white;
}

.result-actions {
  display: flex;
  gap: var(--spacing-sm);
  width: 100%;
}

.compare-btn {
  flex: 1;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  padding: var(--spacing-sm);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all var(--transition-base);
  border-radius: 0;
}

.compare-btn:hover {
  background: var(--bg-hover);
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.download-btn {
  flex: 1;
  background: var(--gradient-primary);
  color: white;
  border: none;
  padding: var(--spacing-sm);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all var(--transition-base);
  border-radius: 0;
}

.download-btn:hover {
  background: var(--gradient-primary);
  box-shadow: var(--shadow-glow);
  transform: translateY(-2px);
}

/* Features Section */
.features-section {
  margin-top: var(--spacing-2xl);
  padding: var(--spacing-2xl) 0;
}

.features-title {
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-2xl);
  font-weight: 800;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: var(--spacing-xl);
  border-radius: var(--radius-2xl);
  text-align: center;
  transition: all var(--transition-base);
}

.dark-theme .feature-card {
  background: var(--bg-card);
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-xl);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: var(--spacing-md);
  filter: drop-shadow(0 4px 12px rgba(99, 102, 241, 0.3));
}

.feature-card h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
}

.dark-theme .feature-card h3 {
  color: var(--text-primary);
}

.feature-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 0;
}

/* Comparison Modal */
.comparison-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  padding: var(--spacing-lg);
  animation: fadeIn 0.3s ease-out;
}

.comparison-content {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-2xl);
  padding: var(--spacing-2xl);
  max-width: 1200px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: scaleIn 0.3s ease-out;
}

.dark-theme .comparison-content {
  background: var(--bg-card);
}

.close-modal {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  background: var(--color-error);
  color: white;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-full);
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  transition: all var(--transition-base);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.close-modal:hover {
  background: #dc2626;
  transform: rotate(90deg) scale(1.1);
}

.comparison-title {
  font-family: 'Poppins', sans-serif;
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-xl);
  text-align: center;
  font-weight: 700;
}

.dark-theme .comparison-title {
  color: var(--text-primary);
}

.comparison-images {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.comparison-side {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.comparison-side h3 {
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  color: var(--text-primary);
  text-align: center;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.dark-theme .comparison-side h3 {
  color: var(--text-primary);
}

.comparison-img-wrapper {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-xl);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  max-height: 500px;
}

.dark-theme .comparison-img-wrapper {
  background: var(--bg-secondary);
}

.comparison-img-wrapper img {
  max-width: 100%;
  max-height: 500px;
  object-fit: contain;
  display: block;
}

.comparison-arrow {
  font-size: 3rem;
  color: var(--color-primary);
  font-weight: bold;
  text-align: center;
}

.comparison-stats {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.dark-theme .comparison-stats {
  background: var(--bg-secondary);
}

.stat-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-label {
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-value {
  color: var(--text-primary);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
}

.dark-theme .stat-value {
  color: var(--text-primary);
}

.savings-highlight {
  background: var(--gradient-success);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md) !important;
  margin-top: var(--spacing-sm);
}

.savings-highlight .stat-label,
.savings-highlight .stat-value {
  color: white;
  font-weight: 700;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .comparison-images {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .comparison-arrow {
    transform: rotate(90deg);
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2rem;
  }

  .main-subtitle {
    font-size: 1rem;
  }

  .upload-zone {
    padding: 2rem 1rem;
  }

  .files-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .format-buttons {
    grid-template-columns: repeat(2, 1fr);
  }

  .resize-inputs {
    flex-direction: column;
    align-items: stretch;
  }

  .dimension-input {
    width: 100%;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }

  .comparison-content {
    padding: var(--spacing-lg);
  }

  .comparison-title {
    font-size: 1.5rem;
    padding-right: var(--spacing-2xl);
  }

  .result-actions {
    flex-direction: column;
  }
}
</style>
