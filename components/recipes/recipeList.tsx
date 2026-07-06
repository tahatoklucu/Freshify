"use client";
import { useState } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import Image from "next/image";

export default function RecipeList({ items }: { items: any[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayedItems = showAll ? items : items.slice(0, 3);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedItems.map((item: any) => (
          <Link
            href={`/recipes/${item.slug}`}
            key={item.id}
            className="group block bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all overflow-hidden"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>

            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-1">
                {item.name}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                {item.description}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <CalendarDays className="w-3.5 h-3.5" />
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString()
                    : "New"}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {items.length > 3 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:border-orange-500 hover:text-orange-600 transition-all cursor-pointer"
          >
            {showAll ? "Show Less" : `View All ${items.length} Recipes`}
          </button>
        </div>
      )}
    </>
  );
}
