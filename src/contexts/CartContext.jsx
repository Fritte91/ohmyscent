import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ohMyScentCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        // Validate cart structure
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        // Clear corrupted cart data
        localStorage.removeItem('ohMyScentCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('ohMyScentCart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error saving cart:', error);
      // Handle quota exceeded error
      if (error.name === 'QuotaExceededError') {
        console.warn('Cart too large for localStorage, clearing oldest items');
      }
    }
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // If product has a size, treat items with different sizes as separate
      const productKey = product.size ? `${product.id}-${product.size}` : product.id;
      const existingItem = prevItems.find((item) => {
        const itemKey = item.size ? `${item.id}-${item.size}` : item.id;
        return itemKey === productKey;
      });
      
      if (existingItem) {
        return prevItems.map((item) => {
          const itemKey = item.size ? `${item.id}-${item.size}` : item.id;
          return itemKey === productKey
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item;
        });
      }
      return [...prevItems, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId, size = null) => {
    setCartItems((prevItems) => {
      if (size) {
        return prevItems.filter((item) => !(item.id === productId && item.size === size));
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId, quantity, size = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (size) {
          return item.id === productId && item.size === size ? { ...item, quantity } : item;
        }
        return item.id === productId ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

