// src/context/CartContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

interface Product {
  id: string;
  code: string;
  description: string;
  unitPrice: number;
  essential: boolean;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const exists = prevCart.some((p) => p.id === product.id);
      return exists ? prevCart : [...prevCart, product];
    });

    console.log('teste');
    console.log(cart);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
