import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { db } from "@/lib/db";
import { RecipeCard } from "@/components/admin/recipe-card";

export default async function RecipesPage() {
  const recipes = await db.item.findMany({
    include: { category: true },
  });

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Recipes</h2>
          <p className="text-slate-500 text-sm">
            Manage your culinary library and ingredients.
          </p>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
        <Input placeholder="Search recipes..." className="pl-9" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
