import { UserCircleIcon, ShoppingBagIcon, HeartIcon, CogIcon } from '@heroicons/react/24/outline'
import Layout from '../components/Layout.jsx'

export default function AccountPage() {
  const menuItems = [
    { icon: UserCircleIcon, label: 'Mi Perfil', href: '#' },
    { icon: ShoppingBagIcon, label: 'Mis Pedidos', href: '#' },
    { icon: HeartIcon, label: 'Lista de Deseos', href: '#' },
    { icon: CogIcon, label: 'Configuración', href: '#' },
  ]

  return (
    <Layout>
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-8">
            Mi Cuenta
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <a
                  key={idx}
                  href={item.href}
                  className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4 group-hover:bg-rose group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6 text-rose group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.label}
                  </h3>
                </a>
              )
            })}
          </div>

          {/* Placeholder */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-12 text-center">
            <UserCircleIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">
              Funcionalidad en Desarrollo
            </h2>
            <p className="text-gray-600 mb-8">
              Pronto podrás gestionar tu cuenta, ver tus pedidos y más.
            </p>
            <a href="/vestidos" className="btn-primary">
              Explorar productos
            </a>
          </div>
        </div>
      </div>
    </Layout>
  )
}
