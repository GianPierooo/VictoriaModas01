import { useState } from 'react';
import { Link } from 'react-router-dom';
import './UnifiedProductCard.css';

export default function UnifiedProductCard({ product, onAddToCart }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);

  const colorMap = {
    'Beige': '#F5E6D3',
    'Negro': '#2C2C2C',
    'Azul': '#1E40AF',
    'Camello': '#C19A6B',
    'Vino': '#722F37',
    'Plomo': '#6B7280',
    'Rosa Palo': '#ffb6c1',
    'Gris': '#6B7280',
    'Nude': '#f5deb3',
    'Blanco': '#fff'
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize
    });
  };

  return (
    <div className="product-wrapper">
      <Link 
        to={`/producto/${product.name.toLowerCase().replace(/\s+/g, '-').replace(/[áéíóú]/g, match => ({'á':'a','é':'e','í':'i','ó':'o','ú':'u'}[match]))}`}
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-image">
          <img src={product.image} alt={product.name} />
          {product.badge && (
            <span className={`product-badge ${
              product.badge === '-25%' ? 'sale' : 
              product.badge === 'Nuevo' ? 'new' : 
              product.badge === 'Exclusivo' ? 'exclusive' : 
              'bestseller'
            }`}>
              {product.badge}
            </span>
          )}
        </div>

        <div className="product-info">
          <div className="product-category">{product.category?.toUpperCase()}</div>
          <h3 className="product-name">{product.name}</h3>
          
          <div className="product-price">
            S/ {product.price.toFixed(2)}
            {product.originalPrice && (
              <span className="original-price">
                S/ {product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {product.sizes && (
            <div className="options-container">
              <div className="size-selector">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedSize(size);
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="options-container">
              <div className="color-selector">
                {product.colors.map(color => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    style={{
                      backgroundColor: colorMap[color] || '#ddd',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedColor(color);
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            style={{
              opacity: isHovered ? '1' : '0',
            }}
          >
            Agregar al carrito
          </button>
        </div>
      </Link>
    </div>
  );
}