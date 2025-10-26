import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import AnnouncementBanner from '../components/AnnouncementBanner.jsx'
import '../App.css'
import '../styles/whatsapp.css'
import './ProductPage.css'
import QuantitySelector from '../components/QuantitySelector'

const MOCK_PRODUCTS = {
  'blusa-seda-francesa': {
    name: 'Blusa Seda Francesa',
    price: 129.90,
    originalPrice: 179.90,
    fabric: 'Seda francesa premium',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Azul', 'Negro', 'Plomo'],
    description:
      'Blusa elegante confeccionada en seda francesa premium. Diseño sofisticado y versátil, perfecta para looks casuales y formales. Su tela suave y acabados delicados garantizan comodidad y estilo en cualquier ocasión.',
    images: [
      '/imagenes/blusas/blusa_seda_francesa/blusa_sedafrancesa_delante.png',
      '/imagenes/blusas/blusa_seda_francesa/blusa_sedafrancesa_azul_atras.png',
      '/imagenes/blusas/blusa_seda_francesa/blusa_sedafrancesa_azul_delado.png'
    ],
    colorImages: {
      'Azul': [
        '/imagenes/blusas/blusa_seda_francesa/blusa_sedafrancesa_delante.png',
        '/imagenes/blusas/blusa_seda_francesa/blusa_sedafrancesa_azul_atras.png',
        '/imagenes/blusas/blusa_seda_francesa/blusa_sedafrancesa_azul_delado.png'
      ],
      'Negro': [
        '/imagenes/blusas/blusa_seda_francesa/negro_adelante.png',
        '/imagenes/blusas/blusa_seda_francesa/negro_atras.png',
        '/imagenes/blusas/blusa_seda_francesa/negro_delado.png'
      ],
      'Plomo': [
        '/imagenes/blusas/blusa_seda_francesa/plomo_adelante.png',
        '/imagenes/blusas/blusa_seda_francesa/plomo_atras.png',
        '/imagenes/blusas/blusa_seda_francesa/plomo_delado.png'
      ]
    }
  },
  'vestido-lame-elegante': {
    name: 'Vestido Lame Elegante',
    price: 199.90,
    originalPrice: 249.90,
    fabric: 'Tela lame premium con brillo sutil',
    sizes: ['S', 'M', 'L'],
    colors: ['Plomo', 'Negro', 'Azul', 'Vino'],
    description:
      'Vestido elegante confeccionado en tela lame de alta calidad con brillo sutil y caída impecable. Perfecto para ocasiones especiales, eventos nocturnos o cenas elegantes. Diseño sofisticado disponible en múltiples colores.',
    images: [
      '/imagenes/vestidos/vestido_lame01/vestido_lame_plomo01_adelante.png',
      '/imagenes/vestidos/vestido_lame01/vestido_lame_plomo01_atras.png',
      '/imagenes/vestidos/vestido_lame01/vestido_lame_plomo01_delado.png'
    ],
    colorImages: {
      'Plomo': [
        '/imagenes/vestidos/vestido_lame01/vestido_lame_plomo01_adelante.png',
        '/imagenes/vestidos/vestido_lame01/vestido_lame_plomo01_atras.png',
        '/imagenes/vestidos/vestido_lame01/vestido_lame_plomo01_delado.png'
      ],
      'Negro': [
        '/imagenes/vestidos/vestido_lame01/negro_adelante.png',
        '/imagenes/vestidos/vestido_lame01/negro_atras.png',
        '/imagenes/vestidos/vestido_lame01/negro_delado.png'
      ],
      'Azul': [
        '/imagenes/vestidos/vestido_lame01/azul_adelante.png',
        '/imagenes/vestidos/vestido_lame01/azul_atras.png',
        '/imagenes/vestidos/vestido_lame01/azul_delado.png'
      ],
      'Vino': [
        '/imagenes/vestidos/vestido_lame01/vino_defrente.png',
        '/imagenes/vestidos/vestido_lame01/vino_atras.png',
        '/imagenes/vestidos/vestido_lame01/vino_delado.png'
      ]
    }
  },
  'pantalon-scuba-vena': {
    name: 'Pantalón Scuba Vena',
    price: 20.0,
    originalPrice: 25.0,
    fabric: 'Scuba premium',
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Negro', 'Azul', 'Camello', 'Vino', 'Plomo'],
    description:
      'Pantalón cómodo en tela scuba. Corte wide-leg con caída impecable y comodidad superior. Disponible en múltiples colores.',
    images: [
      '/imagenes/pantalones/pantalon_scuba/Pantalon Scuba_parte_adelante.png',
      '/imagenes/pantalones/pantalon_scuba/Pantalon Scuba_parte_trasera.png',
      '/imagenes/pantalones/pantalon_scuba/Pantalon Scuba_parte_delado.png'
    ],
    colorImages: {
      'Beige': [
        '/imagenes/pantalones/pantalon_scuba/Pantalon Scuba_parte_adelante.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon Scuba_parte_trasera.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon Scuba_parte_delado.png'
      ],
      'Negro': [
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_negro_adelante.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_Scuba_negro_atras.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_Scuba_negro_delado.png'
      ],
      'Azul': [
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_azul_defrente.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_azul_atras.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_azul_delado.png'
      ],
      'Camello': [
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_camello_adelante.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_camello_atras.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_camello_delado.png'
      ],
      'Vino': [
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_vino_adelante.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_vino_atras.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_vino_delado.png'
      ],
      'Plomo': [
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_plomo_adelante.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_plomo_atras.png',
        '/imagenes/pantalones/pantalon_scuba/Pantalon_scuba_plomo_delado.png'
      ]
    }
  },
  'pantalon-scuba-correa': {
    name: 'Pantalón Scuba con Correa',
    price: 22.0,
    originalPrice: 28.0,
    fabric: 'Scuba premium',
    sizes: ['S', 'M', 'L'],
    colors: ['Beach', 'Negro', 'Azul', 'Plomo'],
    description:
      'Pantalón scuba moderno con correa decorativa. Diseño contemporáneo ideal para looks elegantes y casuales. Caída perfecta y máximo confort.',
    images: [
      '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delante_beach.png',
      '/imagenes/pantalones/pantalon_scuba_correa/p_correa_atras_beach.png',
      '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delado_beach.png'
    ],
    colorImages: {
      'Beach': [
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delante_beach.png',
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_atras_beach.png',
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delado_beach.png'
      ],
      'Negro': [
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delante_negro.png',
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_atras_negro.png',
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delado_negro.png'
      ],
      'Azul': [
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delante_azul.png',
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_atras_azul.png',
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delado_azul.png'
      ],
      'Plomo': [
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delante_plomo.png',
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_atras_plomo.png',
        '/imagenes/pantalones/pantalon_scuba_correa/p_correa_delado_plomo.png'
      ]
    }
  },
  'vestido-rit-elegante': {
    name: 'Vestido Rit Elegante',
    price: 249.90,
    originalPrice: 329.90,
    fabric: 'Tela Rit de alta calidad',
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Negro', 'Plomo'],
    description:
      'Vestido elegante confeccionado en tela Rit de primera calidad. Diseño sofisticado y moderno con excelente caída. Perfecto para eventos especiales y ocasiones importantes. Su acabado impecable garantiza un look distinguido.',
    images: [
      '/imagenes/vestidos/vestido_rit02/vestido02_tela_rit_delante.png',
      '/imagenes/vestidos/vestido_rit02/vestido02_tela_rit_atras.png',
      '/imagenes/vestidos/vestido_rit02/vestido02_tela_rit_delado.png'
    ],
    colorImages: {
      'Beige': [
        '/imagenes/vestidos/vestido_rit02/vestido02_tela_rit_delante.png',
        '/imagenes/vestidos/vestido_rit02/vestido02_tela_rit_atras.png',
        '/imagenes/vestidos/vestido_rit02/vestido02_tela_rit_delado.png'
      ],
      'Negro': [
        '/imagenes/vestidos/vestido_rit02/vestido_rit_negro_delante.png',
        '/imagenes/vestidos/vestido_rit02/vestido_rit_negro_atras.png',
        '/imagenes/vestidos/vestido_rit02/vestido_rit_negro_delado.png'
      ],
      'Plomo': [
        '/imagenes/vestidos/vestido_rit02/vestido_rit_plomo_delante.png',
        '/imagenes/vestidos/vestido_rit02/vestido_rit_plomo_atras.png',
        '/imagenes/vestidos/vestido_rit02/vestido_rit_plomo_delado.png'
      ]
    }
  },
  'vestido-suplex-moderno': {
    name: 'Vestido Suplex Moderno',
    price: 159.90,
    originalPrice: 209.90,
    fabric: 'Suplex de alta calidad',
    sizes: ['S', 'M', 'L'],
    colors: ['Azul', 'Blanco', 'Negro', 'Vino'],
    description:
      'Vestido moderno confeccionado en suplex de alta calidad. Ajuste perfecto al cuerpo con diseño versátil y elegante. Ideal para cualquier ocasión, desde eventos casuales hasta reuniones formales. Comodidad y estilo en una sola prenda.',
    images: [
      '/imagenes/vestidos/vestido_suplex01/azul_adelante.png',
      '/imagenes/vestidos/vestido_suplex01/azul_atras.png',
      '/imagenes/vestidos/vestido_suplex01/azul_delado.png'
    ],
    colorImages: {
      'Azul': [
        '/imagenes/vestidos/vestido_suplex01/azul_adelante.png',
        '/imagenes/vestidos/vestido_suplex01/azul_atras.png',
        '/imagenes/vestidos/vestido_suplex01/azul_delado.png'
      ],
      'Blanco': [
        '/imagenes/vestidos/vestido_suplex01/blanco_adelante.png',
        '/imagenes/vestidos/vestido_suplex01/blanco_atras.png',
        '/imagenes/vestidos/vestido_suplex01/blanco_delado.png'
      ],
      'Negro': [
        '/imagenes/vestidos/vestido_suplex01/negro_adelante.png',
        '/imagenes/vestidos/vestido_suplex01/negro_atras.png',
        '/imagenes/vestidos/vestido_suplex01/negro_delado.png'
      ],
      'Vino': [
        '/imagenes/vestidos/vestido_suplex01/vino_adelante.png',
        '/imagenes/vestidos/vestido_suplex01/vino_atras.png',
        '/imagenes/vestidos/vestido_suplex01/vino_delado.png'
      ]
    }
  }
}

