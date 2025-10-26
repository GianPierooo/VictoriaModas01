import { useState } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import '../App.css'
import './FAQPage.css'

export default function FAQPage() {
  const [openItems, setOpenItems] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const faqData = [
    {
      category: 'Pedidos y Envíos',
      icon: '📦',
      questions: [
        {
          question: '¿Cuánto tiempo tarda en llegar mi pedido?',
          answer: 'Los pedidos se procesan en 1-2 días hábiles y el envío tarda entre 3-5 días hábiles dentro de Lima. Para provincias, el tiempo de entrega es de 5-7 días hábiles.'
        },
        {
          question: '¿Cuál es el costo de envío?',
          answer: 'El envío es GRATIS para compras mayores a S/200. Para compras menores, el costo de envío es de S/15 dentro de Lima y S/25 para provincias.'
        },
        {
          question: '¿Puedo cambiar la dirección de envío?',
          answer: 'Sí, puedes cambiar la dirección de envío antes de que el pedido sea procesado. Contacta con nosotros inmediatamente después de realizar tu compra.'
        },
        {
          question: '¿Hacen envíos a provincias?',
          answer: '¡Sí! Hacemos envíos a todo el Perú. Los tiempos de entrega varían según la ubicación, pero garantizamos la entrega en todas las regiones.'
        }
      ]
    },
    {
      category: 'Devoluciones y Cambios',
      icon: '🔄',
      questions: [
        {
          question: '¿Cuál es la política de devoluciones?',
          answer: 'Aceptamos devoluciones hasta 15 días después de recibir el producto. El artículo debe estar en perfecto estado, con etiquetas y sin usar.'
        },
        {
          question: '¿Cómo puedo cambiar una talla?',
          answer: 'Si necesitas cambiar de talla, puedes hacerlo contactándonos dentro de los primeros 7 días. Te enviaremos la talla correcta sin costo adicional.'
        },
        {
          question: '¿Cuánto tiempo tarda el reembolso?',
          answer: 'Una vez aprobada la devolución, el reembolso se procesa en 3-5 días hábiles y se refleja en tu cuenta bancaria en 1-2 días adicionales.'
        }
      ]
    },
    {
      category: 'Productos y Tallas',
      icon: '👗',
      questions: [
        {
          question: '¿Cómo sé qué talla elegir?',
          answer: 'Tenemos una guía de tallas detallada en cada producto. Si tienes dudas, puedes contactarnos y te ayudaremos a elegir la talla perfecta.'
        },
        {
          question: '¿Los colores son exactos a las fotos?',
          answer: 'Hacemos nuestro mejor esfuerzo para que los colores sean fieles a las fotos. Sin embargo, pueden haber pequeñas variaciones debido a la iluminación y pantallas.'
        },
        {
          question: '¿Qué materiales usan?',
          answer: 'Utilizamos materiales premium como scuba, suplex, seda francesa, peluche, paño carnero y angora. Cada producto especifica el material utilizado.'
        },
        {
          question: '¿Los productos son de talla única?',
          answer: 'Sí, ofrecemos una amplia gama de tallas desde XS hasta L. Cada producto tiene su propia tabla de tallas disponible.'
        }
      ]
    },
    {
      category: 'Pagos y Facturación',
      icon: '💳',
      questions: [
        {
          question: '¿Qué métodos de pago aceptan?',
          answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard), transferencias bancarias, Yape, Plin y PayPal.'
        },
        {
          question: '¿Es seguro pagar en línea?',
          answer: 'Sí, utilizamos sistemas de pago seguros y encriptados. Tus datos están protegidos y no almacenamos información de tarjetas.'
        },
        {
          question: '¿Puedo pagar contra entrega?',
          answer: 'Sí, ofrecemos pago contra entrega para pedidos dentro de Lima. El costo adicional es de S/5 por este servicio.'
        },
        {
          question: '¿Emiten factura?',
          answer: 'Sí, emitimos facturas electrónicas. Puedes solicitarla al momento de la compra proporcionando tu RUC.'
        }
      ]
    },
    {
      category: 'Atención al Cliente',
      icon: '🎧',
      questions: [
        {
          question: '¿Cuáles son sus horarios de atención?',
          answer: 'Atención en Galería Naranja (Puesto 47-48): Lunes a Sábado de 4:00 AM a 3:00 PM. Por WhatsApp estamos disponibles 24 horas, 7 días a la semana para pedidos.'
        },
        {
          question: '¿Cómo puedo contactarlos?',
          answer: 'Puedes contactarnos por WhatsApp (+51 993 357 672) disponible 24/7, email (victoriamodas1053@gmail.com) o visitarnos en galería de Lunes a Sábado de 4:00 AM a 3:00 PM.'
        },
        {
          question: '¿Ofrecen asesoría de estilo?',
          answer: '¡Sí! Nuestro equipo de asesoras está capacitado para ayudarte a elegir las prendas perfectas según tu estilo y ocasión.'
        }
      ]
    }
  ]

  const toggleItem = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(key)) {
      newOpenItems.delete(key)
    } else {
      newOpenItems.add(key)
    }
    setOpenItems(newOpenItems)
  }

  const filteredData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="faq-page">
      <AnnouncementBanner />
      <Header />
      
      {/* Hero Header */}
      <div className="faq-header">
        <div className="container">
          <div className="faq-header-content">
            <h1 className="faq-main-title">Preguntas Frecuentes</h1>
            <p className="faq-subtitle">
              Encuentra respuestas rápidas a las dudas más comunes sobre nuestros productos y servicios
            </p>
            
            {/* Barra de búsqueda */}
            <div className="faq-search">
              <div className="search-input-wrapper">
                <span className="search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Buscar preguntas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Estadísticas rápidas */}
            <div className="faq-stats">
              <div className="stat-item">
                <span className="stat-number">{faqData.reduce((acc, cat) => acc + cat.questions.length, 0)}+</span>
                <span className="stat-label">Preguntas respondidas</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{faqData.length}</span>
                <span className="stat-label">Categorías</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Soporte disponible</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <section className="faq-section">
        <div className="container">
          {searchTerm && (
            <div className="search-results-header">
              <h2>Resultados para "{searchTerm}"</h2>
              <p>{filteredData.reduce((acc, cat) => acc + cat.questions.length, 0)} pregunta(s) encontrada(s)</p>
            </div>
          )}

          <div className="faq-content">
            {filteredData.map((category, categoryIndex) => (
              <div key={categoryIndex} className="faq-category">
                <div className="category-header">
                  <div className="category-icon">{category.icon}</div>
                  <h2 className="category-title">{category.category}</h2>
                </div>
                
                <div className="questions-list">
                  {category.questions.map((item, questionIndex) => {
                    const isOpen = openItems.has(`${categoryIndex}-${questionIndex}`)
                    return (
                      <div key={questionIndex} className="question-item">
                        <button
                          className={`question-button ${isOpen ? 'open' : ''}`}
                          onClick={() => toggleItem(categoryIndex, questionIndex)}
                          aria-expanded={isOpen}
                        >
                          <span className="question-text">{item.question}</span>
                          <span className="question-icon">
                            {isOpen ? '−' : '+'}
                          </span>
                        </button>
                        
                        <div className={`answer-content ${isOpen ? 'open' : ''}`}>
                          <div className="answer-text">
                            {item.answer}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sección de contacto adicional */}
          <div className="faq-contact">
            <div className="contact-card">
              <h3>¿No encontraste lo que buscabas?</h3>
              <p>Nuestro equipo de atención al cliente está aquí para ayudarte con cualquier duda específica.</p>
              <div className="contact-actions">
                <a href="/contacto" className="contact-btn primary">
                  Contactar Soporte
                </a>
                <a href="https://wa.me/51993357672" className="contact-btn secondary" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
