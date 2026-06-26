import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Find and force load the exact path of the .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

// Pass the database URL directly to PrismaClient to guarantee loading
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('🔄 Cleaning up database and starting seed process...');
  
  // Early check to fail fast if DATABASE_URL is still missing
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable could not be loaded! Check your .env file.");
  }

  // ⚠️ CRITICAL: In relational databases, delete child data (Item) before parent data (Category).
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();

  // 1. CREATING CATEGORIES (In English)
  // We use single creates instead of createMany to easily capture the generated IDs
  // and map them seamlessly to the recipe items.
  
  const mains = await prisma.category.create({
    data: {
      name: 'Main Dishes',
      slug: 'main-dishes',
      description: 'Delicious dinner alternatives featuring meat, chicken, and healthy vegetables.',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    },
  });

  const desserts = await prisma.category.create({
    data: {
      name: 'Desserts',
      slug: 'desserts',
      description: 'The most exquisite milk-based, syrupy, and rich chocolate dessert recipes.',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    },
  });

  const soups = await prisma.category.create({
    data: {
      name: 'Soups',
      slug: 'soups',
      description: 'Heartwarming, comforting, and practical soups perfect for every season.',
      imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554',
    },
  });

  const salads = await prisma.category.create({
    data: {
      name: 'Salads',
      slug: 'salads',
      description: 'Diet-friendly, fresh, crisp, and vibrant healthy salad selections.',
      imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    },
  });

  console.log('✅ Categories successfully created. Now injecting recipe items...');

  await prisma.item.createMany({
    data: [
      {
        name: 'Baked Saucy Chicken',
        slug: 'baked-saucy-chicken',
        description: 'Perfectly roasted oven chicken tossed with baby potatoes and a special herb-infused spice blend.',
        imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=800&q=80',
        categoryId: mains.id,
        rating: 0,
        ratingCount: 0,
      },
      {
        name: 'Traditional Stuffed Eggplant',
        slug: 'traditional-stuffed-eggplant',
        description: 'Classic roasted eggplants stuffed with a savory minced meat, onion, and tomato filling.',
        imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80',
        categoryId: mains.id,
        rating: 0,
        ratingCount: 0,
      },
      {
        name: 'Chocolate Lava Cake',
        slug: 'chocolate-lava-cake',
        description: 'Freshly baked, decadent chocolate soufflé with a rich, warm flowing liquid center.',
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c',
        categoryId: desserts.id,
        rating: 0,
        ratingCount: 0,
      },
      {
        name: 'Red Lentil Soup',
        slug: 'red-lentil-soup',
        description: 'Restaurant-style smooth lentil soup served with a drizzle of warm, sizzling chili-butter sauce.',
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554',
        categoryId: soups.id,
        rating: 0,
        ratingCount: 0,
      },
      {
        name: 'Classic Caesar Salad',
        slug: 'classic-caesar-salad',
        description: 'Crisp romaine lettuce topped with tender grilled chicken breast strips, crunchy garlic croutons, and premium Caesar dressing.',
        imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9',
        categoryId: salads.id,
        rating: 0,
        ratingCount: 0,
      },
    ],
  });

  console.log('🚀 All English categories and recipe items successfully migrated to the database!');
}

main()
  .catch((e) => {
    console.error('❌ An error occurred during the seed process:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });