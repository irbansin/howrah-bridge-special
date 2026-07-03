"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  spiceLevel?: string;
  extras?: string[];
}

interface CartContextType {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("hbw_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart data from localStorage", e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("hbw_cart", JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addItem = (newItem: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prevCart) => {
      // Find if item with same ID and customization already exists
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === newItem.id &&
          item.spiceLevel === newItem.spiceLevel &&
          JSON.stringify(item.extras || []) === JSON.stringify(newItem.extras || [])
      );

      const qty = newItem.quantity || 1;

      if (existingItemIndex > -1) {
        // Increment quantity of existing item
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += qty;
        return updatedCart;
      } else {
        // Add as new item
        return [...prevCart, { ...newItem, quantity: qty }];
      }
    });
    // Open cart automatically when an item is added
    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
