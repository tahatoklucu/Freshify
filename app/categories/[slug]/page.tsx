import { LucideChevronLeft, LucideFlame, LucideUtensils } from "lucide-react";
import Link from "next/link";
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
    include: { items: true }
  });

  if (!selectedCategory) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-orange-500 transition-colors duration-200 group"
        >
          <LucideChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Categories</span>
        </Link>
      </div>

      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/60">
          
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 text-orange-500 text-xs font-bold uppercase tracking-widest">
              <LucideUtensils className="w-3.5 h-3.5 animate-pulse" />
              <span>Our Selections</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              {selectedCategory.name}
            </h1>

            <p className="text-slate-500 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
              {selectedCategory.description || "Exquisite flavors and step-by-step practical recipes."}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl py-3 px-5 shadow-sm w-fit self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
              <LucideFlame className="w-5 h-5" />
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</p>
              <p className="text-lg font-black text-slate-800 -mt-0.5">
                {selectedCategory.items.length} {selectedCategory.items.length === 1 ? 'Recipe' : 'Recipes'}
              </p>
            </div>
          </div>

        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <Recipes recipes={selectedCategory.items || []} />
      </main>

    </div>
  );
}