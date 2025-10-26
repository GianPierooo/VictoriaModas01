import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsappUtils.js'
import '../App.css'
import '../styles/whatsapp.css'
import './CartPage.css'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totals, clearCart } = useCart()

  return (
    <div className="cart-page">
      <AnnouncementBanner />
      <Header />

      {/* Header del carrito */}
      <div className="cart-header">
        <div className="container">
          <h1 className="cart-title-main">Carrito de Compras</h1>
          <p className="cart-subtitle">
            {items.length > 0 
              ? `Tienes ${items.length} ${items.length === 1 ? 'producto' : 'productos'} en tu carrito` 
              : 'Tu carrito está vacío'}
          </p>
        </div>
      </div>

      {/* Sección principal del carrito */}
      <main className="cart-section" aria-labelledby="cart-title">
        <div className="container">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛍️</div>
              <h2>Tu carrito está vacío</h2>
              <p>¡Descubre nuestras colecciones y encuentra prendas que te encantarán!</p>
              <Link to="/vestidos" className="btn-shop">Explorar productos</Link>
            </div>
          ) : (
            <div className="cart-grid">
              {/* Lista de items */}
              <div className="cart-items-wrapper">
                <div className="cart-list" role="list">
                  {items.map((it, index) => (
                    <div key={`${it.id}-${it.selectedColor}-${it.selectedSize}-${index}`} className="cart-item" role="listitem">
                      <div className="ci-media">
                        <img 
                          src={it.image} 
                          alt={it.name}
                          loading="lazy"
                        />
                      </div>
                      <div className="ci-info">
                        <div className="ci-title">{it.name}</div>
                        {(it.selectedColor || it.selectedSize) && (
                          <div className="ci-attributes">
                            {it.selectedColor && (
                              <span className="ci-color">Color: {it.selectedColor}</span>
                            )}
                            {it.selectedSize && (
                              <span className="ci-size">Talla: {it.selectedSize}</span>
                            )}
                          </div>
                        )}
                        <div className="ci-actions">
                          <label>
                            Cantidad
                            <input
                              type="number"
                              min="1"
                              value={it.quantity}
                              onChange={(e) => updateQuantity(index, Number(e.target.value))}
                            />
                          </label>
                          <button 
                            className="btn-remove" 
                            onClick={() => removeItem(index)}
                            aria-label={`Eliminar ${it.name}`}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen del carrito */}
              <aside className="cart-summary">
                <div className="summary-card">
                  <h3>Resumen del Pedido</h3>
                  <div className="summary-row">
                    <span>Artículos ({items.reduce((sum, it) => sum + it.quantity, 0)} {items.reduce((sum, it) => sum + it.quantity, 0) === 1 ? 'artículo' : 'artículos'})</span>
                  </div>
                  <div className="summary-actions">
                    <button 
                      className="btn-whatsapp" 
                      onClick={() => {
                        const message = generateWhatsAppMessage(items);
                        openWhatsApp(message);
                      }}
                      disabled={items.length === 0}
                      style={{
                        background: '#25D366',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        width: '100%',
                        justifyContent: 'center',
                        marginBottom: '12px'
                      }}
                    >
                      <span>📱</span>
                      Enviar pedido por WhatsApp
                    </button>
                    <button 
                      className="btn-clear" 
                      onClick={clearCart} 
                      disabled={items.length === 0}
                      aria-label="Vaciar carrito"
                    >
                      Vaciar Carrito
                    </button>
                  </div>
                  <p className="summary-note">
                    💬 Te contactaremos por WhatsApp para confirmar tu pedido y coordinar la entrega.
                  </p>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}


