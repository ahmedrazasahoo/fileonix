<template>
  <div class="landing-page">
    <!-- Decorative Background Elements -->
    <div class="bg-decoration dots-top-right"></div>
    <div class="bg-decoration dots-left-center"></div>
    <div class="bg-decoration dots-bottom-right"></div>
    <div class="bg-decoration circle-blur-1"></div>
    <div class="bg-decoration circle-blur-2"></div>

    <!-- Hero Converter Section -->
    <section class="hero-converter-section">
      <div class="container">
        <div class="hero-header">
          <h1 class="hero-title">
            <span class="highlight-text">FileOnix</span> Image Converter
          </h1>
          <p class="hero-subtitle">Convert images instantly - Fast, free & private</p>
        </div>

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
            <div class="upload-icon"><FolderOpen :size="64" :stroke-width="1.5" /></div>
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

            <!-- Advanced Options Toggle -->
            <div class="option-group">
              <button class="advanced-toggle" @click="showAdvanced = !showAdvanced">
                <Settings :size="18" :stroke-width="2" />
                {{ showAdvanced ? 'Hide' : 'Show' }} Advanced Options
                <span class="toggle-icon" :class="{ 'rotated': showAdvanced }">▼</span>
              </button>
            </div>

            <!-- Advanced Options Panel -->
            <div v-if="showAdvanced" class="advanced-panel">
              <!-- Rotation -->
              <div class="option-group">
                <label class="option-label">Rotation</label>
                <div class="rotation-buttons">
                  <button
                    v-for="rot in [0, 90, 180, 270]"
                    :key="rot"
                    class="rotation-btn"
                    :class="{ 'active': rotation === rot }"
                    @click="rotation = rot"
                  >
                    {{ rot }}°
                  </button>
                </div>
              </div>

              <!-- Flip Options -->
              <div class="option-group">
                <label class="option-label">Flip</label>
                <div class="flip-buttons">
                  <button
                    class="flip-btn"
                    :class="{ 'active': flipHorizontal }"
                    @click="flipHorizontal = !flipHorizontal"
                  >
                    ↔️ Horizontal
                  </button>
                  <button
                    class="flip-btn"
                    :class="{ 'active': flipVertical }"
                    @click="flipVertical = !flipVertical"
                  >
                    ↕️ Vertical
                  </button>
                </div>
              </div>

              <!-- Brightness -->
              <div class="option-group">
                <label class="option-label">
                  Brightness: {{ brightness > 0 ? '+' : '' }}{{ brightness }}
                </label>
                <input
                  type="range"
                  v-model.number="brightness"
                  min="-100"
                  max="100"
                  class="filter-slider"
                >
              </div>

              <!-- Contrast -->
              <div class="option-group">
                <label class="option-label">
                  Contrast: {{ contrast > 0 ? '+' : '' }}{{ contrast }}
                </label>
                <input
                  type="range"
                  v-model.number="contrast"
                  min="-100"
                  max="100"
                  class="filter-slider"
                >
              </div>

              <!-- Saturation -->
              <div class="option-group">
                <label class="option-label">
                  Saturation: {{ saturation > 0 ? '+' : '' }}{{ saturation }}
                </label>
                <input
                  type="range"
                  v-model.number="saturation"
                  min="-100"
                  max="100"
                  class="filter-slider"
                >
              </div>

              <!-- Grayscale -->
              <div class="option-group">
                <label class="option-label">
                  <input type="checkbox" v-model="grayscale" class="checkbox">
                  Convert to Grayscale
                </label>
              </div>

              <!-- Reset Button -->
              <button class="reset-filters-btn" @click="resetFilters">
                Reset All Filters
              </button>
            </div>
          </div>

          <!-- Convert Button -->
          <button
            class="convert-btn"
            @click="convertFiles"
            :disabled="isConverting"
          >
            <span v-if="!isConverting" class="btn-content">
              <Zap :size="20" :stroke-width="2" /> Convert {{ selectedFiles.length }} file{{ selectedFiles.length > 1 ? 's' : '' }}
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
            <div class="results-title-section">
              <h3 class="results-title">
                <Check :size="32" class="check-icon" /> Conversion Complete!
              </h3>
              <p class="results-summary">
                Successfully converted {{ convertedFiles.length }} file{{ convertedFiles.length > 1 ? 's' : '' }} •
                Total savings: {{ calculateTotalSavings() }}%
              </p>
            </div>
            <button class="download-all-btn" @click="downloadAll">
              <Download :size="18" :stroke-width="2" />
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
                <div v-if="file.savings > 0" class="savings-badge">
                  <span class="savings-icon">📉</span>
                  -{{ file.savings }}%
                </div>
              </div>
              <div class="result-info">
                <p class="result-name" :title="file.name">{{ file.name }}</p>
                <div class="result-details">
                  <div class="detail-row">
                    <span class="detail-label">Format:</span>
                    <span class="detail-value format-tag">{{ file.format.toUpperCase() }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Size:</span>
                    <span class="detail-value">{{ formatFileSize(file.size) }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Dimensions:</span>
                    <span class="detail-value">{{ file.width }} × {{ file.height }}</span>
                  </div>
                  <div class="detail-row">
                    <span class="detail-label">Original:</span>
                    <span class="detail-value muted">{{ formatFileSize(file.originalSize) }}</span>
                  </div>
                </div>
              </div>
              <div class="result-actions">
                <button class="compare-btn" @click="showComparison(index)">
                  <Eye :size="16" /> Compare
                </button>
                <button class="download-btn" @click="downloadFile(file)">
                  <Download :size="16" /> Download
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

            <!-- Comparison Stats Summary -->
            <div class="comparison-summary">
              <div class="summary-stat">
                <span class="summary-label">Original Size</span>
                <span class="summary-value">{{ formatFileSize(convertedFiles[compareIndex].originalSize) }}</span>
              </div>
              <div class="summary-arrow">→</div>
              <div class="summary-stat">
                <span class="summary-label">New Size</span>
                <span class="summary-value success">{{ formatFileSize(convertedFiles[compareIndex].size) }}</span>
              </div>
              <div class="summary-stat highlight">
                <span class="summary-label">Savings</span>
                <span class="summary-value success">{{ convertedFiles[compareIndex].savings }}%</span>
              </div>
            </div>

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

            <!-- Download Button -->
            <div class="comparison-actions">
              <button class="modal-download-btn" @click="downloadFile(convertedFiles[compareIndex])">
                <Download :size="20" :stroke-width="2" />
                Download Converted File
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Why Choose FileOnix?</h2>
          <p class="section-subtitle">
            Powerful features that make image conversion simple and secure
          </p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon"><Lock :size="56" :stroke-width="1.5" /></div>
            <h3 class="feature-title">100% Private</h3>
            <p class="feature-description">
              All conversions happen locally in your browser. Your files never leave your device, ensuring complete privacy and security.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Zap :size="56" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Lightning Fast</h3>
            <p class="feature-description">
              No upload or download time needed. Convert images instantly with our browser-based technology.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Palette :size="56" :stroke-width="1.5" /></div>
            <h3 class="feature-title">High Quality</h3>
            <p class="feature-description">
              Advanced algorithms ensure your images maintain perfect quality at any compression level.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><DollarSign :size="56" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Free Forever</h3>
            <p class="feature-description">
              No limits, no watermarks, no hidden fees. Convert unlimited files completely free.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Smartphone :size="56" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Works Everywhere</h3>
            <p class="feature-description">
              Compatible with all modern browsers on desktop and mobile devices. No installation required.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><Wrench :size="56" :stroke-width="1.5" /></div>
            <h3 class="feature-title">Multiple Formats</h3>
            <p class="feature-description">
              Support for PNG, JPG, WebP, GIF, BMP and more. Batch convert multiple files at once.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">How It Works</h2>
          <p class="section-subtitle">
            Convert your images in three simple steps
          </p>
        </div>
        <div class="steps-container">
          <div class="step-card">
            <div class="step-number">1</div>
            <div class="step-icon"><Upload :size="48" :stroke-width="1.5" /></div>
            <h3 class="step-title">Upload Images</h3>
            <p class="step-description">
              Drag and drop your images or click to browse. Select single or multiple files.
            </p>
          </div>
          <div class="step-connector"></div>
          <div class="step-card">
            <div class="step-number">2</div>
            <div class="step-icon"><Settings :size="48" :stroke-width="1.5" /></div>
            <h3 class="step-title">Choose Settings</h3>
            <p class="step-description">
              Select your desired format, quality, and size. Customize to your needs.
            </p>
          </div>
          <div class="step-connector"></div>
          <div class="step-card">
            <div class="step-number">3</div>
            <div class="step-icon"><Download :size="48" :stroke-width="1.5" /></div>
            <h3 class="step-title">Download</h3>
            <p class="step-description">
              Get your converted files instantly. Download individually or all at once.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Supported Formats Section -->
    <section class="formats-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Supported Formats</h2>
          <p class="section-subtitle">
            Convert between all popular image formats
          </p>
        </div>
        <div class="formats-grid">
          <div class="format-item">
            <div class="format-icon"><Image :size="40" :stroke-width="1.5" /></div>
            <h4>PNG</h4>
            <p>Lossless quality</p>
          </div>
          <div class="format-item">
            <div class="format-icon"><Camera :size="40" :stroke-width="1.5" /></div>
            <h4>JPEG</h4>
            <p>Optimized size</p>
          </div>
          <div class="format-item">
            <div class="format-icon"><Globe :size="40" :stroke-width="1.5" /></div>
            <h4>WebP</h4>
            <p>Modern format</p>
          </div>
          <div class="format-item">
            <div class="format-icon"><Film :size="40" :stroke-width="1.5" /></div>
            <h4>GIF</h4>
            <p>Animated support</p>
          </div>
          <div class="format-item">
            <div class="format-icon"><Palette :size="40" :stroke-width="1.5" /></div>
            <h4>BMP</h4>
            <p>Raw images</p>
          </div>
          <div class="format-item">
            <div class="format-icon"><Sparkles :size="40" :stroke-width="1.5" /></div>
            <h4>SVG</h4>
            <p>Vector graphics</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Section -->
    <section class="trust-section">
      <div class="container">
        <div class="trust-content">
          <div class="trust-text">
            <h2 class="trust-title">Trusted by Millions</h2>
            <p class="trust-description">
              Join millions of users who trust FileOnix for their image conversion needs. 
              Our commitment to privacy, speed, and quality has made us the preferred choice for professionals and casual users alike.
            </p>
            <div class="trust-badges">
              <div class="badge-item">
                <div class="badge-icon"><Check :size="14" :stroke-width="3" /></div>
                <span>No Registration</span>
              </div>
              <div class="badge-item">
                <div class="badge-icon"><Check :size="14" :stroke-width="3" /></div>
                <span>No File Limits</span>
              </div>
              <div class="badge-item">
                <div class="badge-icon"><Check :size="14" :stroke-width="3" /></div>
                <span>No Watermarks</span>
              </div>
            </div>
          </div>
          <div class="trust-stats">
            <div class="trust-stat-card">
              <div class="trust-stat-number">10M+</div>
              <div class="trust-stat-label">Happy Users</div>
            </div>
            <div class="trust-stat-card">
              <div class="trust-stat-number">50M+</div>
              <div class="trust-stat-label">Files Processed</div>
            </div>
            <div class="trust-stat-card">
              <div class="trust-stat-number">4.9/5</div>
              <div class="trust-stat-label">User Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Ready to Convert More?</h2>
          <p class="cta-description">
            Scroll up and start converting your images now. No signup required.
          </p>
          <a href="#" @click.prevent="scrollToTop" class="btn-primary btn-large btn-cta">
            Back to Converter
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { convertImage, cleanupBlobUrl } from '../utilities/imageConverter'
import { FolderOpen, Zap, Lock, Palette, DollarSign, Smartphone, Wrench, Upload, Settings, Download, Image, Camera, Globe, Film, Sparkles, Check, Eye } from 'lucide-vue-next'

export default {
  name: 'Home',
  components: {
    FolderOpen,
    Zap,
    Lock,
    Palette,
    DollarSign,
    Smartphone,
    Wrench,
    Upload,
    Settings,
    Download,
    Image,
    Camera,
    Globe,
    Film,
    Sparkles,
    Check,
    Eye
  },
  data() {
    return {
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

      // Advanced options
      showAdvanced: false,
      rotation: 0,
      flipHorizontal: false,
      flipVertical: false,
      brightness: 0,
      contrast: 0,
      saturation: 0,
      grayscale: false,

      outputFormats: [
        { label: 'PNG', value: 'png' },
        { label: 'JPG', value: 'jpeg' },
        { label: 'WebP', value: 'webp' },
        { label: 'GIF', value: 'gif' },
        { label: 'BMP', value: 'bmp' },
        { label: 'AVIF', value: 'avif' },
        { label: 'TIFF', value: 'tiff' },
        { label: 'ICO', value: 'ico' }
      ]
    }
  },
  methods: {
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

          // Add advanced options
          if (this.rotation !== 0) options.rotation = this.rotation
          if (this.flipHorizontal) options.flipHorizontal = true
          if (this.flipVertical) options.flipVertical = true
          if (this.brightness !== 0) options.brightness = this.brightness
          if (this.contrast !== 0) options.contrast = this.contrast
          if (this.saturation !== 0) options.saturation = this.saturation
          if (this.grayscale) options.grayscale = true

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
    },

    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    resetFilters() {
      this.rotation = 0
      this.flipHorizontal = false
      this.flipVertical = false
      this.brightness = 0
      this.contrast = 0
      this.saturation = 0
      this.grayscale = false
    },

    calculateTotalSavings() {
      if (this.convertedFiles.length === 0) return 0
      const totalSavings = this.convertedFiles.reduce((sum, file) => sum + file.savings, 0)
      return Math.round(totalSavings / this.convertedFiles.length)
    }
  },
  mounted() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    document.querySelectorAll('.feature-card, .step-card, .format-item, .trust-stat-card').forEach(el => {
      observer.observe(el)
    })
  },
  beforeUnmount() {
    this.convertedFiles.forEach(file => {
      if (file.url) {
        cleanupBlobUrl(file.url)
      }
    })
  }
}
</script>

