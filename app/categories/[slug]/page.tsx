import Recipes from "@/components/recipes/recipes";
import { notFound } from "next/navigation";
import {
  getCategorySlugs,
  getCategoryWithRecipes,
} from "@/lib/services/categories";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategorySlugs();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const selectedCategory = await getCategoryWithRecipes(slug);

  if (!selectedCategory) notFound();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Recipes
        recipes={selectedCategory.items}
        categoryName={selectedCategory.name}
        categoryDescription={
          selectedCategory.description ||
          "Exquisite flavors and step-by-step practical recipes."
        }
      />
    </div>
  );
}
