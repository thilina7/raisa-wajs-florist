import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartStore } from "@/types";

const DELIVERY_FEE = 5.99;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            { ...item, id: crypto.randomUUID() },
          ],
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) =>
              item.id === id ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [] }),

      itemCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      subtotal: () =>
        get().items.reduce((sum, item) => {
          const addOnsTotal = item.addOns.reduce((a, addon) => a + addon.price, 0);
          return sum + (item.unitPrice + addOnsTotal) * item.quantity;
        }, 0),

      deliveryFee: () => (get().items.length > 0 ? DELIVERY_FEE : 0),

      total: () => get().subtotal() + get().deliveryFee(),
    }),
    {
      name: "raisa-wajs-cart",
    }
  )
);