<style scoped>
.landing-page {
  position: relative;
  overflow: hidden;
}

/* Decorative Background Elements */
.bg-decoration {
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.dots-top-right {
  top: 100px;
  right: 50px;
  width: 200px;
  height: 200px;
  background-image: radial-gradient(circle, var(--color-primary) 2px, transparent 2px);
  background-size: 20px 20px;
  opacity: 0.15;
  animation: float 6s ease-in-out infinite;
}

.dots-left-center {
  top: 50%;
  left: 20px;
  width: 150px;
  height: 150px;
  background-image: radial-gradient(circle, var(--color-accent) 2px, transparent 2px);
  background-size: 15px 15px;
  opacity: 0.1;
  animation: float 8s ease-in-out infinite reverse;
}

.dots-bottom-right {
  bottom: 150px;
  right: 100px;
  width: 180px;
  height: 180px;
  background-image: radial-gradient(circle, var(--color-warm) 2px, transparent 2px);
  background-size: 18px 18px;
  opacity: 0.12;
  animation: float 7s ease-in-out infinite;
}

.circle-blur-1 {
  top: 20%;
  left: 10%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(193, 120, 85, 0.1) 0%, transparent 70%);
  filter: blur(60px);
  animation: pulse 8s ease-in-out infinite;
}

