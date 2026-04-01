import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";

const url = process.env.DATABASE_URL ?? "file:./dev.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const adapter = new PrismaLibSql({
  url,
  ...(authToken && { authToken }),
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌸 Seeding Raisa Wajs Florist database...");

  // Clear existing data in correct order (respecting foreign keys)
  await prisma.orderItemAddOn.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.sizeVariant.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.addOn.deleteMany();
  await prisma.user.deleteMany();

  // --- Categories ---
  console.log("📁 Creating categories...");
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Birthday",
        slug: "birthday",
        description: "Beautiful birthday bouquets to make their day special",
      },
    }),
    prisma.category.create({
      data: {
        name: "Romantic",
        slug: "romantic",
        description: "Express your love with stunning romantic arrangements",
      },
    }),
    prisma.category.create({
      data: {
        name: "Sympathy",
        slug: "sympathy",
        description: "Thoughtful sympathy flowers to show you care",
      },
    }),
    prisma.category.create({
      data: {
        name: "Luxury",
        slug: "luxury",
        description: "Premium luxury bouquets for the most discerning taste",
      },
    }),
    prisma.category.create({
      data: {
        name: "Seasonal",
        slug: "seasonal",
        description: "Fresh seasonal flowers celebrating the time of year",
      },
    }),
    prisma.category.create({
      data: {
        name: "Under £30",
        slug: "under-30",
        description: "Gorgeous bouquets that won't break the bank",
      },
    }),
  ]);

  const [birthday, romantic, sympathy, luxury, seasonal, under30] = categories;

  // --- Add-Ons ---
  console.log("🎁 Creating add-ons...");
  await Promise.all([
    prisma.addOn.create({
      data: {
        name: "Luxury Chocolates",
        price: 5.99,
        imageUrl: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&h=200&fit=crop",
        isActive: true,
      },
    }),
    prisma.addOn.create({
      data: {
        name: "Glass Vase",
        price: 7.99,
        imageUrl: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=200&h=200&fit=crop",
        isActive: true,
      },
    }),
    prisma.addOn.create({
      data: {
        name: "Teddy Bear",
        price: 9.99,
        imageUrl: "https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=200&h=200&fit=crop",
        isActive: true,
      },
    }),
    prisma.addOn.create({
      data: {
        name: "Personalised Card",
        price: 2.99,
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop",
        isActive: true,
      },
    }),
  ]);

  // --- Helper to create a product with variants and images ---
  interface ProductSeed {
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    hasFreeAddOn?: boolean;
    freeAddOnLabel?: string;
    standardPrice: number;
    deluxePrice: number;
    premiumPrice: number;
    originalStandardPrice?: number;
    originalDeluxePrice?: number;
    originalPremiumPrice?: number;
    imageUrl: string;
  }

  async function createProduct(data: ProductSeed) {
    return prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        categoryId: data.categoryId,
        isActive: true,
        hasFreeAddOn: data.hasFreeAddOn ?? false,
        freeAddOnLabel: data.freeAddOnLabel ?? null,
        images: {
          create: [
            {
              url: data.imageUrl,
              alt: `${data.name} bouquet`,
              order: 0,
            },
            {
              url: data.imageUrl.replace("w=600", "w=400"),
              alt: `${data.name} bouquet - alternate view`,
              order: 1,
            },
          ],
        },
        sizeVariants: {
          create: [
            {
              name: "Standard",
              price: data.standardPrice,
              originalPrice: data.originalStandardPrice ?? null,
            },
            {
              name: "Deluxe",
              price: data.deluxePrice,
              originalPrice: data.originalDeluxePrice ?? null,
            },
            {
              name: "Premium",
              price: data.premiumPrice,
              originalPrice: data.originalPremiumPrice ?? null,
            },
          ],
        },
      },
    });
  }

  // --- Products ---
  console.log("💐 Creating products...");

  // Birthday products
  await createProduct({
    name: "Rose & Lily",
    slug: "rose-and-lily",
    description: "A stunning combination of classic roses and elegant lilies, perfect for celebrating a birthday in style. This hand-tied bouquet features soft pink roses alongside fragrant white lilies, finished with seasonal greenery.",
    categoryId: birthday.id,
    hasFreeAddOn: true,
    freeAddOnLabel: "+ Free Chocs",
    standardPrice: 34.99,
    deluxePrice: 44.99,
    premiumPrice: 54.99,
    imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "Radiance",
    slug: "radiance",
    description: "Brighten their birthday with this radiant mix of golden sunflowers, orange gerberas, and warm-toned roses. A joyful arrangement that brings sunshine to any room.",
    categoryId: birthday.id,
    standardPrice: 29.99,
    deluxePrice: 39.99,
    premiumPrice: 49.99,
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "Bright Tulips",
    slug: "bright-tulips",
    description: "A cheerful hand-tied bouquet of vibrant mixed tulips in shades of pink, yellow, red, and purple. Simple, elegant, and guaranteed to bring a smile.",
    categoryId: birthday.id,
    hasFreeAddOn: true,
    freeAddOnLabel: "+ Free Card",
    standardPrice: 27.99,
    deluxePrice: 37.99,
    premiumPrice: 47.99,
    originalStandardPrice: 34.99,
    originalDeluxePrice: 44.99,
    originalPremiumPrice: 54.99,
    imageUrl: "https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=600&h=600&fit=crop",
  });

  // Romantic products
  await createProduct({
    name: "50 Red Roses",
    slug: "50-red-roses",
    description: "Make a grand romantic gesture with fifty stunning long-stemmed red roses. The ultimate expression of love, hand-tied and presented in luxury wrapping.",
    categoryId: romantic.id,
    standardPrice: 79.99,
    deluxePrice: 99.99,
    premiumPrice: 129.99,
    imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "Moonlight",
    slug: "moonlight",
    description: "An enchanting arrangement of white roses, pale blue delphiniums, and silver-dusted eucalyptus. Romantic and ethereal, perfect for an anniversary or special evening.",
    categoryId: romantic.id,
    hasFreeAddOn: true,
    freeAddOnLabel: "+ Free Chocs",
    standardPrice: 39.99,
    deluxePrice: 49.99,
    premiumPrice: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "Rose Garden",
    slug: "rose-garden",
    description: "A luxurious mix of garden roses in soft pinks and creams, accented with spray roses and lush foliage. A timeless romantic classic.",
    categoryId: romantic.id,
    standardPrice: 44.99,
    deluxePrice: 59.99,
    premiumPrice: 74.99,
    originalStandardPrice: 54.99,
    originalDeluxePrice: 69.99,
    originalPremiumPrice: 84.99,
    imageUrl: "https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=600&h=600&fit=crop",
  });

  // Sympathy products
  await createProduct({
    name: "Serenity",
    slug: "serenity",
    description: "A peaceful arrangement of white lilies, cream roses, and soft green foliage. A gentle and dignified tribute to express your deepest sympathies.",
    categoryId: sympathy.id,
    standardPrice: 39.99,
    deluxePrice: 54.99,
    premiumPrice: 69.99,
    imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "White Blossom",
    slug: "white-blossom",
    description: "An elegant all-white bouquet of roses, chrysanthemums, and gypsophila. A pure and heartfelt way to show you care during difficult times.",
    categoryId: sympathy.id,
    standardPrice: 34.99,
    deluxePrice: 49.99,
    premiumPrice: 64.99,
    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop",
  });

  // Luxury products
  await createProduct({
    name: "Opulence",
    slug: "opulence",
    description: "An extravagant arrangement of premium Ecuadorian roses, oriental lilies, and exotic orchids. Presented in luxury gift wrapping with a satin ribbon finish.",
    categoryId: luxury.id,
    standardPrice: 69.99,
    deluxePrice: 89.99,
    premiumPrice: 119.99,
    imageUrl: "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "Grand Gesture",
    slug: "grand-gesture",
    description: "A show-stopping display of 100 premium roses in deep red, arranged in a stunning dome shape. The ultimate luxury floral gift for life's most important moments.",
    categoryId: luxury.id,
    hasFreeAddOn: true,
    freeAddOnLabel: "+ Free Vase",
    standardPrice: 99.99,
    deluxePrice: 139.99,
    premiumPrice: 179.99,
    imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=600&fit=crop",
  });

  // Seasonal products
  await createProduct({
    name: "Springtime",
    slug: "springtime",
    description: "Celebrate the season with this vibrant mix of daffodils, tulips, hyacinths, and ranunculus. A fresh and fragrant bouquet that captures the essence of spring.",
    categoryId: seasonal.id,
    standardPrice: 32.99,
    deluxePrice: 42.99,
    premiumPrice: 52.99,
    imageUrl: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "Spring Hedgerow",
    slug: "spring-hedgerow",
    description: "Inspired by the English countryside, this rustic bouquet features wildflowers, cornflowers, and meadow grasses tied with natural twine. Beautifully untamed.",
    categoryId: seasonal.id,
    standardPrice: 29.99,
    deluxePrice: 39.99,
    premiumPrice: 49.99,
    originalStandardPrice: 36.99,
    originalDeluxePrice: 46.99,
    originalPremiumPrice: 56.99,
    imageUrl: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "Spring Sunshine",
    slug: "spring-sunshine",
    description: "A bright and cheerful arrangement of yellow roses, orange gerberas, and golden chrysanthemums. Like a burst of warm sunshine delivered to their door.",
    categoryId: seasonal.id,
    hasFreeAddOn: true,
    freeAddOnLabel: "+ Free Chocs",
    standardPrice: 31.99,
    deluxePrice: 41.99,
    premiumPrice: 51.99,
    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=600&fit=crop",
  });

  // Under £30 products
  await createProduct({
    name: "Sunlight",
    slug: "sunlight",
    description: "A delightful mini bouquet of sunny yellow roses and white daisies. Small but perfectly formed, ideal for brightening someone's day without breaking the bank.",
    categoryId: under30.id,
    standardPrice: 19.99,
    deluxePrice: 24.99,
    premiumPrice: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1444021465936-c6ca81d39b84?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "Sweet Treat",
    slug: "sweet-treat",
    description: "A charming posy of pink carnations, white spray roses, and fragrant freesias. Wrapped in pastel tissue and tied with a matching ribbon.",
    categoryId: under30.id,
    standardPrice: 22.99,
    deluxePrice: 27.99,
    premiumPrice: 29.99,
    originalStandardPrice: 27.99,
    originalDeluxePrice: 32.99,
    originalPremiumPrice: 37.99,
    imageUrl: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=600&fit=crop",
  });

  await createProduct({
    name: "Petite Posy",
    slug: "petite-posy",
    description: "A dainty hand-tied posy of mixed seasonal blooms in soft pastel shades. The perfect little pick-me-up gift at an affordable price.",
    categoryId: under30.id,
    hasFreeAddOn: true,
    freeAddOnLabel: "+ Free Card",
    standardPrice: 17.99,
    deluxePrice: 22.99,
    premiumPrice: 27.99,
    imageUrl: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop",
  });

  // --- Admin User ---
  console.log("👤 Creating admin user...");
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.user.create({
    data: {
      email: "admin@raisawajs.com",
      passwordHash: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  console.log("✅ Seed complete!");
  console.log("   - 6 categories");
  console.log("   - 16 products (each with 3 size variants)");
  console.log("   - 4 add-ons");
  console.log("   - 1 admin user (admin@raisawajs.com / admin123)");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
