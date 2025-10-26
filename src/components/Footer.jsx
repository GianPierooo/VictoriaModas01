import { useState } from 'react'
import '../App.css'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-brand">
            <div className="brand-logo">
              <div className="brand-icon">✨</div>
              <h3 className="brand-name">VictoriaModas</h3>
            </div>
            <p className="brand-tagline">
              Elegancia, modernidad y versatilidad para la mujer de hoy.
            </p>
            
            {/* Social Media */}
            <div className="social-media">
              <a href="https://www.facebook.com/profile.php?id=61555283742078" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                {iconFacebook}
              </a>
              <a href="https://wa.me/51993357672" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                {iconWhatsApp}
              </a>
            </div>

            {/* Legal Info */}
            <div className="legal-info">
              <p className="legal-text">📍 Galería Naranja - Puesto 47-48</p>
              <p className="legal-text">Calle Misti con Huascarán</p>
              <p className="legal-text">✉️ victoriamodas1053@gmail.com</p>
              <p className="legal-text">🕒 Lun-Sáb: 4:00 AM - 3:00 PM | WhatsApp 24/7</p>
            </div>

            {/* Complaint Book */}
            <div className="complaint-book">
              <div className="book-icon">📖</div>
              <span className="book-text">LIBRO DE RECLAMACIONES</span>
            </div>
          </div>

          {/* Customer Service */}
          <div className="footer-section">
            <h4 className="section-title">SERVICIO AL CLIENTE</h4>
            <ul className="footer-links">
              <li>
                <span className="link-icon">{iconTruck}</span>
                <a href="#">Seguimiento de pedido</a>
              </li>
              <li>
                <span className="link-icon">{iconPackage}</span>
                <a href="#">Políticas de envío</a>
              </li>
              <li>
                <span className="link-icon">{iconReturn}</span>
                <a href="#">Términos y condiciones</a>
              </li>
              <li>
                <span className="link-icon">{iconQuestion}</span>
                <a href="#">Preguntas frecuentes</a>
              </li>
              <li>
                <span className="link-icon">{iconContact}</span>
                <a href="#">Contáctanos</a>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div className="footer-section">
            <h4 className="section-title">NOSOTROS</h4>
            <ul className="footer-links">
              <li>
                <span className="link-icon">{iconStore}</span>
                <a href="#">Nuestras tiendas</a>
              </li>
              <li>
                <span className="link-icon">{iconAbout}</span>
                <a href="#">Nosotros</a>
              </li>
              <li>
                <span className="link-icon">{iconPolicy}</span>
                <a href="#">Política y protección de datos</a>
              </li>
              <li>
                <span className="link-icon">{iconLegal}</span>
                <a href="#">Bases legales</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="footer-section">
            <h4 className="section-title">CATEGORÍAS</h4>
            <ul className="footer-links">
              <li><a href="/vestidos">Vestidos</a></li>
              <li><a href="/pantalones">Pantalones</a></li>
              <li><a href="/blusas">Blusas</a></li>
              <li><a href="/abrigos">Abrigos</a></li>
              <li><a href="/vestidos">Conjuntos</a></li>
              <li><a href="/vestidos">Accesorios</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="copyright">
            <p>© VictoriaModas 2025 - Derechos reservados</p>
          </div>
          <div className="whatsapp-float">
            <a href="https://wa.me/51993357672" className="whatsapp-btn" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp - Disponible 24/7">
              {iconWhatsAppGreen}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Social Media Icons
const iconInstagram = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const iconFacebook = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.12 5.57 21.25 10.38 22v-7.01H7.9v-2.92h2.48V9.41c0-2.45 1.46-3.8 3.7-3.8 1.07 0 2.18.19 2.18.19v2.4h-1.23c-1.21 0-1.59.75-1.59 1.52v1.82h2.71l-.43 2.92h-2.28V22c4.81-.75 8.52-4.88 8.52-9.93z"/>
  </svg>
)

