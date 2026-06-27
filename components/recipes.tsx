import { LucideClock, LucideUtensils, LucideFlame, LucideChevronLeft, LucideStar } from "lucide-react";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  rating: number;
  ratingCount: number;
  ingredients: string[];
  instructions: string[];
}

interface RecipesProps {
  recipes: Recipe[];
  categoryName?: string;
  categoryDescription?: string; 
}

export default function Recipes({ recipes, categoryName, categoryDescription }: RecipesProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {categoryName ? (
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors group mb-6">
            <LucideChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Categories</span>
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">{categoryName}</h1>
              <p className="text-slate-500 max-w-xl">{categoryDescription}</p>
            </div>
            <div className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl text-orange-500 shadow-sm"><LucideUtensils className="w-5 h-5" /></div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Total Items</p>
                <p className="font-black text-slate-900">{recipes?.length || 0} Recipes</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900">Featured Recipes</h2>
          <p className="text-slate-500 mt-2">Discover the most highly recommended recipes from our community.</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {recipes?.map((recipe) => (
          <Link href={`/recipes/${recipe.slug}`} key={recipe.id} 
            className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:border-orange-100 transition-all duration-500 flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img src={recipe.imageUrl || ""} alt={recipe.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-700 shadow-sm">
                Popular
              </div>
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <LucideStar key={i} className={`w-3 h-3 ${i < Math.round(recipe.rating) ? "fill-orange-400 text-orange-400" : "text-slate-200"}`} />
                ))}
                <span className="text-[10px] font-bold text-slate-400 ml-1">({recipe.ratingCount})</span>
              </div>
              
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-orange-600 transition-colors">{recipe.name}</h3>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2 mb-6 flex-grow">{recipe.description}</p>

              <div className="flex items-center justify-between border-t border-slate-50 pt-4 mt-auto">
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                  <LucideClock className="w-3.5 h-3.5" /> 45m
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                  <LucideFlame className="w-3.5 h-3.5" /> Medium
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}