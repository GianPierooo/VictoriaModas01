import { useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Layout from '../components/Layout.jsx'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const faqData = [
    {
      category: 'Pedidos y Envíos',
      icon: '📦',
      questions: [
        {
          question: '¿Cuánto tiempo tarda en llegar mi pedido?',
          answer: 'Los pedidos se procesan en 1-2 días hábiles y el envío tarda entre 3-5 días hábiles dentro de Lima. Para provincias, el tiempo de entrega es de 5-7 días hábiles.'
        },
        {
          question: '¿Cuál es el costo de envío?',
          answer: 'El envío es GRATIS para compras mayores a S/200. Para compras menores, el costo de envío es de S/15 dentro de Lima y S/25 para provincias.'
        },
        {
          question: '¿Puedo cambiar la dirección de envío?',
          answer: 'Sí, puedes cambiar la dirección de envío antes de que el pedido sea procesado. Contacta con nosotros inmediatamente después de realizar tu compra.'
        }
      ]
    },
    {
      category: 'Devoluciones y Cambios',
      icon: '🔄',
      questions: [
        {
          question: '¿Cuál es la política de devoluciones?',
          answer: 'Aceptamos devoluciones hasta 15 días después de recibir el producto. El artículo debe estar en perfecto estado, con etiquetas y sin usar.'
        },
        {
          question: '¿Cómo puedo cambiar una talla?',
          answer: 'Si necesitas cambiar de talla, puedes hacerlo contactándonos dentro de los primeros 7 días. Te enviaremos la talla correcta sin costo adicional.'
        }
      ]
    },
    {
      category: 'Productos y Tallas',
      icon: '👗',
      questions: [
        {
          question: '¿Cómo sé qué talla elegir?',
          answer: 'Tenemos una guía de tallas detallada en cada producto. Si tienes dudas, puedes contactarnos y te ayudaremos a elegir la talla perfecta.'
        },
        {
          question: '¿Qué materiales usan?',
          answer: 'Utilizamos materiales premium como scuba, suplex, seda francesa, peluche, paño carnero y angora. Cada producto especifica el material utilizado.'
        }
      ]
    },
    {
      category: 'Pagos y Facturación',
      icon: '💳',
      questions: [
        {
          question: '¿Qué métodos de pago aceptan?',
          answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard), transferencias bancarias, Yape, Plin y PayPal.'
        },
        {
          question: '¿Es seguro pagar en línea?',
          answer: 'Sí, utilizamos sistemas de pago seguros y encriptados. Tus datos están protegidos y no almacenamos información de tarjetas.'
        }
      ]
    }
  ]

  // Filtrar preguntas por búsqueda
  const filteredFaqData = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <Layout>
        {/* Hero */}
        <div className="relative h-56 md:h-72 bg-gradient-to-r from-rose via-rose-100 to-rose-50 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse-soft"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-dark/20 rounded-full blur-3xl animate-float"></div>
          
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 animate-fade-in">
                <span className="text-white drop-shadow-lg">Preguntas</span>
                <span className="text-gray-900"> Frecuentes</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-800 font-medium">
                Encuentra respuestas a las preguntas más comunes
              </p>
              <div className="w-24 h-1 bg-white/80 mt-4 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Search */}
            <div className="mb-12">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar preguntas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-rose focus:border-transparent"
                />
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-8">
              {filteredFaqData.map((category, catIdx) => (
                <div key={catIdx} className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="text-3xl">{category.icon}</span>
                    {category.category}
                  </h2>
                  
                  <div className="space-y-2">
                    {category.questions.map((item, qIdx) => (
                      <Disclosure key={qIdx}>
                        {({ open }) => (
                          <>
                            <Disclosure.Button className="flex w-full justify-between items-center rounded-lg bg-gray-50 px-4 py-4 text-left text-base font-medium text-gray-900 hover:bg-gray-100 transition-colors">
                              <span>{item.question}</span>
                              <ChevronDownIcon
                                className={`${
                                  open ? 'rotate-180 transform' : ''
                                } h-5 w-5 text-gray-500 transition-transform`}
                              />
                            </Disclosure.Button>
                            <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-600">
                              {item.answer}
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredFaqData.length === 0 && (
              <div className="text-center py-12">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-gray-600">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            )}

            {/* Contact CTA */}
            <div className="mt-12 text-center bg-rose-50 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ¿No encontraste lo que buscabas?
              </h3>
              <p className="text-gray-600 mb-6">
                Contáctanos y estaremos encantados de ayudarte
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://wa.me/51993357672"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  📱 WhatsApp
                </a>
                <a 
                  href="/contacto"
                  className="btn-outline"
                >
                  ✉️ Formulario de contacto
                </a>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  )
}
