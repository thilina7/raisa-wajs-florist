# Requirements Document

## Introduction

Raisa Wajs Florist is a professional e-commerce website for a florist business offering fresh flower bouquets, arrangements, and delivery services for all occasions. The website is inspired by eflorist.co.uk's design patterns and provides a premium, trustworthy shopping experience with elegant aesthetics. The platform supports product browsing with carousels and filtering, a full cart and checkout flow with Stripe payments, delivery scheduling with time slots, product size variants, add-on products, personalized card messages, and a protected admin panel for managing products, orders, and categories.

## Glossary

- **Homepage**: The main landing page displaying announcement bar, hero banner, product carousels, category links, trust badges, delivery pass promo, newsletter signup, SEO content, FAQ accordion, and footer
- **Product_Catalog**: The page displaying all available flower products in a filterable, sortable grid layout with pagination
- **Product_Detail_Page**: The page displaying full information about a single product including image gallery, size options, add-ons, delivery date picker, and add-to-cart functionality
- **Cart**: The shopping cart component and page that holds selected products, add-ons, quantities, and delivery details before checkout
- **Checkout_Page**: The page where customers enter recipient details, delivery address, delivery date/time slot, card message, and complete Stripe payment
- **Order_Confirmation_Page**: The page displayed after successful payment showing order summary and delivery tracking information
- **Admin_Panel**: The protected section of the website for managing products, orders, and categories, accessible only to authenticated admin users
- **Announcement_Bar**: A top-of-page banner displaying promotional offers, delivery cutoff times, and guarantees
- **Hero_Banner**: A large seasonal banner section on the homepage with promotional messaging and call-to-action buttons
- **Product_Carousel**: A horizontally scrolling component displaying product cards with images, pricing, save badges, and delivery availability
- **Product_Card**: A UI component displaying a product's image, name, price, sale badge, free add-on badge, and delivery availability
- **Trust_Badge**: A visual indicator communicating guarantees such as next-day delivery, price match, freshness guarantee, and review ratings
- **Category_Quick_Link**: A horizontal row of clickable category buttons for quick navigation to filtered product views
- **Delivery_Pass**: A subscription service offering unlimited deliveries for a fixed fee
- **Newsletter_Signup**: A form component for collecting email addresses with an incentive offer
- **FAQ_Accordion**: A collapsible section displaying frequently asked questions and answers
- **Size_Variant**: A product option representing different sizes (Standard, Deluxe, Premium) each with distinct pricing
- **Add_On**: An additional product that can be bundled with a bouquet (chocolates, vase, teddy bear, personalized card)
- **Card_Message**: A personalized text message included with a flower delivery, subject to a character limit
- **Delivery_Slot**: A selectable date and time window for flower delivery
- **Stripe_Payment**: The payment processing integration using Stripe for secure card transactions
- **NextAuth_Session**: The JWT-based authentication session managed by NextAuth.js for admin access
- **Zustand_Store**: The client-side state management store persisting cart data to localStorage
- **Prisma_ORM**: The database ORM layer managing data models for products, orders, categories, and users
- **Server_Action**: A Next.js server-side function handling form submissions and data mutations
- **Zod_Schema**: A validation schema used to sanitize and validate all user input on both client and server

## Requirements

### Requirement 1: Homepage Layout and Announcement Bar

**User Story:** As a visitor, I want to see a visually appealing homepage with promotional information and featured products, so that I can quickly understand the brand and find products to purchase.

#### Acceptance Criteria

1. THE Homepage SHALL display an Announcement_Bar at the top of the page containing at least one promotional offer, a delivery cutoff time, and a freshness guarantee message.
2. THE Homepage SHALL display a Hero_Banner section with seasonal promotional imagery, a headline, a subheadline, a starting price indicator, and at least one call-to-action button linking to the Product_Catalog.
3. THE Homepage SHALL display at least two Product_Carousel sections, each containing a minimum of six Product_Card components that scroll horizontally.
4. THE Homepage SHALL display a Category_Quick_Link section with at least eight clickable category buttons (Birthday, Romantic, Under £30, Student Discount, Luxury, Sympathy, Sale, Same Day).
5. THE Homepage SHALL display a Trust_Badge section with four trust indicators: next-day delivery cutoff, price match promise, 7-day freshness guarantee, and customer review rating.
6. THE Homepage SHALL display a Delivery_Pass promotional section describing the subscription service.
7. THE Homepage SHALL display a Newsletter_Signup section with an email input field, a submit button, and a 10% discount incentive message.
8. THE Homepage SHALL display an SEO content section with rich text about delivery options, occasions, and flower types.
9. THE Homepage SHALL display an FAQ_Accordion section with at least five collapsible question-and-answer items.
10. THE Homepage SHALL display a multi-column footer containing company information, navigation links grouped by category (Information, Occasions), social media links, and payment method icons (Visa, Mastercard, Amex, PayPal, Apple Pay).

