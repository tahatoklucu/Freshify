import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.item.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "chef@whisk.com",
      name: "Master Chef",
      password: "hashed_password_placeholder",
    },
  });

  const categories = await prisma.category.createManyAndReturn({
    data: [
      { name: "Soups", slug: "soups", description: "Warm and cozy soups", imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd" },
      { name: "Desserts", slug: "desserts", description: "Sweet indulgence", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587" },
      { name: "Main Courses", slug: "main-courses", description: "Hearty main dishes", imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836" },
      { name: "Appetizers", slug: "appetizers", description: "Small tasty bites", imageUrl: "https://images.unsplash.com/photo-1541529086526-db283c563270" },
    ],
  });

  const items = [
    { name: "Lentil Soup", slug: "lentil-soup", imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd", categoryId: categories[0].id },
    { name: "Chocolate Lava Cake", slug: "lava-cake", imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51", categoryId: categories[1].id },
    { name: "Strawberry Cheesecake", slug: "strawberry-cheesecake", imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad", categoryId: categories[1].id },
    { name: "Grilled Ribeye Steak", slug: "ribeye-steak", imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092", categoryId: categories[2].id },
    { name: "Classic Bruschetta", slug: "classic-bruschetta", imageUrl: "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f", categoryId: categories[3].id },
  ];

  for (const item of items) {
    const createdItem = await prisma.item.create({
      data: {
        ...item,
        description: "This is a high-quality recipe ingredient and step-by-step guide.",
        rating: 4.5,
        ratingCount: 100,
        ingredients: ["Ingredient 1", "Ingredient 2", "Secret Component"],
        instructions: ["Step 1: Preparation", "Step 2: Cooking", "Step 3: Serving"],
        userId: user.id,
      },
    });

    await prisma.review.createMany({
      data: [
        { content: "Excellent recipe, loved the flavors!", rating: 5, itemId: createdItem.id, userId: user.id },
        { content: "Very easy to follow and delicious.", rating: 4, itemId: createdItem.id, userId: user.id },
      ],
    });
  }

  console.log("Database successfully seeded with full details.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });