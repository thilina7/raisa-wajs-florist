# Universal Website Creation Prompt Template

Use this prompt with any AI coding assistant to build a professional website from a reference. Fill in the `[BRACKETED]` placeholders with your specific details.

---

## The Prompt

```
I want to create a professional [BUSINESS TYPE] website.

Reference website: [PASTE URL HERE]

Please visit the reference website, analyze its design, layout, features, and user
experience, then create something similar but improved.

## Business Details
- Business name: [YOUR BUSINESS NAME]
- Industry: [e.g., jewelry, clothing, electronics, food, services]
- Primary products/services: [DESCRIBE WHAT YOU SELL OR OFFER]
- Brand colors (if any): [e.g., deep purple and gold, or "suggest luxury colors"]
- Brand tone: [e.g., luxury, modern, playful, minimalist, corporate]

## Tech Stack
- Framework: Next.js 14+ (App Router)
- Styling: Tailwind CSS
- Database: Prisma with SQLite (dev) / PostgreSQL (production)
- Authentication: NextAuth.js
- Payments: Stripe
- State management: Zustand
- Testing: Vitest + React Testing Library

## Required Pages
1. Homepage — hero carousel/banner, featured products, brand story section, footer
2. Product catalog — grid layout with filtering, sorting, search, and pagination
3. Product detail — image gallery, description, specs, add-to-cart
4. Cart — item list, quantity controls, subtotal, proceed to checkout
5. Checkout — shipping form, Stripe payment integration
6. Order confirmation — order summary with status
7. About page — brand story, mission, values
8. Contact page — contact form with validation
9. Admin panel (protected) — product CRUD, order management, login

## Key Requirements
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- SEO-friendly with proper meta tags
- Fast loading with optimized images
- Accessible (semantic HTML, ARIA labels, keyboard navigation)
- Cart state persisted in localStorage via Zustand
- Server actions for form submissions and data mutations
- Proper error handling and loading states
- Toast notifications for user feedback
- Clean, modular component architecture

## Design Guidelines
- Study the reference website's layout, spacing, typography, and color usage
- Match or exceed its visual quality
- Use a consistent design system (spacing scale, color palette, typography)
- Add subtle hover effects, transitions, and micro-interactions
- Ensure the design feels premium and trustworthy

## Database Seed Data
- Create realistic seed data with at least 10-15 products
- Include varied categories, prices, and descriptions
- Add placeholder images (use Unsplash URLs or similar)

## Security Standards
- Set HTTP security headers (X-Frame-Options, X-Content-Type-Options, HSTS, Referrer-Policy, Permissions-Policy) via Next.js config
- Rate limit all public-facing endpoints (login, search, contact form, file uploads)
- Protect file upload routes with authentication — only admin users should upload
- Sanitize uploaded filenames to prevent path traversal attacks
- Cap search query length and result limits to prevent abuse
- Validate and sanitize all user input with Zod schemas on both client and server
- Use environment variables for all secrets (never hardcode API keys, DB credentials, etc.)
- Verify Stripe webhook signatures before processing payment events
- Use JWT-based sessions with a strong NEXTAUTH_SECRET
- Run `npm audit` regularly to catch known dependency vulnerabilities
- Keep all dependencies up to date, especially security-critical ones (next-auth, stripe, bcryptjs)

## Implementation Approach
1. Start with the database schema and seed data
2. Build the layout (navbar, footer) and global styles
3. Implement pages one by one starting with homepage
4. Add cart functionality and checkout flow
5. Build the admin panel last
6. Add tests for critical components and flows
7. Add security hardening (headers, rate limiting, auth on upload routes)

Please analyze the reference website first, then create a spec with requirements,
design, and implementation tasks before writing any code.
```

---

## How to Use This Template

### Step 1: Fill in the placeholders
Replace every `[BRACKETED]` value with your specific business details.

### Step 2: Provide the reference URL
Always include a real reference website URL so the AI can study the actual design.

### Step 3: Customize the pages list
Remove pages you don't need or add ones specific to your business:
- **Restaurant**: Add menu page, reservations, gallery
- **Portfolio**: Add projects page, testimonials, case studies
- **SaaS**: Add pricing page, features, documentation
- **Blog**: Add blog listing, categories, author pages

### Step 4: Adjust the tech stack (optional)
The default stack works great for most projects. Swap if needed:
- Payments: Stripe → PayPal, Razorpay, etc.
- Database: SQLite → MySQL, MongoDB, etc.
- Styling: Tailwind → Chakra UI, styled-components, etc.

---

## Example: Bakery Website

```
I want to create a professional bakery e-commerce website.

Reference website: https://example-bakery.com

Please visit the reference website, analyze its design, layout, features, and user
experience, then create something similar but improved.

## Business Details
- Business name: Sweet Crumbs Bakery
- Industry: Food & Bakery
- Primary products/services: Custom cakes, pastries, cookies, bread, catering
- Brand colors: Warm cream (#FFF8F0), soft pink (#E8A0BF), chocolate brown (#5C3D2E)
- Brand tone: Warm, inviting, artisanal, homemade feel
```

---

## Tips for Best Results

1. **Always provide a reference URL** — this gives the AI concrete design patterns to work from
2. **Be specific about brand tone** — "luxury" vs "playful" produces very different designs
3. **Ask for a spec first** — requirements → design → tasks prevents jumping into code without a plan
4. **Start with seed data** — having realistic data makes the UI look polished from day one
5. **Iterate on design** — share screenshots and ask for refinements after the first pass
