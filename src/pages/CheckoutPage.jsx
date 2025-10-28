import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'
import Layout from '../components/Layout.jsx'
import { generateWhatsAppMessage, openWhatsApp } from '../utils/whatsappUtils.js'

export default function CheckoutPage() {
  const { items } = useCart()
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
    metodoEnvio: 'domicilio',
    metodoPago: 'efectivo',
    comentarios: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    
    // Generar mensaje
    let message = "¡Hola! Me gustaría hacer un pedido en VictoriaModas.\n\n"
    
    message += "👤 *INFORMACIÓN DEL CLIENTE:*\n"
    message += `Nombre: ${formData.nombre} ${formData.apellidos}\n`
    message += `Teléfono: ${formData.telefono}\n`
    message += `Email: ${formData.email}\n`
    message += `Dirección: ${formData.direccion}\n`
    message += `Método de envío: ${formData.metodoEnvio === 'domicilio' ? 'Envío a domicilio' : 'Recojo en tienda'}\n`
    message += `Método de pago: ${formData.metodoPago}\n`
    if (formData.comentarios) {
      message += `Comentarios: ${formData.comentarios}\n`
    }
    message += "\n"
    
    message += "📋 *PRODUCTOS SOLICITADOS:*\n\n"
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`
      message += `   Cantidad: ${item.quantity}\n`
      if (item.selectedSize) message += `   Talla: ${item.selectedSize}\n`
      if (item.selectedColor) message += `   Color: ${item.selectedColor}\n`
      message += "\n"
    })

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
    message += `📦 *Total de artículos: ${totalItems}*\n\n`
    message += "💬 *Por favor, confírmame la disponibilidad y coordinar la entrega.*\n\n"
    message += "¡Gracias! 🙏"

    openWhatsApp(message)
  }

  return (
    <Layout>
      <div className="bg-gray-50 py-8 md:py-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/carrito" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              Volver al carrito
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900">
              Finalizar Compra
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleWhatsAppSubmit} className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Información del Pedido
                  </h2>
                  <p className="text-gray-600">
                    Completa tus datos y enviaremos tu pedido por WhatsApp para coordinar la entrega.
                  </p>
                </div>
                  
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      placeholder="Tu nombre"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-2">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      value={formData.apellidos}
                      onChange={handleInputChange}
                      placeholder="Tus apellidos"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Contact */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      placeholder="999999999"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@ejemplo.com"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-6">
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección de entrega *
                  </label>
                  <textarea
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder="Dirección completa para la entrega"
                    rows="3"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                  />
                </div>

                {/* Shipping & Payment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="metodoEnvio" className="block text-sm font-medium text-gray-700 mb-2">
                      Método de envío
                    </label>
                    <select
                      id="metodoEnvio"
                      name="metodoEnvio"
                      value={formData.metodoEnvio}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                    >
                      <option value="domicilio">Envío a domicilio</option>
                      <option value="tienda">Recojo en tienda</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="metodoPago" className="block text-sm font-medium text-gray-700 mb-2">
                      Método de pago
                    </label>
                    <select
                      id="metodoPago"
                      name="metodoPago"
                      value={formData.metodoPago}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                    >
                      <option value="efectivo">Efectivo</option>
                      <option value="yape">Yape</option>
                      <option value="transferencia">Transferencia</option>
                    </select>
                  </div>
                </div>

                {/* Comments */}
                <div className="mb-8">
                  <label htmlFor="comentarios" className="block text-sm font-medium text-gray-700 mb-2">
                    Comentarios adicionales (opcional)
                  </label>
                  <textarea
                    id="comentarios"
                    name="comentarios"
                    value={formData.comentarios}
                    onChange={handleInputChange}
                    placeholder="Cualquier información adicional sobre tu pedido"
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                  />
                </div>

                {/* Submit */}
                <button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-colors flex items-center justify-center gap-3"
                >
                  <span>📱</span>
                  Enviar pedido por WhatsApp
                </button>
              </form>
            </div>

            {/* Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Resumen del Pedido
                </h3>
                
                {/* Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        {item.selectedColor && (
                          <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
                        )}
                        {item.selectedSize && (
                          <p className="text-xs text-gray-500">Talla: {item.selectedSize}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-gray-600 mb-2">
                    <span>Artículos</span>
                    <span>{items.reduce((sum, item) => sum + item.quantity, 0)} artículos</span>
                  </div>
                </div>

                {/* WhatsApp Info */}
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex gap-3">
                    <span className="text-2xl flex-shrink-0">💬</span>
                    <p className="text-sm text-green-900">
                      Te contactaremos por WhatsApp para confirmar tu pedido y coordinar la entrega.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
