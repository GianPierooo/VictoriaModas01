import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import '../App.css'
import './HomePage.css'

// ============= HERO FULL-SCREEN MEJORADO =============
function Hero() {
  const sliderRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2400&auto=format&fit=crop',
      title: 'Descubre la elegancia atemporal',
      subtitle: 'Colección Primavera 2025',
      cta: 'Explorar colección'
    },
    {
      img: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2400&auto=format&fit=crop',
      title: 'Telas premium, estilo único',
      subtitle: 'Scuba, Suplex y Seda Francesa',
      cta: 'Ver catálogo'
    },
    {
      img: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2400&auto=format&fit=crop',
      title: 'Minimalismo sofisticado',
      subtitle: 'Diseños que hablan por sí mismos',
      cta: 'Comprar ahora'
    }
  ]

  const scroll = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.offsetWidth
      const newIndex = direction === 'next' 
        ? (currentSlide + 1) % slides.length 
        : (currentSlide - 1 + slides.length) % slides.length
      
      sliderRef.current.scrollTo({
        left: newIndex * scrollAmount,
        behavior: 'smooth'
      })
      setCurrentSlide(newIndex)
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      scroll('next')
    }, 5000)
    return () => clearInterval(timer)
  }, [currentSlide])

  return (
    <section className="hero-fullscreen">
      <div className="hero-slider" ref={sliderRef}>
        {slides.map((slide, idx) => (
          <div key={idx} className="hero-slide">
            <div className="hero-bg" style={{ backgroundImage: `url(${slide.img})` }} />
            <div className="hero-overlay">
              <div className="container hero-content">
                <p className="hero-kicker">{slide.subtitle}</p>
                <h1 className="hero-title-main">{slide.title}</h1>
                <div className="hero-actions">
                  <Link to="/vestidos" className="btn btn-hero">{slide.cta}</Link>
                  <Link to="/nosotros" className="btn btn-hero-outline">Nuestra historia</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Controles de navegación */}
      <div className="hero-controls">
        <button className="hero-nav-btn" onClick={() => scroll('prev')} aria-label="Anterior">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="hero-nav-btn" onClick={() => scroll('next')} aria-label="Siguiente">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* Indicadores de slides */}
      <div className="hero-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={`hero-indicator ${currentSlide === idx ? 'active' : ''}`}
            onClick={() => {
              sliderRef.current?.scrollTo({
                left: idx * sliderRef.current.offsetWidth,
                behavior: 'smooth'
              })
              setCurrentSlide(idx)
            }}
            aria-label={`Ir a slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Indicador de scroll */}
      <div 
        className="scroll-indicator" 
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        role="button"
        aria-label="Desplázate hacia abajo"
        tabIndex={0}
      >
        <div className="scroll-indicator-icon" />
      </div>
    </section>
  )
}

// ============= PRODUCTOS DESTACADOS / MÁS VENDIDOS =============
function FeaturedProducts() {
  const products = [
    {
      id: 'vestido-suplex-moderno',
      name: 'Vestido Suplex Moderno',
      price: 159.90,
      originalPrice: 209.90,
      image: '/imagenes/vestidos/vestido_suplex01/azul_adelante.png',
      badge: 'Nuevo',
      category: 'Vestidos'
    },
    {
      id: 'vestido-lame-elegante',
      name: 'Vestido Lame Elegante',
      price: 199.90,
      originalPrice: 249.90,
      image: '/imagenes/vestidos/vestido_lame01/vestido_lame_plomo01_adelante.png',
      badge: '-20%',
      category: 'Vestidos'
    },
    {
      id: 'blusa-seda-francesa',
      name: 'Blusa Seda Francesa',
      price: 129.90,
      originalPrice: 179.90,
      image: '/imagenes/blusas/blusa_seda_francesa/blusa_sedafrancesa_delante.png',
      badge: '-28%',
      category: 'Blusas'
    },
    {
      id: 'vestido-rit-elegante',
      name: 'Vestido Rit Elegante',
      price: 249.90,
      originalPrice: 329.90,
      image: '/imagenes/vestidos/vestido_rit02/vestido02_tela_rit_delante.png',
      badge: '-24%',
      category: 'Vestidos'
    }
  ]

  return (
    <section className="section featured-products" aria-labelledby="featured-title">
      <div className="container">
        <div className="section-header">
          <h2 id="featured-title">Más Vendidos</h2>
          <p className="section-subtitle">Las prendas favoritas de nuestras clientas</p>
        </div>
        <div className="products-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              {product.badge && (
                <span className={`product-badge ${product.badge === 'Nuevo' ? 'badge-new' : product.badge.startsWith('-') ? 'badge-sale' : 'badge-special'}`}>
                  {product.badge}
                </span>
              )}
              <Link to={`/producto/${product.id}`} className="product-image-wrapper">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-image"
                  loading="lazy"
                />
              </Link>
              <div className="product-info">
                <p className="product-category">{product.category}</p>
                <h3 className="product-name">
                  <Link to={`/producto/${product.id}`}>
                    {product.name}
                  </Link>
                </h3>
                <Link to={`/producto/${product.id}`} className="btn btn-product">
                  Ver detalles
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="section-cta">
          <Link to="/vestidos" className="btn btn-outline btn-large">Ver todos los productos</Link>
        </div>
      </div>
    </section>
  )
}

// ============= COLECCIONES VISUALES GRANDES =============
function Collections() {
  const collections = [
    {
      id: 'vestidos-elegantes',
      title: 'Vestidos Elegantes',
      description: 'Lame, Rit y Suplex de alta calidad',
      image: '/imagenes/vestidos/vestido_lame01/vestido_lame_plomo01_adelante.png',
      link: '/vestidos'
    },
    {
      id: 'pantalones-modernos',
      title: 'Pantalones Modernos',
      description: 'Comodidad y estilo en tela scuba',
      image: '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_negro_adelante.png',
      link: '/pantalones'
    }
  ]

  return (
    <section className="collections-showcase">
      <div className="container">
        <div className="collections-grid">
          {collections.map((collection) => (
            <div key={collection.id} className="collection-card-large">
              <div className="collection-image" style={{ backgroundImage: `url(${collection.image})` }} />
              <div className="collection-overlay">
                <div className="collection-content">
                  <h3 className="collection-title">{collection.title}</h3>
                  <p className="collection-description">{collection.description}</p>
                  <Link to={collection.link} className="btn btn-white">Explorar colección</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============= CATEGORÍAS CON OVERLAYS =============
function CategoryShowcase() {
  const categories = [
    { name: 'Vestidos', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop', link: '/vestidos' },
    { name: 'Pantalones', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop', link: '/pantalones' },
    { name: 'Conjuntos', img: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800&auto=format&fit=crop', link: '/vestidos' },
    { name: 'Bodys', img: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop', link: '/vestidos' }
  ]

  return (
    <section className="section category-showcase" aria-labelledby="category-title">
      <div className="container">
        <div className="section-header">
          <h2 id="category-title">Explora por categoría</h2>
          <p className="section-subtitle">Encuentra el estilo perfecto para ti</p>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <Link key={cat.name} to={cat.link} className="category-card">
              <div className="category-image" style={{ backgroundImage: `url(${cat.img})` }} />
              <div className="category-overlay">
                <h3 className="category-name">{cat.name}</h3>
                <span className="category-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============= PRODUCTO SPOTLIGHT =============
function ProductSpotlight() {
  return (
    <section className="product-spotlight">
      <div className="container">
        <div className="spotlight-grid">
          <div className="spotlight-media">
            <img 
              src="/imagenes/vestidos/vestido_suplex01/azul_adelante.png" 
              alt="Vestido Suplex Moderno"
              loading="lazy"
            />
          </div>
          <div className="spotlight-content">
            <p className="spotlight-kicker">Producto destacado</p>
            <h2 className="spotlight-title">VESTIDO SUPLEX MODERNO</h2>
            <p className="spotlight-description">
              Vestido moderno confeccionado en suplex de alta calidad. Ajuste perfecto al cuerpo 
              con diseño versátil y elegante. Ideal para cualquier ocasión, desde eventos casuales 
              hasta reuniones formales. Comodidad y estilo en una sola prenda. Disponible en azul, 
              blanco, negro y vino.
            </p>
            <ul className="spotlight-features">
              <li><strong>Tela:</strong> Suplex de alta calidad</li>
              <li><strong>Corte:</strong> Ajuste perfecto y moderno</li>
              <li><strong>Tallas:</strong> S a L</li>
            </ul>
            <div className="spotlight-actions">
              <Link to="/producto/vestido-suplex-moderno" className="btn btn-spotlight">Ver detalles completos</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============= SOCIAL PROOF / FAVORITOS DE INSTAGRAM =============
function SocialFavorites() {
  const [currentSlide, setCurrentSlide] = useState(2) // Empezar en el centro
  const [isHovered, setIsHovered] = useState(false)

  const favorites = [
    { 
      id: 'vestido-suplex-moderno', 
      name: 'Vestido Suplex Moderno',
      image: '/imagenes/vestidos/vestido_suplex01/negro_adelante.png',
      likes: '3.2k',
      collection: 'Colección Suplex'
    },
    { 
      id: 'vestido-lame-elegante', 
      name: 'Vestido Lame Elegante',
      image: '/imagenes/vestidos/vestido_lame01/azul_adelante.png',
      likes: '2.8k',
      collection: 'Elegancia Premium'
    },
    { 
      id: 'pantalon-scuba-vena', 
      name: 'Pantalón Scuba Vena',
      image: '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_vino_adelante.png',
      likes: '2.5k',
      collection: 'Scuba Collection'
    },
    { 
      id: 'vestido-rit-elegante', 
      name: 'Vestido Rit Elegante',
      image: '/imagenes/vestidos/vestido_rit02/vestido_rit_negro_delante.png',
      likes: '2.9k',
      collection: 'Rit Premium'
    },
    { 
      id: 'blusa-seda-francesa', 
      name: 'Blusa Seda Francesa',
      image: '/imagenes/blusas/blusa_seda_francesa/negro_adelante.png',
      likes: '3.1k',
      collection: 'Seda Collection'
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % favorites.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + favorites.length) % favorites.length)
  }

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        nextSlide()
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [currentSlide, isHovered])

         // Calcular el índice relativo de cada tarjeta respecto al centro
         const getCardPosition = (index) => {
           const totalCards = favorites.length
           let relativeIndex = index - currentSlide
           
           // Normalizar el índice para que esté en el rango [-3, 3] para mostrar más tarjetas
           if (relativeIndex > totalCards / 2) {
             relativeIndex -= totalCards
           } else if (relativeIndex < -totalCards / 2) {
             relativeIndex += totalCards
           }
           
           return relativeIndex
         }

  return (
    <section 
      className="social-favorites-fullwidth" 
      aria-labelledby="social-title"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header centrado */}
      <div className="social-header-container">
        <div className="social-header-content">
          <h2 id="social-title">Favoritos de Instagram</h2>
          <p className="social-subtitle">Las prendas que más aman nuestras clientas en redes sociales</p>
        </div>
      </div>

      {/* Carousel superpuesto de ancho completo */}
      <div className="social-carousel-overlay-container">
        <button 
          className="social-nav-overlay social-nav-prev" 
          onClick={prevSlide} 
          aria-label="Anterior"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div className="social-carousel-overlay">
               {favorites.map((item, index) => {
                 const position = getCardPosition(index)
                 const isCenter = position === 0
                 const isVisible = Math.abs(position) <= 3
                 
                 return (
                   <div 
                     key={item.id} 
                     className={`social-card-overlay ${isCenter ? 'center' : ''} ${isVisible ? 'visible' : 'hidden'}`}
                     style={{
                       '--position': position,
                       '--z-index': isCenter ? 10 : 5 - Math.abs(position)
                     }}
                   >
                <div className="social-card-overlay-image">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                  />
                </div>
                <div className="social-card-overlay-content">
                  <h3 className="social-card-overlay-collection">{item.collection}</h3>
                  <Link to={`/producto/${item.id}`} className="social-card-overlay-link">
                    Aprende más
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <button 
          className="social-nav-overlay social-nav-next" 
          onClick={nextSlide} 
          aria-label="Siguiente"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {/* CTA centrado */}
      <div className="social-cta-container">
        <a 
          href="https://www.facebook.com/profile.php?id=61555283742078" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="social-cta-btn"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.12 5.57 21.25 10.38 22v-7.01H7.9v-2.92h2.48V9.41c0-2.45 1.46-3.8 3.7-3.8 1.07 0 2.18.19 2.18.19v2.4h-1.23c-1.21 0-1.59.75-1.59 1.52v1.82h2.71l-.43 2.92h-2.28V22c4.81-.75 8.52-4.88 8.52-9.93z"/>
          </svg>
          Síguenos en Facebook
        </a>
      </div>
    </section>
  )
}

// ============= BLOG MEJORADO =============
function BlogNoticias() {
  const posts = [
    {
      title: 'Cómo combinar pantalones wide-leg en 2025',
      img: 'https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Guía rápida para estilizar pantalones wide-leg con siluetas limpias y tonos neutros.',
      date: '15 Mar 2025'
    },
    {
      title: 'Tendencias en tejidos: scuba y suplex',
      img: 'https://images.unsplash.com/photo-1520975433059-7415e1d2d6e2?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Por qué estos materiales dominan el guardarropa moderno: ajuste, caída y confort.',
      date: '10 Mar 2025'
    },
    {
      title: 'Minimalismo elegante: claves del look VictoriaModas',
      img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop',
      excerpt: 'Cómo lograr un estilo refinado con cortes simples, paleta neutra y texturas premium.',
      date: '5 Mar 2025'
    }
  ]

  return (
    <section className="section blog-section" aria-labelledby="blog-title">
      <div className="container">
        <div className="section-header">
          <h2 id="blog-title">Blog y Novedades</h2>
          <p className="section-subtitle">Consejos de moda, tendencias y guías de estilo</p>
        </div>
        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.title} className="blog-card">
              <div className="blog-media">
                <img 
                  src={post.img} 
                  alt={post.title}
                  loading="lazy"
                />
              </div>
              <div className="blog-content">
                <time className="blog-date">{post.date}</time>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <Link className="blog-link" to="/vestidos">
                  Leer más →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============= HOMEPAGE PRINCIPAL =============
export default function HomePage() {
  return (
    <div>
      <AnnouncementBanner />
      <Header />
      <main id="main-content">
      <Hero />
      <FeaturedProducts />
      <Collections />
      <CategoryShowcase />
      <ProductSpotlight />
      <SocialFavorites />
      <BlogNoticias />
      </main>
      <Footer />
    </div>
  )
}
