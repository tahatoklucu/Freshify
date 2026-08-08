"use server";

import { db } from "@/lib/db";
import { AuthError, requireAdmin } from "@/lib/require-auth";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { revalidateCacheTag } from "@/lib/revalidate";
import { syncRecipeAggregates } from "@/lib/services/recipes";

export async function updateUser(id: string, formData: FormData) {
  await requireAdmin();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const user = await db.user.update({
    where: { id },
    data: { name, email },
    select: { profileToken: true },
  });

  if (user.profileToken) {
    revalidateCacheTag(CACHE_TAGS.profile(user.profileToken));
  }
}

export async function deleteUser(id: string) {
  await requireAdmin();

  const user = await db.user.findUnique({
    where: { id },
    select: { profileToken: true },
  });

  await db.user.delete({ where: { id } });

  revalidateCacheTag(CACHE_TAGS.recipes);
  if (user?.profileToken) {
    revalidateCacheTag(CACHE_TAGS.profile(user.profileToken));
  }
}

export async function deleteRecipe(id: string) {
  await requireAdmin();

  const recipe = await db.item.findUnique({
    where: { id },
    select: {
      slug: true,
      category: { select: { slug: true } },
      user: { select: { profileToken: true } },
    },
  });

  await db.item.delete({
    where: { id },
  });

  revalidateCacheTag(CACHE_TAGS.recipes);
  if (recipe?.slug) {
    revalidateCacheTag(CACHE_TAGS.recipe(recipe.slug));
  }
  if (recipe?.category?.slug) {
    revalidateCacheTag(CACHE_TAGS.category(recipe.category.slug));
  }
  if (recipe?.user?.profileToken) {
    revalidateCacheTag(CACHE_TAGS.profile(recipe.user.profileToken));
  }
}

export async function updateRecipe(id: string, formData: FormData) {
  try {
    await requireAdmin();

    const name = formData.get("name") as string;
    const cookingTimeStr = formData.get("cookingTime") as string;
    const cookingTime = cookingTimeStr ? parseInt(cookingTimeStr, 10) : 0;

    const recipe = await db.item.update({
      where: { id },
      data: {
        name,
        cookingTime,
      },
      select: {
        slug: true,
        category: { select: { slug: true } },
        user: { select: { profileToken: true } },
      },
    });

    revalidateCacheTag(CACHE_TAGS.recipes);
    revalidateCacheTag(CACHE_TAGS.recipe(recipe.slug));
    if (recipe.category?.slug) {
      revalidateCacheTag(CACHE_TAGS.category(recipe.category.slug));
    }
    if (recipe.user?.profileToken) {
      revalidateCacheTag(CACHE_TAGS.profile(recipe.user.profileToken));
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
    console.error("Update error:", error);
    return { success: false, error: "Database update error." };
  }
}

export async function deleteReview(id: string) {
  try {
    await requireAdmin();

    const review = await db.review.findUnique({
      where: { id },
      select: {
        itemId: true,
        item: { select: { slug: true } },
        user: { select: { profileToken: true } },
      },
    });

    await db.review.delete({
      where: { id },
    });

    if (review) {
      await syncRecipeAggregates(review.itemId);
      revalidateCacheTag(CACHE_TAGS.recipes);
      revalidateCacheTag(CACHE_TAGS.recipe(review.item.slug));
      if (review.user.profileToken) {
        revalidateCacheTag(CACHE_TAGS.profile(review.user.profileToken));
      }
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, error: error.message };
    }
    console.error("Delete Error:", error);
    return { success: false, error: "The comment failed to be deleted." };
  }
}
