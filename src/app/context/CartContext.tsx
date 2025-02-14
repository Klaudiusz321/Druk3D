"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

// Zdefiniuj interfejs CartItem z wymaganymi właściwościami
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContextType = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (item: CartItem) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (!context) throw new Error("useShoppingCart must be used within a ShoppingCartProvider");
  return context;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

  const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(item: CartItem) {
    setCartItems(currItems => {
      const existing = currItems.find(i => i.id === item.id);
      if (!existing) {
        return [...currItems, { ...item, quantity: item.quantity }];
      } else {
        return currItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      const existing = currItems.find(item => item.id === id);
      if (existing?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => currItems.filter(item => item.id !== id));
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      {/* Zakładamy, że masz komponent <ShoppingCart isOpen={isOpen} /> */}
    </ShoppingCartContext.Provider>
  );
}
