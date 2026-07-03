"use client";
import { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { LucideStar } from "lucide-react";

export default function ReviewList({ reviews }: { reviews: any[] }) {
  const [showAll, setShowAll] = useState(false);
  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <>
      <div className="space-y-4">
        {displayedReviews.map((review: any) => (
          <Card
            key={review.id}
            className="border-slate-100 shadow-none hover:bg-slate-50 transition-colors"
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-2">
                <Link
                  href={`/recipes/${review.item?.slug || "#"}`}
                  className="font-bold text-orange-600 hover:underline"
                >
                  {review.item?.name || "Deleted Recipe"}
                </Link>
                <span className="text-xs text-slate-400">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-slate-600 italic">"{review.content}"</p>
              <div className="flex gap-0.5 mt-3">
                {[...Array(5)].map((_, i) => (
                  <LucideStar
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < (review.rating || 0)
                        ? "fill-orange-400 text-orange-400"
                        : "text-slate-200"
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reviews.length > 3 && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:border-orange-500 hover:text-orange-600 transition-all cursor-pointer"
          >
            {showAll ? "Show Less" : `View All ${reviews.length} Reviews`}
          </button>
        </div>
      )}
    </>
  );
}