.circle-blur-2 {
  bottom: 10%;
  right: 15%;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%);
  filter: blur(60px);
  animation: pulse 10s ease-in-out infinite reverse;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-20px) translateX(10px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.15;
  }
}

/* Hero Converter Section */
.hero-converter-section {
  position: relative;
  padding: var(--spacing-2xl) 0;
  z-index: 1;
}

.hero-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
  animation: fadeInUp 0.6s ease-out;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 800;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.highlight-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  color: var(--text-secondary);
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-weight: 500;
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
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.upload-zone::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(193, 120, 85, 0.1), transparent);
  transition: left 0.5s;
}

.upload-zone:hover::before {
  left: 100%;
}

.upload-zone:hover {
  border-color: var(--color-primary);
  background: var(--bg-secondary);
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.upload-zone.dragging {
  border-color: var(--color-primary);
  background: rgba(193, 120, 85, 0.1);
  transform: scale(1.02);
  box-shadow: 0 0 30px rgba(193, 120, 85, 0.3);
}

.upload-placeholder {
  pointer-events: none;
}

.upload-icon {
  margin-bottom: var(--spacing-lg);
  display: inline-flex;
  color: var(--color-primary);
  filter: drop-shadow(0 4px 12px rgba(193, 120, 85, 0.3));
  animation: pulse 2s ease-in-out infinite;
}

.upload-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  font-weight: 700;
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
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(193, 120, 85, 0.3);
  transition: all var(--transition-base);
}

