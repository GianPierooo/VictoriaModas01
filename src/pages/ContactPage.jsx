import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon,
  BoltIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'
import Layout from '../components/Layout.jsx'

// Configuración de EmailJS
const EMAILJS_CONFIG = {
  serviceId: 'service_kvj4xba',
  templateIdAdmin: 'template_q6s8zef',
  templateIdClient: 'template_9vy0jq9',
  publicKey: 'DcomytfMPeZ2O-AR8'
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = '⚠ Ingresa tu nombre'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = '⚠ Correo inválido'
    if (!form.subject.trim()) next.subject = '⚠ Ingresa un asunto'
    if (form.message.trim().length < 10) next.message = '⚠ El mensaje debe tener al menos 10 caracteres'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    
    setSending(true)
    setSubmitStatus(null)

    try {
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
        to_email: 'victoriamodas1053@gmail.com'
      }

      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateIdAdmin, templateParams, EMAILJS_CONFIG.publicKey)
      await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateIdClient, templateParams, EMAILJS_CONFIG.publicKey)

      setSubmitStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitStatus(null), 5000)
    } catch (error) {
      console.error('Error:', error)
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 5000)
    } finally {
      setSending(false)
    }
  }

  return (
    <Layout>
        {/* Hero */}
        <div className="relative h-56 md:h-72 bg-gradient-to-r from-rose via-rose-100 to-rose-50 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse-soft"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-dark/20 rounded-full blur-3xl animate-float"></div>
          
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 animate-fade-in text-white drop-shadow-lg">
                Contáctanos
              </h1>
              <p className="text-lg md:text-xl text-gray-800 font-medium">
                Estamos aquí para ayudarte. Escríbenos y resolveremos tus dudas
              </p>
              <div className="w-24 h-1 bg-white/80 mt-4 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Envíanos un mensaje
                </h2>
                <p className="text-gray-600 mb-6">
                  Completa el formulario y nos pondremos en contacto contigo a la brevedad.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre completo *
                    </label>
                    <input 
                      id="name" 
                      name="name" 
                      type="text" 
                      value={form.name} 
                      onChange={handleChange}
                      placeholder="Tu nombre"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Correo electrónico *
                    </label>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      value={form.email} 
                      onChange={handleChange}
                      placeholder="correo@ejemplo.com"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Asunto *
                    </label>
                    <input 
                      id="subject" 
                      name="subject" 
                      type="text" 
                      value={form.subject} 
                      onChange={handleChange}
                      placeholder="Asunto de tu mensaje"
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose transition-colors ${
                        errors.subject ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensaje *
                    </label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={form.message} 
                      onChange={handleChange}
                      rows="6"
                      placeholder="Escribe tu mensaje aquí..."
                      className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose transition-colors ${
                        errors.message ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                  </div>

                  <button 
                    type="submit" 
                    disabled={sending}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Enviando...' : 'Enviar mensaje'}
                  </button>

                  {submitStatus === 'success' && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-md">
                      <p className="text-sm text-green-800">
                        ✅ Mensaje enviado correctamente. Te responderemos pronto!
                      </p>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                      <p className="text-sm text-red-800">
                        ❌ Error al enviar. Por favor, intenta de nuevo.
                      </p>
                    </div>
                  )}
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-rose to-rose-dark rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-2xl font-semibold mb-6">Información de Contacto</h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <MapPinIcon className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Dirección</p>
                        <p className="text-white/90 text-sm">
                          Galería Naranja - Puesto 47-48<br />
                          Calle Misti con Huascarán
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <PhoneIcon className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <a href="https://wa.me/51993357672" className="text-white/90 text-sm hover:text-white">
                          +51 993 357 672
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <EnvelopeIcon className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:victoriamodas1053@gmail.com" className="text-white/90 text-sm hover:text-white">
                          victoriamodas1053@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <ClockIcon className="w-6 h-6 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Horario</p>
                        <p className="text-white/90 text-sm">
                          Lun-Sáb: 4:00 AM - 3:00 PM<br />
                          WhatsApp 24/7
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <BoltIcon className="w-6 h-6 text-rose" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Respuesta rápida</h4>
                      <p className="text-sm text-gray-600">En menos de 24 horas</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-rose" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Atención personalizada</h4>
                      <p className="text-sm text-gray-600">Soporte dedicado</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0">
                      <SparklesIcon className="w-6 h-6 text-rose" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Soporte premium</h4>
                      <p className="text-sm text-gray-600">Asesoría de moda</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </Layout>
  )
}