const iconWhatsApp = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.39 0 .01 5.38.01 12.02c0 2.11.55 4.06 1.52 5.77L0 24l6.39-1.66a11.91 11.91 0 0 0 5.63 1.44h.01c6.63 0 12.01-5.38 12.01-12.02 0-3.21-1.25-6.23-3.52-8.28zM12.02 21.3h-.01c-1.82 0-3.6-.49-5.15-1.41l-.37-.22-3.79.99 1.01-3.69-.24-.38a9.3 9.3 0 0 1-1.45-4.58C2.02 6.5 6.5 2.02 12.02 2.02c2.59 0 5.02 1.01 6.85 2.84a9.64 9.64 0 0 1 2.83 6.86c0 5.52-4.49 10-10 10zm5.49-7.48c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.35.23-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.51-1.77-1.69-2.07-.18-.3-.02-.46.13-.61.13-.12.3-.32.45-.48.15-.16.2-.27.3-.46.1-.2.05-.35-.03-.5-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.5.07-.76.35-.26.28-1 1-.1 2.43.9 1.43 2.07 2.51 2.37 2.81.3.3 4.07 2.89 4.91 3.27.69.32 1.23.51 1.65.65.69.22 1.31.19 1.8.12.55-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.08-.13-.28-.2-.58-.35z"/>
  </svg>
)

const iconTikTok = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
)

// Link Icons
const iconTruck = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13"></rect>
    <polygon points="16,8 20,8 23,11 23,16 16,16"></polygon>
    <circle cx="5.5" cy="18.5" r="2.5"></circle>
    <circle cx="18.5" cy="18.5" r="2.5"></circle>
  </svg>
)

const iconPackage = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27,6.96 12,12.01 20.73,6.96"></polyline>
  </svg>
)

const iconReturn = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 10h6"></path>
    <path d="M9 14h6"></path>
    <path d="M9 18h6"></path>
    <path d="M9 6h6"></path>
  </svg>
)

const iconQuestion = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 10h.01"></path>
    <path d="M15 10h.01"></path>
    <path d="M9.5 15a3.5 3.5 0 0 0 5 0"></path>
    <path d="M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
  </svg>
)

const iconContact = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const iconStore = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9,22 9,12 15,12 15,22"></polyline>
  </svg>
)

const iconAbout = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const iconPolicy = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
)

const iconLegal = (
  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <circle cx="12" cy="16" r="1"></circle>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
)

const iconWhatsAppGreen = (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.02 0C5.39 0 .01 5.38.01 12.02c0 2.11.55 4.06 1.52 5.77L0 24l6.39-1.66a11.91 11.91 0 0 0 5.63 1.44h.01c6.63 0 12.01-5.38 12.01-12.02 0-3.21-1.25-6.23-3.52-8.28zM12.02 21.3h-.01c-1.82 0-3.6-.49-5.15-1.41l-.37-.22-3.79.99 1.01-3.69-.24-.38a9.3 9.3 0 0 1-1.45-4.58C2.02 6.5 6.5 2.02 12.02 2.02c2.59 0 5.02 1.01 6.85 2.84a9.64 9.64 0 0 1 2.83 6.86c0 5.52-4.49 10-10 10zm5.49-7.48c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.35.23-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.51-1.77-1.69-2.07-.18-.3-.02-.46.13-.61.13-.12.3-.32.45-.48.15-.16.2-.27.3-.46.1-.2.05-.35-.03-.5-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.5.07-.76.35-.26.28-1 1-.1 2.43.9 1.43 2.07 2.51 2.37 2.81.3.3 4.07 2.89 4.91 3.27.69.32 1.23.51 1.65.65.69.22 1.31.19 1.8.12.55-.08 1.77-.72 2.02-1.41.25-.69.25-1.28.17-1.41-.08-.13-.28-.2-.58-.35z"/>
  </svg>
)