import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import ProductCard from '../components/ProductCard.jsx'

// ============= HERO SLIDER =============
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
    const newIndex = direction === 'next' 
      ? (currentSlide + 1) % slides.length 
      : (currentSlide - 1 + slides.length) % slides.length
    setCurrentSlide(newIndex)
  }

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => scroll('next'), 5000)
    return () => clearInterval(timer)
  }, [currentSlide])

  return (
    <section className="relative h-[60vh] md:h-[80vh] lg:h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Parallax */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-110 transition-transform duration-1000 ease-out"
            style={{ backgroundImage: `url(${slide.img})` }}
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl transform transition-all duration-1000">
              <p className="text-sm md:text-base uppercase tracking-widest mb-4 opacity-90 animate-fade-in">
                {slide.subtitle}
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold mb-8 animate-slide-up">
                {slide.title}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
                <Link 
                  to="/vestidos" 
                  className="btn-primary transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  {slide.cta}
                </Link>
                <Link 
                  to="/nosotros" 
                  className="btn-white transform transition-all duration-300 hover:scale-105"
                >
                  Nuestra historia
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 pointer-events-none">
        <button
          onClick={() => scroll('prev')}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
          aria-label="Anterior"
        >
          <ChevronLeftIcon className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={() => scroll('next')}
          className="pointer-events-auto w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center transition-colors"
          aria-label="Siguiente"
        >
          <ChevronRightIcon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Ir a slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator (hidden on mobile) */}
      <button
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Desplázate hacia abajo"
      >
        <ChevronDownIcon className="w-8 h-8 text-white" />
      </button>
    </section>
  )
}

// ============= SCROLL ANIMATION HOOK =============
function useScrollAnimation() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return [ref, isVisible]
}

// ============= PRODUCTOS DESTACADOS =============
function FeaturedProducts() {
  const [ref, isVisible] = useScrollAnimation()
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
    <section 
      ref={ref}
      className={`relative py-12 md:py-16 lg:py-20 bg-gradient-to-b from-rose-50 to-white overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      aria-labelledby="featured-title"
    >
      {/* Círculos decorativos */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-radial-rose rounded-full opacity-30 animate-pulse-soft pointer-events-none"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-radial-rose rounded-full opacity-20 animate-float pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 transform transition-all duration-1000">
          <h2 
            id="featured-title" 
            className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 tracking-tight transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <span className="relative inline-block group">
              <span className="absolute -inset-6 bg-gradient-to-r from-rose/20 via-rose-100/30 to-rose/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative inline-flex items-baseline gap-3">
                <span className="text-rose font-light">Más</span>
                <span className="text-gray-900 font-bold">Vendidos</span>
              </span>
            </span>
          </h2>
          <p 
            className={`text-lg md:text-xl text-gray-600 mb-6 transition-all duration-1000 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            Las prendas favoritas de nuestras clientas
          </p>
          {/* Línea decorativa animada */}
          <div className={`w-24 h-1 bg-gradient-to-r from-rose to-rose-dark mx-auto rounded-full transition-all duration-1000 delay-200 ${
            isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
          }`}></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} showSizes={false} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link to="/vestidos" className="btn-outline">
            Ver todos los productos
          </Link>
        </div>
      </div>
    </section>
  )
}

