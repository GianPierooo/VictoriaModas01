import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import '../App.css'
import './AccountPage.css'

export default function AccountPage() {
  return (
    <div className="account-page">
      <AnnouncementBanner />
      <Header />
      
      {/* Contenido principal */}
      <section className="account-unavailable-section">
        <div className="container">
          <div className="account-unavailable-content">
            {/* Icono */}
            <div className="unavailable-icon">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>

            {/* Mensaje principal */}
            <h1>Cuentas de Usuario</h1>
            <h2>Próximamente disponible</h2>
            
            <p className="unavailable-description">
              Estamos trabajando en crear una experiencia de cuenta personalizada para ti. 
              Pronto podrás registrarte, guardar tus productos favoritos y gestionar tus pedidos.
            </p>

            {/* Características futuras */}
            <div className="coming-features">
              <div className="feature-card">
                <div className="feature-icon">🔐</div>
                <h3>Cuenta Personal</h3>
                <p>Crea tu cuenta y accede de forma segura</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">❤️</div>
                <h3>Lista de Favoritos</h3>
                <p>Guarda tus productos preferidos</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">📦</div>
                <h3>Historial de Pedidos</h3>
                <p>Revisa tus compras anteriores</p>
              </div>
              
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Compra Rápida</h3>
                <p>Checkout más rápido con tus datos guardados</p>
              </div>
            </div>

            {/* Acción alternativa */}
            <div className="alternative-actions">
              <h3>Mientras tanto, puedes:</h3>
              <div className="action-buttons">
                <a href="/" className="btn-primary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  </svg>
                  Ir al Inicio
                </a>
                <a href="/contacto" className="btn-secondary">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  Contáctanos
                </a>
              </div>
            </div>

            {/* Notificación */}
            <div className="notification-box">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <p>
                ¿Quieres ser notificado cuando las cuentas estén disponibles? 
                <a href="/contacto"> Escríbenos</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

