import { create } from "zustand";

export interface Item {
  id: number;
  quantity: number;
  [key: string]: any;
}

interface CartState {
  items: Item[];
  addItem: (item: Item) => void;
  removeItem: (id: number) => void;
  resetCart: () => void;
}

const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item: Item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item already exists, increase the quantity
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      // If it's a new item, add it with quantity 1
      return { items: [...state.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (id: number) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === id);
      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity if more than 1
        return {
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity - 1 } : i
          ),
        };
      }
      // Remove item if quantity is 1 or not found
      return {
        items: state.items.filter((i) => i.id !== id),
      };
    }),
  resetCart: () => set({ items: [] }),
}));

export default useCart;
