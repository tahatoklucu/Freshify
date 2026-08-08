"use server";

import { db } from "@/lib/db";
import { AuthError, requireAuth } from "@/lib/require-auth";
import { put } from "@vercel/blob";
import { CACHE_TAGS } from "@/lib/cache-tags";
import { revalidateCacheTag } from "@/lib/revalidate";

export async function updateProfile(
  userId: string,
  data: { name: string; image?: string | null }
) {
  const session = await requireAuth();

  if (session.user.id !== userId) {
    throw new AuthError("Forbidden");
  }

  if (!data.name || data.name.trim() === "") {
    throw new Error("Name field is required and cannot be empty.");
  }

  const user = await db.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      image: data.image,
    },
    select: {
      profileToken: true,
      items: { select: { slug: true } },
    },
  });

  if (user.profileToken) {
    revalidateCacheTag(CACHE_TAGS.profile(user.profileToken));
  }
  revalidateCacheTag(CACHE_TAGS.recipes);
  for (const item of user.items) {
    revalidateCacheTag(CACHE_TAGS.recipe(item.slug));
  }

  return { success: true };
}

export async function uploadImageAction(file: File) {
  await requireAuth();

  const blob = await put(file.name, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return blob.url;
}
