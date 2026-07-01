import { db } from '@/lib/db';
import Recipes from "@/components/recipes";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params; 
  
  const selectedCategory = await db.category.findUnique({
    where: { slug: slug },
    include: {
      items: {
        include: {
          reviews: true
        }
      }
    }
  });

  if (!selectedCategory) notFound();

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Recipes 
        recipes={selectedCategory.items} 
        categoryName={selectedCategory.name}
        categoryDescription={selectedCategory.description || "Exquisite flavors and step-by-step practical recipes."}
      />
    </div>
  );
}