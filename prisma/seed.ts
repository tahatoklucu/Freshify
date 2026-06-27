import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

// .env dosyasını doğru yükle
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('🔄 Cleaning up database and starting seed process...');

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable could not be loaded!");
  }

  // Önce yorumları (child), sonra yemekleri (parent), en son kategorileri (grandparent) sil
  // onDelete: Cascade kullanıyorsan sadece kategorileri silmek de yeterlidir.
  await prisma.review.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();

  // 1. KATEGORİLERİ OLUŞTUR
  const mains = await prisma.category.create({
    data: {
      name: 'Main Dishes',
      slug: 'main-dishes',
      description: 'Delicious dinner alternatives.',
      imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    },
  });

  const desserts = await prisma.category.create({
    data: {
      name: 'Desserts',
      slug: 'desserts',
      description: 'The most exquisite sweet treats.',
      imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587',
    },
  });

  // 2. YEMEKLERİ OLUŞTUR
  const chicken = await prisma.item.create({
    data: {
      name: 'Baked Saucy Chicken',
      slug: 'baked-saucy-chicken',
      description: 'Perfectly roasted oven chicken.',
      imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91',
      categoryId: mains.id,
      rating: 5,
      ratingCount: 1,
    },
  });

  const dessertItem = await prisma.item.create({
    data: {
      name: 'Chocolate Lava Cake',
      slug: 'chocolate-lava-cake',
      description: 'Rich warm liquid center.',
      imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c',
      categoryId: desserts.id,
      rating: 4,
      ratingCount: 1,
    },
  });

  // 3. YORUMLARI OLUŞTUR
  await prisma.review.createMany({
    data: [
      {
        itemId: chicken.id,
        rating: 5,
        content: 'This chicken recipe is absolutely amazing!',
      },
      {
        itemId: dessertItem.id,
        rating: 4,
        content: 'Very delicious, highly recommend!',
      },
    ],
  });

  console.log('🚀 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });