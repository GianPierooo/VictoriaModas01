import { useState } from 'react'

/**
 * Componente de imagen responsiva optimizado
 * Carga diferentes tamaños según el dispositivo y viewport
 */
export default function ResponsiveImage({ 
  src, 
  alt, 
  className = '',
  loading = 'lazy',
  sizes = '100vw',
  aspectRatio = null,
  priority = false
}) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Generar URLs de diferentes tamaños (si estás usando un CDN o tienes múltiples tamaños)
  // Por ahora usamos la misma imagen, pero esto está preparado para futuras optimizaciones
  const imageSizes = {
    small: src,    // 640px
    medium: src,   // 1024px
    large: src,    // 1920px
    original: src
  }

  const handleLoad = () => {
    setIsLoaded(true)
  }

  const handleError = () => {
    setHasError(true)
  }

  if (hasError) {
    return (
      <div 
        className={`image-placeholder ${className}`}
        style={{ 
          aspectRatio: aspectRatio || 'auto',
          background: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af'
        }}
      >
        <span>⚠️ Error al cargar imagen</span>
      </div>
    )
  }

  return (
    <div 
      className={`responsive-image-wrapper ${className}`}
      style={{ 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Placeholder mientras carga */}
      {!isLoaded && (
        <div 
          className="image-skeleton"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
            aspectRatio: aspectRatio || 'auto'
          }}
        />
      )}

      <img
        src={imageSizes.small}
        srcSet={`
          ${imageSizes.small} 640w,
          ${imageSizes.medium} 1024w,
          ${imageSizes.large} 1920w
        `}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : loading}
        onLoad={handleLoad}
        onError={handleError}
        decoding="async"
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease',
          aspectRatio: aspectRatio || 'auto'
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  )
}