.format-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(193, 120, 85, 0.4);
}

/* Files Preview */
.files-preview {
  text-align: left;
}

.files-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-lg);
}

.files-header h3 {
  color: var(--text-primary);
  font-size: 1.3rem;
  font-weight: 600;
}

.clear-btn {
  background: var(--color-danger);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-base);
  box-shadow: 0 4px 12px rgba(193, 120, 85, 0.3);
}

.clear-btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(193, 120, 85, 0.4);
}

.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: var(--spacing-md);
}

.file-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-base);
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
  background: var(--bg-tertiary);
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
  transition: all var(--transition-base);
}

.remove-file:hover {
  background: var(--color-primary-dark);
  transform: scale(1.1);
}

.file-info {
  padding: var(--spacing-sm);
}

.file-name {
  font-size: 0.85rem;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: var(--spacing-xs);
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
  animation: fadeInUp 0.6s ease-out 0.4s both;
}

.options-title {
  font-size: 1.5rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  font-weight: 700;
}

.options-grid {
  display: grid;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.option-label {
  font-weight: 600;
  color: var(--text-secondary);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.format-buttons {
  display: flex;
  gap: var(--spacing-sm);
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
}

.format-btn:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
  background: var(--bg-hover);
}

.format-btn.active {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 12px rgba(193, 120, 85, 0.3);
}

.quality-slider {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: var(--bg-tertiary);
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.quality-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  cursor: pointer;
  box-shadow: var(--shadow-md);
}

.quality-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  cursor: pointer;
  border: none;
  box-shadow: var(--shadow-md);
}

.quality-presets {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
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
  gap: var(--spacing-sm);
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

.dimension-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(193, 120, 85, 0.1);
}

.maintain-ratio {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 0.9rem;
  cursor: pointer;
}

/* Advanced Options */
.advanced-toggle {
  width: 100%;
  background: var(--bg-tertiary);
  border: 2px solid var(--border-color);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.advanced-toggle:hover {
  border-color: var(--color-primary);
  background: var(--bg-hover);
  transform: translateY(-2px);
}

.toggle-icon {
  transition: transform var(--transition-base);
  display: inline-block;
  font-size: 0.8rem;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.advanced-panel {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  margin-top: var(--spacing-md);
  display: grid;
  gap: var(--spacing-lg);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rotation-buttons,
.flip-buttons {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.rotation-btn,
.flip-btn {
  background: var(--bg-tertiary);
  border: 2px solid var(--border-color);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  color: var(--text-secondary);
  flex: 1;
  min-width: 70px;
}

.rotation-btn:hover,
.flip-btn:hover {
  border-color: var(--color-primary);
  transform: translateY(-2px);
}

.rotation-btn.active,
.flip-btn.active {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-color: transparent;
  color: white;
  box-shadow: 0 4px 12px rgba(193, 120, 85, 0.3);
}

.filter-slider {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: var(--bg-tertiary);
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.filter-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  cursor: pointer;
  box-shadow: var(--shadow-md);
}

.filter-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  cursor: pointer;
  border: none;
  box-shadow: var(--shadow-md);
}

.reset-filters-btn {
  background: var(--bg-tertiary);
  border: 2px solid var(--border-color);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  color: var(--text-secondary);
  width: 100%;
}

.reset-filters-btn:hover {
  background: var(--color-danger);
  color: white;
  border-color: transparent;
  transform: translateY(-2px);
}

/* Convert Button */
.convert-btn {
  width: 100%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border: none;
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: var(--radius-xl);
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 8px 20px rgba(193, 120, 85, 0.3);
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
  box-shadow: 0 15px 40px rgba(193, 120, 85, 0.5);
}

.convert-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
}

.converting-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
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

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
  gap: var(--spacing-md);
}

.results-title-section {
  flex: 1;
}

.results-title {
  font-size: 1.8rem;
  color: var(--text-primary);
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-xs);
}

