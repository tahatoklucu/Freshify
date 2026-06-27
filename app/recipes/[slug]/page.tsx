import { db } from "@/lib/db";
import {
  LucideUtensils,
  LucideStar,
  LucideMessageSquare,
  LucideListOrdered,
  LucideChevronLeft,
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-slate-100 shadow-sm border border-slate-100">
            <img
              src={selectedRecipe.imageUrl || ""}
              alt={selectedRecipe.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-10">
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <LucideUtensils className="w-5 h-5 text-orange-500" /> Ingredients
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600 text-sm">
                {selectedRecipe.ingredients?.map((item: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2">
                <LucideListOrdered className="w-5 h-5 text-orange-500" /> Instructions
              </h3>
              <div className="space-y-6">
                {selectedRecipe.instructions?.map((step: string, i: number) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-black text-sm">
                      {i + 1}
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed mt-1">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
              <h1 className="text-3xl font-black text-slate-900 mb-4">
                {selectedRecipe.name}
              </h1>
              <p className="text-slate-500 leading-relaxed">
                {selectedRecipe.description}
              </p>
            </div>

            <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <LucideMessageSquare className="w-5 h-5 text-orange-500" />
                <h2 className="text-xl font-black text-slate-800">
                  Reviews ({selectedRecipe.reviews.length})
                </h2>
              </div>

              <div className="space-y-6">
                {selectedRecipe.reviews.length > 0 ? (
                  selectedRecipe.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex gap-4 border-b border-slate-50 pb-6 last:border-0 last:pb-0"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                        U
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="font-bold text-slate-800 text-sm">
                            Anonymous
                          </h4>
                          <span className="text-[10px] text-slate-400 font-medium">
                            {new Date(review.createdAt).toLocaleDateString("en-US")}
                          </span>
                        </div>

                        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                          {review.content}
                        </p>

                        <div className="flex text-orange-400 mt-2">
                          {[...Array(5)].map((_, i) => (
                            <LucideStar
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? "fill-current"
                                  : "text-slate-200"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 text-sm italic text-center py-4">
                    No reviews yet.
                  </p>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}