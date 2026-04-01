import type {
  Product,
  Category,
  SizeVariant,
  AddOn,
  ProductImage,
  Order,
  OrderItem,
  OrderItemAddOn,
} from "@/generated/prisma/client";

// ─── Re-exports from Prisma for convenience ─────────────────────────────────
export type {
  Product,
  Category,
  SizeVariant,
  AddOn,
  ProductImage,
  Order,
  OrderItem,
  OrderItemAddOn,
};

// ─── Composite types (Prisma models with relations included) ─────────────────

/** Product with all relations needed for catalog/detail pages */
export type ProductWithVariants = Product & {
  sizeVariants: SizeVariant[];
  images: ProductImage[];
  category: Category;
};

/** Simplified category type for quick-link / filter UIs */
export type CategoryType = Pick<Category, "id" | "name" | "slug">;

/** Simplified size variant for component props */
export type SizeVariantType = Pick<
  SizeVariant,
  "id" | "name" | "price" | "originalPrice" | "imageUrl"
>;

/** Simplified add-on for component props */
export type AddOnType = Pick<AddOn, "id" | "name" | "price" | "imageUrl" | "isActive">;

// ─── Cart types (Zustand store) ──────────────────────────────────────────────

export interface CartItemAddOn {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  sizeVariantId: string;
  sizeVariantName: string;
  unitPrice: number;
  quantity: number;
  addOns: CartItemAddOn[];
  deliveryDate: string | null;
  deliverySlot: string | null;
  cardMessage: string | null;
}

/** Alias used by component props */
export type CartItemType = CartItem;

// ─── Cart store interface ────────────────────────────────────────────────────

export interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;

  // Computed
  itemCount: () => number;
  subtotal: () => number;
  deliveryFee: () => number;
  total: () => number;
}

// ─── Filter / catalog types ──────────────────────────────────────────────────

export interface FilterState {
  category?: string;
  occasion?: string;
  flowerType?: string;
  priceMin?: number;
  priceMax?: number;
  search?: string;
  sort?: SortOption;
  page?: number;
}

export type SortOption =
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "newest";

// ─── Checkout / delivery types ───────────────────────────────────────────────

export interface DeliveryData {
  recipientName: string;
  recipientPhone: string;
  deliveryStreet: string;
  deliveryCity: string;
  deliveryPostcode: string;
  deliveryInstructions?: string;
}

// ─── Order status ────────────────────────────────────────────────────────────

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

// ─── Order with relations (for admin / confirmation pages) ───────────────────

export type OrderWithItems = Order & {
  items: (OrderItem & {
    product: Product;
    sizeVariant: SizeVariant;
    addOns: (OrderItemAddOn & { addOn: AddOn })[];
  })[];
};

// ─── Component prop types ────────────────────────────────────────────────────

export interface ProductCardProps {
  product: ProductWithVariants;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}
