import { createContext } from 'react';
import type { ProductId } from '../content/products';

export type CartItem =
  | { key: string; type: 'product'; id: ProductId; quantity: number }
  | { key: string; type: 'package'; id: string; quantity: number };

export interface CartValue {
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  addProduct: (id: ProductId, quantity?: number) => void;
  addPackage: (id: string, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartValue | null>(null);
