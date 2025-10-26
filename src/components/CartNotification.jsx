import { Link } from 'react-router-dom'
import './CartNotification.css'

export default function CartNotification({ isOpen, onClose, cartItems }) {
  if (!isOpen) return null
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  // PRECIO TOTAL COMENTADO TEMPORALMENTE
  // const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  
  return (
    <div className="cart-notification">
      <div className="notification-header">
        <div className="header-content">
          <svg className="cart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6"></path>
          </svg>
          <span className="success-text">Mi Carrito</span>
          <span className="cart-count">{totalItems}</span>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Cerrar carrito">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
      
      <div className="notification-body">
        {cartItems.length === 0 ? (
          <div className="empty-cart-state">
            <svg className="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p className="empty-message">Tu carrito está vacío</p>
            <p className="empty-submessage">Agrega productos para comenzar</p>
          </div>
        ) : (
          <>
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item-mini">
                  <div className="item-image-wrapper">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="item-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <div className="item-attributes">
                      {item.selectedColor && (
                        <span className="item-attr">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="10"></circle>
                          </svg>
                          {item.selectedColor}
                        </span>
                      )}
                      {item.selectedSize && (
                        <span className="item-attr">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                          </svg>
                          {item.selectedSize}
                        </span>
                      )}
                    </div>
                    <div className="item-footer">
                      <span className="item-quantity">× {item.quantity}</span>
                      {/* PRECIO COMENTADO TEMPORALMENTE */}
                      {/* <span className="item-price">S/ {(item.price * item.quantity).toFixed(2)}</span> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              {/* RESUMEN DE PRECIO COMENTADO TEMPORALMENTE */}
              {/* <div className="cart-summary">
                <span className="summary-label">Total</span>
                <span className="summary-total">S/ {totalPrice.toFixed(2)}</span>
              </div> */}
              
              <Link to="/carrito" className="view-cart-btn" onClick={onClose}>
                <span>Ver carrito completo</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

