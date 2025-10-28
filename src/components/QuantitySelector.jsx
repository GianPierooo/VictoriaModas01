import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function QuantitySelector({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  max = 99,
  showLabel = true 
}) {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1)
    }
  }

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {showLabel && (
        <label className="text-sm font-medium text-gray-700">
          Cantidad:
        </label>
      )}
      <div className="inline-flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit">
        <button 
          className="flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" 
          onClick={handleDecrease}
          disabled={quantity <= min}
          aria-label="Disminuir cantidad"
        >
          <MinusIcon className="w-4 h-4" />
        </button>
        <input
          type="number"
          className="w-16 h-10 text-center font-medium text-gray-900 border-x border-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          aria-label="Cantidad"
        />
        <button 
          className="flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          onClick={handleIncrease}
          disabled={quantity >= max}
          aria-label="Aumentar cantidad"
        >
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
