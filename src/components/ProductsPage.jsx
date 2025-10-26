import React, { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'
import { Link } from 'react-router-dom'
import AnnouncementBanner from './AnnouncementBanner.jsx'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import './ProductsPage.css'

// Componente de tarjeta de producto simplificado
function ProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [intervalId, setIntervalId] = React.useState(null);
  const [selectedColor, setSelectedColor] = React.useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = React.useState(product.sizes ? product.sizes[0] : null);
  
  // Función para obtener las imágenes según el color seleccionado
  const getCurrentImages = () => {
    if (product.colorImages && selectedColor && product.colorImages[selectedColor]) {
      return product.colorImages[selectedColor]
    }
    return product.images || [product.image]
  }
  
  // Función para obtener la imagen a mostrar
  const getCurrentImage = () => {
    const images = getCurrentImages()
    if (images && images.length > 1) {
      return images[currentImageIndex]
    }
    return images[0] || product.image
  }
  
  // Función para cambiar de imagen al hacer hover
  const handleMouseEnter = () => {
    setIsHovered(true)
    const images = getCurrentImages()
    if (images && images.length > 1) {
      // Ciclar entre las imágenes cada 800ms
      const id = setInterval(() => {
        setCurrentImageIndex(prev => (prev + 1) % images.length)
      }, 800)
      setIntervalId(id)
    }
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    // Limpiar el intervalo
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    // Volver a la primera imagen cuando se quite el hover
    setCurrentImageIndex(0)
  }
  
  // Función para cambiar color
  const handleColorChange = (color) => {
    setSelectedColor(color)
    setCurrentImageIndex(0) // Resetear al primer ángulo
  }

  // Función para cambiar talla
  const handleSizeChange = (size) => {
    setSelectedSize(size)
  }
  
  return (
    <div className="product-wrapper">
      <Link 
        to={`/producto/${product.id}`}
        className="product-card"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        <div className="product-image">
          <img 
            src={getCurrentImage()} 
            alt={product.name}
            className={isHovered ? 'hovered' : ''}
            loading="lazy"
          />
          {product.badge && (
            <span className={`product-badge ${product.badge.includes('%') ? 'sale' : product.badge === 'Nuevo' ? 'new' : 'exclusive'}`}>
              {product.badge}
            </span>
          )}
          
          {/* Indicadores de vistas */}
          {getCurrentImages().length > 1 && (
            <div className="image-indicators">
              {getCurrentImages().map((_, index) => (
                <div
                  key={index}
                  className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          )}
          
          <button 
            className="add-to-cart-btn"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Obtener la imagen del color seleccionado
              const currentImage = getCurrentImage();
              onAddToCart({
                ...product,
                image: currentImage,
                selectedColor: selectedColor,
                selectedSize: selectedSize
              }, 1); // Siempre agregar 1 desde el catálogo
            }}
          >
            Agregar
          </button>
        </div>
        
        <div className="product-info">
          <div className="product-category">{(product.category || 'productos').toUpperCase()}</div>
          <h3 className="product-name">{product.name}</h3>
          
          {/* Selector de colores */}
          {product.colors && product.colors.length > 0 && (
            <div className="color-selector">
              {product.colors.map(color => {
                const colorMap = {
                  'Beige': '#F5E6D3', 'Beach': '#F5E6D3',
                  'Negro': '#2C2C2C', 'Blanco': '#FFFFFF',
                  'Azul': '#1E40AF', 'Azul Marino': '#000080',
                  'Azul Claro': '#87CEEB', 'Azul Oscuro': '#00008B',
                  'Camello': '#C19A6B', 'Vino': '#722F37',
                  'Burdeos': '#722F37', 'Plomo': '#6B7280',
                  'Gris': '#808080', 'Rosa': '#FFC0CB',
                  'Rosa Palo': '#FFB6C1', 'Rosa Empolvado': '#FFB6C1',
                  'Rojo': '#DC143C', 'Verde': '#228B22',
                  'Verde Agua': '#7FFFD4', 'Verde Militar': '#4B5320',
                  'Dorado': '#FFD700', 'Plata': '#C0C0C0',
                  'Celeste': '#87CEEB', 'Rosa Claro': '#FFB6C1',
                  'Marrón': '#8B4513', 'Blanco/Azul': '#FFFFFF',
                  'Blanco/Negro': '#FFFFFF'
                }
                return (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleColorChange(color);
                    }}
                    style={{ backgroundColor: colorMap[color] || '#ccc' }}
                    title={color}
                  />
                )
              })}
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

// ============= COMPONENTES DE FILTROS =============

export default function ProductsPage({ products = [], title = "PRODUCTOS", category = "productos", filters = {} }) {
  const { addItem } = useCart()
  const [sortBy, setSortBy] = useState('popularidad')
  const [viewMode, setViewMode] = useState('grid')
  
  // ============= ESTADOS DE FILTROS =============
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFabrics, setSelectedFabrics] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [showOnlySale, setShowOnlySale] = useState(false)
  const [showOnlyNew, setShowOnlyNew] = useState(false)

  // Productos recibidos por props - convertir precios si es necesario
  const allProducts = products.map(p => ({
    ...p,
    price: typeof p.price === 'number' && p.price > 1000 ? p.price / 100 : p.price,
    originalPrice: p.originalPrice && typeof p.originalPrice === 'number' && p.originalPrice > 1000 ? p.originalPrice / 100 : p.originalPrice
  }))

  // Ejemplo de producto comentado (para referencia)
  /*
  const exampleProduct = [
    {
      id: "producto-ejemplo",
      name: "Producto Ejemplo",
      description: "Descripción del producto",
      price: 20.00,
      originalPrice: 25.00,
      badge: "-20%",
      image: "url_imagen",
      images: ["url1", "url2"],
      category: "categoria",
      sizes: ["S", "M", "L"],
      colors: ["Color1", "Color2"]
    }
  ]
  */

  // ============= FILTROS DISPONIBLES (de props o por defecto) =============
  const availableFabrics = filters.availableFabrics || []
  const availableSizes = filters.availableSizes || []
  
  // Generar colores automáticamente basados en los productos
  const availableColors = filters.availableColors || (() => {
    const colorMap = {
      'Beige': '#F5E6D3',
      'Beach': '#F5E6D3',
      'Negro': '#2C2C2C',
      'Blanco': '#FFFFFF',
      'Azul': '#1E40AF',
      'Azul Marino': '#000080',
      'Azul Claro': '#87CEEB',
      'Azul Oscuro': '#00008B',
      'Camello': '#C19A6B',
      'Camel': '#C19A6B',
      'Vino': '#722F37',
      'Burdeos': '#722F37',
      'Plomo': '#6B7280',
      'Gris': '#808080',
      'Rosa': '#FFC0CB',
      'Rosa Palo': '#FFB6C1',
      'Rosa Empolvado': '#FFB6C1',
      'Rojo': '#DC143C',
      'Verde': '#228B22',
      'Verde Agua': '#7FFFD4',
      'Verde Militar': '#4B5320',
      'Dorado': '#FFD700',
      'Plata': '#C0C0C0',
      'Celeste': '#87CEEB',
      'Rosa Claro': '#FFB6C1',
      'Marrón': '#8B4513',
      'Blanco/Azul': '#FFFFFF',
      'Blanco/Negro': '#FFFFFF'
    }
    
    const colorCounts = {}
    allProducts.forEach(p => {
      if (p.colors) {
        p.colors.forEach(c => {
          colorCounts[c] = (colorCounts[c] || 0) + 1
        })
      }
    })
    
    return Object.keys(colorCounts).map(color => ({
      label: color,
      count: colorCounts[color],
      hex: colorMap[color] || '#CCCCCC'
    }))
  })()

  // ============= LÓGICA DE FILTRADO =============
  const filteredProducts = allProducts.filter(product => {
    // Filtro por búsqueda
    if (searchTerm && !product.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false
    }


    // Filtro por tallas
    if (selectedSizes.length > 0 && !selectedSizes.some(size => product.sizes.includes(size))) {
      return false
    }

    // Filtro por colores
    if (selectedColors.length > 0 && !selectedColors.some(color => 
      product.colors && product.colors.includes(color)
    )) {
      return false
    }

    // Filtro por ofertas
    if (showOnlySale && !product.originalPrice) {
      return false
    }

    // Filtro por nuevos
    if (showOnlyNew && product.badge !== 'NUEVO') {
      return false
    }

    return true
  })

  // ============= LÓGICA DE ORDENAMIENTO =============
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'nuevos':
        return (b.badge === 'NUEVO' ? 1 : 0) - (a.badge === 'NUEVO' ? 1 : 0)
      case 'popularidad':
      default:
        return 0
    }
  })

  // ============= HANDLERS =============
  const handleAddToCart = (product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor: product.selectedColor,
      selectedSize: product.selectedSize,
      quantity: 1
    })
  }

  const toggleFabric = (fabric) => {
    setSelectedFabrics(prev => 
      prev.includes(fabric) 
        ? prev.filter(f => f !== fabric)
        : [...prev, fabric]
    )
  }

  const toggleSize = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    )
  }

  const toggleColor = (color) => {
    setSelectedColors(prev => 
      prev.includes(color) 
        ? prev.filter(c => c !== color)
        : [...prev, color]
    )
  }

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedFabrics([])
    setSelectedSizes([])
    setSelectedColors([])
    setShowOnlySale(false)
    setShowOnlyNew(false)
  }

  const activeFiltersCount = [
    searchTerm,
    selectedFabrics.length,
    selectedSizes.length,
    selectedColors.length,
    showOnlySale,
    showOnlyNew
  ].filter(Boolean).length


  return (
    <div className="products-page">
      <AnnouncementBanner />
      <Header />

      {/* Layout Principal */}
      <div className="products-main-layout">
        <div className="products-content">
          {/* Espaciador invisible para empujar el título */}
          <div className="invisible-spacer"></div>
          
          {/* Título de Sección */}
          <div className="section-header">
            <h2 className="section-title">{title}</h2>
          </div>

          {/* Layout con Sidebar y Contenido */}
          <div className="products-layout">
            {/* Sidebar de Filtros */}
            <aside className="filters-sidebar">
              <div className="filters-header">
                <h3>Filtros</h3>
                {activeFiltersCount > 0 && (
                  <button className="clear-all-btn" onClick={clearAllFilters}>
                    Limpiar todo
                  </button>
                )}
              </div>

              {/* Búsqueda */}
              <div className="filter-section">
                <h4 className="filter-title">Búsqueda</h4>
                <div className="search-input-wrapper">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder={`Buscar ${category}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button 
                      className="clear-search"
                      onClick={() => setSearchTerm('')}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Telas (si están disponibles) */}
              {availableFabrics.length > 0 && (
                <div className="filter-section">
                  <h4 className="filter-title">Telas</h4>
                  <div className="filter-options">
                    {availableFabrics.map(fabric => (
                      <button
                        key={fabric.label}
                        className={`filter-option ${selectedFabrics.includes(fabric.label) ? 'active' : ''}`}
                        onClick={() => toggleFabric(fabric.label)}
                      >
                        <span className="option-label">{fabric.label}</span>
                        <span className="option-count">({fabric.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tallas */}
              {availableSizes.length > 0 && (
                <div className="filter-section">
                  <h4 className="filter-title">Tallas</h4>
                  <div className="filter-options">
                    {availableSizes.map(size => (
                      <button
                        key={size.label}
                        className={`filter-option ${selectedSizes.includes(size.label) ? 'active' : ''}`}
                        onClick={() => toggleSize(size.label)}
                      >
                        <span className="option-label">{size.label}</span>
                        <span className="option-count">({size.count})</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Colores */}
              {availableColors.length > 0 && (
                <div className="filter-section">
                  <h4 className="filter-title">Colores</h4>
                  <div className="color-filter-grid">
                    {availableColors.map(color => (
                      <button
                        key={color.label}
                        className={`color-filter-option ${selectedColors.includes(color.label) ? 'active' : ''}`}
                        onClick={() => toggleColor(color.label)}
                        style={{
                          backgroundColor: color.hex,
                          border: selectedColors.includes(color.label) ? '2px solid #ffb6c1' : '1px solid #e0e0e0'
                        }}
                        title={`${color.label} (${color.count})`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Filtros Especiales */}
              <div className="filter-section">
                <h4 className="filter-title">Especiales</h4>
                <div className="filter-options">
                  <button
                    className={`filter-option ${showOnlySale ? 'active' : ''}`}
                    onClick={() => setShowOnlySale(!showOnlySale)}
                  >
                    <span className="option-label">🔥 Solo Ofertas</span>
                  </button>
                  <button
                    className={`filter-option ${showOnlyNew ? 'active' : ''}`}
                    onClick={() => setShowOnlyNew(!showOnlyNew)}
                  >
                    <span className="option-label">✨ Solo Nuevos</span>
                  </button>
                </div>
              </div>

              {/* Ordenar */}
              <div className="filter-section">
                <h4 className="filter-title">Ordenar</h4>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-select"
                >
                  <option value="popularidad">Popularidad</option>
                  <option value="precio-asc">Precio: Menor a Mayor</option>
                  <option value="precio-desc">Precio: Mayor a Menor</option>
                  <option value="nuevos">Más Nuevos</option>
                </select>
              </div>

              {/* Vista */}
              <div className="filter-section">
                <h4 className="filter-title">Vista</h4>
                <div className="view-controls">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Vista de cuadrícula"
                  >
                    <span>⊞</span>
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                    onClick={() => setViewMode('list')}
                    title="Vista de lista"
                  >
                    <span>☰</span>
                  </button>
                </div>
              </div>

              {/* Contador de resultados */}
              <div className="filter-section">
                <div className="results-count">
                  {sortedProducts.length} producto{sortedProducts.length !== 1 ? 's' : ''}
                </div>
              </div>
            </aside>

            {/* Contenido Principal */}
            <main className="products-main">
              <div className={`products-grid ${viewMode}`}>
                {sortedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}