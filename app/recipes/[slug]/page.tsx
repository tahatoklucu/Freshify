import { db } from "@/lib/db";
import {
  LucideUtensils,
  LucideListOrdered,
  LucideChevronLeft,
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReviewsSection from "@/components/reviews/reviews";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const selectedRecipe = await db.item.findUnique({
    where: { slug: slug },
    include: {
      user: true,
      reviews: { include: { user: true } },
    },
  });

  if (!selectedRecipe) {
    notFound();
  }

  const totalRating = selectedRecipe?.reviews.reduce(
    (acc, rev) => acc + rev.rating,
    0
  );
  const averageRating =
    selectedRecipe.reviews.length > 0
      ? totalRating / selectedRecipe.reviews.length
      : 0;
  const reviewCount = selectedRecipe.reviews.length;

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
          <Link
            href={`/profile/${selectedRecipe.user?.profileToken}`}
            className="flex items-center gap-2 mb-4 group"
          >
            <Avatar className="w-10 h-10 border border-slate-200 shadow-sm">
              {selectedRecipe.user?.image ? (
                <AvatarImage
                  src={selectedRecipe.user.image}
                  className="object-cover"
                />
              ) : (
                <AvatarFallback className="bg-orange-100 text-orange-600 font-bold">
                  {selectedRecipe.user?.name?.charAt(0).toUpperCase() || "A"}
                </AvatarFallback>
              )}
            </Avatar>
            <p className="text-slate-600 font-medium">
              By{" "}
              <span className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                {selectedRecipe.user?.name || "Anonymous"}
              </span>
            </p>
          </Link>
          
          <p className="text-orange-600 font-bold mb-4">
            ⭐ {averageRating.toFixed(1)} / 5.0 ({reviewCount} reviews)
          </p>
          
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
              <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-xl shadow-slate-100/50 mb-5">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-6 w-1.5 bg-orange-500 rounded-full"></div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight">
                    Recipe Essentials
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-white p-4 rounded-2xl border border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Duration
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="text-xl font-black text-slate-900">
                        {selectedRecipe.cookingTime}
                      </span>
                      <span className="text-xs font-bold text-orange-500 pb-1">
                        min
                      </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 text-slate-100 text-4xl">
                      ⏱
                    </div>
                  </div>
                  <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-white p-4 rounded-2xl border border-orange-100">
                    <p className="text-[10px] font-bold text-orange-400/80 uppercase tracking-widest mb-1">
                      Heat
                    </p>
                    <div className="flex items-end gap-1">
                      <span className="text-sm font-black text-orange-600 uppercase">
                        {selectedRecipe.heatLevel?.replace("_", " ")}
                      </span>
                    </div>
                    <div className="absolute -bottom-2 -right-2 text-orange-100 text-4xl opacity-10">
                      🔥
                    </div>
                  </div>
                </div>
              </div>
              <ReviewsSection
                itemId={selectedRecipe.id}
                initialReviews={selectedRecipe.reviews}
                slug={slug}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
