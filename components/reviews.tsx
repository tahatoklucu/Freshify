"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import {
  LucideMessageSquare,
  LucideStar,
  LucideSend,
  LucideLoader2,
  LucideTrash2,
} from "lucide-react";
import { addReview, deleteReview } from "@/app/actions/review";

export default function ReviewsSection({
  itemId,
  slug,
  initialReviews,
}: {
  itemId: string;
  slug: string;
  initialReviews: any[];
}) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(5);

  const handleAddReview = async (formData: FormData) => {
    formData.append("rating", rating.toString());
    startTransition(async () => {
      const res = await addReview(itemId, slug, formData);
      if (!res.success) alert(res.message);
    });
  };

  const handleDeleteReview = async (reviewId: string) => {
    startTransition(async () => {
      const res = await deleteReview(reviewId, slug);
      if (!res.success) alert(res.message);
    });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6">
      <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
        <LucideMessageSquare className="w-5 h-5 text-orange-500" />
        Reviews ({initialReviews.length})
      </h3>
      {session ? (
        <form action={handleAddReview} className="relative space-y-3">
          <span className="text-xs font-bold text-slate-400 tracking-wider">
            Rate this recipe
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" className="cursor-pointer" onClick={() => setRating(star)}>
                <LucideStar
                  className={`w-5 h-5 ${
                    star <= rating
                      ? "fill-orange-400 text-orange-400"
                      : "text-slate-300"
                  }`}
                />
              </button>
            ))}
          </div>
          <textarea
            name="content"
            required
            className="w-full p-4 pr-12 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none bg-slate-50"
            rows={2}
            placeholder="Write a review..."
          />
          <button
            type="submit"
            disabled={isPending}
            className="absolute right-2 bottom-6 p-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors cursor-pointer"
          >
            {isPending ? (
              <LucideLoader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LucideSend className="w-4 h-4" />
            )}
          </button>
        </form>
      ) : (
        <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Please log in to share your thoughts.
          </p>
        </div>
      )}

      <div className="space-y-6 pt-2">
        {initialReviews.map((review) => (
          <div
            key={review.id}
            className="flex gap-4 border-b border-slate-50 pb-6 group"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-[10px]">
              {review.user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-slate-800 text-xs">
                  {review.user?.name || "Anonymous"}
                </h4>

                {session?.user?.email === review.user?.email && (
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    disabled={isPending}
                    className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LucideTrash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <p className="text-sm text-slate-600 mt-1">{review.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
