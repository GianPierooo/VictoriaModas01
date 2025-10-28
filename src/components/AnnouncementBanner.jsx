import { useState, useEffect } from 'react'

export default function AnnouncementBanner() {
  const [current, setCurrent] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  
  const announcements = [
    "✨ Envío gratis en compras mayores a S/ 200",
    "🎉 Nueva Colección Primavera 2025 disponible",
    "💝 20% descuento en vestidos seleccionados - Código: SPRING20"
  ]

  // Rotación automática de anuncios
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [announcements.length])

  // Detectar scroll para ocultar el banner
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 bg-rose/90 backdrop-blur-sm text-gray-900 text-center py-2 text-xs sm:text-sm font-medium transition-all duration-300"
      role="banner"
      aria-live="polite"
    >
      <div className="container mx-auto px-4">
        <p className="font-semibold">
          {announcements[current]}
        </p>
      </div>
    </div>
  )
}