### Requirement 2: Product Carousel and Product Card Display

**User Story:** As a visitor, I want to browse featured products in horizontally scrolling carousels with clear pricing and availability information, so that I can quickly find attractive bouquets.

#### Acceptance Criteria

1. WHEN a Product_Carousel is rendered, THE Product_Carousel SHALL display Product_Card components in a horizontally scrollable container with smooth scroll behavior.
2. THE Product_Card SHALL display the product image, product name in uppercase text, and the current price prefixed with "from £".
3. WHEN a product has a sale price, THE Product_Card SHALL display the original price with a strikethrough and the sale price as the current price.
4. WHEN a product has a discount amount, THE Product_Card SHALL display a save badge showing the discount value (e.g., "Save £15").
5. WHEN a product includes a free add-on, THE Product_Card SHALL display a free add-on badge (e.g., "+ Free Chocs").
6. THE Product_Card SHALL display delivery availability text indicating the earliest delivery date (e.g., "Available for delivery tomorrow").
7. WHEN a visitor clicks on a Product_Card, THE Homepage SHALL navigate the visitor to the corresponding Product_Detail_Page.

### Requirement 3: Product Catalog Page

**User Story:** As a visitor, I want to browse all available flower products with filtering, sorting, and search capabilities, so that I can find the right bouquet for my needs.

#### Acceptance Criteria

1. THE Product_Catalog SHALL display products in a responsive grid layout with three columns on desktop, two columns on tablet, and one column on mobile.
2. THE Product_Catalog SHALL provide filter controls for occasion (Birthday, Romantic, Sympathy, Luxury, Seasonal), flower type, and price range.
3. WHEN a visitor applies a filter, THE Product_Catalog SHALL update the displayed products to show only products matching the selected filter criteria without a full page reload.
4. THE Product_Catalog SHALL provide a sort control with options for price low-to-high, price high-to-low, name A-Z, and newest first.
5. WHEN a visitor enters a search query, THE Product_Catalog SHALL filter products whose name or description contains the search text.
6. THE Product_Catalog SHALL implement pagination displaying a maximum of 12 products per page with navigation controls to move between pages.
7. WHEN no products match the applied filters or search query, THE Product_Catalog SHALL display a "No products found" message with a suggestion to clear filters.

### Requirement 4: Product Detail Page

**User Story:** As a visitor, I want to view detailed information about a flower product including images, size options, and add-ons, so that I can make an informed purchase decision.

#### Acceptance Criteria

1. THE Product_Detail_Page SHALL display an image gallery with a primary large image and thumbnail images that the visitor can click to change the primary image.
2. THE Product_Detail_Page SHALL display the product name, description, and current price for the selected Size_Variant.
3. THE Product_Detail_Page SHALL display three Size_Variant options (Standard, Deluxe, Premium) each with a distinct price, and the Standard option SHALL be selected by default.
4. WHEN a visitor selects a different Size_Variant, THE Product_Detail_Page SHALL update the displayed price and primary image to reflect the selected variant.
5. THE Product_Detail_Page SHALL display a delivery date picker allowing the visitor to select a Delivery_Slot from available dates within the next 14 days.
6. THE Product_Detail_Page SHALL display available Add_On products (chocolates, vase, teddy bear, personalized card) each with a name, price, and selectable checkbox.
7. WHEN a visitor selects the personalized card Add_On, THE Product_Detail_Page SHALL display a text input field for the Card_Message with a 200-character limit and a live character counter.
8. THE Product_Detail_Page SHALL display an "Add to Cart" button that adds the selected Size_Variant, selected Add_On products, selected Delivery_Slot, and Card_Message to the Cart.
9. WHEN a visitor clicks "Add to Cart", THE Product_Detail_Page SHALL display a toast notification confirming the item has been added to the Cart.

### Requirement 5: Shopping Cart

