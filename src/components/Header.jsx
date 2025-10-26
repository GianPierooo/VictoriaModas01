import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { useCart } from '../context/CartContext.jsx'
import SearchModal from './SearchModal.jsx'
import CartNotification from './CartNotification.jsx'
import MobileMenu from './MobileMenu.jsx'
import './Header.css'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [isSupportOpen, setIsSupportOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 })
  const supportButtonRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const location = useLocation()
  const isHomePage = location.pathname === '/'
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Calcular posición exacta del dropdown basado en el botón APOYO
  useEffect(() => {
    const updateDropdownPosition = () => {
      if (supportButtonRef.current) {
        const rect = supportButtonRef.current.getBoundingClientRect()
        setDropdownPosition({
          top: rect.bottom + 8, // 8px debajo del botón
          left: rect.left
        })
      }
    }
    
    // Actualizar posición al montar y cuando cambie el tamaño/scroll
    updateDropdownPosition()
    window.addEventListener('resize', updateDropdownPosition)
    window.addEventListener('scroll', updateDropdownPosition, { passive: true })
    
    return () => {
      window.removeEventListener('resize', updateDropdownPosition)
      window.removeEventListener('scroll', updateDropdownPosition)
    }
  }, [])

  // Atajo de teclado para abrir búsqueda (Ctrl+K o Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])
  
  const { items, showNotification, closeNotification } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const isCartPage = location.pathname === '/carrito'

  // Funciones para manejar el dropdown con delay
  const handleOpenDropdown = () => {
    // Cancelar cualquier cierre pendiente
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setIsSupportOpen(true)
  }

  const handleCloseDropdown = () => {
    // Esperar 200ms antes de cerrar para dar tiempo a que el mouse llegue al dropdown
    closeTimeoutRef.current = setTimeout(() => {
      setIsSupportOpen(false)
    }, 200)
  }

  // Limpiar timeout al desmontar
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      {/* Skip to content link para accesibilidad */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>
      
      <header className={`header${scrolled ? ' is-scrolled' : ''}${isHomePage ? ' home-header' : ''}`} role="banner">
        <div className="header-inner">
          <Link to="/" className="brand" aria-label="VictoriaModas - Ir al inicio">
          <div className="sparkle-main">
            <div className="sparkle-small-1"></div>
            <div className="sparkle-small-2"></div>
          </div>
          VictoriaModas
        </Link>
        
        <nav className="nav" aria-label="Principal">
          <Link to="/">INICIO</Link>
          <Link to="/blusas">BLUSAS</Link>
          <Link to="/pantalones">PANTALONES</Link>
          <Link to="/abrigos">ABRIGOS</Link>
          <Link to="/vestidos">VESTIDOS</Link>
          
          {/* Solo el botón de APOYO */}
          <button 
            ref={supportButtonRef}
            className="dropdown-trigger"
            onClick={() => setIsSupportOpen(!isSupportOpen)}
            onMouseEnter={handleOpenDropdown}
            onMouseLeave={handleCloseDropdown}
            aria-expanded={isSupportOpen}
            aria-haspopup="true"
            aria-label="Menú de apoyo"
          >
            APOYO
            <span className="dropdown-arrow" aria-hidden="true">▼</span>
          </button>
        </nav>

        {/* Iconos de utilidad */}
        <div className="header-actions" role="toolbar" aria-label="Herramientas del usuario">
          {/* Botón hamburger - solo visible en mobile */}
          <button 
            className="action-btn hamburger-btn" 
            title="Menú"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-expanded={isMobileMenuOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <button 
            className="action-btn search-btn" 
            title="Buscar (Ctrl+K)"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Abrir búsqueda (Atajo: Ctrl+K)"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </button>
          
          <Link to="/mi-cuenta" className="action-btn user-btn" title="Mi cuenta" aria-label="Mi cuenta de usuario">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
          
          <Link 
            to="/carrito" 
            className="action-btn cart-btn" 
            title="Carrito de compras"
            aria-label={`Carrito de compras${cartCount > 0 ? ` (${cartCount} producto${cartCount !== 1 ? 's' : ''})` : ' (vacío)'}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge" aria-label={`${cartCount} producto${cartCount !== 1 ? 's' : ''}`}>{cartCount}</span>}
          </Link>
        </div>
      </div>
      </header>

      {/* Dropdown de APOYO - FUERA del header para que no sea cortado */}
      <div 
        className={`dropdown-menu-external ${isSupportOpen ? 'open' : ''}`}
        style={{
          top: `${dropdownPosition.top}px`,
          left: `${dropdownPosition.left}px`
        }}
        onMouseEnter={handleOpenDropdown}
        onMouseLeave={handleCloseDropdown}
        role="menu"
        aria-label="Opciones de apoyo"
      >
        <Link to="/nosotros" onClick={() => setIsSupportOpen(false)}>
          Nosotros
        </Link>
        <Link to="/contacto" onClick={() => setIsSupportOpen(false)}>
          Contacto
        </Link>
        <Link to="/preguntas-frecuentes" onClick={() => setIsSupportOpen(false)}>
          Preguntas Frecuentes
        </Link>
      </div>

      {/* Modal de búsqueda */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
      
      {/* Notificación de carrito - No mostrar en la página del carrito */}
      {!isCartPage && (
        <CartNotification 
          isOpen={showNotification}
          onClose={closeNotification}
          cartItems={items}
        />
      )}

      {/* Menú móvil hamburger */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  )
}
