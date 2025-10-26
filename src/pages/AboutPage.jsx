import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import '../App.css'
import './AboutPage.css'

export default function AboutPage() {
  const values = [
    {
      icon: '✨',
      title: 'Elegancia',
      description: 'Diseños minimalistas que realzan la belleza natural de cada mujer con sofisticación atemporal.'
    },
    {
      icon: '🌸',
      title: 'Calidad Premium',
      description: 'Telas exclusivas seleccionadas cuidadosamente: scuba, suplex, seda francesa y angora.'
    },
    {
      icon: '💎',
      title: 'Exclusividad',
      description: 'Colecciones limitadas confeccionadas con pasión y atención al detalle en cada puntada.'
    }
  ]

  return (
    <div className="about-page">
      <AnnouncementBanner />
      <Header />
      
      {/* Hero Header */}
      <div className="about-header">
        <div className="container">
          <div className="about-header-content">
            <h1 className="about-main-title">Nuestra Historia</h1>
            <p className="about-subtitle">
              Más que moda, creamos experiencias que empoderan a la mujer moderna
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Años de experiencia</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Clientes satisfechas</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Diseños únicos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección principal sobre nosotros */}
      <section className="about-section" aria-labelledby="about-title">
        <div className="container">
          <div className="about-grid">
            <div className="about-media">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop"
                alt="Esencia de VictoriaModas"
              />
            </div>
            <div className="about-content">
              <h2 id="about-title">VictoriaModas</h2>
              <p>
                Nacimos con la misión de ofrecer moda femenina que combine <strong>elegancia, modernidad y versatilidad</strong>. 
                Creemos en el poder de la simplicidad y en la calidad incomparable de las telas premium como scuba, 
                suplex, lame, seda francesa, peluche, paño carnero y angora.
              </p>
              <p>
                Nuestra filosofía es vestir a la mujer contemporánea con prendas <strong>atemporales, cómodas y 
                cuidadosamente confeccionadas</strong>, inspiradas en un estilo minimalista y sofisticado que 
                trasciende las tendencias pasajeras.
              </p>
              <p>
                Cada colección es diseñada pensando en ti: la mujer que valora la calidad, aprecia los detalles 
                y busca expresar su personalidad a través de la moda con refinamiento y confianza.
              </p>
              <div className="about-note">
                <p>
                  Gracias por confiar en VictoriaModas. Diseñamos cada colección con pasión y detalle 
                  para acompañarte en cada momento importante de tu vida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores de la marca */}
      <section className="values-section" aria-labelledby="values-title">
        <div className="container">
          <div className="values-header">
            <h2 id="values-title">Nuestros Valores</h2>
            <p className="about-subtitle">Los pilares que definen nuestra esencia</p>
          </div>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ubicación */}
      <section className="location-section" aria-labelledby="location-title">
        <div className="container">
          <div className="location-header">
            <h2 id="location-title">Nuestra Ubicación</h2>
            <p className="about-subtitle">Visítanos en nuestra tienda física</p>
          </div>
          <div className="location-content">
            <div className="location-info">
              <div className="location-details">
                <h3>📍 Galería Naranja - Puesto 47-48</h3>
                <p style={{fontSize: '16px', fontWeight: '500', color: '#666', marginTop: '8px'}}>
                  Calle Misti con Huascarán
                </p>
                <p>
                  Estamos ubicados en el corazón comercial de la ciudad, en Galería Naranja, 
                  puesto 47-48. Nuestro espacio está diseñado para brindarte una experiencia 
                  de compra única y personalizada.
                </p>
                <div className="location-features">
                  <div className="feature-item">
                    <span className="feature-icon">🕒</span>
                    <span className="feature-text">Atención en Galería: Lunes a Sábado 4:00 AM - 3:00 PM</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">💬</span>
                    <span className="feature-text">WhatsApp disponible 24/7</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">👗</span>
                    <span className="feature-text">Prueba de prendas disponible</span>
                  </div>
                </div>
                <a 
                  href="https://maps.app.goo.gl/igvX1ku7CCuvsCSu9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-location"
                >
                  📍 Ver en Google Maps
                </a>
              </div>
            </div>
            <div className="location-map">
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
        </div>
      </section>

      <Footer />
    </div>
  )
}
