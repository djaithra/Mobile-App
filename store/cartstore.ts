import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Platform } from "react-native";

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

const useCart =
  Platform.OS === "web"
    ? create<CartState>((set) => ({
        items: [],
        addItem: (item: Item) =>
          set((state) => {
            const existingItem = state.items.find((i) => i.id === item.id);
            if (existingItem) {
              return {
                items: state.items.map((i) =>
                  i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                ),
              };
            }
            return { items: [...state.items, { ...item, quantity: 1 }] };
          }),
        removeItem: (id: number) =>
          set((state) => {
            const existingItem = state.items.find((i) => i.id === id);
            if (existingItem && existingItem.quantity > 1) {
              return {
                items: state.items.map((i) =>
                  i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                ),
              };
            }
            return {
              items: state.items.filter((i) => i.id !== id),
            };
          }),
        resetCart: () => set({ items: [] }),
      }))
    : create<CartState>()(
        persist(
          (set) => ({
            items: [],
            addItem: (item: Item) =>
              set((state) => {
                const existingItem = state.items.find((i) => i.id === item.id);
                if (existingItem) {
                  return {
                    items: state.items.map((i) =>
                      i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                    ),
                  };
                }
                return { items: [...state.items, { ...item, quantity: 1 }] };
              }),
            removeItem: (id: number) =>
              set((state) => {
                const existingItem = state.items.find((i) => i.id === id);
                if (existingItem && existingItem.quantity > 1) {
                  return {
                    items: state.items.map((i) =>
                      i.id === id ? { ...i, quantity: i.quantity - 1 } : i
                    ),
                  };
                }
                return {
                  items: state.items.filter((i) => i.id !== id),
                };
              }),
            resetCart: () => set({ items: [] }),
          }),
          {
            name: "cart-storage",
            storage: createJSONStorage(() => {
              return require("@react-native-async-storage/async-storage")
                .default;
            }),
          }
        )
      );

export default useCart;
