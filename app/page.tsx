import { db } from "@/lib/db";
import Categories from "@/components/categories";
import Recipes from "@/components/recipes";
import { Hero } from "@/components/hero";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const params = await searchParams;
  const { search, category } = params;

  const allCategories = !search ? await db.category.findMany() : [];

  const items = await db.item.findMany({
    where: {
      AND: [
        search ? { name: { contains: search, mode: "insensitive" } } : {},
        category ? { category: { slug: category } } : {},
      ],
    },
    include: {
      reviews: {
        select: { rating: true }
      }
    }
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <Hero />
      {allCategories.length > 0 && <Categories categories={allCategories} />}

      {items.length > 0 ? (
        <Recipes recipes={items} />
      ) : (
        <div className="text-center py-20 text-slate-500">
          <p className="text-lg font-medium">No recipes found.</p>
          <p className="text-sm">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}