**User Story:** As a visitor, I want to review and manage items in my cart before proceeding to checkout, so that I can verify my order is correct.

#### Acceptance Criteria

1. THE Cart SHALL display a list of all added items, each showing the product name, selected Size_Variant, selected Add_On products, selected Delivery_Slot, quantity, and line item total price.
2. THE Cart SHALL provide quantity controls (increment, decrement, remove) for each item.
3. WHEN a visitor changes the quantity of an item, THE Cart SHALL recalculate and display the updated line item total and cart subtotal.
4. WHEN a visitor removes all items from the Cart, THE Cart SHALL display an "Your cart is empty" message with a link to the Product_Catalog.
5. THE Cart SHALL display the cart subtotal, delivery fee, and order total.
6. THE Cart SHALL persist its state to localStorage using the Zustand_Store so that cart contents survive page refreshes and browser restarts.
7. THE Cart SHALL display a "Proceed to Checkout" button that navigates the visitor to the Checkout_Page.
8. WHEN a Cart item includes a Card_Message, THE Cart SHALL display the Card_Message text for that item.

### Requirement 6: Checkout and Payment

**User Story:** As a customer, I want to enter delivery details and pay securely, so that I can complete my flower order.

#### Acceptance Criteria

1. THE Checkout_Page SHALL display a form collecting recipient name, recipient phone number, delivery address (street, city, postcode), and delivery instructions.
2. THE Checkout_Page SHALL display the selected Delivery_Slot for each item and allow the customer to modify the delivery date and time slot.
3. THE Checkout_Page SHALL display a Card_Message preview for items that include a personalized card.
4. THE Checkout_Page SHALL display an order summary showing all items, Add_On products, delivery fee, and order total.
5. THE Checkout_Page SHALL integrate Stripe_Payment for secure card payment processing.
6. WHEN a customer submits the checkout form, THE Checkout_Page SHALL validate all input fields using a Zod_Schema and display inline error messages for invalid fields.
7. WHEN payment is successful, THE Checkout_Page SHALL create an order record in the database via a Server_Action and redirect the customer to the Order_Confirmation_Page.
8. IF payment fails, THEN THE Checkout_Page SHALL display an error message describing the failure reason and allow the customer to retry payment.
9. IF any required field is empty or invalid on form submission, THEN THE Checkout_Page SHALL prevent form submission and highlight the first invalid field.

### Requirement 7: Order Confirmation

**User Story:** As a customer, I want to see a confirmation of my completed order with delivery tracking information, so that I know my order was placed successfully.

#### Acceptance Criteria

1. THE Order_Confirmation_Page SHALL display the order number, order date, and order status.
2. THE Order_Confirmation_Page SHALL display a summary of all ordered items including product name, Size_Variant, Add_On products, and Card_Message.
3. THE Order_Confirmation_Page SHALL display the delivery address, selected Delivery_Slot, and recipient name.
4. THE Order_Confirmation_Page SHALL display the payment total and payment method summary.
5. THE Order_Confirmation_Page SHALL display a "Continue Shopping" button linking to the Homepage.
6. WHEN the Order_Confirmation_Page loads, THE Zustand_Store SHALL clear the Cart contents.

### Requirement 8: About Page

**User Story:** As a visitor, I want to learn about the Raisa Wajs Florist brand, so that I can feel confident purchasing from a trustworthy business.

#### Acceptance Criteria

1. THE About page SHALL display the brand story, mission statement, and core values of Raisa Wajs Florist.
2. THE About page SHALL display a team section with at least two team member profiles, each containing a name, role, and photo placeholder.
3. THE About page SHALL use the consistent site layout including the Announcement_Bar, navigation, and footer.

### Requirement 9: Contact Page

**User Story:** As a visitor, I want to contact Raisa Wajs Florist with questions or requests, so that I can get assistance.

#### Acceptance Criteria

1. THE Contact page SHALL display a contact form with fields for name, email address, phone number (optional), subject, and message.
2. WHEN a visitor submits the contact form, THE Contact page SHALL validate all required fields using a Zod_Schema and display inline error messages for invalid fields.
3. WHEN the contact form is submitted with valid data, THE Contact page SHALL send the form data via a Server_Action and display a success toast notification.
4. IF the contact form submission fails, THEN THE Contact page SHALL display an error toast notification.
5. THE Contact page SHALL display business contact details including address, phone number, and email address.
6. THE Contact page SHALL display an embedded map showing the business location.

