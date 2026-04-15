import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  ingredients: string[];
  calories: number;
  healthy: boolean;
  emoji: string;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
  clearCart: () => void;
  total: number;
  count: number;
  selectedTimeSlot: string | null;
  setSelectedTimeSlot: (slot: string | null) => void;
  favorites: number[];
  toggleFavorite: (id: number) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Bocadillo Vegetal',
    category: 'bocadillos',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1765100020448-4daa6a9bd934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Pan integral con lechuga, tomate, aguacate y queso fresco.',
    ingredients: ['Pan integral', 'Lechuga', 'Tomate', 'Aguacate', 'Queso fresco'],
    calories: 320,
    healthy: true,
    emoji: '🥪',
  },
  {
    id: 2,
    name: 'Bocadillo Jamón York',
    category: 'bocadillos',
    price: 2.80,
    image: 'https://images.unsplash.com/photo-1765100020448-4daa6a9bd934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Pan de barra con jamón york y queso gouda.',
    ingredients: ['Pan de barra', 'Jamón york', 'Queso gouda'],
    calories: 380,
    healthy: false,
    emoji: '🥪',
  },
  {
    id: 3,
    name: 'Bocadillo de Atún',
    category: 'bocadillos',
    price: 2.60,
    image: 'https://images.unsplash.com/photo-1765100020448-4daa6a9bd934?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Pan con atún, tomate y mayonesa ligera.',
    ingredients: ['Pan', 'Atún', 'Tomate', 'Mayonesa ligera'],
    calories: 340,
    healthy: false,
    emoji: '🥪',
  },
  {
    id: 4,
    name: 'Ensalada Mixta',
    category: 'saludable',
    price: 3.20,
    image: 'https://images.unsplash.com/photo-1605034298551-baacf17591d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Lechuga, tomate, zanahoria rallada y atún con vinagreta casera.',
    ingredients: ['Lechuga', 'Tomate', 'Zanahoria', 'Atún', 'Vinagreta'],
    calories: 180,
    healthy: true,
    emoji: '🥗',
  },
  {
    id: 5,
    name: 'Yogur con Frutas',
    category: 'saludable',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1550335430-182e6165c01c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Yogur natural con frutas del tiempo y granola.',
    ingredients: ['Yogur natural', 'Frutas del tiempo', 'Granola'],
    calories: 150,
    healthy: true,
    emoji: '🍓',
  },
  {
    id: 6,
    name: 'Café con Leche',
    category: 'bebidas',
    price: 1.20,
    image: 'https://images.unsplash.com/photo-1769072001362-8d76694760f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Café espresso doble con leche entera o desnatada.',
    ingredients: ['Café espresso', 'Leche'],
    calories: 80,
    healthy: false,
    emoji: '☕',
  },
  {
    id: 7,
    name: 'Zumo de Naranja',
    category: 'bebidas',
    price: 1.80,
    image: 'https://images.unsplash.com/photo-1707569517904-92b134ff5f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Zumo natural de naranja recién exprimido, sin azúcar añadido.',
    ingredients: ['Naranja natural'],
    calories: 90,
    healthy: true,
    emoji: '🍊',
  },
  {
    id: 8,
    name: 'Agua Mineral',
    category: 'bebidas',
    price: 0.80,
    image: 'https://images.unsplash.com/photo-1564919415179-752ca9dadcdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Agua mineral natural 50 cl.',
    ingredients: ['Agua mineral'],
    calories: 0,
    healthy: true,
    emoji: '💧',
  },
  {
    id: 9,
    name: 'Croissant',
    category: 'bolleria',
    price: 1.50,
    image: 'https://images.unsplash.com/photo-1751151856149-5ebf1d21586a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Croissant de mantequilla horneado en el día.',
    ingredients: ['Harina', 'Mantequilla', 'Azúcar', 'Levadura'],
    calories: 240,
    healthy: false,
    emoji: '🥐',
  },
  {
    id: 10,
    name: 'Tostada con AOVE',
    category: 'bolleria',
    price: 1.20,
    image: 'https://images.unsplash.com/photo-1751151856149-5ebf1d21586a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&q=80',
    description: 'Tostada de pan integral con aceite de oliva virgen extra y sal.',
    ingredients: ['Pan integral', 'AOVE', 'Sal'],
    calories: 190,
    healthy: true,
    emoji: '🍞',
  },
];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([1, 4, 7]);
  const [paymentMethod, setPaymentMethod] = useState<string>('card');

  const addItem = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => {
    setItems([]);
    setSelectedTimeSlot(null);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addItem, removeItem, updateQuantity, clearCart,
      total, count, selectedTimeSlot, setSelectedTimeSlot,
      favorites, toggleFavorite, paymentMethod, setPaymentMethod,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
