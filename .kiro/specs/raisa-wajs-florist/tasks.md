# Implementation Plan: Raisa Wajs Florist

## Overview

Incremental implementation of the Raisa Wajs Florist e-commerce application using Next.js 14+ (App Router), Tailwind CSS, Prisma/SQLite, NextAuth.js, Stripe, Zustand, and Vitest with fast-check. Each task builds on previous steps, wiring components together progressively.

## Tasks

- [x] 1. Project setup, configuration, and database schema
  - [x] 1.1 Initialize Next.js 14+ project with App Router, install dependencies (tailwindcss, prisma, @prisma/client, next-auth, stripe, zustand, zod, vitest, @testing-library/react, @fast-check/vitest, fast-check, @vitejs/plugin-react), configure Tailwind CSS, create `.env.example` with all required env vars
    - Set up `tailwind.config.ts`, `next.config.js` with security headers (X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Referrer-Policy, Permissions-Policy), `vitest.config.ts`, `vitest.setup.ts`
    - Create `src/lib/prisma.ts` (Prisma client singleton), `src/lib/stripe.ts` (Stripe client), `src/lib/utils.ts` (formatPrice, cn helper)
    - _Requirements: 16.1, 16.5_

  - [x] 1.2 Define Prisma schema with all models (Category, Product, ProductImage, SizeVariant, AddOn, Order, OrderItem, OrderItemAddOn, User) and foreign key relationships
    - Create `prisma/schema.prisma` matching the design document ERD
    - Run `npx prisma migrate dev` to generate initial migration
    - _Requirements: 17.1, 17.2_

  - [x] 1.3 Create database seed script with realistic florist data
    - Create `prisma/seed.ts` with 15+ products across 6+ categories, 3 size variants per product, 4+ add-ons, placeholder Unsplash image URLs, and 1 admin user with hashed password
    - Configure `prisma/seed` in `package.json` and run seed
    - _Requirements: 17.3, 17.4, 17.5, 17.6, 17.7_

  - [ ]* 1.4 Write property test for seed data invariants
    - **Property 34: Seed data size variants per product**
    - **Validates: Requirements 17.4**

  - [ ]* 1.5 Write property test for referential integrity
    - **Property 33: Referential integrity in database**
    - **Validates: Requirements 17.2**

- [x] 2. Shared types, Zod schemas, and Zustand cart store
  - [x] 2.1 Create shared TypeScript types in `src/types/index.ts`
    - Define ProductWithVariants, CartItemType, FilterState, DeliveryData, OrderStatus, and all other shared types from the design document
    - _Requirements: 18.1_

  - [x] 2.2 Create Zod validation schemas
    - Create `src/schemas/checkout.ts`, `src/schemas/contact.ts`, `src/schemas/product.ts`, `src/schemas/category.ts` matching the design document schemas
    - _Requirements: 6.6, 9.2, 16.2_

  - [x] 2.3 Implement Zustand cart store with localStorage persistence
    - Create `src/store/cart.ts` with addItem, removeItem, updateQuantity, clearCart actions and itemCount, subtotal, deliveryFee, total computed values
    - Use Zustand `persist` middleware for localStorage rehydration
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5, 18.6, 5.6_

  - [ ]* 2.4 Write property tests for cart store operations
    - **Property 13: Add item stores all selected options**
    - **Validates: Requirements 4.8, 18.3**

  - [ ]* 2.5 Write property test for cart total calculations
    - **Property 14: Cart total calculations**
    - **Validates: Requirements 5.3, 5.5**

  - [ ]* 2.6 Write property test for cart state round-trip persistence
    - **Property 15: Cart state round-trip persistence**
    - **Validates: Requirements 5.6, 18.2**

  - [ ]* 2.7 Write property test for cart mutations and derived values
    - **Property 16: Cart mutations update state and derived values**
    - **Validates: Requirements 18.4, 18.5, 18.6**

  - [ ]* 2.8 Write property test for cart item shape completeness
    - **Property 35: Zustand store manages complete cart item shape**
    - **Validates: Requirements 18.1**

  - [ ]* 2.9 Write property tests for Zod schema validation
    - **Property 18: Checkout form Zod validation**
    - **Property 19: Checkout client-server validation parity**
    - **Property 21: Contact form validation**
    - **Validates: Requirements 6.6, 6.9, 16.2, 9.2**

