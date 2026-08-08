import { Suspense } from "react";
import Categories from "@/components/recipes/categories";
import Recipes from "@/components/recipes/recipes";
import { Hero } from "@/components/shared/hero";
import { getCategories } from "@/lib/services/categories";
import { getRecipeList } from "@/lib/services/recipes";

async function HomeCategories() {
  const allCategories = await getCategories();
  if (allCategories.length === 0) return null;
  return <Categories categories={allCategories} />;
}

async function HomeRecipes({
  search,
  category,
}: {
  search?: string;
  category?: string;
}) {
  const items = await getRecipeList({ search, category });

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <p className="text-lg font-medium">No recipes found.</p>
        <p className="text-sm">
          Try adjusting your search or category filter.
        </p>
      </div>
    );
  }

  return <Recipes recipes={items} />;
}

function SectionSkeleton({ label }: { label: string }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="h-8 w-48 bg-slate-200 rounded animate-pulse mb-6" />
      <p className="text-sm text-slate-400 mb-8">{label}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-64 rounded-3xl bg-slate-200/70 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const { search, category } = params;

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <Hero />
      {!search && (
        <Suspense fallback={<SectionSkeleton label="Loading categories..." />}>
          <HomeCategories />
        </Suspense>
      )}
      <Suspense fallback={<SectionSkeleton label="Loading recipes..." />}>
        <HomeRecipes search={search} category={category} />
      </Suspense>
    </div>
  );
}