### Requirement 10: Admin Panel — Authentication

**User Story:** As an admin, I want to securely log in to the admin panel, so that only authorized users can manage the store.

#### Acceptance Criteria

1. THE Admin_Panel SHALL require authentication via a NextAuth_Session before granting access to any admin route.
2. WHEN an unauthenticated user attempts to access an Admin_Panel route, THE Admin_Panel SHALL redirect the user to the admin login page.
3. THE Admin_Panel login page SHALL display a form with email and password fields.
4. WHEN valid admin credentials are submitted, THE Admin_Panel SHALL create a NextAuth_Session and redirect the admin to the admin dashboard.
5. IF invalid credentials are submitted, THEN THE Admin_Panel SHALL display an "Invalid email or password" error message without revealing which field is incorrect.
6. THE Admin_Panel SHALL provide a logout button that destroys the NextAuth_Session and redirects to the Homepage.

### Requirement 11: Admin Panel — Product Management

**User Story:** As an admin, I want to create, read, update, and delete products, so that I can manage the store's inventory.

#### Acceptance Criteria

1. THE Admin_Panel SHALL display a product list page showing all products with name, category, base price, and status (active/inactive).
2. THE Admin_Panel SHALL provide a "Create Product" form with fields for product name, description, category, images (URLs), and at least three Size_Variant entries (Standard, Deluxe, Premium) each with a price.
3. WHEN an admin submits the create product form with valid data, THE Admin_Panel SHALL create the product record via a Server_Action and display a success toast notification.
4. THE Admin_Panel SHALL provide an "Edit Product" form pre-populated with the existing product data.
5. WHEN an admin submits the edit product form with valid data, THE Admin_Panel SHALL update the product record via a Server_Action and display a success toast notification.
6. WHEN an admin clicks "Delete" on a product, THE Admin_Panel SHALL display a confirmation dialog before deleting the product record via a Server_Action.
7. WHEN a product is deleted, THE Admin_Panel SHALL remove the product from the product list and display a success toast notification.

### Requirement 12: Admin Panel — Order Management

**User Story:** As an admin, I want to view and manage customer orders, so that I can fulfill deliveries and track order status.

#### Acceptance Criteria

1. THE Admin_Panel SHALL display an order list page showing all orders with order number, customer name, order date, delivery date, total amount, and status.
2. THE Admin_Panel SHALL provide an order detail view showing all order items, Add_On products, Card_Message, delivery address, Delivery_Slot, and payment information.
3. WHEN an admin updates the order status, THE Admin_Panel SHALL save the updated status via a Server_Action and display a success toast notification.
4. THE Admin_Panel SHALL provide filter controls to filter orders by status (pending, confirmed, out for delivery, delivered, cancelled).

### Requirement 13: Admin Panel — Category Management

**User Story:** As an admin, I want to manage product categories, so that I can organize the product catalog.

#### Acceptance Criteria

1. THE Admin_Panel SHALL display a category list page showing all categories with name and product count.
2. THE Admin_Panel SHALL provide a "Create Category" form with a name field and an optional description field.
3. WHEN an admin submits the create category form with valid data, THE Admin_Panel SHALL create the category record via a Server_Action and display a success toast notification.
4. THE Admin_Panel SHALL provide an "Edit Category" form pre-populated with the existing category data.
5. WHEN an admin deletes a category that has associated products, THE Admin_Panel SHALL display a warning message and prevent deletion until all products are reassigned.

### Requirement 14: Responsive Design and Accessibility

**User Story:** As a visitor using any device or assistive technology, I want the website to be fully usable and accessible, so that I can browse and purchase flowers regardless of my device or abilities.

#### Acceptance Criteria

1. THE Homepage SHALL render correctly on mobile (320px–767px), tablet (768px–1023px), and desktop (1024px and above) viewports.
2. THE Product_Catalog SHALL adjust its grid layout from one column on mobile, to two columns on tablet, to three columns on desktop.
3. THE navigation SHALL collapse into a hamburger menu on mobile viewports and expand into a horizontal menu on desktop viewports.
4. THE Homepage SHALL use semantic HTML elements (header, nav, main, section, article, footer) throughout the page structure.
5. THE Homepage SHALL provide ARIA labels on all interactive elements including the Product_Carousel navigation controls, FAQ_Accordion toggle buttons, and the Newsletter_Signup form.
6. THE Homepage SHALL support full keyboard navigation, allowing users to tab through all interactive elements and activate them with Enter or Space keys.
7. THE Homepage SHALL maintain a minimum color contrast ratio of 4.5:1 for normal text and 3:1 for large text against background colors.

