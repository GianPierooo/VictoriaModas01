import { SparklesIcon, HeartIcon, CubeIcon } from '@heroicons/react/24/outline'
import Layout from '../components/Layout.jsx'

export default function AboutPage() {
  const values = [
    {
      icon: SparklesIcon,
      title: 'Elegancia',
      description: 'Diseños minimalistas que realzan la belleza natural de cada mujer con sofisticación atemporal.'
    },
    {
      icon: HeartIcon,
      title: 'Calidad Premium',
      description: 'Telas exclusivas seleccionadas cuidadosamente: scuba, suplex, seda francesa y angora.'
    },
    {
      icon: CubeIcon,
      title: 'Exclusividad',
      description: 'Colecciones limitadas confeccionadas con pasión y atención al detalle en cada puntada.'
    }
  ]

  const stats = [
    { number: '5+', label: 'Años de experiencia' },
    { number: '1000+', label: 'Clientes satisfechas' },
    { number: '500+', label: 'Diseños únicos' }
  ]

  return (
    <Layout>
        {/* Hero */}
        <div className="relative h-56 md:h-72 bg-gradient-to-r from-rose via-rose-100 to-rose-50 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full blur-3xl animate-pulse-soft"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-dark/20 rounded-full blur-3xl animate-float"></div>
          
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-4 animate-fade-in">
                <span className="text-white drop-shadow-lg">Nuestra</span>
                <span className="text-gray-900"> Historia</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-800 font-medium max-w-2xl">
                Más que moda, creamos experiencias que empoderan a la mujer moderna
              </p>
              <div className="w-24 h-1 bg-white/80 mt-4 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl md:text-5xl font-serif font-bold text-rose mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm md:text-base text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Content */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop"
                  alt="Esencia de VictoriaModas"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900">
                  VictoriaModas
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    Nacimos con la misión de ofrecer moda femenina que combine <strong className="text-gray-900">elegancia, modernidad y versatilidad</strong>. 
                    Creemos en el poder de la simplicidad y en la calidad incomparable de las telas premium como scuba, 
                    suplex, lame, seda francesa, peluche, paño carnero y angora.
                  </p>
                  <p>
                    Nuestra filosofía es vestir a la mujer contemporánea con prendas <strong className="text-gray-900">atemporales, cómodas y 
                    cuidadosamente confeccionadas</strong>, inspiradas en un estilo minimalista y sofisticado que 
                    trasciende las tendencias pasajeras.
                  </p>
                  <p>
                    Cada colección es diseñada pensando en ti: la mujer que valora la calidad, aprecia los detalles 
                    y busca expresar su personalidad a través de la moda con refinamiento y confianza.
                  </p>
                </div>
                <div className="p-6 bg-rose-50 rounded-lg border-l-4 border-rose">
                  <p className="text-gray-700">
                    Gracias por confiar en VictoriaModas. Diseñamos cada colección con pasión y detalle 
                    para acompañarte en cada momento importante de tu vida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
                Nuestros Valores
              </h2>
              <p className="text-lg text-gray-600">
                Los pilares que definen nuestra esencia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon
                return (
                  <div key={index} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-rose" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
    </Layout>
  )
}
