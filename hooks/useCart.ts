import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,
      
      addItem: (product, quantity) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        let updatedItems;
        if (existingItem) {
          updatedItems = items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          updatedItems = [...items, { ...product, quantity }];
        }
        
        set((state) => ({
          items: updatedItems,
          total: state.total + product.pricePi * quantity,
          itemCount: state.itemCount + quantity,
        }));
      },

      removeItem: (productId) => {
        const { items } = get();
        const itemToRemove = items.find((item) => item.id === productId);
        if (!itemToRemove) return;
        
        const updatedItems = items.filter((item) => item.id !== productId);
        
        set((state) => ({
          items: updatedItems,
          total: state.total - itemToRemove.pricePi * itemToRemove.quantity,
          itemCount: state.itemCount - itemToRemove.quantity,
        }));
      },
      
      updateItemQuantity: (productId, quantity) => {
        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.id === productId ? { ...item, quantity: Math.max(0, quantity) } : item
          ).filter(item => item.quantity > 0);

          const newTotal = updatedItems.reduce((acc, item) => acc + item.pricePi * item.quantity, 0);
          const newItemCount = updatedItems.reduce((acc, item) => acc + item.quantity, 0);

          return {
            items: updatedItems,
            total: newTotal,
            itemCount: newItemCount,
          }
        });
      },

      clearCart: () => set({ items: [], total: 0, itemCount: 0 }),
    }),
    {
      name: 'daily-pi-mart-cart', // name of the item in the storage (must be unique)
    }
  )
);