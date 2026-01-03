import React from 'react';
import { useCart } from '../contexts/cartContexts';
import { CartItem } from '../components/CartItem/CartItem';
import './CartPage.css';

export const CartPage = () => {
  const {
    cartItems,
    loading,
    error,
    removerDoCarrinho,
    atualizarQuantidade
  } = useCart();

  if (loading) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <p>Carregando seu carrinho...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="cart-page">
        <div className="cart-error">
          <p>Ocorreu um erro: {error}</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Meu Carrinho</h1>
        <div className="cart-empty">
          <p>Seu carrinho está vazio.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Meu Carrinho</h1>
      <div className="cart-list">
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            title={item.title}
            image={item.image}
            quantity={item.quantity}
            onDelete={() => removerDoCarrinho(item.id)}
            onUpdateQuantity={(newQty) => atualizarQuantidade(item.id, newQty)}
          />
        ))}
      </div>
    </div>
  );
};