import React from 'react';
import './QuantitySelector.css';

const QuantitySelector = ({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  max = 99,
  showLabel = true 
}) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="quantity-control-group">
      {showLabel && <label className="quantity-label">Cantidad:</label>}
      <div className="quantity-selector">
        <button 
          className="quantity-btn" 
          onClick={handleDecrease}
          disabled={quantity <= min}
          aria-label="Disminuir cantidad"
        >
          −
        </button>
        <input
          type="number"
          className="quantity-input"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          aria-label="Cantidad"
        />
        <button 
          className="quantity-btn"
          onClick={handleIncrease}
          disabled={quantity >= max}
          aria-label="Aumentar cantidad"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;