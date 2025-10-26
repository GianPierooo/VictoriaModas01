import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsappUtils.js'
import '../styles/whatsapp.css'
import './CheckoutPage.css'

export default function CheckoutPage() {
  const { items } = useCart()
  const [formData, setFormData] = useState({
    // Información del cliente
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
    metodoEnvio: 'domicilio', // 'domicilio' o 'tienda'
    metodoPago: 'efectivo', // 'efectivo', 'yape', 'transferencia'
    comentarios: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    
    // Generar mensaje con información del cliente y productos
    let message = "¡Hola! Me gustaría hacer un pedido en VictoriaModas.\n\n";
    
    // Información del cliente
    message += "👤 *INFORMACIÓN DEL CLIENTE:*\n";
    message += `Nombre: ${formData.nombre} ${formData.apellidos}\n`;
    message += `Teléfono: ${formData.telefono}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Dirección: ${formData.direccion}\n`;
    message += `Método de envío: ${formData.metodoEnvio === 'domicilio' ? 'Envío a domicilio' : 'Recojo en tienda'}\n`;
    message += `Método de pago: ${formData.metodoPago}\n`;
    if (formData.comentarios) {
      message += `Comentarios: ${formData.comentarios}\n`;
    }
    message += "\n";
    
    // Productos del carrito
    message += "📋 *PRODUCTOS SOLICITADOS:*\n\n";
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      if (item.selectedSize) {
        message += `   Talla: ${item.selectedSize}\n`;
      }
      if (item.selectedColor) {
        message += `   Color: ${item.selectedColor}\n`;
      }
      message += "\n";
    });

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    message += `📦 *Total de artículos: ${totalItems}*\n\n`;
    message += "💬 *Por favor, confírmame la disponibilidad y coordinar la entrega.*\n\n";
    message += "¡Gracias! 🙏";

    openWhatsApp(message);
  }

  const renderOrderSummary = () => (
    <div className="order-summary">
      <h3>Resumen del Pedido</h3>
      
      <div className="order-items">
        {items.map(item => (
          <div key={item.id} className="order-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
              <h4>{item.name}</h4>
              <div className="item-quantity">
                <span>Cantidad: {item.quantity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="order-totals">
        <div className="total-row">
          <span>Artículos ({items.reduce((sum, item) => sum + item.quantity, 0)} artículos)</span>
        </div>
      </div>

      <div className="whatsapp-info">
        <div className="whatsapp-icon">💬</div>
        <p>Te contactaremos por WhatsApp para confirmar tu pedido y coordinar la entrega.</p>
      </div>
    </div>
  )

  return (
    <div className="checkout-page">
      <AnnouncementBanner />
      <Header />
      
      <main className="checkout-main">
        <div className="container">
          <div className="checkout-header">
            <Link to="/carrito" className="back-to-cart">
              ← Volver al carrito
            </Link>
            <h1>Finalizar Compra</h1>
          </div>

          <div className="checkout-content">
            <div className="checkout-form-container">
              <form onSubmit={handleWhatsAppSubmit} className="checkout-form">
                <div className="checkout-step">
                  <h2>Información del Pedido</h2>
                  <p className="checkout-description">
                    Completa tus datos y enviaremos tu pedido por WhatsApp para coordinar la entrega.
                  </p>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="nombre">Nombre *</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="apellidos">Apellidos *</label>
                      <input
                        type="text"
                        id="apellidos"
                        name="apellidos"
                        value={formData.apellidos}
                        onChange={handleInputChange}
                        placeholder="Apellidos"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="telefono">Teléfono *</label>
                      <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        placeholder="999999999"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="email@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="direccion">Dirección de entrega *</label>
                    <textarea
                      id="direccion"
                      name="direccion"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      placeholder="Dirección completa para la entrega"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="metodoEnvio">Método de envío</label>
                      <select
                        id="metodoEnvio"
                        name="metodoEnvio"
                        value={formData.metodoEnvio}
                        onChange={handleInputChange}
                      >
                        <option value="domicilio">Envío a domicilio</option>
                        <option value="tienda">Recojo en tienda</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="metodoPago">Método de pago</label>
                      <select
                        id="metodoPago"
                        name="metodoPago"
                        value={formData.metodoPago}
                        onChange={handleInputChange}
                      >
                        <option value="efectivo">Efectivo</option>
                        <option value="yape">Yape</option>
                        <option value="transferencia">Transferencia</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="comentarios">Comentarios adicionales (opcional)</label>
                    <textarea
                      id="comentarios"
                      name="comentarios"
                      value={formData.comentarios}
                      onChange={handleInputChange}
                      placeholder="Cualquier información adicional sobre tu pedido"
                      rows="3"
                    />
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="btn-whatsapp-submit">
                      <span>📱</span>
                      Enviar pedido por WhatsApp
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div className="checkout-sidebar">
              {renderOrderSummary()}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