- [x] 3. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. UI primitives and Toast notification system
  - [x] 4.1 Create reusable UI components (`src/components/ui/Button.tsx`, `src/components/ui/Input.tsx`)
    - Implement accessible Button with variants (primary, secondary, outline, danger) and loading state
    - Implement accessible Input with label, error message display, and forwarded ref
    - _Requirements: 14.5, 14.6_

  - [x] 4.2 Implement Toast notification system
    - Create `src/components/ui/ToastProvider.tsx` with React Context, `src/components/ui/Toast.tsx` component
    - Expose `useToast()` hook returning `{ success(msg), error(msg) }`
    - Auto-dismiss after 5 seconds, manual close button, top-right positioned, vertical stacking
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5_

- [x] 5. Layout components and root layout
  - [x] 5.1 Create AnnouncementBar component
    - Server Component displaying promotional offer, delivery cutoff time, freshness guarantee
    - _Requirements: 1.1_

  - [x] 5.2 Create Navbar component with mobile menu
    - Client Component with site logo, navigation links (Home, Products, About, Contact), search icon, cart icon with Zustand item count badge
    - Create `src/components/layout/MobileMenu.tsx` hamburger menu for mobile viewports
    - _Requirements: 1.10, 14.3, 18.6_

  - [x] 5.3 Create Footer component
    - Server Component with multi-column layout: company info, Information links, Occasions links, social media icons, payment method icons
    - _Requirements: 1.10_

  - [x] 5.4 Wire layout components into root layout (`src/app/layout.tsx`)
    - Import AnnouncementBar, Navbar, Footer, ToastProvider
    - Set up global Tailwind styles, semantic HTML (header, nav, main, footer)
    - Add base meta tags (title, description, Open Graph)
    - _Requirements: 1.1, 1.10, 14.4, 15.2_

- [x] 6. Homepage sections
  - [x] 6.1 Create HeroBanner component
    - Server Component with full-width seasonal banner, headline, subheadline, price indicator, CTA button linking to Product_Catalog
    - _Requirements: 1.2_

  - [x] 6.2 Create ProductCard component
    - Server Component displaying product image (Next.js Image), uppercase name, "from £X" price, optional save badge, optional free add-on badge, delivery availability text, link to `/products/[slug]`
    - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 15.1_

  - [ ]* 6.3 Write property tests for ProductCard rendering
    - **Property 1: ProductCard renders required information**
    - **Property 2: ProductCard sale and discount display**
    - **Property 3: ProductCard free add-on badge**
    - **Property 4: ProductCard links to correct detail page**
    - **Validates: Requirements 2.2, 2.3, 2.4, 2.5, 2.6, 2.7**

  - [x] 6.4 Create ProductCarousel component
    - Client Component with horizontal scroll, left/right navigation arrows, renders ProductCard components
    - Add ARIA labels on carousel navigation controls
    - _Requirements: 1.3, 2.1, 14.5_

  - [x] 6.5 Create CategoryQuickLinks component
    - Server Component with 8+ clickable category buttons (Birthday, Romantic, Under £30, Student Discount, Luxury, Sympathy, Sale, Same Day)
    - _Requirements: 1.4_

  - [x] 6.6 Create TrustBadges component
    - Server Component with four trust indicators grid
    - _Requirements: 1.5_

  - [x] 6.7 Create DeliveryPassPromo component
    - Server Component describing delivery subscription service
    - _Requirements: 1.6_

  - [x] 6.8 Create NewsletterSignup component and Server Action
    - Client Component with email input, submit button, 10% discount incentive message
    - Create `src/actions/newsletter.ts` Server Action
    - Add ARIA labels on form inputs
    - _Requirements: 1.7, 14.5_

  - [x] 6.9 Create SeoContent and FaqAccordion components
    - SeoContent: Server Component with rich text about delivery, occasions, flower types
    - FaqAccordion: Client Component with 5+ collapsible Q&A items, keyboard accessible (Enter/Space to toggle), ARIA labels on toggle buttons
    - _Requirements: 1.8, 1.9, 14.5, 14.6_

  - [x] 6.10 Wire all homepage sections into `src/app/page.tsx`
    - Compose HeroBanner, ProductCarousels (2+, fetching products from DB), CategoryQuickLinks, TrustBadges, DeliveryPassPromo, NewsletterSignup, SeoContent, FaqAccordion
    - _Requirements: 1.1–1.10_

  - [ ]* 6.11 Write property tests for ARIA labels and Next.js Image usage
    - **Property 29: ARIA labels on interactive elements**
    - **Property 30: Product images use Next.js Image component**
    - **Validates: Requirements 14.5, 15.1**

