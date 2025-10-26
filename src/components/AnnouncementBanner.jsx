import { useState, useEffect } from 'react'
import './AnnouncementBanner.css'

// ============= BANNER DE ANUNCIOS GLOBAL =============
export default function AnnouncementBanner() {
  const [current, setCurrent] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  
  const announcements = [
    "✨ Envío gratis en compras mayores a S/ 200",
    "🎉 Nueva Colección Primavera 2025 disponible",
    "💝 20% descuento en vestidos seleccionados - Código: SPRING20"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={`announcement-banner ${scrolled ? 'scrolled' : ''}`}>
      <div className="announcement-content">
        {announcements[current]}
      </div>
    </div>
  )
}
