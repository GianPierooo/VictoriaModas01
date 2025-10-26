import { useState } from 'react'
import './ProductCard.css'

export default function ProductCard({ product, onAddToCart, viewMode = 'grid' }) {
  const [isHovered, setIsHovered] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product)
  }


  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'OFERTA':
        return 'badge-sale'
      case 'NUEVO':
        return 'badge-new'
      case 'AGOTADO':
        return 'badge-sold-out'
      default:
        return 'badge-default'
    }
  }

  if (viewMode === 'list') {
    return (
      <div className="product-card list-view">
        <div className="product-image-container">
          <img 
            src={product.image} 
            alt={product.name}
            className="product-image"
          />
          {product.badge && (
            <div className={`product-badge ${getBadgeColor(product.badge)}`}>
              {product.badge}
            </div>
          )}
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            AGREGAR AL CARRITO
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        {product.badge && (
          <div className={`product-badge ${getBadgeColor(product.badge)}`}>
            {product.badge}
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  )
}