### Requirement 15: Performance and SEO

**User Story:** As a business owner, I want the website to load quickly and rank well in search engines, so that I can attract more customers.

#### Acceptance Criteria

1. THE Homepage SHALL use Next.js Image component for all product and banner images with appropriate width, height, and alt text attributes.
2. THE Homepage SHALL include meta tags for title, description, and Open Graph properties on every page.
3. THE Product_Detail_Page SHALL generate structured data (JSON-LD) for each product following the Schema.org Product schema.
4. THE Homepage SHALL achieve a Lighthouse Performance score of 80 or above on desktop.
5. THE Homepage SHALL implement lazy loading for images below the fold.

### Requirement 16: Security

**User Story:** As a business owner, I want the website to be secure against common web vulnerabilities, so that customer data is protected.

#### Acceptance Criteria

1. THE Next.js configuration SHALL set HTTP security headers including X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security, Referrer-Policy, and Permissions-Policy.
2. THE Checkout_Page SHALL validate all user input on both client and server using Zod_Schema validation.
3. THE Stripe_Payment integration SHALL verify webhook signatures before processing payment events.
4. THE Admin_Panel SHALL use JWT-based NextAuth_Session with a strong NEXTAUTH_SECRET stored as an environment variable.
5. THE application SHALL store all secrets (database URL, Stripe keys, NextAuth secret) as environment variables and never hardcode them in source code.
6. THE application SHALL implement rate limiting on public-facing endpoints including the contact form, Newsletter_Signup, and search functionality.

### Requirement 17: Database Schema and Seed Data

**User Story:** As a developer, I want a well-structured database schema with realistic seed data, so that I can develop and test the application with representative data.

#### Acceptance Criteria

1. THE Prisma_ORM schema SHALL define models for Product, SizeVariant, Category, AddOn, Order, OrderItem, OrderItemAddOn, and User.
2. THE Prisma_ORM schema SHALL enforce referential integrity with appropriate foreign key relationships between all related models.
3. THE database seed script SHALL create at least 15 flower products across at least six categories (Birthday, Romantic, Sympathy, Luxury, Seasonal, Under £30).
4. THE database seed script SHALL create at least three Size_Variant records (Standard, Deluxe, Premium) for each product with distinct prices.
5. THE database seed script SHALL create at least four Add_On products (chocolates, vase, teddy bear, personalized card) with prices.
6. THE database seed script SHALL use placeholder image URLs from Unsplash for all product images.
7. THE database seed script SHALL create at least one admin user with a hashed password.

### Requirement 18: Cart State Management

**User Story:** As a visitor, I want my cart to persist across page refreshes and browser sessions, so that I do not lose my selected items.

#### Acceptance Criteria

1. THE Zustand_Store SHALL manage cart state including items, quantities, selected Size_Variant, selected Add_On products, selected Delivery_Slot, and Card_Message for each item.
2. THE Zustand_Store SHALL persist cart state to localStorage and rehydrate on page load.
3. WHEN a visitor adds an item to the Cart, THE Zustand_Store SHALL add the item with its selected options to the cart state.
4. WHEN a visitor updates the quantity of a cart item, THE Zustand_Store SHALL update the quantity and recalculate the cart totals.
5. WHEN a visitor removes an item from the Cart, THE Zustand_Store SHALL remove the item from the cart state and update the cart totals.
6. THE Zustand_Store SHALL expose a computed cart item count for display in the navigation header cart icon.

### Requirement 19: Toast Notifications

**User Story:** As a visitor, I want to receive visual feedback when I perform actions, so that I know my actions were successful or if errors occurred.

#### Acceptance Criteria

1. WHEN an action succeeds (add to cart, form submission, admin CRUD operation), THE application SHALL display a success toast notification with a descriptive message.
2. WHEN an action fails (payment failure, form validation error, server error), THE application SHALL display an error toast notification with a descriptive message.
3. THE toast notification SHALL automatically dismiss after 5 seconds.
4. THE toast notification SHALL provide a manual close button for immediate dismissal.
5. THE toast notification SHALL be positioned at the top-right of the viewport and stack vertically when multiple notifications are active.
