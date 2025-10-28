/**
 * Utilidades para optimización de imágenes
 * Genera srcset, sizes y optimiza loading
 */

/**
 * Genera srcset para imágenes con múltiples tamaños
 * @param {string} src - URL base de la imagen
 * @param {array} widths - Array de anchos deseados [640, 1024, 1920]
 * @returns {string} - srcset string
 */
export function generateSrcSet(src, widths = [640, 1024, 1920]) {
  // Si la imagen ya tiene un srcset, retornarla tal cual
  if (typeof src !== 'string') return src

  // Para un CDN, podrías modificar la URL para cada tamaño
  // Ejemplo con Cloudinary: src.replace('/upload/', '/upload/w_640/')
  // Por ahora, usamos la misma imagen para todos los tamaños
  
  return widths.map(width => `${src} ${width}w`).join(', ')
}

/**
 * Genera el atributo sizes basado en el contexto
 * @param {string} context - Contexto de uso: 'hero', 'product', 'thumbnail', 'blog'
 * @returns {string} - sizes string
 */
export function generateSizes(context) {
  const sizesMap = {
    hero: '100vw',
    product: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    thumbnail: '(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 200px',
    blog: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    spotlight: '(max-width: 768px) 100vw, 50vw',
    carousel: '(max-width: 480px) 200px, (max-width: 768px) 240px, 280px',
    gallery: '(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw'
  }

  return sizesMap[context] || '100vw'
}

/**
 * Determina si una imagen debe cargarse eager o lazy
 * @param {number} index - Índice del elemento
 * @param {boolean} isAboveFold - Si está por encima del fold
 * @returns {string} - 'eager' o 'lazy'
 */
export function getLoadingStrategy(index, isAboveFold = false) {
  // Primeras 2 imágenes o above fold: eager
  if (index < 2 || isAboveFold) {
    return 'eager'
  }
  return 'lazy'
}

/**
 * Obtiene el aspect ratio apropiado para el tipo de imagen
 * @param {string} type - Tipo de imagen: 'product', 'blog', 'hero', etc.
 * @returns {string} - aspect ratio CSS
 */
export function getAspectRatio(type) {
  const ratios = {
    product: '3/4',      // Productos verticales
    blog: '16/9',        // Blog posts
    hero: '16/9',        // Hero images
    square: '1/1',       // Imágenes cuadradas
    portrait: '2/3',     // Retratos
    landscape: '4/3'     // Horizontal
  }

  return ratios[type] || 'auto'
}

/**
 * Optimiza la URL de imagen para un tamaño específico
 * Preparado para integrarse con CDNs como Cloudinary, imgix, etc.
 * @param {string} src - URL original
 * @param {number} width - Ancho deseado
 * @param {string} format - Formato deseado (webp, avif, jpg)
 * @returns {string} - URL optimizada
 */
export function optimizeImageUrl(src, width, format = 'webp') {
  // Si usas Cloudinary:
  // return src.replace('/upload/', `/upload/w_${width},f_${format},q_auto/`)
  
  // Si usas imgix:
  // return `${src}?w=${width}&fm=${format}&auto=compress`
  
  // Por ahora, retorna la URL original
  // Cuando implementes un CDN, descomenta y adapta las líneas de arriba
  return src
}

/**
 * Genera un placeholder blur data URL para imágenes
 * @param {number} width - Ancho del placeholder
 * @param {number} height - Alto del placeholder
 * @param {string} color - Color base
 * @returns {string} - Data URL
 */
export function generatePlaceholder(width = 10, height = 10, color = '#f0f0f0') {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}'%3E%3Crect width='${width}' height='${height}' fill='${color}'/%3E%3C/svg%3E`
}

/**
 * Detecta si el navegador soporta WebP
 * @returns {Promise<boolean>}
 */
export async function supportsWebP() {
  if (typeof window === 'undefined') return false
  
  const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA='
  
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img.width === 2)
    img.onerror = () => resolve(false)
    img.src = webpData
  })
}

/**
 * Detecta si el navegador soporta AVIF
 * @returns {Promise<boolean>}
 */
export async function supportsAvif() {
  if (typeof window === 'undefined') return false
  
  const avifData = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A='
  
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => resolve(img.width === 2)
    img.onerror = () => resolve(false)
    img.src = avifData
  })
}

/**
 * Hook personalizado para detectar imágenes en viewport (Intersection Observer)
 * @param {object} options - Opciones del IntersectionObserver
 * @returns {array} - [ref, isVisible]
 */
export function useImageInView(options = {}) {
  const { threshold = 0.1, rootMargin = '50px' } = options
  
  // Nota: Este es un patrón para usar con React hooks
  // Necesitarías importar y usar useEffect y useRef de React
  
  return {
    threshold,
    rootMargin,
    // Para implementar completamente, necesitarías crear un custom hook con React
  }
}

/**
 * Calcula el tamaño óptimo de imagen basado en DPR y viewport
 * @param {number} containerWidth - Ancho del contenedor en px
 * @returns {number} - Ancho óptimo de imagen
 */
export function getOptimalImageSize(containerWidth) {
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1
  const optimalWidth = Math.ceil(containerWidth * dpr)
  
  // Redondear al múltiplo de 100 más cercano para mejor cache
  return Math.ceil(optimalWidth / 100) * 100
}

/**
 * Preload de imágenes críticas
 * @param {array} imageSrcs - Array de URLs de imágenes
 */
export function preloadImages(imageSrcs = []) {
  if (typeof window === 'undefined') return
  
  imageSrcs.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

/**
 * Lazy load con Intersection Observer
 * @param {HTMLElement} element - Elemento a observar
 * @param {function} callback - Callback al entrar en viewport
 */
export function lazyLoadImage(element, callback) {
  if (!('IntersectionObserver' in window)) {
    // Fallback: cargar inmediatamente
    callback()
    return
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback()
        observer.unobserve(element)
      }
    })
  }, {
    rootMargin: '50px',
    threshold: 0.01
  })

  observer.observe(element)
}

// Exportar todo como default también
export default {
  generateSrcSet,
  generateSizes,
  getLoadingStrategy,
  getAspectRatio,
  optimizeImageUrl,
  generatePlaceholder,
  supportsWebP,
  supportsAvif,
  getOptimalImageSize,
  preloadImages,
  lazyLoadImage
}

