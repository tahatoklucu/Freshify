import { LucideClock, LucideUtensils, LucideFlame, LucideChevronLeft } from "lucide-react";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string;
  imageUrl?: string | null;
  description?: string | null;
}

interface RecipesProps {
  recipes: Recipe[];
  categoryName?: string;
  categoryDescription?: string; 
}

export default function Recipes({ recipes, categoryName, categoryDescription }: RecipesProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* ---------------- CATEGORY PAGE HEADER AREA ---------------- */}
      {categoryName ? (
        <div className="mb-10">
          {/* Back to Categories Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-orange-500 transition-colors mb-6 group"
          >
            <LucideChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            <span>Categories</span>
          </Link>

          {/* Title and Stats Badge */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-slate-200/60">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-orange-500 text-xs font-bold uppercase tracking-widest">
                <LucideUtensils className="w-3.5 h-3.5" />
                <span>Our Selections</span>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                {categoryName}
              </h1>
              <p className="text-slate-500 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                {categoryDescription || "Exquisite flavors and step-by-step practical recipes."}
              </p>
            </div>

            {/* Total Count Badge */}
            <div className="flex items-center gap-3 bg-white border border-slate-100 rounded-2xl py-2.5 px-4 shadow-sm w-fit self-start sm:self-auto">
              <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                <LucideFlame className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</p>
                <p className="text-sm font-black text-slate-800 -mt-0.5">
                  {recipes?.length || 0} {recipes?.length === 1 ? 'Recipe' : 'Recipes'}
                </p>
              </div>
            </div>
          </div>

          {/* Section Title inside Category */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Featured Recipes
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              The most popular and saved flavors of this category.
            </p>
          </div>
        </div>
      ) : (
        // ---------------- HOME PAGE HEADER AREA ----------------
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Featured Recipes
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Discover the most highly recommended recipes from our community.
          </p>
        </div>
      )}

      {/* ---------------- RECIPE CARDS GRID ---------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recipes?.map((recipe) => (
          <div
            key={recipe.id}
            className="group bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-orange-100 transition-all duration-300 flex flex-col cursor-pointer"
          >
            {/* Image Area */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
              {recipe.imageUrl ? (
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400">
                  <LucideUtensils className="w-8 h-8 stroke-[1.5]" />
                </div>
              )}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm">
                Popular
              </span>
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-grow">
              <h3 className="font-bold text-slate-800 text-lg line-clamp-1 group-hover:text-orange-500 transition-colors">
                {recipe.name}
              </h3>
              
              <p className="text-slate-500 text-sm mt-2 line-clamp-2 flex-grow leading-relaxed">
                {recipe.description || "No description has been added for this recipe yet."}
              </p>

              {/* Recipe Meta Info (Time and Difficulty) */}
              <div className="flex items-center justify-between border-t border-slate-50 mt-4 pt-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1">
                  <LucideClock className="w-3.5 h-3.5 text-orange-400" />
                  <span>45 mins</span>
                </div>
                <div className="flex items-center gap-1">
                  <LucideFlame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Medium</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}