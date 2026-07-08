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