- [x] 7. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 8. Product Catalog page
  - [x] 8.1 Create ProductGrid, ProductFilters, ProductSort, ProductSearch, and Pagination components
    - ProductGrid: Server Component, responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
    - ProductFilters: Client Component, filter by occasion/flower type/price range, updates URL search params
    - ProductSort: Client Component, dropdown for price low-high, price high-low, name A-Z, newest
    - ProductSearch: Client Component, debounced text input, updates URL params
    - Pagination: Client Component, page numbers + prev/next, max 12 products per page
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [x] 8.2 Create Product Catalog page (`src/app/products/page.tsx`)
    - Server Component that reads URL search params for filters/sort/search/page
    - Queries products from Prisma with filtering, sorting, search, and pagination
    - Renders ProductFilters, ProductSort, ProductSearch, ProductGrid, Pagination
    - Shows "No products found" message when results are empty
    - _Requirements: 3.1–3.7_

  - [ ]* 8.3 Write property tests for catalog filtering, sorting, search, and pagination
    - **Property 5: Product catalog filtering**
    - **Property 6: Product catalog sorting**
    - **Property 7: Product catalog search**
    - **Property 8: Pagination page size**
    - **Validates: Requirements 3.3, 3.4, 3.5, 3.6**

- [x] 9. Product Detail page
  - [x] 9.1 Create ImageGallery, SizeVariantSelector, AddOnSelector, DeliveryDatePicker, and CardMessageInput components
    - ImageGallery: Client Component, large primary image + clickable thumbnails
    - SizeVariantSelector: Client Component, three radio-style buttons, Standard selected by default
    - AddOnSelector: Client Component, checkbox list with prices
    - DeliveryDatePicker: Client Component, selectable dates from tomorrow through 14 days
    - CardMessageInput: Client Component, textarea with 200-char limit and live counter
    - _Requirements: 4.1, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [x] 9.2 Create Product Detail page (`src/app/products/[slug]/page.tsx`)
    - Server Component fetching product with variants, images, and add-ons from Prisma
    - Client wrapper for interactive state (selected variant, add-ons, delivery date, card message)
    - "Add to Cart" button calls Zustand addItem, shows success toast
    - Generate JSON-LD structured data (Schema.org Product)
    - _Requirements: 4.1–4.9, 15.3_

  - [ ]* 9.3 Write property tests for Product Detail page behavior
    - **Property 9: Size variant selection updates price**
    - **Property 10: Default size variant is Standard**
    - **Property 11: Delivery date picker range**
    - **Property 12: Card message character limit**
    - **Property 36: Add-on display on Product Detail Page**
    - **Validates: Requirements 4.3, 4.4, 4.5, 4.7, 4.6**

  - [ ]* 9.4 Write property test for JSON-LD structured data
    - **Property 32: Product page JSON-LD structured data**
    - **Validates: Requirements 15.3**

- [x] 10. Shopping Cart page
  - [x] 10.1 Create CartItemList, CartItem, and CartSummary components
    - CartItemList: Client Component, renders CartItem list from Zustand store, shows empty state with link to catalog
    - CartItem: Client Component, displays product name, variant, add-ons, delivery slot, card message, quantity controls (increment/decrement/remove), line total
    - CartSummary: Client Component, subtotal, delivery fee, order total, "Proceed to Checkout" button
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.7, 5.8_

  - [x] 10.2 Create Cart page (`src/app/cart/page.tsx`)
    - Wire CartItemList and CartSummary into the page
    - _Requirements: 5.1–5.8_

  - [ ]* 10.3 Write property test for cart item card message display
    - **Property 17: Cart item displays card message**
    - **Validates: Requirements 5.8**

