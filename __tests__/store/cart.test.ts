import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "@/store/cart";
import type { CartItem } from "@/types";

const makeItem = (overrides: Partial<Omit<CartItem, "id">> = {}): Omit<CartItem, "id"> => ({
  productId: "prod-1",
  productName: "Rose Bouquet",
  productSlug: "rose-bouquet",
  productImage: "/images/rose.jpg",
  sizeVariantId: "sv-1",
  sizeVariantName: "Standard",
  unitPrice: 29.99,
  quantity: 1,
  addOns: [],
  deliveryDate: "2025-01-15",
  deliverySlot: "9am-1pm",
  cardMessage: null,
  ...overrides,
});

describe("Cart Store", () => {
  beforeEach(() => {
    useCartStore.setState({ items: [] });
  });

  describe("addItem", () => {
    it("adds an item with a generated id", () => {
      useCartStore.getState().addItem(makeItem());
      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].id).toBeDefined();
      expect(items[0].productName).toBe("Rose Bouquet");
    });

    it("adds multiple items independently", () => {
      useCartStore.getState().addItem(makeItem({ productId: "prod-1" }));
      useCartStore.getState().addItem(makeItem({ productId: "prod-2" }));
      expect(useCartStore.getState().items).toHaveLength(2);
    });
  });

  describe("removeItem", () => {
    it("removes an item by id", () => {
      useCartStore.getState().addItem(makeItem());
      const id = useCartStore.getState().items[0].id;
      useCartStore.getState().removeItem(id);
      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it("does nothing for a non-existent id", () => {
      useCartStore.getState().addItem(makeItem());
      useCartStore.getState().removeItem("non-existent");
      expect(useCartStore.getState().items).toHaveLength(1);
    });
  });

  describe("updateQuantity", () => {
    it("updates the quantity of an item", () => {
      useCartStore.getState().addItem(makeItem());
      const id = useCartStore.getState().items[0].id;
      useCartStore.getState().updateQuantity(id, 5);
      expect(useCartStore.getState().items[0].quantity).toBe(5);
    });

    it("removes the item when quantity is 0", () => {
      useCartStore.getState().addItem(makeItem());
      const id = useCartStore.getState().items[0].id;
      useCartStore.getState().updateQuantity(id, 0);
      expect(useCartStore.getState().items).toHaveLength(0);
    });

    it("removes the item when quantity is negative", () => {
      useCartStore.getState().addItem(makeItem());
      const id = useCartStore.getState().items[0].id;
      useCartStore.getState().updateQuantity(id, -1);
      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe("clearCart", () => {
    it("removes all items", () => {
      useCartStore.getState().addItem(makeItem({ productId: "p1" }));
      useCartStore.getState().addItem(makeItem({ productId: "p2" }));
      useCartStore.getState().clearCart();
      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe("computed values", () => {
    it("itemCount returns sum of all quantities", () => {
      useCartStore.getState().addItem(makeItem({ quantity: 2 }));
      useCartStore.getState().addItem(makeItem({ quantity: 3 }));
      expect(useCartStore.getState().itemCount()).toBe(5);
    });

    it("itemCount returns 0 for empty cart", () => {
      expect(useCartStore.getState().itemCount()).toBe(0);
    });

    it("subtotal calculates (unitPrice + addOns) * quantity", () => {
      useCartStore.getState().addItem(
        makeItem({
          unitPrice: 20,
          quantity: 2,
          addOns: [
            { id: "a1", name: "Chocolates", price: 5 },
            { id: "a2", name: "Vase", price: 10 },
          ],
        })
      );
      // (20 + 5 + 10) * 2 = 70
      expect(useCartStore.getState().subtotal()).toBe(70);
    });

    it("subtotal sums across multiple items", () => {
      useCartStore.getState().addItem(makeItem({ unitPrice: 10, quantity: 1, addOns: [] }));
      useCartStore.getState().addItem(makeItem({ unitPrice: 20, quantity: 2, addOns: [] }));
      // 10*1 + 20*2 = 50
      expect(useCartStore.getState().subtotal()).toBe(50);
    });

    it("deliveryFee is 5.99 when cart has items", () => {
      useCartStore.getState().addItem(makeItem());
      expect(useCartStore.getState().deliveryFee()).toBe(5.99);
    });

    it("deliveryFee is 0 when cart is empty", () => {
      expect(useCartStore.getState().deliveryFee()).toBe(0);
    });

    it("total equals subtotal + deliveryFee", () => {
      useCartStore.getState().addItem(makeItem({ unitPrice: 30, quantity: 1, addOns: [] }));
      const subtotal = useCartStore.getState().subtotal();
      const fee = useCartStore.getState().deliveryFee();
      expect(useCartStore.getState().total()).toBe(subtotal + fee);
    });
  });
});
