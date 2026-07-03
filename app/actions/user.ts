"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateProfile(
  userId: string, 
  data: { name: string, image?: string | null } 
) {
  await db.user.update({
    where: { id: userId },
    data: { 
      name: data.name, 
      image: data.image 
    }
  });

  revalidatePath(`/profile/[token]`); 
  revalidatePath(`/recipes/[slug]`, "page");
  return { success: true };
}