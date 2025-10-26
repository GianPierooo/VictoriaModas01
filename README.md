# VictoriaModas - Tienda de Moda Femenina

Sitio web de e-commerce para VictoriaModas, una tienda de ropa femenina que combina elegancia, modernidad y versatilidad.

## 🌟 Características

### Página Principal Mejorada
- **Banner de Anuncios Rotativo**: Promociones y ofertas destacadas que rotan automáticamente
- **Hero Full-Screen**: Slider automático con imágenes impactantes y CTAs prominentes
- **Productos Destacados**: Sección de "Más Vendidos" con badges (Nuevo, Descuento, Best Seller)
- **Colecciones Visuales**: Grandes imágenes con overlays para destacar colecciones
- **Categorías Interactivas**: Grid de categorías con efectos hover elegantes
- **Producto Spotlight**: Sección dedicada a producto destacado con storytelling
- **Social Proof**: "Favoritos de Instagram" con integración visual
- **Blog y Novedades**: Artículos de moda y tendencias

### Catálogo de Productos
- 6 categorías: Pantalones, Vestidos, Casacas, Sacones, Conjuntos, Bodys
- Información detallada de telas premium (scuba, suplex, seda francesa, etc.)
- Sistema de navegación intuitivo

### Sistema de Carrito
- Persistencia con localStorage
- Gestión de cantidades
- Resumen de compra
- Context API para estado global

### Diseño y Estilo
- **Paleta de colores**: Rosa cuarzo (#f7cac9), Negro, Blanco
- **Tipografía**: Bodoni Moda (títulos) + Roboto Flex (texto)
- **Estilo**: Minimalista, elegante y moderno
- **Responsive**: Totalmente adaptable a móviles y tablets

## 🛠️ Tecnologías

- **React 19** - Framework principal
- **Vite 7** - Build tool y dev server
- **React Router DOM 6** - Navegación SPA
- **Context API** - Gestión de estado del carrito
- **CSS Modules** - Estilos organizados y modulares

## 🚀 Instalación y Uso

```bash
# Instalar dependencias
npm install

# Modo desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview

# Linting
npm run lint
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.jsx          # Navegación principal
│   ├── Header.css
│   └── Footer.jsx          # Footer con redes sociales
├── context/
│   └── CartContext.jsx     # Estado global del carrito
├── pages/
│   ├── HomePage.jsx        # Página principal (mejorada)
│   ├── HomePage.css        # Estilos de la home
│   ├── CatalogPage.jsx     # Catálogo de productos
│   ├── ProductPage.jsx     # Detalle de producto
│   ├── AboutPage.jsx       # Nosotros
│   ├── ContactPage.jsx     # Contacto
│   └── CartPage.jsx        # Carrito de compras
├── App.css                 # Estilos globales
├── index.css               # CSS base y variables
└── main.jsx                # Entry point
```

## 🎨 Productos Disponibles

1. **Pantalón Wide-Leg Scuba** - S/ 149.90
2. **Vestido Midi Seda Francesa** - S/ 189.90
3. **Conjunto Angora Premium** - S/ 249.90
4. **Body Moldeador Suplex** - S/ 89.90
5. **Vestido Victoria** - S/ 229.90 (Producto destacado)

## 📝 Características de la Nueva HomePage

### 1. Banner de Anuncios
- Rotación automática cada 3.5 segundos
- Mensajes promocionales destacados
- Diseño minimalista

### 2. Hero Mejorado
- Slider full-screen con 3 slides
- Auto-play cada 5 segundos
- Navegación manual con botones
- Overlays con degradados elegantes
- CTAs prominentes

### 3. Productos Destacados
- Grid responsive (4→3→2→1 columnas)
- Badges de estado (Nuevo, -25%, Best Seller)
- Efectos hover suaves
- Precios con descuentos visibles
- Links directos a productos

### 4. Colecciones Visuales
- Imágenes grandes de impacto
- Overlays con información
- Efectos de zoom en hover
- CTAs integrados

### 5. Categorías Showcase
- Grid de 4 categorías principales
- Overlays interactivos
- Animaciones suaves
- Enlaces directos al catálogo

### 6. Producto Spotlight
- Sección dedicada con storytelling
- Imagen destacada
- Descripción detallada
- Características en lista
- Precio prominente

### 7. Social Proof
- "Favoritos de Instagram"
- Contador de likes
- Grid de 3 productos
- Overlay con interacción

### 8. Blog Mejorado
- Cards con imágenes
- Fechas de publicación
- Extractos de artículos
- Links de "Leer más"

## 🎯 Inspiración de Diseño

El diseño está inspirado en sitios de moda premium como:
- [Cinderella's Touch](https://www.cinderellastouch.com/es)
- COS
- ME+EM
- Dior
- Mango

## 📱 Responsive Design

- **Desktop**: Experiencia completa con todos los elementos
- **Tablet**: Grid adaptativo y navegación optimizada
- **Mobile**: Diseño vertical optimizado, hero adaptado

## 🎨 Mejoras Visuales Completas

### Todas las Páginas Mejoradas ✅
- **HomePage**: 8 secciones dinámicas con rosa y elementos minimalistas
- **CatalogPage**: Hero header + 6 categorías con overlays rosa
- **AboutPage**: Historia + valores de marca con círculos decorativos
- **ContactPage**: Formulario elegante + contact card rosa gradient
- **CartPage**: Estado vacío + resumen con cálculo de envío

### Elementos Decorativos Minimalistas
- **24+ círculos decorativos** sutiles
- **Líneas gradient rosa** en headers y separadores
- **18+ gradientes** rosa cuarzo en fondos y botones
- **Overlays rosa** semi-transparentes en imágenes
- **Sombras rosa** en todos los elementos interactivos

### Archivos CSS Creados
1. `HomePage.css` (541 líneas)
2. `CatalogPage.css` (223 líneas)
3. `AboutPage.css` (345 líneas)
4. `ContactPage.css` (298 líneas)
5. `CartPage.css` (356 líneas)

**Total: 1,763 líneas de CSS nuevo** 🎨

---

## 🔄 Próximas Mejoras

- [ ] Integración con backend real
- [ ] Sistema de autenticación
- [ ] Pasarela de pagos
- [ ] Filtros avanzados en catálogo
- [ ] Wishlist/Favoritos
- [ ] Reviews de productos
- [ ] Newsletter signup
- [ ] Menú móvil hamburguesa
- [ ] Lazy loading de imágenes
- [ ] Optimización WebP

---

## 📚 Documentación Adicional

- `MEJORAS_IMPLEMENTADAS.md` - Resumen de mejoras iniciales HomePage
- `MEJORAS_COLOR_MINIMALISTA.md` - Análisis de paleta rosa y minimalismo
- `MEJORAS_COMPLETAS_TODAS_PAGINAS.md` - Resumen ejecutivo de todas las páginas

---

## 📄 Licencia

Proyecto privado - VictoriaModas © 2025
