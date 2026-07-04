"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function handleRegister(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { success: false, message: "Missing fields" };
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) return { success: false, message: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);
  await db.user.create({ data: { name, email, password: hashedPassword } });

  return { success: true, message: "Account created successfully" };
}

export async function updatePassword(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return { error: "Unauthorized" };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (newPassword !== confirmPassword) return { error: "Passwords do not match"};

  const user = await db.user.findUnique({
    where: {email: session.user.email}
  });

  if (!user?.password) {
    return { error: "You logged in with Google. You don't have a password to update." };
  }

  if (!user || !user.password) return { error: "User not found."}

  const isValid = await bcrypt.compare(currentPassword, user.password);
  if (!isValid) return { error: "Incorrect current password" };
  
  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  
  await db.user.update({
    where: { id: user.id },
    data: { password: hashedNewPassword },
  });

  return { success: true };
}

export async function deleteAccount(){
  "use server";

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { error: "Unauthorized" };

  try {
    await db.user.delete({
      where: { email: session.user.email },
    })
    return { success: true }
  } catch (error) {
    return { error: "Failed to delete account."};
  }
}