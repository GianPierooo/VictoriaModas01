import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './SearchModal.css'

// Productos reales de VictoriaModas para búsqueda
const ALL_PRODUCTS = [
  // Blusas
  { 
    id: 'blusa-seda-francesa', 
    name: 'Blusa Seda Francesa', 
    category: 'blusas', 
    image: '/imagenes/blusas/blusa_seda_francesa/blusa_sedafrancesa_delante.png' 
  },
  
  // Pantalones
  { 
    id: 'pantalon-scuba-vena', 
    name: 'Pantalón Scuba Vena', 
    category: 'pantalones', 
    image: '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_negro_adelante.png' 
  },
  { 
    id: 'pantalon-scuba-correa', 
    name: 'Pantalón Scuba con Correa', 
    category: 'pantalones', 
    image: '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delante_negro.png' 
  },
  
  // Vestidos
  { 
    id: 'vestido-lame-elegante', 
    name: 'Vestido Lame Elegante', 
    category: 'vestidos', 
    image: '/imagenes/vestidos/vestido_lame01/negro_adelante.png' 
  },
  { 
    id: 'vestido-suplex-moderno', 
    name: 'Vestido Suplex Moderno', 
    category: 'vestidos', 
    image: '/imagenes/vestidos/vestido_suplex01/azul_adelante.png' 
  },
  { 
    id: 'vestido-rit-elegante', 
    name: 'Vestido Rit Elegante', 
    category: 'vestidos', 
    image: '/imagenes/vestidos/vestido_rit02/vestido02_tela_rit_delante.png' 
  }
]

export default function SearchModal({ isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef(null)

  // Focus en el input cuando se abre el modal
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Función de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term)
    
    if (term.length < 2) {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    
    // Simular delay de búsqueda
    setTimeout(() => {
      const results = ALL_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.category.toLowerCase().includes(term.toLowerCase())
      )
      setSearchResults(results)
      setIsLoading(false)
    }, 300)
  }

  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Limpiar búsqueda al cerrar
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('')
      setSearchResults([])
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="search-modal-overlay" onClick={onClose}>
      <div className="search-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header del modal */}
        <div className="search-modal-header">
          <div>
            <h2>Buscar productos</h2>
            <p className="search-shortcut">Presiona <kbd>Esc</kbd> para cerrar</p>
          </div>
          <button className="search-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Input de búsqueda */}
        <div className="search-input-container">
          <div className="search-input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar blusas, pantalones, vestidos..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button 
                className="clear-search-btn" 
                onClick={() => handleSearch('')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Resultados de búsqueda */}
        <div className="search-results">
          {isLoading && (
            <div className="search-loading">
              <div className="loading-spinner"></div>
              <p>Buscando productos...</p>
            </div>
          )}

          {!isLoading && searchTerm && searchResults.length === 0 && (
            <div className="search-no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h3>No se encontraron productos</h3>
              <p>Intenta con otros términos de búsqueda</p>
            </div>
          )}

          {!isLoading && searchTerm && searchResults.length > 0 && (
            <>
              <div className="search-results-header">
                <p>{searchResults.length} producto{searchResults.length !== 1 ? 's' : ''} encontrado{searchResults.length !== 1 ? 's' : ''}</p>
              </div>
              
              <div className="search-results-grid">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    to={`/${product.category}`}
                    className="search-result-item"
                    onClick={onClose}
                  >
                    <div className="search-result-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                    <div className="search-result-info">
                      <h3>{product.name}</h3>
                      <p className="search-result-category">{product.category}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}

          {!searchTerm && (
            <div className="search-suggestions">
              <h3>Sugerencias de búsqueda</h3>
              <div className="suggestion-tags">
                {['Blusas', 'Pantalones', 'Vestidos', 'Scuba', 'Seda', 'Lame', 'Suplex'].map((tag) => (
                  <button
                    key={tag}
                    className="suggestion-tag"
                    onClick={() => handleSearch(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
