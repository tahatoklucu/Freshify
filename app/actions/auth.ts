"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

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