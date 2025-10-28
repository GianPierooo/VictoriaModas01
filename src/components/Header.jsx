import { Fragment, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Dialog, Transition, Menu } from '@headlessui/react'
import { 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  PhoneIcon,
  QuestionMarkCircleIcon,
  UserGroupIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import { useCart } from '../context/CartContext.jsx'
import SearchModal from './SearchModal.jsx'
import CartNotification from './CartNotification.jsx'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { items, showNotification, closeNotification } = useCart()
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0)
  const isCartPage = location.pathname === '/carrito'
  const isHomePage = location.pathname === '/'
  
  // Links de navegación principal
  const navigation = [
    { name: 'INICIO', href: '/' },
    { name: 'BLUSAS', href: '/blusas' },
    { name: 'PANTALONES', href: '/pantalones' },
    { name: 'ABRIGOS', href: '/abrigos' },
    { name: 'VESTIDOS', href: '/vestidos' },
  ]

  // Links del menú móvil con iconos
  const mobileNavigation = [
    { name: 'Inicio', href: '/', icon: HomeIcon },
    { name: 'Blusas', href: '/blusas', icon: HomeIcon },
    { name: 'Pantalones', href: '/pantalones', icon: HomeIcon },
    { name: 'Abrigos', href: '/abrigos', icon: HomeIcon },
    { name: 'Vestidos', href: '/vestidos', icon: HomeIcon },
  ]

  const supportLinks = [
    { name: 'Nosotros', href: '/nosotros', icon: UserGroupIcon },
    { name: 'Contacto', href: '/contacto', icon: PhoneIcon },
    { name: 'Preguntas Frecuentes', href: '/preguntas-frecuentes', icon: QuestionMarkCircleIcon },
  ]

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Atajo de teclado para búsqueda (Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Cerrar menú móvil al navegar
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      {/* Skip to content (accesibilidad) */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-rose text-white px-4 py-2 rounded-md"
      >
        Saltar al contenido principal
      </a>
      
      {/* Header */}
      <header 
        className={`fixed top-8 left-0 right-0 z-40 w-full transition-all duration-300 ${
          scrolled 
            ? 'bg-rose/30 backdrop-blur-md shadow-lg' 
            : isHomePage
              ? 'bg-transparent'
              : 'bg-rose/30 backdrop-blur-sm'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link 
              to="/" 
              className={`group text-2xl font-serif font-bold transition-all duration-300 ${
                scrolled || !isHomePage ? 'text-gray-900' : 'text-white drop-shadow-lg'
              } hover:text-rose`}
            >
              <span className="inline-block transition-all duration-300 group-hover:rotate-12 group-hover:scale-125">✨</span>
              {' '}VictoriaModas
            </Link>
          </div>

          {/* Botón hamburguesa (mobile) */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center rounded-md p-2.5 transition-all ${
                scrolled || !isHomePage 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10 drop-shadow-lg'
              }`}
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menú de navegación"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navegación desktop */}
          <div className="hidden lg:flex lg:gap-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-300 ${
                  location.pathname === item.href
                    ? 'text-rose border-b-2 border-rose'
                    : scrolled || !isHomePage
                      ? 'text-gray-700 hover:text-rose'
                      : 'text-white drop-shadow-md hover:text-rose-200 hover:scale-105'
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Dropdown APOYO (Desktop) */}
            <Menu as="div" className="relative">
              <Menu.Button 
                className={`inline-flex items-center gap-1 text-sm font-medium transition-all duration-300 ${
                  scrolled || !isHomePage
                    ? 'text-gray-700 hover:text-rose'
                    : 'text-white drop-shadow-md hover:text-rose-200 hover:scale-105'
                }`}
              >
                APOYO
                <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
              </Menu.Button>
              
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {supportLinks.map((item) => (
                      <Menu.Item key={item.name}>
                        {({ active }) => (
                          <Link
                            to={item.href}
                            className={`${
                              active ? 'bg-gray-100' : ''
                            } group flex items-center gap-2 px-4 py-2 text-sm text-gray-700`}
                          >
                            <item.icon className="h-5 w-5 text-gray-400 group-hover:text-rose" />
                            {item.name}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>

          {/* Iconos de acción (desktop) */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            {/* Búsqueda */}
            <button
              onClick={() => setSearchOpen(true)}
              className={`p-2 rounded-md transition-all duration-300 ${
                scrolled || !isHomePage
                  ? 'text-gray-600 hover:text-rose hover:bg-gray-100'
                  : 'text-white hover:text-rose-200 hover:bg-white/10 drop-shadow-lg hover:scale-110'
              }`}
              aria-label="Buscar productos (Ctrl+K)"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
            
            {/* Mi cuenta */}
            <Link 
              to="/mi-cuenta" 
              className={`p-2 rounded-md transition-all duration-300 ${
                scrolled || !isHomePage
                  ? 'text-gray-600 hover:text-rose hover:bg-gray-100'
                  : 'text-white hover:text-rose-200 hover:bg-white/10 drop-shadow-lg hover:scale-110'
              }`}
              aria-label="Mi cuenta de usuario"
            >
              <UserIcon className="h-6 w-6" />
            </Link>
            
            {/* Carrito */}
            <Link 
              to="/carrito" 
              className={`relative p-2 rounded-md transition-all duration-300 ${
                scrolled || !isHomePage
                  ? 'text-gray-600 hover:text-rose hover:bg-gray-100'
                  : 'text-white hover:text-rose-200 hover:bg-white/10 drop-shadow-lg hover:scale-110'
              }`}
              aria-label={`Carrito de compras${cartCount > 0 ? ` (${cartCount} producto${cartCount !== 1 ? 's' : ''})` : ' (vacío)'}`}
            >
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      {/* Menú móvil (Headless UI Dialog) */}
      <Transition show={mobileMenuOpen} as={Fragment}>
        <Dialog onClose={setMobileMenuOpen} className="lg:hidden">
          {/* Backdrop */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 z-40" />
          </Transition.Child>

          {/* Panel */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              {/* Header del menú */}
              <div className="flex items-center justify-between">
                <Link to="/" className="text-xl font-serif font-bold text-gray-900">
                  <span>✨</span> VictoriaModas
                </Link>
                <button
                  type="button"
                  className="rounded-md p-2.5 text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Cerrar menú</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              
              {/* Navegación móvil */}
              <div className="mt-6 flow-root">
                <div className="space-y-2 py-6">
                  {/* Navegación principal */}
                  <div className="space-y-1">
                    {mobileNavigation.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="group flex items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50"
                        >
                          <Icon className="h-5 w-5 text-gray-400 group-hover:text-rose" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Separador */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Apoyo */}
                  <div className="space-y-1">
                    <p className="px-3 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                      Apoyo
                    </p>
                    {supportLinks.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="group flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50"
                        >
                          <Icon className="h-5 w-5 text-gray-400 group-hover:text-rose" />
                          {item.name}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Separador */}
                  <div className="border-t border-gray-200 my-4"></div>

                  {/* Acciones rápidas */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/mi-cuenta"
                      className="flex flex-col items-center justify-center gap-2 rounded-lg bg-gray-100 px-4 py-4 text-sm font-medium text-gray-900 hover:bg-gray-200 transition-colors"
                    >
                      <UserIcon className="h-6 w-6" />
                      Mi Cuenta
                    </Link>
                    <Link
                      to="/carrito"
                      className="relative flex flex-col items-center justify-center gap-2 rounded-lg bg-rose text-white px-4 py-4 text-sm font-medium hover:bg-rose-dark transition-colors"
                    >
                      <ShoppingCartIcon className="h-6 w-6" />
                      Carrito
                      {cartCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-white text-rose text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer del menú móvil */}
              <div className="border-t border-gray-200 pt-6 mt-6">
                <p className="text-center text-sm text-gray-500">
                  <span className="inline-block">✨</span> VictoriaModas © 2025
                </p>
                <p className="text-center text-xs text-gray-400 mt-1">
                  Moda elegante y minimalista
                </p>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>

      {/* Modal de búsqueda */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
      />
      
      {/* Notificación de carrito */}
      {!isCartPage && (
        <CartNotification 
          isOpen={showNotification}
          onClose={closeNotification}
          cartItems={items}
        />
      )}
    </>
  )
}