- [x] 11. Checkout and payment flow
  - [x] 11.1 Create DeliveryForm, OrderSummary, and CheckoutForm components
    - DeliveryForm: Client Component, recipient name/phone/address fields with Zod validation and inline errors
    - OrderSummary: displays cart items, add-ons, delivery fee, total
    - CheckoutForm: Client Component orchestrating DeliveryForm + OrderSummary + Stripe payment trigger
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.6, 6.9_

  - [x] 11.2 Implement checkout Server Action and Stripe integration
    - Create `src/actions/checkout.ts` with `createCheckoutSession` Server Action
    - Validate input with Zod schema server-side, create Stripe Checkout Session, return redirect URL
    - _Requirements: 6.5, 6.7, 16.2_

  - [x] 11.3 Implement Stripe webhook handler
    - Create `src/app/api/webhooks/stripe/route.ts`
    - Verify webhook signature, process `checkout.session.completed` event, create Order record in database via Prisma
    - _Requirements: 6.7, 16.3_

  - [x] 11.4 Create Checkout page (`src/app/checkout/page.tsx`)
    - Wire CheckoutForm, handle payment success redirect and payment failure error display
    - _Requirements: 6.1–6.9_

- [x] 12. Order Confirmation page
  - [x] 12.1 Create Order Confirmation page (`src/app/order-confirmation/[id]/page.tsx`)
    - Server Component fetching order from Prisma by ID
    - Display order number, date, status, item summary (product name, variant, add-ons, card message), delivery address, delivery slot, recipient name, payment total
    - "Continue Shopping" button linking to homepage
    - Client Component to clear Zustand cart on mount
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6_

  - [ ]* 12.2 Write property test for order confirmation cart clearing
    - **Property 20: Order confirmation clears cart**
    - **Validates: Requirements 7.6**

- [x] 13. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. About and Contact pages
  - [x] 14.1 Create About page (`src/app/about/page.tsx`)
    - Brand story, mission statement, core values, team section with 2+ member profiles (name, role, photo placeholder)
    - Uses consistent site layout (AnnouncementBar, nav, footer)
    - _Requirements: 8.1, 8.2, 8.3_

  - [x] 14.2 Create Contact page (`src/app/contact/page.tsx`) and contact Server Action
    - Contact form with name, email, phone (optional), subject, message fields
    - Zod validation with inline error messages
    - Create `src/actions/contact.ts` Server Action, success/error toast notifications
    - Display business contact details (address, phone, email) and embedded map placeholder
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [x] 15. Admin Panel — Authentication
  - [x] 15.1 Configure NextAuth.js with Credentials provider
    - Create `src/lib/auth.ts` with NextAuth config, JWT strategy, Prisma user lookup, bcrypt password comparison
    - Create `src/app/api/auth/[...nextauth]/route.ts`
    - _Requirements: 10.1, 10.4, 16.4_

  - [x] 15.2 Create admin login page and auth middleware
    - Create `src/app/admin/login/page.tsx` with email/password form
    - Generic error message "Invalid email or password" on failure
    - Create `src/middleware.ts` to redirect unauthenticated users from `/admin/*` to `/admin/login`
    - _Requirements: 10.2, 10.3, 10.5_

  - [x] 15.3 Create admin layout with auth guard and logout
    - Create `src/app/admin/layout.tsx` with session check, sidebar navigation, logout button
    - Create `src/app/admin/page.tsx` dashboard with summary stats
    - _Requirements: 10.1, 10.6_

  - [ ]* 15.4 Write property tests for admin authentication
    - **Property 22: Admin route authentication guard**
    - **Property 23: Admin login error message is generic**
    - **Validates: Requirements 10.1, 10.2, 10.5**

- [x] 16. Admin Panel — Product Management
  - [x] 16.1 Create admin product list page (`src/app/admin/products/page.tsx`)
    - Display all products with name, category, base price (Standard variant), active/inactive status
    - Delete button with confirmation dialog, success toast
    - _Requirements: 11.1, 11.6, 11.7_

  - [x] 16.2 Create admin product create/edit pages and Server Actions
    - Create `src/app/admin/products/new/page.tsx` with form for name, description, category, images, 3 size variants
    - Create `src/app/admin/products/[id]/edit/page.tsx` pre-populated with existing product data
    - Create `src/actions/admin/products.ts` with createProduct, updateProduct, deleteProduct Server Actions
    - Zod validation, success toast notifications
    - _Requirements: 11.2, 11.3, 11.4, 11.5_

  - [ ]* 16.3 Write property tests for admin product management
    - **Property 24: Admin product list displays required fields**
    - **Property 25: Admin edit product form pre-population**
    - **Validates: Requirements 11.1, 11.4**

