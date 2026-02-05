import Pica from 'pica'

const pica = new Pica({
  features: ['js', 'wasm', 'ww']
})

export interface ConversionOptions {
  format: 'png' | 'jpeg' | 'webp' | 'gif' | 'bmp' | 'avif' | 'tiff' | 'ico'
  quality: number
  width?: number
  height?: number
  maintainRatio?: boolean
  rotation?: 0 | 90 | 180 | 270
  flipHorizontal?: boolean
  flipVertical?: boolean
  brightness?: number // -100 to 100
  contrast?: number // -100 to 100
  saturation?: number // -100 to 100
  grayscale?: boolean
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
        
        // Apply transformations
        let transformCanvas = sourceCanvas
        let transformCtx = sourceCtx

        // Handle rotation and flipping
        if (options.rotation || options.flipHorizontal || options.flipVertical) {
          transformCanvas = document.createElement('canvas')
          const isRotated = options.rotation === 90 || options.rotation === 270
          transformCanvas.width = isRotated ? img.height : img.width
          transformCanvas.height = isRotated ? img.width : img.height
          transformCtx = transformCanvas.getContext('2d', { alpha: true })!

          transformCtx.save()
          transformCtx.translate(transformCanvas.width / 2, transformCanvas.height / 2)

          if (options.rotation) {
            transformCtx.rotate((options.rotation * Math.PI) / 180)
          }

          if (options.flipHorizontal) {
            transformCtx.scale(-1, 1)
          }

          if (options.flipVertical) {
            transformCtx.scale(1, -1)
          }

          transformCtx.drawImage(img, -img.width / 2, -img.height / 2, img.width, img.height)
          transformCtx.restore()
        } else {
          // Draw the original image with high quality settings
          sourceCtx.imageSmoothingEnabled = true
          sourceCtx.imageSmoothingQuality = 'high'
          sourceCtx.drawImage(img, 0, 0)
        }

        // Apply filters (brightness, contrast, saturation, grayscale)
        if (options.brightness || options.contrast || options.saturation || options.grayscale) {
          const imageData = transformCtx.getImageData(0, 0, transformCanvas.width, transformCanvas.height)
          const data = imageData.data

          for (let i = 0; i < data.length; i += 4) {
            let r = data[i]
            let g = data[i + 1]
            let b = data[i + 2]

            // Grayscale
            if (options.grayscale) {
              const gray = 0.299 * r + 0.587 * g + 0.114 * b
              r = g = b = gray
            }

            // Brightness
            if (options.brightness) {
              const brightnessValue = (options.brightness / 100) * 255
              r = Math.max(0, Math.min(255, r + brightnessValue))
              g = Math.max(0, Math.min(255, g + brightnessValue))
              b = Math.max(0, Math.min(255, b + brightnessValue))
            }

            // Contrast
            if (options.contrast) {
              const factor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast))
              r = Math.max(0, Math.min(255, factor * (r - 128) + 128))
              g = Math.max(0, Math.min(255, factor * (g - 128) + 128))
              b = Math.max(0, Math.min(255, factor * (b - 128) + 128))
            }

            // Saturation
            if (options.saturation) {
              const gray = 0.299 * r + 0.587 * g + 0.114 * b
              const saturationFactor = (options.saturation / 100) + 1
              r = Math.max(0, Math.min(255, gray + saturationFactor * (r - gray)))
              g = Math.max(0, Math.min(255, gray + saturationFactor * (g - gray)))
              b = Math.max(0, Math.min(255, gray + saturationFactor * (b - gray)))
            }

            data[i] = r
            data[i + 1] = g
            data[i + 2] = b
          }

          transformCtx.putImageData(imageData, 0, 0)
        }
        
        // Calculate target dimensions
        let targetWidth = transformCanvas.width
        let targetHeight = transformCanvas.height

        if (options.width || options.height) {
          if (options.maintainRatio) {
            if (options.width && options.height) {
              // Both dimensions specified with ratio
              const scale = Math.min(
                options.width / transformCanvas.width,
                options.height / transformCanvas.height
              )
              targetWidth = Math.round(transformCanvas.width * scale)
              targetHeight = Math.round(transformCanvas.height * scale)
            } else if (options.width) {
              // Only width specified
              const scale = options.width / transformCanvas.width
              targetWidth = options.width
              targetHeight = Math.round(transformCanvas.height * scale)
            } else if (options.height) {
              // Only height specified
              const scale = options.height / transformCanvas.height
              targetHeight = options.height
              targetWidth = Math.round(transformCanvas.width * scale)
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
        if (targetWidth !== transformCanvas.width || targetHeight !== transformCanvas.height) {
          // Use Pica's advanced algorithms (Lanczos filter)
          finalCanvas = await pica.resize(transformCanvas, targetCanvas, {
            quality: 3, // Highest quality (0-3)
            alpha: true,
            unsharpAmount: 80, // Sharpening to preserve details
            unsharpRadius: 0.6,
            unsharpThreshold: 2
          })
        } else {
          finalCanvas = transformCanvas
        }
        
        // Convert to blob with specified format and quality
        let mimeType = `image/${options.format}`

        // Handle special format cases
        if (options.format === 'jpeg' || options.format === 'jpg') {
          mimeType = 'image/jpeg'
        } else if (options.format === 'tiff') {
          // TIFF not natively supported by browsers, fallback to PNG
          console.warn('TIFF format not fully supported by browser, using PNG as fallback')
          mimeType = 'image/png'
        } else if (options.format === 'ico') {
          // ICO not natively supported, fallback to PNG
          console.warn('ICO format not fully supported by browser, using PNG as fallback')
          mimeType = 'image/png'
        }

        const qualityValue = options.quality / 100

        // Use toBlob with quality settings
        // Note: Quality parameter only works for image/jpeg, image/webp, and image/avif
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
