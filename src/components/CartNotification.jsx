import { Link } from 'react-router-dom'
import { XMarkIcon, ShoppingCartIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'

export default function CartNotification({ isOpen, onClose, cartItems }) {
  if (!isOpen) return null
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="fixed top-20 right-4 z-50 w-full max-w-sm bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-white border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-rose flex items-center justify-center">
            <ShoppingCartIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              Mi Carrito
            </p>
            <p className="text-xs text-gray-500">{totalItems} producto{totalItems !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button 
          className="p-1 hover:bg-gray-100 rounded-md transition-colors" 
          onClick={onClose}
          aria-label="Cerrar carrito"
        >
          <XMarkIcon className="w-5 h-5 text-gray-500" />
        </button>
      </div>
      
      {/* Body */}
      <div className="max-h-96 overflow-y-auto p-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCartIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-600 font-medium">Tu carrito está vacío</p>
            <p className="text-sm text-gray-400 mt-1">Agrega productos para comenzar</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item, index) => (
              <div key={`${item.id}-${index}`} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-16 h-16 flex-shrink-0 bg-white rounded-md overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    {item.selectedColor && (
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full border border-gray-300" style={{backgroundColor: item.selectedColor.toLowerCase()}}></span>
                        {item.selectedColor}
                      </span>
                    )}
                    {item.selectedSize && (
                      <span className="px-2 py-0.5 bg-gray-200 rounded">
                        {item.selectedSize}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-600">Cantidad: × {item.quantity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <Link 
            to="/carrito" 
            className="w-full flex items-center justify-center gap-2 bg-rose hover:bg-rose-dark text-white px-4 py-3 rounded-full text-sm font-medium transition-colors"
            onClick={onClose}
          >
            <span>Ver carrito completo</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  )
}