- [x] 17. Admin Panel — Order Management
  - [x] 17.1 Create admin order list and detail pages
    - Create `src/app/admin/orders/page.tsx` displaying order number, customer name, date, delivery date, total, status with filter controls by status
    - Create `src/app/admin/orders/[id]/page.tsx` with full order detail view (items, add-ons, card message, delivery address, slot, payment info)
    - Create `src/actions/admin/orders.ts` with updateOrderStatus Server Action
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [ ]* 17.2 Write property test for admin order list display
    - **Property 26: Admin order list displays required fields**
    - **Validates: Requirements 12.1**

- [x] 18. Admin Panel — Category Management
  - [x] 18.1 Create admin category list, create, and edit pages
    - Create `src/app/admin/categories/page.tsx` displaying category name and product count
    - Create `src/app/admin/categories/new/page.tsx` with name and optional description fields
    - Create edit functionality for existing categories
    - Create `src/actions/admin/categories.ts` with createCategory, updateCategory, deleteCategory Server Actions
    - Prevent deletion of categories with associated products (warning message)
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [ ]* 18.2 Write property tests for admin category management
    - **Property 27: Admin category list displays name and product count**
    - **Property 28: Category deletion prevention with associated products**
    - **Validates: Requirements 13.1, 13.5**

- [x] 19. Checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 20. Responsive design, accessibility, and SEO polish
  - [x] 20.1 Audit and fix responsive breakpoints across all pages
    - Verify mobile (320px–767px), tablet (768px–1023px), desktop (1024px+) layouts
    - Ensure Product Catalog grid adjusts correctly (1/2/3 columns)
    - Ensure navigation collapses to hamburger on mobile
    - _Requirements: 14.1, 14.2, 14.3_

  - [x] 20.2 Audit and fix semantic HTML and keyboard navigation
    - Ensure all pages use semantic elements (header, nav, main, section, article, footer)
    - Verify full keyboard navigation (Tab, Enter, Space) on all interactive elements
    - Ensure minimum color contrast ratio (4.5:1 normal text, 3:1 large text)
    - _Requirements: 14.4, 14.6, 14.7_

  - [x] 20.3 Add meta tags and SEO enhancements to all pages
    - Ensure every page has title, description, and Open Graph meta tags via Next.js Metadata API
    - Implement lazy loading for below-the-fold images
    - _Requirements: 15.1, 15.2, 15.5_

  - [ ]* 20.4 Write property test for meta tags on pages
    - **Property 31: Pages include meta tags**
    - **Validates: Requirements 15.2**

- [x] 21. Error handling and security hardening
  - [x] 21.1 Create error boundaries and 404 pages
    - Create `src/app/error.tsx` (root error boundary with "Try Again" button)
    - Create `src/app/not-found.tsx` (404 page with link to homepage)
    - Create `src/app/admin/error.tsx` (admin-specific error boundary)
    - _Requirements: 16.1_

  - [x] 21.2 Implement rate limiting on public endpoints
    - Add rate limiting to contact form, newsletter signup, and search endpoints
    - Return 429 with Retry-After header when exceeded
    - _Requirements: 16.6_

  - [x] 21.3 Verify all Server Actions validate input server-side with Zod
    - Audit all Server Actions (checkout, contact, newsletter, admin CRUD) to ensure Zod validation on server
    - Ensure Stripe webhook signature verification is in place
    - Ensure all secrets are read from environment variables
    - _Requirements: 16.2, 16.3, 16.4, 16.5_

- [x] 22. Final checkpoint — Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at logical breakpoints
- Property tests validate universal correctness properties from the design document (36 total)
- Unit tests validate specific examples and edge cases
- All code uses TypeScript with Next.js 14+ App Router, Tailwind CSS, Prisma, and the full tech stack defined in the design
