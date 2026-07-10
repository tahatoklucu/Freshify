"use server"

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateUser(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await db.user.update({
    where: { id },
    data: { name, email },
  });

  revalidatePath("/admin/users");
}

export async function deleteUser(id: string) {
  await db.user.delete({ where: { id } });
  revalidatePath("/admin/users");
}

export async function deleteRecipe(id: string) {
  await db.item.delete({
    where: { id },
  });
  revalidatePath("/admin/recipes");
}


export async function updateRecipe(id: string, formData: FormData) {
  const name = formData.get("name") as string;
  const cookingTimeStr = formData.get("cookingTime") as string;

  const cookingTime = cookingTimeStr ? parseInt(cookingTimeStr, 10) : 0;

  try {
    await db.item.update({
      where: { id },
      data: {
        name: name,
        cookingTime: cookingTime,
      },
    });

    revalidatePath("/admin/recipes");
    
    return { success: true };
  } catch (error) {
    console.error("Update error:", error);
    return { success: false, error: "Database update error." };
  }
}

export async function deleteReview(id: string) {
  try {
    await db.review.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/admin/reviews");
    
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "The comment failed to be deleted." };
  }
}