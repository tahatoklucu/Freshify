import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import path from 'path';

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

  // Veritabanını temizle
  await prisma.review.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();

  // 1. KATEGORİLERİ OLUŞTUR
  const mains = await prisma.category.create({ data: { name: 'Main Dishes', slug: 'main-dishes', description: 'Delicious dinner alternatives.', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c' } });
  const desserts = await prisma.category.create({ data: { name: 'Desserts', slug: 'desserts', description: 'Exquisite sweet treats.', imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587' } });
  const soups = await prisma.category.create({ data: { name: 'Soups', slug: 'soups', description: 'Heartwarming comfort foods.', imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554' } });
  const salads = await prisma.category.create({ data: { name: 'Salads', slug: 'salads', description: 'Fresh and vibrant selections.', imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd' } });

  // 2. YEMEKLERİ OLUŞTUR (ingredients ve instructions eklendi)
  const items = await Promise.all([
    prisma.item.create({ 
      data: { 
        name: 'Baked Saucy Chicken', 
        slug: 'baked-saucy-chicken', 
        description: 'Perfectly roasted oven chicken.', 
        imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91', 
        categoryId: mains.id, 
        rating: 5, 
        ratingCount: 2,
        ingredients: ['1 Whole Chicken', '2 tbsp Olive oil', '1 tsp Paprika', 'Salt and Pepper'],
        instructions: ['Preheat oven to 200°C.', 'Rub chicken with oil and spices.', 'Bake for 45 minutes until golden brown.']
      } 
    }),
    prisma.item.create({ 
      data: { 
        name: 'Traditional Stuffed Eggplant', 
        slug: 'stuffed-eggplant', 
        description: 'Classic roasted eggplants.', 
        imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027', 
        categoryId: mains.id, 
        rating: 4, 
        ratingCount: 1,
        ingredients: ['2 Eggplants', '200g Ground meat', '1 Onion', '2 cloves Garlic'],
        instructions: ['Slice eggplants and scoop out the middle.', 'Sauté meat with onions and garlic.', 'Fill eggplants and roast for 30 minutes.']
      } 
    }),
    prisma.item.create({ 
      data: { 
        name: 'Chocolate Lava Cake', 
        slug: 'lava-cake', 
        description: 'Rich warm liquid center.', 
        imageUrl: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c', 
        categoryId: desserts.id, 
        rating: 5, 
        ratingCount: 1,
        ingredients: ['100g Dark chocolate', '50g Butter', '2 Eggs', '2 tbsp Flour'],
        instructions: ['Melt chocolate and butter together.', 'Whisk eggs and sugar, then combine.', 'Bake in ramekins for 10 minutes.']
      } 
    }),
    prisma.item.create({ 
      data: { 
        name: 'Red Lentil Soup', 
        slug: 'lentil-soup', 
        description: 'Smooth, protein-packed soup.', 
        imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554', 
        categoryId: soups.id, 
        rating: 5, 
        ratingCount: 1,
        ingredients: ['1 cup Red lentils', '1 Onion', '1 Carrot', '6 cups Vegetable broth'],
        instructions: ['Sauté onion and carrot.', 'Add lentils and broth.', 'Simmer for 20 minutes and blend until smooth.']
      } 
    }),
    prisma.item.create({ 
      data: { 
        name: 'Caesar Salad', 
        slug: 'caesar-salad', 
        description: 'Crispy lettuce with garlic croutons.', 
        imageUrl: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9', 
        categoryId: salads.id, 
        rating: 4, 
        ratingCount: 1,
        ingredients: ['1 head Romaine lettuce', '50g Croutons', 'Parmesan cheese', 'Caesar dressing'],
        instructions: ['Chop lettuce.', 'Toss with dressing and croutons.', 'Top with grated parmesan.']
      } 
    })
  ]);

  // 3. YORUMLARI OLUŞTUR
  await prisma.review.createMany({
    data: [
      { itemId: items[0].id, rating: 5, content: 'This chicken recipe is absolutely amazing!' },
      { itemId: items[0].id, rating: 4, content: 'Really good, but needed more salt.' },
      { itemId: items[1].id, rating: 4, content: 'Authentic taste! Loved it.' },
      { itemId: items[2].id, rating: 5, content: 'The lava effect was perfect!' },
      { itemId: items[3].id, rating: 5, content: 'The best lentil soup I have ever had.' },
      { itemId: items[4].id, rating: 4, content: 'Very fresh and the dressing is great.' }
    ],
  });

  console.log('🚀 Seeding completed with ingredients and instructions!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });