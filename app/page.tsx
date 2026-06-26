import { db } from '@/lib/db';
import Categories from "@/components/categories";
import Recipes from '@/components/recipes';

export default async function Home() {
  const allCategories = await db.category.findMany();
  const allRecipes = await db.item.findMany();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <Categories categories={allCategories} />
      <Recipes recipes={allRecipes as any} />
    </div>
  );
}