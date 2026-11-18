import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { products, sweetPackages, type ProductId } from '../content/products';
import { CartContext, type CartItem, type CartValue } from './cart-context';

const CART_STORAGE_KEY = 'goldie-ann-cart-v1';
function restoreCart(): CartItem[] {
  try {
    const stored: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? '[]');
    if (!Array.isArray(stored)) return [];
    return stored.flatMap((value): CartItem[] => {
      if (!value || typeof value !== 'object' || !('quantity' in value) || !Number.isFinite(value.quantity)) return [];
      const quantity = Math.min(99, Math.max(1, Math.floor(value.quantity)));
      if ('type' in value && value.type === 'product' && 'id' in value && products.some((product) => product.id === value.id)) {
        return [{ key: `product:${value.id}`, type: 'product', id: value.id as ProductId, quantity }];
      }
      if ('type' in value && value.type === 'package' && 'id' in value && sweetPackages.some((offer) => offer.name === value.id)) {
        return [{ key: `package:${value.id}`, type: 'package', id: value.id as string, quantity }];
      }
      return [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(restoreCart);

  useEffect(() => {
    try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items)); }
    catch { /* Keep this browsing session usable when storage is unavailable. */ }
  }, [items]);

  const add = useCallback((type: CartItem['type'], id: string, quantity = 1) => {
    const safeQuantity = Math.min(99, Math.max(1, Math.floor(quantity)));
    const key = `${type}:${id}`;
    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) return current.map((item) => item.key === key ? { ...item, quantity: Math.min(99, item.quantity + safeQuantity) } : item);
      return [...current, type === 'product'
        ? { key, type, id: id as ProductId, quantity: safeQuantity }
        : { key, type, id, quantity: safeQuantity }];
    });
  }, []);

  const setQuantity = useCallback((key: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((current) => current.filter((item) => item.key !== key));
      return;
    }
    setItems((current) => current.map((item) => item.key === key ? { ...item, quantity: Math.min(99, Math.floor(quantity)) } : item));
  }, []);

  const removeItem = useCallback((key: string) => setItems((current) => current.filter((item) => item.key !== key)), []);
  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo<CartValue>(() => {
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalCents = items.reduce((sum, item) => {
      const price = item.type === 'product'
        ? products.find((product) => product.id === item.id)?.priceCents ?? 0
        : sweetPackages.find((offer) => offer.name === item.id)?.priceCents ?? 0;
      return sum + price * item.quantity;
    }, 0);
    return {
      items, itemCount, subtotalCents,
      addProduct: (id, quantity) => add('product', id, quantity),
      addPackage: (id, quantity) => add('package', id, quantity),
      setQuantity, removeItem, clearCart,
    };
  }, [items, add, setQuantity, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

