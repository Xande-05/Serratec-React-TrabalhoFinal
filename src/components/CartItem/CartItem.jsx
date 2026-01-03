import React, { useState, useEffect } from 'react';
import './CartItem.css';

export const CartItem = ({ title, image, quantity, onDelete, onUpdateQuantity }) => {


  const [price, setPrice] = useState(0);
  
  function randomDecimal(min, max) {
    return Math.random() * (max - min) + min;
  }

  useEffect(() => { 
    setPrice( randomDecimal(10, 100).toFixed(2));
  }, []);

  return (
    <div className="cart-item">
      {image && (
        <img src={image} alt={title} className="cart-item-image" />
      )}
      <div className="cart-item-details">
        <h3 className="cart-item-title">{title}</h3>
        <div className="cart-item-controls">
          <label>
            Quantidade:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => onUpdateQuantity(parseInt(e.target.value, 10))}
              className="cart-item-quantity"
            />
          </label>
          <button onClick={onDelete} className="cart-item-delete">
            Remover
          </button>
          <label>
            PREÇO:
            <label className="cart-item-price">R$ {price}</label>
          </label>
        </div>
      </div>
    </div>
  );
};

