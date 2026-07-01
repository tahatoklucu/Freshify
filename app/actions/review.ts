"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function addReview(itemId: string, slug: string, formData: FormData) {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return { success: false, message: "Please login to review." };
  }

  const user = await db.user.findUnique({ where: { email: session.user.email } });
  if (!user) return { success: false, message: "User not found." };

  const content = formData.get("content") as string;
  const rating = parseInt(formData.get("rating") as string);

  if (!content || !rating) return { success: false, message: "Please fill all fields." };

  try {
    await db.review.create({
      data: { 
        content, 
        rating, 
        itemId, 
        userId: user.id 
      }
    });

    revalidatePath(`/recipes/${slug}`); 
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Database error." };
  }
}

export async function deleteReview(reviewId: string, slug: string) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return { success: false, message: "Unauthorized" };
  
    try {
      const deleted = await db.review.deleteMany({
        where: {
          id: reviewId,
          user: { email: session.user.email }
        }
      });
  
      if (deleted.count === 0) return { success: false, message: "Not authorized or review not found." };
      
      revalidatePath(`/recipes/${slug}`);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Error deleting review." };
    }
}