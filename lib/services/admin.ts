import { db } from "@/lib/db";

const ADMIN_LIST_LIMIT = 50;

export async function getAdminDashboardData() {
  const [userCount, recipeCount, reviewCount, recentRecipes] =
    await Promise.all([
      db.user.count(),
      db.item.count(),
      db.review.count(),
      db.item.findMany({
        take: 5,
        orderBy: { id: "desc" },
        select: {
          id: true,
          name: true,
          imageUrl: true,
          cookingTime: true,
          heatLevel: true,
        },
      }),
    ]);

  return { userCount, recipeCount, reviewCount, recentRecipes };
}

export async function getAdminRecipes() {
  return db.item.findMany({
    take: ADMIN_LIST_LIMIT,
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      imageUrl: true,
      cookingTime: true,
      heatLevel: true,
      category: {
        select: { id: true, name: true, slug: true },
      },
    },
  });
}

export async function getAdminUsers() {
  return db.user.findMany({
    take: ADMIN_LIST_LIMIT,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
    },
  });
}

export async function getAdminReviews() {
  return db.review.findMany({
    take: ADMIN_LIST_LIMIT,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      content: true,
      rating: true,
      createdAt: true,
      user: {
        select: { id: true, name: true, image: true },
      },
      item: {
        select: { id: true, name: true, slug: true },
      },
    },
  });
}