.results-summary {
  font-size: 0.95rem;
  color: var(--text-muted);
  font-weight: 500;
}

.check-icon {
  color: var(--color-success);
  filter: drop-shadow(0 2px 8px rgba(16, 185, 129, 0.4));
  animation: checkPulse 0.5s ease-out;
}

@keyframes checkPulse {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.download-all-btn {
  background: var(--color-primary);
  color: white;
  border: none;
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 4px 12px rgba(193, 120, 85, 0.3);
}

.download-all-btn:hover {
  background: var(--color-primary-dark);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(193, 120, 85, 0.4);
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.result-card {
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all var(--transition-base);
  animation: fadeInUp 0.4s ease-out;
  animation-fill-mode: both;
}

.result-card:nth-child(1) { animation-delay: 0.05s; }
.result-card:nth-child(2) { animation-delay: 0.1s; }
.result-card:nth-child(3) { animation-delay: 0.15s; }
.result-card:nth-child(4) { animation-delay: 0.2s; }
.result-card:nth-child(5) { animation-delay: 0.25s; }
.result-card:nth-child(n+6) { animation-delay: 0.3s; }

.result-card:hover {
  transform: translateY(-6px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-xl);
}

.result-preview {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: var(--bg-tertiary);
  position: relative;
}

.result-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.result-card:hover .result-preview img {
  transform: scale(1.05);
}

.savings-badge {
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-sm);
  background: var(--color-success);
  color: white;
  padding: var(--spacing-xs) var(--spacing-md);
  border-radius: var(--radius-full);
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  animation: bounceIn 0.5s ease-out;
}

@keyframes bounceIn {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.15);
  }
  100% {
    transform: scale(1);
  }
}

.savings-icon {
  font-size: 1rem;
}

.result-info {
  padding: var(--spacing-md);
}

.result-name {
  font-size: 0.95rem;
  color: var(--text-primary);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.result-details {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.detail-label {
  color: var(--text-muted);
  font-weight: 500;
}

.detail-value {
  color: var(--text-primary);
  font-weight: 600;
}

.detail-value.muted {
  color: var(--text-muted);
  text-decoration: line-through;
}

.format-tag {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  padding: 2px var(--spacing-sm);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
}

.result-actions {
  display: flex;
  gap: var(--spacing-xs);
  padding: 0 var(--spacing-md) var(--spacing-md);
}

.compare-btn,
.download-btn {
  flex: 1;
  padding: var(--spacing-sm);
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all var(--transition-base);
  border: none;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
}

.compare-btn {
  background: var(--bg-tertiary);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.compare-btn:hover {
  background: var(--bg-hover);
  border-color: var(--color-primary);
}

.download-btn {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
}

.download-btn:hover {
  box-shadow: 0 4px 12px rgba(193, 120, 85, 0.3);
  transform: translateY(-2px);
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
  max-width: 1400px;
  width: 95%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: scaleIn 0.3s ease-out;
}

.close-modal {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  background: var(--color-danger);
  color: white;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
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
  background: var(--color-primary-dark);
  transform: rotate(90deg) scale(1.1);
}

.comparison-title {
  font-size: 2rem;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  text-align: center;
  font-weight: 700;
}

.comparison-summary {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-xl);
  flex-wrap: wrap;
}

.summary-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-md);
}

.summary-stat.highlight {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: var(--radius-lg);
  padding: var(--spacing-md) var(--spacing-lg);
}

.summary-stat.highlight .summary-label,
.summary-stat.highlight .summary-value {
  color: white;
}

.summary-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.summary-value {
  font-size: 1.5rem;
  color: var(--text-primary);
  font-weight: 800;
  font-family: 'Poppins', sans-serif;
}

.summary-value.success {
  color: var(--color-success);
}

.summary-arrow {
  font-size: 2rem;
  color: var(--color-primary);
  font-weight: bold;
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
  font-size: 1.5rem;
  color: var(--text-primary);
  text-align: center;
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
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
}

.savings-highlight {
  background: var(--color-primary);
  border-radius: var(--radius-md);
  padding: var(--spacing-sm) var(--spacing-md) !important;
  margin-top: var(--spacing-sm);
}

.savings-highlight .stat-label,
.savings-highlight .stat-value {
  color: white;
  font-weight: 700;
}

.comparison-actions {
  margin-top: var(--spacing-xl);
  display: flex;
  justify-content: center;
  gap: var(--spacing-md);
}

.modal-download-btn {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border: none;
  padding: var(--spacing-md) var(--spacing-2xl);
  border-radius: var(--radius-xl);
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all var(--transition-base);
  box-shadow: 0 8px 20px rgba(193, 120, 85, 0.3);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.modal-download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(193, 120, 85, 0.5);
}

/* Section Styling */
section {
  position: relative;
  padding: var(--spacing-2xl) 0;
  z-index: 1;
}

.section-header {
  text-align: center;
  margin-bottom: var(--spacing-2xl);
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.section-subtitle {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

/* Features Section */
.features-section {
  background: var(--bg-secondary);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-xl);
}

.feature-card {
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  transition: all var(--transition-smooth);
  opacity: 0;
  transform: translateY(30px);
}

.feature-card.visible {
  opacity: 1;
  transform: translateY(0);
  animation: fadeInUp 0.6s ease-out forwards;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-xl);
}

