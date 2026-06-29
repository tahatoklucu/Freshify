import {
  LucideClock,
  LucideUtensils,
  LucideFlame,
  LucideChevronLeft,
  LucideStar,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string | null;
  description?: string | null;
  rating: number;
  ratingCount: number;
}

interface RecipesProps {
  recipes: Recipe[];
  categoryName?: string;
  categoryDescription?: string;
}

export default function Recipes({
  recipes,
  categoryName,
  categoryDescription,
}: RecipesProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {categoryName ? (
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-orange-500 transition-colors group mb-6"
          >
            <LucideChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Categories</span>
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                {categoryName}
              </h1>
              <p className="text-slate-500 max-w-xl text-base md:text-lg">{categoryDescription}</p>
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 w-full md:w-fit">
              <div className="bg-orange-50 p-2 rounded-xl text-orange-500">
                <LucideUtensils className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Recipes</p>
                <p className="font-black text-slate-900 text-lg">
                  {recipes?.length || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900">Featured Recipes</h2>
          <p className="text-slate-500 mt-2">Discover the most highly recommended recipes.</p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
        {recipes?.map((recipe) => (
          <Link
            href={`/recipes/${recipe.slug}`}
            key={recipe.id}
            className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <Image
                src={recipe.imageUrl || ""}
                alt={recipe.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-slate-700 shadow-sm">
                Popular
              </div>
            </div>

            <div className="p-4 md:p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <LucideStar key={i} className={`w-3 h-3 ${i < Math.round(recipe.rating) ? "fill-orange-400 text-orange-400" : "text-slate-200"}`} />
                ))}
                <span className="text-[9px] font-bold text-slate-400 ml-1">({recipe.ratingCount})</span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm md:text-lg leading-tight group-hover:text-orange-600 transition-colors">
                {recipe.name}
              </h3>
              
              <div className="flex items-center justify-between border-t border-slate-50 pt-3 md:pt-4 mt-auto">
                <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold text-slate-400">
                  <LucideClock className="w-3 h-3" /> 45m
                </div>
                <div className="flex items-center gap-1.5 text-[10px] md:text-[11px] font-bold text-slate-400">
                  <LucideFlame className="w-3 h-3" /> Medium
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}