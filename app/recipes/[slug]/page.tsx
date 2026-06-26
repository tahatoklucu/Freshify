import { LucideClock, LucideFlame, LucideUtensils, LucideChevronLeft, LucideHeart, LucideShare2 } from "lucide-react";
import Link from "next/link";
import { db } from '@/lib/db';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function RecipeDetailPage({params}: PageProps) {
    const { slug } = await params;
    const selectedRecipe = await db.item.findUnique({
        where: {slug: slug}
    })
    
return (
  <div className="min-h-screen bg-slate-50/50 font-sans antialiased pb-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-orange-500 transition-colors duration-200 group"
      >
        <LucideChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
        <span>Back to Recipes</span>
      </Link>

      <div className="flex items-center gap-2">
        <button className="p-2.5 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-red-500 hover:shadow-sm transition-all">
          <LucideHeart className="w-4 h-4" />
        </button>
        <button className="p-2.5 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-orange-500 hover:shadow-sm transition-all">
          <LucideShare2 className="w-4 h-4" />
        </button>
      </div>
    </div>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7">
          <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-3xl bg-slate-100 border border-slate-100 shadow-sm">
            {selectedRecipe?.imageUrl ? (
              <img
                src={selectedRecipe.imageUrl}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <LucideUtensils className="w-12 h-12 stroke-[1.5]" />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="inline-flex items-center gap-1.5 text-orange-500 text-xs font-bold uppercase tracking-widest">
            <LucideUtensils className="w-3.5 h-3.5" />
            <span>Featured Recipe</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-none">
            {selectedRecipe?.name || "Recipe Title"}
          </h1>

          <p className="text-slate-500 text-base font-medium leading-relaxed">
            {selectedRecipe?.description || "No description available for this recipe yet."}
          </p>

          <hr className="border-slate-100" />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 bg-slate-50/60 rounded-2xl p-4 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                <LucideClock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Prep Time</p>
                <p className="text-sm font-black text-slate-800 -mt-0.5">45 mins</p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-slate-50/60 rounded-2xl p-4 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                <LucideFlame className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Difficulty</p>
                <p className="text-sm font-black text-slate-800 -mt-0.5">Medium</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

  </div>
);
}