.feature-icon {
  margin-bottom: var(--spacing-md);
  display: inline-flex;
  color: var(--color-primary);
}

.feature-title {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.feature-description {
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

/* How It Works Section */
.steps-container {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  gap: var(--spacing-lg);
  align-items: center;
  max-width: 1100px;
  margin: 0 auto;
}

.step-card {
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  text-align: center;
  position: relative;
  transition: all var(--transition-smooth);
  opacity: 0;
  transform: scale(0.9);
}

.step-card.visible {
  opacity: 1;
  transform: scale(1);
  animation: scaleIn 0.5s ease-out forwards;
}

.step-card:hover {
  transform: scale(1.05);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-xl);
}

.step-number {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.2rem;
  box-shadow: var(--shadow-md);
}

.step-icon {
  margin: var(--spacing-md) 0;
  display: inline-flex;
  color: var(--color-primary);
}

.step-title {
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-sm);
  color: var(--text-primary);
}

.step-description {
  color: var(--text-secondary);
  margin: 0;
  line-height: 1.6;
}

.step-connector {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
  border-radius: 2px;
  position: relative;
}

.step-connector::after {
  content: '→';
  position: absolute;
  right: -15px;
  top: -10px;
  color: var(--color-primary);
  font-size: 1.5rem;
  font-weight: bold;
}

/* Formats Section */
.formats-section {
  background: var(--bg-secondary);
}

.formats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: var(--spacing-lg);
  max-width: 900px;
  margin: 0 auto;
}

.format-item {
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all var(--transition-base);
  opacity: 0;
  transform: translateY(20px);
}

.format-item.visible {
  opacity: 1;
  transform: translateY(0);
  animation: fadeInUp 0.5s ease-out forwards;
}

.format-item:hover {
  transform: translateY(-8px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.format-icon {
  margin-bottom: var(--spacing-sm);
  display: inline-flex;
  color: var(--color-primary);
}

.format-item h4 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.format-item p {
  font-size: 0.9rem;
  color: var(--text-muted);
  margin: 0;
}

/* Trust Section */
.trust-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-2xl);
  align-items: center;
}

.trust-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  color: var(--text-primary);
}

.trust-description {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: var(--spacing-xl);
  font-size: 1.1rem;
}

.trust-badges {
  display: flex;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: var(--bg-secondary);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  font-weight: 600;
  color: var(--text-primary);
}

.badge-icon {
  width: 24px;
  height: 24px;
  background: var(--color-primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.trust-stats {
  display: grid;
  gap: var(--spacing-lg);
}

.trust-stat-card {
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-xl);
  padding: var(--spacing-xl);
  text-align: center;
  transition: all var(--transition-base);
  opacity: 0;
  transform: translateX(30px);
}

.trust-stat-card.visible {
  opacity: 1;
  transform: translateX(0);
  animation: slideInRight 0.6s ease-out forwards;
}

.trust-stat-card:hover {
  transform: scale(1.05);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-lg);
}

.trust-stat-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: block;
  margin-bottom: var(--spacing-sm);
}

.trust-stat-label {
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 1rem;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: white;
  padding: var(--spacing-2xl) 0;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.5;
}

.cta-content {
  text-align: center;
  position: relative;
  z-index: 1;
}

.cta-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin-bottom: var(--spacing-md);
  color: white;
}

.cta-description {
  font-size: clamp(1rem, 2vw, 1.3rem);
  margin-bottom: var(--spacing-xl);
  color: rgba(255, 255, 255, 0.95);
}

.btn-large {
  padding: var(--spacing-md) var(--spacing-2xl);
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
  text-decoration: none;
  display: inline-block;
}

.btn-cta {
  background: white;
  color: var(--color-primary);
  border: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.btn-cta:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  background: var(--bg-primary);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* ================================
   COMPREHENSIVE RESPONSIVE DESIGN
   ================================ */

/* Large Desktop - 1400px and below */
@media (max-width: 1400px) {
  .container {
    max-width: 1200px;
  }

  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .comparison-content {
    max-width: 1200px;
  }
}

/* Tablet Landscape / Small Desktop - 1024px and below */
@media (max-width: 1024px) {
  .container {
    max-width: 960px;
    padding: 0 var(--spacing-lg);
  }

  .hero-converter-section {
    padding: 60px 0;
  }

  .upload-zone {
    padding: var(--spacing-xl);
  }

  .files-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: var(--spacing-sm);
  }

  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: var(--spacing-md);
  }

  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-lg);
  }

  .formats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .trust-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }

  .trust-text {
    text-align: center;
  }

  .trust-badges {
    justify-content: center;
  }

  .trust-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .steps-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .step-connector {
    display: none;
  }

  .comparison-images {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }

  .comparison-arrow {
    transform: rotate(90deg);
    font-size: 2.5rem;
  }

  .comparison-img-wrapper {
    min-height: 250px;
    max-height: 400px;
  }

  .comparison-img-wrapper img {
    max-height: 400px;
  }
}

