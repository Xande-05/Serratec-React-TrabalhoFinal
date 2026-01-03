import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();


const getCartFromStorage = (userId) => {
  try {
    const storedCart = localStorage.getItem(`cart_${userId}`);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error("Erro ao ler carrinho do localStorage:", error);
    return [];
  }
};


const saveCartToStorage = (userId, cartItems) => {
  try {
    localStorage.setItem(`cart_${userId}`, JSON.stringify(cartItems));
  } catch (error) {
    console.error("Erro ao salvar carrinho no localStorage:", error);
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

 
  useEffect(() => {
    if (user && user.id) {
      try {
        setLoading(true);
        setError(null);
        const data = getCartFromStorage(user.id);
        setCartItems(data);
        console.log("Carrinho carregado do localStorage:", data);
      } catch (err) {
        console.error("Falha ao buscar carrinho:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setCartItems([]);
    }
  }, [user]);

  const adicionarAoCarrinho = (bookDataFormatado) => {
    if (!user) {
      alert('Usuário não autenticado');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      
      
      const novoItem = {
        id: Date.now().toString(),
        userId: user.id,
        quantity: 1,
        ...bookDataFormatado
      };
      
     
      const cartAtualizado = [...cartItems, novoItem];
      setCartItems(cartAtualizado);
      saveCartToStorage(user.id, cartAtualizado);
      
      console.log("Item adicionado ao carrinho:", novoItem);
      return true;
    } catch (err) {
      console.error("Erro ao adicionar item:", err);
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removerDoCarrinho = (itemId) => {
    try {
      setLoading(true);
      const novoArray = cartItems.filter(item => item.id !== itemId);
      setCartItems(novoArray);
      saveCartToStorage(user.id, novoArray);
      console.log("Item removido do carrinho:", itemId);
    } catch (err) {
      console.error("Erro ao remover item:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const atualizarQuantidade = (itemId, newQuantity) => {
    try {
      setLoading(true);
      const novoArray = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(novoArray);
      saveCartToStorage(user.id, novoArray);
      console.log("Quantidade atualizada para item:", itemId, "Nova quantidade:", newQuantity);
    } catch (err) {
      console.error("Erro ao atualizar quantidade:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cartItems,
    loading,
    error,
    adicionarAoCarrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    itemCount: cartItems.length
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);