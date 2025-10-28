import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { TrashIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Layout from '../components/Layout.jsx'
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsappUtils.js'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totals, clearCart } = useCart()

  return (
    <Layout>
      <div className="bg-gray-50 pb-8 md:pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-2">
              Carrito de Compras
            </h1>
            <p className="text-gray-600">
              {items.length > 0 
                ? `Tienes ${items.length} ${items.length === 1 ? 'producto' : 'productos'} en tu carrito` 
                : 'Tu carrito está vacío'}
            </p>
          </div>

          {/* Empty State */}
          {items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="max-w-md mx-auto">
                <ShoppingBagIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
                  Tu carrito está vacío
                </h2>
                <p className="text-gray-600 mb-8">
                  ¡Descubre nuestras colecciones y encuentra prendas que te encantarán!
                </p>
                <Link to="/vestidos" className="btn-primary">
                  Explorar productos
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <div 
                    key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${index}`} 
                    className="bg-white rounded-lg shadow-sm p-4 md:p-6"
                  >
                    <div className="flex gap-4 md:gap-6">
                      {/* Image */}
                      <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {item.name}
                        </h3>
                        
                        {/* Attributes */}
                        {(item.selectedColor || item.selectedSize) && (
                          <div className="flex flex-wrap gap-2 mb-3 text-sm">
                            {item.selectedColor && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                                Color: {item.selectedColor}
                              </span>
                            )}
                            {item.selectedSize && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                                Talla: {item.selectedSize}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          {/* Quantity */}
                          <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-600 mr-2">
                              Cantidad:
                            </label>
                            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                              <button
                                onClick={() => updateQuantity(index, Math.max(1, item.quantity - 1))}
                                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                                aria-label="Disminuir cantidad"
                              >
                                −
                              </button>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(index, Math.max(1, Number(e.target.value)))}
                                className="w-16 text-center py-1 border-x border-gray-300 focus:outline-none focus:ring-2 focus:ring-rose"
                              />
                              <button
                                onClick={() => updateQuantity(index, item.quantity + 1)}
                                className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition-colors"
                                aria-label="Aumentar cantidad"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Remove */}
                          <button 
                            onClick={() => removeItem(index)}
                            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                            aria-label={`Eliminar ${item.name}`}
                          >
                            <TrashIcon className="w-5 h-5" />
                            Eliminar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Resumen del Pedido
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-600">
                      <span>Artículos</span>
                      <span>
                        {items.reduce((sum, it) => sum + it.quantity, 0)} {items.reduce((sum, it) => sum + it.quantity, 0) === 1 ? 'artículo' : 'artículos'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* WhatsApp Button */}
                    <button 
                      onClick={() => {
                        const message = generateWhatsAppMessage(items)
                        openWhatsApp(message)
                      }}
                      disabled={items.length === 0}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>📱</span>
                      Enviar pedido por WhatsApp
                    </button>

                    {/* Clear Cart */}
                    <button 
                      onClick={clearCart}
                      disabled={items.length === 0}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      aria-label="Vaciar carrito"
                    >
                      Vaciar Carrito
                    </button>
                  </div>

                  {/* Note */}
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      💬 Te contactaremos por WhatsApp para confirmar tu pedido y coordinar la entrega.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