/* Tablet Portrait - 768px and below */
@media (max-width: 768px) {
  .container {
    max-width: 720px;
    padding: 0 var(--spacing-md);
  }

  /* Hero Section */
  .hero-header {
    margin-bottom: var(--spacing-xl);
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  /* Upload Zone */
  .upload-zone {
    padding: var(--spacing-lg);
  }

  .upload-icon svg {
    width: 52px;
    height: 52px;
  }

  .upload-title {
    font-size: 1.5rem;
  }

  .upload-subtitle {
    font-size: 1rem;
  }

  .supported-formats {
    gap: 8px;
  }

  .format-badge {
    padding: 6px 12px;
    font-size: 0.75rem;
  }

  /* Files Grid */
  .files-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .file-preview {
    height: 120px;
  }

  .files-header {
    flex-direction: row;
    gap: var(--spacing-md);
  }

  /* Conversion Options */
  .conversion-options {
    padding: var(--spacing-lg);
  }

  .options-title {
    font-size: 1.25rem;
  }

  .options-grid {
    gap: var(--spacing-lg);
  }

  .format-buttons {
    gap: 8px;
  }

  .format-btn {
    padding: 10px var(--spacing-md);
    font-size: 0.9rem;
  }

  .quality-presets {
    gap: 8px;
  }

  .preset-btn {
    padding: 8px var(--spacing-sm);
    font-size: 0.8rem;
  }

  .resize-inputs {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  .dimension-input {
    width: 100%;
  }

  .maintain-ratio {
    width: 100%;
  }

  /* Convert Button */
  .convert-btn {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: 1.1rem;
  }

  /* Results Section */
  .results-section {
    padding: var(--spacing-lg);
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .results-title {
    font-size: 1.5rem;
  }

  .download-all-btn {
    width: 100%;
  }

  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: var(--spacing-sm);
  }

  .result-preview {
    height: 150px;
  }

  .result-actions {
    flex-direction: column;
    gap: 8px;
  }

  .compare-btn,
  .download-btn {
    width: 100%;
  }

  /* Comparison Modal */
  .comparison-modal {
    padding: var(--spacing-md);
  }

  .comparison-content {
    padding: var(--spacing-lg);
    max-width: 95%;
  }

  .comparison-title {
    font-size: 1.5rem;
    margin-bottom: var(--spacing-lg);
  }

  .comparison-img-wrapper {
    min-height: 200px;
    max-height: 300px;
  }

  .comparison-img-wrapper img {
    max-height: 300px;
  }

  .close-modal {
    width: 40px;
    height: 40px;
    font-size: 1.75rem;
    top: var(--spacing-md);
    right: var(--spacing-md);
  }

  /* Features Section */
  .features-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .feature-card {
    padding: var(--spacing-lg);
  }

  .feature-icon svg {
    width: 48px;
    height: 48px;
  }

  .feature-title {
    font-size: 1.25rem;
  }

  .feature-description {
    font-size: 0.95rem;
  }

  /* How It Works */
  .step-card {
    padding: var(--spacing-lg);
  }

  .step-number {
    width: 50px;
    height: 50px;
    font-size: 1.75rem;
  }

  .step-icon svg {
    width: 44px;
    height: 44px;
  }

  .step-title {
    font-size: 1.25rem;
  }

  .step-description {
    font-size: 0.95rem;
  }

  /* Formats Section */
  .formats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-md);
  }

  .format-item {
    padding: var(--spacing-lg);
  }

  /* Trust Section */
  .trust-title {
    font-size: 1.75rem;
  }

  .trust-description {
    font-size: 1rem;
  }

  .trust-badges {
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-sm);
  }

  .trust-stats {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .trust-stat-number {
    font-size: 2.5rem;
  }

  /* CTA Section */
  .cta-title {
    font-size: 1.75rem;
  }

  .cta-description {
    font-size: 1rem;
  }

  .btn-cta {
    padding: var(--spacing-md) var(--spacing-xl);
    font-size: 1.1rem;
  }

  /* Background Decorations */
  .bg-decoration {
    opacity: 0.05;
  }

  .circle-blur-1,
  .circle-blur-2 {
    display: none;
  }
}

