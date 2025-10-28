import { Link } from 'react-router-dom'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

export default function ProductCard({ product, showSizes = true }) {
  const { id, name, image, badge, category } = product
  
  return (
    <article className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-rose-lg transition-all duration-500">
      {/* Badge */}
      {badge && (
        <span className={`absolute top-3 left-3 z-10 px-3 py-1 text-xs font-semibold rounded-full shadow-md ${
          badge === 'Nuevo' 
            ? 'bg-green-500 text-white' 
            : 'bg-rose text-white'
        }`}>
          {badge}
        </span>
      )}

      {/* Image */}
      <Link 
        to={`/producto/${id}`} 
        className="block aspect-[3/4] overflow-hidden bg-gray-100"
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </Link>

      {/* Info */}
      <div className="p-4">
        {/* Category */}
        {category && (
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {category}
          </p>
        )}
        
        {/* Name */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          <Link 
            to={`/producto/${id}`} 
            className="hover:text-rose transition-colors"
          >
            {name}
          </Link>
        </h3>

        {/* Sizes */}
        {showSizes && (
          <div className="mb-4">
            <div className="flex items-center gap-2">
              {['S', 'M', 'L'].map((size) => (
                <button
                  key={size}
                  className="w-10 h-10 rounded-lg border-2 border-rose/30 hover:border-rose hover:bg-rose hover:text-white transition-all duration-300 hover:scale-110 font-semibold text-sm"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Link
          to={`/producto/${id}`}
          className="w-full inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 hover:shadow-rose transition-all duration-300 group/btn"
        >
          <ShoppingCartIcon className="h-5 w-5 group-hover/btn:scale-110 transition-transform" />
          Ver detalles
        </Link>
      </div>
    </article>
  )
}
