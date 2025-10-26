import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './MobileMenu.css'

export default function MobileMenu({ isOpen, onClose }) {
  const location = useLocation()

  // Cerrar menú al navegar
  useEffect(() => {
    onClose()
  }, [location.pathname, onClose])

  // Cerrar con ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevenir scroll del body cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Trap focus dentro del menú
  useEffect(() => {
    if (!isOpen) return

    const menu = document.querySelector('.mobile-menu')
    if (!menu) return

    const focusableElements = menu.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus()
          e.preventDefault()
        }
      }
    }

    menu.addEventListener('keydown', handleTabKey)
    
    // Enfocar el primer elemento al abrir
    setTimeout(() => firstElement?.focus(), 100)

    return () => menu.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="mobile-menu-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Sidebar */}
      <nav 
        className="mobile-menu"
        role="navigation"
        aria-label="Menú móvil principal"
      >
        {/* Header del menú */}
        <div className="mobile-menu-header">
          <h2 className="mobile-menu-title">
            <span className="menu-icon">✨</span>
            VictoriaModas
          </h2>
          <button 
            className="mobile-menu-close"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Navegación principal */}
        <div className="mobile-menu-content">
          <div className="mobile-menu-section">
            <h3 className="mobile-menu-section-title">Navegación</h3>
            <ul className="mobile-menu-list">
              <li>
                <Link to="/" className="mobile-menu-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span>Inicio</span>
                </Link>
              </li>
              <li>
                <Link to="/blusas" className="mobile-menu-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  <span>Blusas</span>
                </Link>
              </li>
              <li>
                <Link to="/pantalones" className="mobile-menu-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  <span>Pantalones</span>
                </Link>
              </li>
              <li>
                <Link to="/abrigos" className="mobile-menu-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  <span>Abrigos</span>
                </Link>
              </li>
              <li>
                <Link to="/vestidos" className="mobile-menu-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
                  <span>Vestidos</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección de apoyo */}
          <div className="mobile-menu-section">
            <h3 className="mobile-menu-section-title">Apoyo</h3>
            <ul className="mobile-menu-list">
              <li>
                <Link to="/nosotros" className="mobile-menu-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span>Nosotros</span>
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="mobile-menu-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>Contacto</span>
                </Link>
              </li>
              <li>
                <Link to="/preguntas-frecuentes" className="mobile-menu-link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span>Preguntas Frecuentes</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Acciones rápidas */}
          <div className="mobile-menu-section">
            <h3 className="mobile-menu-section-title">Acciones</h3>
            <div className="mobile-menu-actions">
              <Link to="/mi-cuenta" className="mobile-menu-action-btn account">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span>Mi Cuenta</span>
              </Link>
              <Link to="/carrito" className="mobile-menu-action-btn cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Ver Carrito</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Footer del menú */}
        <div className="mobile-menu-footer">
          <p className="mobile-menu-footer-text">
            <span className="footer-icon">✨</span>
            VictoriaModas © 2025
          </p>
          <p className="mobile-menu-footer-tagline">
            Moda elegante y minimalista
          </p>
        </div>
      </nav>
    </>
  )
}