/* Mobile Landscape / Large Phone - 640px and below */
@media (max-width: 640px) {
  .files-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .results-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .formats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile Portrait - 480px and below */
@media (max-width: 480px) {
  .container {
    max-width: 100%;
    padding: 0 var(--spacing-sm);
  }

  /* Hero Section */
  .hero-converter-section {
    padding: var(--spacing-xl) 0;
  }

  .hero-header {
    margin-bottom: var(--spacing-lg);
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-subtitle {
    font-size: 0.9rem;
  }

  /* Upload Zone */
  .upload-zone {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }

  .upload-icon svg {
    width: 48px;
    height: 48px;
  }

  .upload-title {
    font-size: 1.25rem;
  }

  .upload-subtitle {
    font-size: 0.9rem;
    margin-bottom: var(--spacing-md);
  }

  .supported-formats {
    gap: 6px;
  }

  .format-badge {
    padding: 4px 10px;
    font-size: 0.7rem;
  }

  /* Files Preview */
  .files-header {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-sm);
  }

  .files-header h3 {
    font-size: 1.1rem;
  }

  .clear-btn {
    width: 100%;
    padding: 10px var(--spacing-md);
  }

  .files-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  .file-preview {
    height: 200px;
  }

  /* Conversion Options */
  .conversion-options {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }

  .options-title {
    font-size: 1.1rem;
    margin-bottom: var(--spacing-md);
  }

  .options-grid {
    gap: var(--spacing-md);
  }

  .option-label {
    font-size: 0.9rem;
  }

  .format-buttons {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }

  .format-btn {
    padding: 10px;
    font-size: 0.85rem;
  }

  .quality-presets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
  }

  .preset-btn {
    padding: 8px 6px;
    font-size: 0.75rem;
  }

  /* Convert Button */
  .convert-btn {
    padding: var(--spacing-md);
    font-size: 1rem;
  }

  .btn-content svg,
  .converting-text .spinner {
    width: 18px;
    height: 18px;
  }

  /* Results Section */
  .results-section {
    padding: var(--spacing-md);
    margin-bottom: var(--spacing-lg);
  }

  .results-title {
    font-size: 1.25rem;
  }

  .results-title svg {
    width: 24px;
    height: 24px;
  }

  .download-all-btn {
    padding: 10px var(--spacing-md);
    font-size: 0.9rem;
  }

  .results-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  .result-preview {
    height: 200px;
  }

  .result-info {
    padding: var(--spacing-sm);
  }

  .result-name {
    font-size: 0.85rem;
  }

  .meta-item {
    font-size: 0.7rem;
    padding: 4px 8px;
  }

  .result-actions {
    padding: 0 var(--spacing-sm) var(--spacing-sm);
    gap: 6px;
  }

  .compare-btn,
  .download-btn {
    padding: 10px;
    font-size: 0.8rem;
  }

  /* Comparison Modal */
  .comparison-modal {
    padding: var(--spacing-sm);
  }

  .comparison-content {
    padding: var(--spacing-md);
    max-height: 95vh;
  }

  .comparison-title {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-md);
    padding-right: 50px;
  }

  .close-modal {
    width: 36px;
    height: 36px;
    font-size: 1.5rem;
    top: 10px;
    right: 10px;
  }

  .comparison-images {
    gap: var(--spacing-md);
  }

  .comparison-side h3 {
    font-size: 1.1rem;
  }

  .comparison-img-wrapper {
    min-height: 150px;
    max-height: 250px;
  }

  .comparison-img-wrapper img {
    max-height: 250px;
  }

  .comparison-stats {
    padding: var(--spacing-sm);
  }

  .stat-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    padding: 10px 0;
  }

  .stat-label,
  .stat-value {
    font-size: 0.85rem;
  }

  /* Features Section */
  section {
    padding: var(--spacing-xl) 0;
  }

  .section-header {
    margin-bottom: var(--spacing-lg);
  }

  .section-title {
    font-size: 1.5rem;
  }

  .section-subtitle {
    font-size: 0.9rem;
  }

  .features-grid {
    gap: var(--spacing-sm);
  }

  .feature-card {
    padding: var(--spacing-md);
  }

  .feature-icon svg {
    width: 44px;
    height: 44px;
  }

  .feature-title {
    font-size: 1.1rem;
  }

  .feature-description {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  /* How It Works */
  .step-card {
    padding: var(--spacing-md);
  }

  .step-number {
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
  }

  .step-icon svg {
    width: 40px;
    height: 40px;
  }

  .step-title {
    font-size: 1.1rem;
  }

  .step-description {
    font-size: 0.9rem;
    line-height: 1.5;
  }

  /* Formats Section */
  .formats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--spacing-sm);
  }

  .format-item {
    padding: var(--spacing-md);
  }

  .format-item h4 {
    font-size: 1rem;
  }

  .format-item p {
    font-size: 0.85rem;
  }

  .format-icon svg {
    width: 32px;
    height: 32px;
  }

  /* Trust Section */
  .trust-title {
    font-size: 1.5rem;
  }

  .trust-description {
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .badge-item {
    font-size: 0.85rem;
    padding: 8px var(--spacing-sm);
  }

  .trust-stat-card {
    padding: var(--spacing-md);
  }

  .trust-stat-number {
    font-size: 2rem;
  }

  .trust-stat-label {
    font-size: 0.9rem;
  }

  /* CTA Section */
  .cta-title {
    font-size: 1.5rem;
  }

  .cta-description {
    font-size: 0.9rem;
  }

  .btn-cta {
    padding: var(--spacing-md) var(--spacing-lg);
    font-size: 1rem;
    width: 100%;
  }

  /* Background Decorations */
  .dots-top-right,
  .dots-left-center,
  .dots-bottom-right {
    display: none;
  }

  .circle-blur-1,
  .circle-blur-2 {
    opacity: 0.03;
  }
}

/* Extra Small Mobile - 360px and below */
@media (max-width: 360px) {
  .hero-title {
    font-size: 1.5rem;
  }

  .upload-title {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.35rem;
  }

  .format-buttons {
    grid-template-columns: 1fr;
  }

  .quality-presets {
    grid-template-columns: 1fr;
  }

  .formats-grid {
    grid-template-columns: 1fr;
  }

  .feature-card,
  .step-card,
  .format-item,
  .trust-stat-card {
    padding: var(--spacing-sm);
  }
}
</style>
