import { db } from "@/lib/db";
import RecipeForm from "@/components/recipeForm";

export default async function NewRecipePage() {
  const categories = await db.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" }
  });

  return <RecipeForm categories={categories} />;
}