"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { slugify } from "@/lib/utils";

export async function createRecipe(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const cookingTime = parseInt(formData.get("cookingTime") as string);
  const heatLevel = formData.get("heatLevel") as any;
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

  const recipe = await db.item.create({
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
  });

  revalidatePath("/");
  redirect(`/recipes/${recipe.slug}`);
}

export async function deleteRecipe(itemId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return { success: false, message: "Unauthorized" };
  }

  const existingRecipe = await db.item.findUnique({
    where: { id: itemId },
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

  revalidatePath("/");
  return { success: true, message: "Recipe deleted successfully" };
}