// ============= COLECCIONES VISUALES =============
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
    <section className="relative py-12 md:py-16 overflow-hidden">
      {/* Círculo decorativo */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gradient-radial-rose rounded-full opacity-20 -translate-x-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="group relative h-96 rounded-2xl overflow-hidden shadow-md hover:shadow-rose-xl transition-all duration-500"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${collection.image})` }}
              />
              
              {/* Overlay con tinte rosa */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-rose-900/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-end p-8">
                <div className="text-white">
                  <h3 className="text-3xl font-serif font-bold mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-white/90 mb-4">
                    {collection.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-white underline underline-offset-4">
                    Explorar colección
                    <ChevronRightIcon className="w-5 h-5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============= CATEGORÍAS =============
function CategoryShowcase() {
  const categories = [
    { name: 'Vestidos', img: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800&auto=format&fit=crop', link: '/vestidos' },
    { name: 'Pantalones', img: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop', link: '/pantalones' },
    { name: 'Conjuntos', img: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800&auto=format&fit=crop', link: '/vestidos' },
    { name: 'Bodys', img: 'https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?q=80&w=800&auto=format&fit=crop', link: '/vestidos' }
  ]

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-rose-50 via-white to-rose-50/30 overflow-hidden" aria-labelledby="category-title">
      {/* Círculos decorativos múltiples */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-radial-rose rounded-full opacity-25 animate-pulse-soft pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/3 w-56 h-56 bg-gradient-radial-rose rounded-full opacity-20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 id="category-title" className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 animate-fade-in">
            Explora por categoría
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in">
            Encuentra el estilo perfecto para ti
          </p>
          {/* Línea decorativa rosa */}
          <div className="w-24 h-1 bg-gradient-rose mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.link}
              className="group relative h-64 md:h-80 rounded-xl overflow-hidden shadow-md hover:shadow-rose-lg transition-all duration-500"
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${cat.img})` }}
              />
              
              {/* Overlay con tinte rosa */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-rose-900/10 to-transparent group-hover:from-rose-900/30 transition-all duration-500" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-2">
                  {cat.name}
                </h3>
                <ChevronRightIcon className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
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
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-white to-rose-50 overflow-hidden">
      {/* Círculos decorativos */}
      <div className="absolute top-20 right-20 w-80 h-80 bg-gradient-radial-rose rounded-full opacity-15 pointer-events-none"></div>
      <div className="absolute bottom-10 left-20 w-60 h-60 bg-gradient-radial-rose rounded-full opacity-10 animate-pulse-soft pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-rose-md hover:shadow-rose-xl transition-all duration-500 group">
            <img
              src="/imagenes/vestidos/vestido_suplex01/azul_adelante.png"
              alt="Vestido Suplex Moderno"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            {/* Overlay rosa sutil */}
            <div className="absolute inset-0 bg-rose/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Content */}
          <div>
            <p className="text-rose text-sm uppercase tracking-wide mb-2">
              Producto destacado
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
              VESTIDO SUPLEX MODERNO
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Vestido moderno confeccionado en suplex de alta calidad. Ajuste perfecto al cuerpo 
              con diseño versátil y elegante. Ideal para cualquier ocasión, desde eventos casuales 
              hasta reuniones formales. Comodidad y estilo en una sola prenda.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose mt-2 flex-shrink-0"></span>
                <span className="text-gray-700"><strong>Tela:</strong> Suplex de alta calidad</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose mt-2 flex-shrink-0"></span>
                <span className="text-gray-700"><strong>Corte:</strong> Ajuste perfecto y moderno</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose mt-2 flex-shrink-0"></span>
                <span className="text-gray-700"><strong>Tallas:</strong> S a L</span>
              </li>
            </ul>
            <Link to="/producto/vestido-suplex-moderno" className="btn-primary">
              Ver detalles completos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============= SOCIAL FAVORITES (Simplified) =============
function SocialFavorites() {
  const favorites = [
    { id: 'vestido-suplex-moderno', name: 'Vestido Suplex Moderno', image: '/imagenes/vestidos/vestido_suplex01/negro_adelante.png', collection: 'Colección Suplex' },
    { id: 'vestido-lame-elegante', name: 'Vestido Lame Elegante', image: '/imagenes/vestidos/vestido_lame01/azul_adelante.png', collection: 'Elegancia Premium' },
    { id: 'pantalon-scuba-vena', name: 'Pantalón Scuba Vena', image: '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_vino_adelante.png', collection: 'Scuba Collection' },
  ]

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-white to-gray-50" aria-labelledby="social-title">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 id="social-title" className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Favoritos de Instagram
          </h2>
          <p className="text-lg text-gray-600">
            Las prendas que más aman nuestras clientas en redes sociales
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <Link
              key={item.id}
              to={`/producto/${item.id}`}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform">
                <h3 className="text-xl font-semibold mb-1">{item.collection}</h3>
                <span className="text-sm underline">Aprende más</span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://www.facebook.com/profile.php?id=61555283742078"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07C1.86 17.12 5.57 21.25 10.38 22v-7.01H7.9v-2.92h2.48V9.41c0-2.45 1.46-3.8 3.7-3.8 1.07 0 2.18.19 2.18.19v2.4h-1.23c-1.21 0-1.59.75-1.59 1.52v1.82h2.71l-.43 2.92h-2.28V22c4.81-.75 8.52-4.88 8.52-9.93z"/>
            </svg>
            Síguenos en Facebook
          </a>
        </div>
      </div>
    </section>
  )
}

// ============= BLOG =============
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
    <section className="relative py-12 md:py-16 lg:py-20 bg-white overflow-hidden" aria-labelledby="blog-title">
      {/* Círculos decorativos */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-radial-rose rounded-full opacity-20 animate-float pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-gradient-radial-rose rounded-full opacity-15 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 id="blog-title" className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 animate-fade-in">
            Blog y Novedades
          </h2>
          <p className="text-lg text-gray-600 animate-fade-in">
            Consejos de moda, tendencias y guías de estilo
          </p>
          {/* Línea decorativa */}
          <div className="w-24 h-1 bg-gradient-rose mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <article key={post.title} className="group animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
              {/* Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4 shadow-md group-hover:shadow-rose-lg transition-all duration-500">
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                {/* Overlay rosa sutil en hover */}
                <div className="absolute inset-0 bg-rose/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <time className="text-sm text-gray-500">{post.date}</time>
              <h3 className="text-xl font-semibold text-gray-900 mt-2 mb-3 group-hover:text-rose transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <Link
                to="/vestidos"
                className="inline-flex items-center gap-2 text-rose font-medium hover:gap-3 transition-all"
              >
                Leer más
                <ChevronRightIcon className="w-4 h-4" />
              </Link>
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
    <>
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
    </>
  )
}
