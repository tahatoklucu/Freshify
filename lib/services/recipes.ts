import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { CACHE_TAGS } from "@/lib/cache-tags";
import type { HeatLevel } from "@prisma/client";

const recipeListSelect = {
  id: true,
  slug: true,
  name: true,
  imageUrl: true,
  cookingTime: true,
  heatLevel: true,
  _count: { select: { reviews: true } },
  reviews: { select: { rating: true } },
} as const;

const publicUserSelect = {
  id: true,
  name: true,
  image: true,
  profileToken: true,
} as const;

export type RecipeListItem = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  cookingTime: number;
  heatLevel: HeatLevel;
  rating: number;
  ratingCount: number;
};

type RecipeWithReviewStats = {
  id: string;
  slug: string;
  name: string;
  imageUrl: string | null;
  cookingTime: number;
  heatLevel: HeatLevel;
  _count: { reviews: number };
  reviews: { rating: number }[];
};

/** Build rating stats from live Review rows (not stale Item.ratingCount). */
export function toRecipeListItem(item: RecipeWithReviewStats): RecipeListItem {
  const ratingCount = item._count.reviews;
  const rating =
    ratingCount > 0
      ? item.reviews.reduce((sum, review) => sum + review.rating, 0) /
        ratingCount
      : 0;

  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    imageUrl: item.imageUrl,
    cookingTime: item.cookingTime,
    heatLevel: item.heatLevel,
    rating,
    ratingCount,
  };
}

export async function getRecipeList(filters?: {
  search?: string;
  category?: string;
}) {
  const search = filters?.search?.trim() || "";
  const category = filters?.category?.trim() || "";

  return unstable_cache(
    async () => {
      const items = await db.item.findMany({
        where: {
          AND: [
            search ? { name: { contains: search, mode: "insensitive" } } : {},
            category ? { category: { slug: category } } : {},
          ],
        },
        select: recipeListSelect,
        orderBy: { name: "asc" },
      });

      return items.map(toRecipeListItem);
    },
    ["recipe-list-live", search, category],
    {
      tags: [CACHE_TAGS.recipes],
      revalidate: 60,
    }
  )();
}

export async function getRecipeSlugs() {
  return unstable_cache(
    async () =>
      db.item.findMany({
        select: { slug: true },
      }),
    ["recipe-slugs"],
    { tags: [CACHE_TAGS.recipes], revalidate: 60 }
  )();
}

export async function getRecipeBySlug(slug: string) {
  return unstable_cache(
    async () => {
      const recipe = await db.item.findUnique({
        where: { slug },
        select: {
          id: true,
          name: true,
          slug: true,
          description: true,
          imageUrl: true,
          cookingTime: true,
          heatLevel: true,
          ingredients: true,
          instructions: true,
          categoryId: true,
          category: { select: { slug: true } },
          user: { select: publicUserSelect },
          _count: { select: { reviews: true } },
          reviews: { select: { rating: true } },
        },
      });

      if (!recipe) return null;

      const ratingCount = recipe._count.reviews;
      const rating =
        ratingCount > 0
          ? recipe.reviews.reduce((sum, review) => sum + review.rating, 0) /
            ratingCount
          : 0;

      const { _count, reviews, ...rest } = recipe;
      return {
        ...rest,
        rating,
        ratingCount,
      };
    },
    ["recipe-by-slug-live", slug],
    {
      tags: [CACHE_TAGS.recipes, CACHE_TAGS.recipe(slug)],
      revalidate: 60,
    }
  )();
}

export async function getRecipeReviews(slug: string) {
  return unstable_cache(
    async () => {
      const recipe = await db.item.findUnique({
        where: { slug },
        select: {
          id: true,
          reviews: {
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              content: true,
              rating: true,
              createdAt: true,
              userId: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                  email: true,
                  profileToken: true,
                },
              },
            },
          },
        },
      });

      return recipe?.reviews ?? [];
    },
    ["recipe-reviews", slug],
    {
      tags: [CACHE_TAGS.recipes, CACHE_TAGS.recipe(slug)],
      revalidate: 60,
    }
  )();
}

/** Recalculate denormalized rating fields after review mutations. */
export async function syncRecipeAggregates(itemId: string) {
  const aggregates = await db.review.aggregate({
    where: { itemId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  await db.item.update({
    where: { id: itemId },
    data: {
      rating: aggregates._avg.rating ?? 0,
      ratingCount: aggregates._count.rating,
    },
  });
}