export default function ProductPage() {
  const { id } = useParams()
  const product = useMemo(() => {
    if (MOCK_PRODUCTS[id]) {
      return MOCK_PRODUCTS[id]
    }
    // Si no encuentra el producto, mostrar un mensaje de error o redirigir
    console.warn(`Producto no encontrado: ${id}`)
    return MOCK_PRODUCTS['vestido-lame-elegante'] // Fallback específico
  }, [id])
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : null)
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null)
  const [quantity, setQuantity] = useState(1)
  
  // Función para obtener las imágenes según el color seleccionado
  const getCurrentImages = () => {
    if (product.colorImages && selectedColor && product.colorImages[selectedColor]) {
      return product.colorImages[selectedColor]
    }
    return product.images || []
  }
  
  // Función para cambiar color
  const handleColorChange = (color) => {
    setSelectedColor(color)
    setSelectedImage(0) // Resetear a la primera imagen del color seleccionado
  }

  // Función para cambiar talla
  const handleSizeChange = (size) => {
    setSelectedSize(size)
  }

  return (
    <div className="product-page">
      <AnnouncementBanner />
      <Header />

      <main className="product-section" aria-labelledby="product-title">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Inicio</Link>
            <span>/</span>
            <Link to="/vestidos">Productos</Link>
            <span>/</span>
            <span>{product.name}</span>
          </nav>

          <div className="product product-grid">
            <div className="gallery" aria-label="Galería de producto">
              <div className="gallery-main">
                <img 
                  src={getCurrentImages()[selectedImage] || product.images[selectedImage]} 
                  alt={product.name}
                  className="main-image"
                  loading="eager"
                />
              </div>
              <div className="gallery-thumbs" role="list">
                {getCurrentImages().map((src, idx) => (
                  <div 
                    key={idx} 
                    className={`thumb ${idx === selectedImage ? 'active' : ''}`}
                    role="listitem"
                    onClick={() => setSelectedImage(idx)}
                  >
                    <img 
                      src={src} 
                      alt={`${product.name} vista ${idx + 1}`}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="details">
              <div className="product-header">
                <h1 id="product-title" className="product-title">{product.name}</h1>
                <div className="product-rating">
                  <span className="stars">★★★★★</span>
                  <span className="rating-text">(4.8)</span>
                </div>
              </div>

              {/* PRECIOS COMENTADOS TEMPORALMENTE */}
              {/* <div className="price-section">
                <span className="current-price">S/ {product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <>
                    <span className="original-price">S/ {product.originalPrice.toFixed(2)}</span>
                    <span className="discount-badge">
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div> */}

              <p className="description">{product.description}</p>

              <div className="product-options">
                <div className="option-group">
                  <label className="option-label">Talla:</label>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button 
                        key={size} 
                        className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                        onClick={() => handleSizeChange(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="option-group">
                  <label className="option-label">Color:</label>
                  <div className="color-options">
                    {product.colors.map(color => {
                      const colorMap = {
                        'Beige': '#F5E6D3',
                        'Negro': '#2C2C2C',
                        'Azul': '#1E40AF',
                        'Camello': '#C19A6B',
                        'Vino': '#722F37',
                        'Plomo': '#6B7280',
                        'Rosa Palo': '#ffb6c1',
                        'Gris': '#6B7280',
                        'Nude': '#f5deb3',
                        'Blanco': '#fff'
                      }
                      return (
                        <button 
                          key={color} 
                          className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                          style={{
                            backgroundColor: colorMap[color] || '#ddd',
                            border: selectedColor === color ? '2px solid #ffb6c1' : '1px solid #e0e0e0'
                          }}
                          title={color}
                          onClick={() => handleColorChange(color)}
                        />
                      )
                    })}
                  </div>
                </div>

                <div className="option-group">
                  <label className="option-label">Tela:</label>
                  <span className="fabric-info">{product.fabric}</span>
                </div>
              </div>

              <QuantitySelector
                quantity={quantity}
                onQuantityChange={setQuantity}
                min={1}
                max={10}
              />

              <div className="actions">
                <button
                  className="btn-add-cart primary"
                  onClick={() => {
                    // Obtener la imagen del color seleccionado
                    const images = getCurrentImages()
                    const imageToUse = images && images.length > 0 ? images[0] : product.images?.[0]
                    
                    // Agregar al carrito con cantidad como segundo parámetro
                    addItem({
                      id: id || 'pantalon-wide-scuba',
                      name: product.name,
                      price: product.price,
                      image: imageToUse,
                      selectedColor: selectedColor,
                      selectedSize: selectedSize
                    }, quantity)
                  }}
                >
                  <span>🛒</span>
                  Agregar al carrito
                </button>
                <button className="btn-buy-now">
                  <span>⚡</span>
                  Comprar ahora
                </button>
                <button className="btn-wishlist">
                  <span>❤️</span>
                  Agregar a favoritos
                </button>
              </div>

              <div className="product-features">
                <div className="feature">
                  <span className="feature-icon">🚚</span>
                  <div className="feature-text">
                    <strong>Envío gratis</strong>
                    <span>En compras mayores a S/ 150</span>
                  </div>
                </div>
                <div className="feature">
                  <span className="feature-icon">↩️</span>
                  <div className="feature-text">
                    <strong>Devoluciones</strong>
                    <span>30 días para cambiar o devolver</span>
                  </div>
                </div>
                <div className="feature">
                  <span className="feature-icon">🛡️</span>
                  <div className="feature-text">
                    <strong>Garantía</strong>
                    <span>Calidad garantizada</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

