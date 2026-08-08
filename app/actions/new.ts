"use server";

import { db } from "@/lib/db";
import { requireAuth, AuthError } from "@/lib/require-auth";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { slugify } from "@/lib/utils";
import type { HeatLevel } from "@prisma/client";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { revalidateCacheTag } from "@/lib/revalidate";

export async function createRecipe(formData: FormData) {
  const session = await requireAuth();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const cookingTime = parseInt(formData.get("cookingTime") as string);
  const heatLevel = formData.get("heatLevel") as HeatLevel;
  const imageFile = formData.get("image") as File;
  const categoryId = formData.get("categoryId") as string;

  const ingredients = JSON.parse(formData.get("ingredients") as string);
  const instructions = JSON.parse(formData.get("instructions") as string);

  let imageUrl: string | null = null;
  if (imageFile && imageFile.size > 0) {
    const uniqueFileName = `${Date.now()}-${imageFile.name.replace(
      /\s+/g,
      "-"
    )}`;

    const blob = await put(uniqueFileName, imageFile, {
      access: "public",
      contentType: imageFile.type,
    });
    imageUrl = blob.url;
  }

  const slug = slugify(name) + "-" + Math.random().toString(36).substring(2, 7);

  const [recipe, category, user] = await Promise.all([
    db.item.create({
      data: {
        name,
        slug,
        description,
        cookingTime,
        heatLevel,
        imageUrl,
        ingredients,
        instructions,
        categoryId,
        userId: session.user.id,
      },
    }),
    db.category.findUnique({
      where: { id: categoryId },
      select: { slug: true },
    }),
    db.user.findUnique({
      where: { id: session.user.id },
      select: { profileToken: true },
    }),
  ]);

  revalidateCacheTag(CACHE_TAGS.recipes);
  revalidateCacheTag(CACHE_TAGS.recipe(recipe.slug));
  if (category?.slug) {
    revalidateCacheTag(CACHE_TAGS.category(category.slug));
  }
  if (user?.profileToken) {
    revalidateCacheTag(CACHE_TAGS.profile(user.profileToken));
  }

  redirect(`/recipes/${recipe.slug}`);
}

export async function deleteRecipe(itemId: string) {
  try {
    const session = await requireAuth();

    const existingRecipe = await db.item.findUnique({
      where: { id: itemId },
      select: {
        id: true,
        slug: true,
        userId: true,
        category: { select: { slug: true } },
        user: { select: { profileToken: true } },
      },
    });

    if (!existingRecipe || existingRecipe.userId !== session.user.id) {
      return {
        success: false,
        message: "Item not found or you are not the owner",
      };
    }

    await db.item.delete({
      where: { id: itemId },
    });

    revalidateCacheTag(CACHE_TAGS.recipes);
    revalidateCacheTag(CACHE_TAGS.recipe(existingRecipe.slug));
    if (existingRecipe.category?.slug) {
      revalidateCacheTag(CACHE_TAGS.category(existingRecipe.category.slug));
    }
    if (existingRecipe.user?.profileToken) {
      revalidateCacheTag(CACHE_TAGS.profile(existingRecipe.user.profileToken));
    }

    return { success: true, message: "Recipe deleted successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      return { success: false, message: error.message };
    }
    throw error;
  }
}
