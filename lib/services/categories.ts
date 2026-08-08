import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { toRecipeListItem } from "@/lib/services/recipes";

const categorySelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  imageUrl: true,
} as const;

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

export async function getCategories() {
  return unstable_cache(
    async () =>
      db.category.findMany({
        select: categorySelect,
        orderBy: { name: "asc" },
      }),
    ["categories-all"],
    { tags: [CACHE_TAGS.categories], revalidate: 60 }
  )();
}

export async function getCategoryOptions() {
  return unstable_cache(
    async () =>
      db.category.findMany({
        select: { id: true, name: true },
        orderBy: { name: "asc" },
      }),
    ["category-options"],
    { tags: [CACHE_TAGS.categories], revalidate: 60 }
  )();
}

export async function getCategorySlugs() {
  return unstable_cache(
    async () =>
      db.category.findMany({
        select: { slug: true },
      }),
    ["category-slugs"],
    { tags: [CACHE_TAGS.categories], revalidate: 60 }
  )();
}

export async function getCategoryWithRecipes(slug: string) {
  return unstable_cache(
    async () => {
      const category = await db.category.findUnique({
        where: { slug },
        select: {
          ...categorySelect,
          items: {
            select: recipeListSelect,
            orderBy: { name: "asc" },
          },
        },
      });

      if (!category) return null;

      return {
        ...category,
        items: category.items.map(toRecipeListItem),
      };
    },
    ["category-with-recipes-live", slug],
    {
      tags: [
        CACHE_TAGS.categories,
        CACHE_TAGS.category(slug),
        CACHE_TAGS.recipes,
      ],
      revalidate: 60,
    }
  )();
}
