import {
  LucideClock,
  LucideFlame,
  LucideUtensils,
  LucideChevronLeft,
  LucideHeart,
  LucideShare2,
  LucideStar,
  LucideMessageSquare,
  LucideSend,
} from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const selectedRecipe = await db.item.findUnique({
    where: { slug: slug },
    include: {
      reviews: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!selectedRecipe) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans antialiased pb-16">
      |
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-orange-500 transition-colors group"
        >
          <LucideChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back to Recipes</span>
        </Link>
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-red-500 transition-all">
            <LucideHeart className="w-4 h-4" />
          </button>
          <button className="p-2.5 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-orange-500 transition-all">
            <LucideShare2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] sm:aspect-video w-full overflow-hidden rounded-3xl bg-slate-100 border border-slate-100 shadow-sm">
              <img
                src={selectedRecipe.imageUrl || ""}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-5 space-y-6 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2">
              <div className="flex text-orange-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <LucideStar
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(selectedRecipe.rating)
                        ? "fill-current"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-slate-600">
                {selectedRecipe.ratingCount}
              </span>
              <span className="text-xs text-slate-400">Reviews ({selectedRecipe.reviews.length})</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {selectedRecipe.name}
            </h1>
            <p className="text-slate-500 text-base font-medium leading-relaxed">
              {selectedRecipe.description}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-slate-50/60 rounded-2xl p-4 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <LucideClock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Prep Time
                  </p>
                  <p className="text-sm font-black text-slate-800">45 mins</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50/60 rounded-2xl p-4 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                  <LucideFlame className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    Difficulty
                  </p>
                  <p className="text-sm font-black text-slate-800">Medium</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <LucideMessageSquare className="w-5 h-5 text-orange-500" />
            <h2 className="text-xl font-bold text-slate-800">
              Reviews ({selectedRecipe.reviews.length})
            </h2>
          </div>

          <div className="space-y-6">
            {selectedRecipe.reviews.map((review) => (
              <div
                key={review.id}
                className="flex gap-4 border-b border-slate-50 pb-6 last:border-0"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  {review.content.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Anonymous</h4>
                  <p className="text-sm text-slate-500 mt-1">
                    {review.content}
                  </p>
                  <div className="flex text-orange-400 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <LucideStar key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
