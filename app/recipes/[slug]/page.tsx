import { db } from "@/lib/db";
import {
  LucideUtensils,
  LucideListOrdered,
  LucideChevronLeft,
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReviewsSection from "@/components/reviews";
import Image from "next/image";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const selectedRecipe = await db.item.findUnique({
    where: { slug: slug },
    include: { reviews: { orderBy: { createdAt: "desc" } } },
  });

  if (!selectedRecipe) return notFound();

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-orange-600 transition-all group"
        >
          <LucideChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Recipes
        </Link>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-8 border-b border-slate-200 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
            {selectedRecipe.name}
          </h1>
          <p className="text-slate-500 text-lg max-w-3xl leading-relaxed">
            {selectedRecipe.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-sm border border-slate-100">
              <Image
                src={selectedRecipe.imageUrl || ""}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority={true}
              />
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-10">
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <LucideUtensils className="w-5 h-5 text-orange-500" />{" "}
                  Ingredients
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 text-sm">
                  {selectedRecipe.ingredients?.map(
                    (item: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />{" "}
                        {item}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                  <LucideListOrdered className="w-5 h-5 text-orange-500" />{" "}
                  Instructions
                </h3>
                <div className="space-y-6">
                  {selectedRecipe.instructions?.map(
                    (step: string, i: number) => (
                      <div key={i} className="flex gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-black text-sm">
                          {i + 1}
                        </span>
                        <p className="text-slate-600 text-sm leading-relaxed mt-1">
                          {step}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="sticky top-24">
              <ReviewsSection initialReviews={selectedRecipe.reviews} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
