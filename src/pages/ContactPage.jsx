import { useState } from 'react'
import emailjs from '@emailjs/browser'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import '../App.css'
import './ContactPage.css'

// Configuración de EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_kvj4xba',
  templateIdAdmin: 'template_q6s8zef',    // Template para VictoriaModas (admin)
  templateIdClient: 'template_9vy0jq9',   // Template de confirmación para el cliente
  publicKey: 'DcomytfMPeZ2O-AR8'
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = '⚠ Ingresa tu nombre'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = '⚠ Correo inválido'
    if (!form.subject.trim()) next.subject = '⚠ Ingresa un asunto'
    if (form.message.trim().length < 10) next.message = '⚠ El mensaje debe tener al menos 10 caracteres'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    
    setSending(true)
    setSubmitStatus(null)

    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_email: 'victoriamodas1053@gmail.com'
      }

      // 1️⃣ Enviar correo a VictoriaModas (admin) con los datos del cliente
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateIdAdmin,
        templateParams,
        EMAILJS_CONFIG.publicKey
      )

      // 2️⃣ Enviar correo de confirmación al cliente
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateIdClient,
        templateParams,
        EMAILJS_CONFIG.publicKey
      )

      // ✅ Éxito - Ambos correos enviados
      setSubmitStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setErrors({})
      
      setTimeout(() => setSubmitStatus(null), 5000)
      
    } catch (error) {
      console.error('❌ Error al enviar mensaje:', error)
      setSubmitStatus('error')
      
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="contact-page">
      <AnnouncementBanner />
      <Header />
      
      {/* Hero Header */}
      <div className="contact-header">
        <div className="container">
          <div className="contact-header-content">
            <h1 className="contact-main-title">Contáctanos</h1>
            <p className="contact-subtitle">
              Estamos aquí para ayudarte. Escríbenos y resolveremos tus dudas
            </p>
            <div className="contact-features">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span className="feature-text">Respuesta rápida</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">Atención personalizada</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💎</span>
                <span className="feature-text">Soporte premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección principal de contacto */}
      <section className="contact-section" aria-labelledby="contact-title">
        <div className="container">
          <div className="contact-grid">
            {/* Formulario */}
            <div className="contact-form-wrapper">
              <h2 id="contact-title">Envíanos un mensaje</h2>
              <p className="contact-intro">
                ¿Tienes una consulta o deseas realizar un pedido? Completa el formulario y nos pondremos en contacto contigo a la brevedad.
              </p>
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label htmlFor="name">Nombre completo *</label>
                  <input 
                    id="name" 
                    name="name" 
                    type="text" 
                    value={form.name} 
                    onChange={handleChange} 
                    aria-invalid={Boolean(errors.name)}
                    placeholder="Tu nombre"
                  />
                  {errors.name && <span className="error" role="alert">{errors.name}</span>}
                </div>
                <div className="field">
                  <label htmlFor="email">Correo electrónico *</label>
                  <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    aria-invalid={Boolean(errors.email)}
                    placeholder="correo@ejemplo.com"
                  />
                  {errors.email && <span className="error" role="alert">{errors.email}</span>}
                </div>
                <div className="field">
                  <label htmlFor="subject">Asunto *</label>
                  <input 
                    id="subject" 
                    name="subject" 
                    type="text" 
                    value={form.subject} 
                    onChange={handleChange} 
                    aria-invalid={Boolean(errors.subject)}
                    placeholder="¿En qué podemos ayudarte?"
                  />
                  {errors.subject && <span className="error" role="alert">{errors.subject}</span>}
                </div>
                <div className="field">
                  <label htmlFor="message">Mensaje *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows="5" 
                    value={form.message} 
                    onChange={handleChange} 
                    aria-invalid={Boolean(errors.message)}
                    placeholder="Escribe tu mensaje aquí..."
                  />
                  {errors.message && <span className="error" role="alert">{errors.message}</span>}
                </div>

                {/* Mensajes de estado */}
                {submitStatus === 'success' && (
                  <div className="alert alert-success" role="alert">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    ¡Mensaje enviado con éxito! Te contactaremos pronto.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="alert alert-error" role="alert">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos por WhatsApp.
                  </div>
                )}

                <button className="btn-submit" type="submit" disabled={sending}>
                  {sending ? (
                    <>
                      <span className="spinner"></span>
                      Enviando...
                    </>
                  ) : (
                    'Enviar mensaje'
                  )}
                </button>
              </form>
            </div>

            {/* Información de contacto */}
            <div className="contact-info">
              <div className="contact-card">
                <h3>Información</h3>
                
                <div className="contact-item">
                  <strong>📍 Dirección</strong>
                  <p>Galería Naranja - Puesto 47-48</p>
                  <p style={{fontSize: '14px', color: '#666', marginTop: '4px'}}>Calle Misti con Huascarán</p>
                  <a 
                    href="https://maps.app.goo.gl/igvX1ku7CCuvsCSu9" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-location"
                  >
                    📍 Ver en Google Maps
                  </a>
                </div>

                <div className="contact-item">
                  <strong>📞 Teléfono</strong>
                  <p>+51 993 357 672</p>
                </div>

                <div className="contact-item">
                  <strong>✉️ Email</strong>
                  <p>victoriamodas1053@gmail.com</p>
                </div>

                <div className="contact-item">
                  <strong>🕐 Horario</strong>
                  <p><strong>Atención en Galería:</strong></p>
                  <p>Lunes a Sábado: 4:00 AM - 3:00 PM</p>
                  <p style={{marginTop: '8px'}}><strong>WhatsApp:</strong></p>
                  <p>Disponible 24/7 para pedidos</p>
                </div>

                <strong style={{display: 'block', marginTop: '24px', marginBottom: '12px', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
                  Síguenos
                </strong>
                <div className="social-links">
                  <a href="https://www.facebook.com/profile.php?id=61555283742078" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    📘
                  </a>
                  <a href="https://wa.me/51993357672" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                    💬
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de ubicación con mapa */}
      <section className="contact-map-section" aria-labelledby="map-title">
        <div className="container">
          <div className="map-header">
            <h2 id="map-title">Nuestra Ubicación</h2>
            <p className="contact-subtitle">Visítanos en Galería Naranja, puesto 47-48 - Calle Misti con Huascarán</p>
          </div>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.234567890123!2d-77.0282!3d-12.0464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sGaler%C3%ADa%20Naranja!5e0!3m2!1ses!2spe!4v1234567890123!5m2!1ses!2spe"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de VictoriaModas en Galería Naranja"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
