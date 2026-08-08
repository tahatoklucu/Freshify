"use server";

import { AuthError, requireAuth } from "@/lib/require-auth";
import { db } from "@/lib/db";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { revalidateCacheTag } from "@/lib/revalidate";
import { syncRecipeAggregates } from "@/lib/services/recipes";

async function invalidateRecipeCaches(slug: string, itemId: string) {
  await syncRecipeAggregates(itemId);
  revalidateCacheTag(CACHE_TAGS.recipes);
  revalidateCacheTag(CACHE_TAGS.recipe(slug));
}

export async function addReview(
  itemId: string,
  slug: string,
  formData: FormData
) {
  try {
    const session = await requireAuth();

    if (!session.user.email) {
      return { success: false, message: "Please login to review." };
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, profileToken: true },
    });
    if (!user) return { success: false, message: "User not found." };

    const content = formData.get("content") as string;
    const rating = parseInt(formData.get("rating") as string);

    if (!content || !rating) {
      return { success: false, message: "Please fill all fields." };
    }

    await db.review.create({
      data: {
        content,
        rating,
        itemId,
        userId: user.id,
      },
    });

    await invalidateRecipeCaches(slug, itemId);
    if (user.profileToken) {
      revalidateCacheTag(CACHE_TAGS.profile(user.profileToken));
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: "Please login to review." };
    }
    console.error(error);
    return { success: false, message: "Database error." };
  }
}

export async function deleteReview(reviewId: string, slug: string) {
  try {
    const session = await requireAuth();

    if (!session.user.email) {
      return { success: false, message: "Unauthorized" };
    }

    const existing = await db.review.findFirst({
      where: {
        id: reviewId,
        user: { email: session.user.email },
      },
      select: {
        id: true,
        itemId: true,
        user: { select: { profileToken: true } },
      },
    });

    if (!existing) {
      return { success: false, message: "Not authorized or review not found." };
    }

    await db.review.delete({ where: { id: reviewId } });

    await invalidateRecipeCaches(slug, existing.itemId);
    if (existing.user.profileToken) {
      revalidateCacheTag(CACHE_TAGS.profile(existing.user.profileToken));
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: error.message };
    }
    console.error(error);
    return { success: false, message: "Error deleting review." };
  }
}

export async function updateReview(
  reviewId: string,
  content: string,
  rating: number,
  slug: string
) {
  try {
    const session = await requireAuth();

    if (!session.user.email) {
      return { success: false, message: "Unauthorized" };
    }

    if (content === "") {
      return { success: false, message: "This field cannot be left blank!" };
    }

    const existing = await db.review.findFirst({
      where: {
        id: reviewId,
        user: { email: session.user.email },
      },
      select: {
        id: true,
        itemId: true,
        user: { select: { profileToken: true } },
      },
    });

    if (!existing) {
      return { success: false, message: "Unauthorized" };
    }

    const updatedReview = await db.review.update({
      where: { id: reviewId },
      data: { content, rating },
    });

    await invalidateRecipeCaches(slug, existing.itemId);
    if (existing.user.profileToken) {
      revalidateCacheTag(CACHE_TAGS.profile(existing.user.profileToken));
    }

    return { success: true, data: updatedReview };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: error.message };
    }
    console.error("Review update error:", error);
    return { success: false, message: "Failed to update review" };
  }
}
