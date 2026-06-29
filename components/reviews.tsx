"use client";

import { useState } from "react";
import { LucideMessageSquare, LucideStar } from "lucide-react";

export default function ReviewsSection({
  initialReviews,
}: {
  initialReviews: any[];
}) {
  const [reviews] = useState(initialReviews);

  return (
    <section className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
      <div className="flex items-center gap-2 mb-8">
        <LucideMessageSquare className="w-5 h-5 text-orange-500" />
        <h2 className="text-xl font-black text-slate-800">
          Reviews ({reviews.length})
        </h2>
      </div>

      <div className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
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
                        i < review.rating ? "fill-current" : "text-slate-200"
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
  );
}
