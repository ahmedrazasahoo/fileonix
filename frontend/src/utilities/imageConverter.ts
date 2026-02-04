import Pica from 'pica'

const pica = new Pica({
  features: ['js', 'wasm', 'ww']
})

export interface ConversionOptions {
  format: 'png' | 'jpeg' | 'webp' | 'gif'
  quality: number
  width?: number
  height?: number
  maintainRatio?: boolean
}

export interface ConversionResult {
  blob: Blob
  url: string
  width: number
  height: number
  size: number
}

/**
 * Convert an image to a different format with high quality preservation
 */
export async function convertImage(
  imageSource: string | HTMLImageElement,
  options: ConversionOptions
): Promise<ConversionResult> {
  return new Promise((resolve, reject) => {
    const img = typeof imageSource === 'string' ? new Image() : imageSource
    
    const processImage = async () => {
      try {
        // Create source canvas
        const sourceCanvas = document.createElement('canvas')
        sourceCanvas.width = img.width
        sourceCanvas.height = img.height
        
        const sourceCtx = sourceCanvas.getContext('2d', {
          alpha: true,
          willReadFrequently: false
        })
        
        if (!sourceCtx) {
          throw new Error('Failed to get canvas context')
        }
        
        // Draw the original image with high quality settings
        sourceCtx.imageSmoothingEnabled = true
        sourceCtx.imageSmoothingQuality = 'high'
        sourceCtx.drawImage(img, 0, 0)
        
        // Calculate target dimensions
        let targetWidth = img.width
        let targetHeight = img.height
        
        if (options.width || options.height) {
          if (options.maintainRatio) {
            if (options.width && options.height) {
              // Both dimensions specified with ratio
              const scale = Math.min(
                options.width / img.width,
                options.height / img.height
              )
              targetWidth = Math.round(img.width * scale)
              targetHeight = Math.round(img.height * scale)
            } else if (options.width) {
              // Only width specified
              const scale = options.width / img.width
              targetWidth = options.width
              targetHeight = Math.round(img.height * scale)
            } else if (options.height) {
              // Only height specified
              const scale = options.height / img.height
              targetHeight = options.height
              targetWidth = Math.round(img.width * scale)
            }
          } else {
            // No ratio maintenance
            targetWidth = options.width || targetWidth
            targetHeight = options.height || targetHeight
          }
        }
        
        // Create target canvas
        const targetCanvas = document.createElement('canvas')
        targetCanvas.width = targetWidth
        targetCanvas.height = targetHeight
        
        // Use Pica for high-quality resizing if dimensions changed
        let finalCanvas: HTMLCanvasElement
        if (targetWidth !== img.width || targetHeight !== img.height) {
          // Use Pica's advanced algorithms (Lanczos filter)
          finalCanvas = await pica.resize(sourceCanvas, targetCanvas, {
            quality: 3, // Highest quality (0-3)
            alpha: true,
            unsharpAmount: 80, // Sharpening to preserve details
            unsharpRadius: 0.6,
            unsharpThreshold: 2
          })
        } else {
          finalCanvas = sourceCanvas
        }
        
        // Convert to blob with specified format and quality
        const mimeType = `image/${options.format}`
        const qualityValue = options.quality / 100
        
        // Use toBlob with quality settings
        const blob = await pica.toBlob(finalCanvas, mimeType, qualityValue)
        
        const url = URL.createObjectURL(blob)
        
        resolve({
          blob,
          url,
          width: targetWidth,
          height: targetHeight,
          size: blob.size
        })
      } catch (error) {
        reject(error)
      }
    }
    
    if (typeof imageSource === 'string') {
      img.onload = processImage
      img.onerror = () => reject(new Error('Failed to load image'))
      img.crossOrigin = 'anonymous'
      img.src = imageSource
    } else {
      processImage()
    }
  })
}

/**
 * Batch convert multiple images
 */
export async function convertImages(
  imageSources: string[],
  options: ConversionOptions,
  onProgress?: (progress: number) => void
): Promise<ConversionResult[]> {
  const results: ConversionResult[] = []
  const total = imageSources.length
  
  for (let i = 0; i < total; i++) {
    const result = await convertImage(imageSources[i], options)
    results.push(result)
    
    if (onProgress) {
      const progress = Math.round(((i + 1) / total) * 100)
      onProgress(progress)
    }
  }
  
  return results
}

/**
 * Clean up blob URLs to prevent memory leaks
 */
export function cleanupBlobUrl(url: string): void {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url)
  }
}
