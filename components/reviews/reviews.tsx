"use client";

import { useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import {
  LucideMessageSquare,
  LucideStar,
  LucideSend,
  LucideLoader2,
  LucideTrash2,
  LucideEdit2,
  LucideCheck,
  LucideX,
} from "lucide-react";
import { addReview, deleteReview, updateReview } from "@/app/actions/review";
import Link from "next/link";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(5);

  const handleAddReview = async (formData: FormData) => {
    formData.append("rating", rating.toString());
    startTransition(async () => {
      const res = await addReview(itemId, slug, formData);
      if (!res.success) alert(res.message);
    });
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    startTransition(async () => {
      const res = await deleteReview(reviewId, slug);
      if (!res.success) alert(res.message);
    });
  };

  const handleUpdateReview = async (reviewId: string) => {
    startTransition(async () => {
      const res = await updateReview(reviewId, editContent, editRating, slug);
      if (res.success) {
        setEditingId(null);
      } else {
        alert(res.message || "Something went wrong.");
      }
    });
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-8">
      <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
        <LucideMessageSquare className="w-5 h-5 text-orange-500" />
        Reviews ({initialReviews.length})
      </h3>

      {session ? (
        <form action={handleAddReview} className="relative space-y-3">
          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            Rate this recipe
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} type="button" onClick={() => setRating(star)}>
                <LucideStar
                  className={`w-5 h-5 cursor-pointer ${
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
            className="w-full p-4 pr-16 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none bg-slate-50"
            rows={2}
            placeholder="Share your thoughts..."
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
        <div className="p-4 bg-slate-50 rounded-2xl text-center text-sm text-slate-500 border border-dashed border-slate-200">
          Please log in to leave a review.
        </div>
      )}

      <div className="space-y-6">
        {initialReviews.map((review) => (
          <div
            key={review.id}
            className="flex gap-4 border-b border-slate-50 pb-6 last:border-0"
          >
            <Link
              href={`/profile/${review.user?.profileToken}`}
              className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center font-bold text-xs hover:ring-2 hover:ring-orange-500 transition-all shrink-0"
            >
              {review.user?.image ? (
                <img
                  src={review.user.image}
                  alt={review.user.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>{review.user?.name?.charAt(0) || "U"}</span>
              )}
            </Link>

            <div className="flex-grow">
              {editingId === review.id ? (
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-2 rounded-lg border border-slate-200 text-sm resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setEditRating(s)}
                        >
                          <LucideStar
                            className={`w-4 h-4 cursor-pointer ${
                              s <= editRating
                                ? "fill-orange-400 text-orange-400"
                                : "text-slate-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateReview(review.id)}
                        className="text-green-600 bg-white p-1 rounded-lg border cursor-pointer"
                      >
                        <LucideCheck size={16} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-slate-400 bg-white p-1 rounded-lg border cursor-pointer"
                      >
                        <LucideX size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">
                      {review.user?.name}
                    </h4>
                    <div className="flex gap-0.5 mt-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <LucideStar
                          key={s}
                          className={`w-3 h-3 ${
                            s <= review.rating
                              ? "fill-orange-400 text-orange-400"
                              : "text-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      {review.content}
                    </p>
                  </div>

                  {session?.user?.email === review.user?.email && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(review.id);
                          setEditContent(review.content);
                          setEditRating(review.rating);
                        }}
                        className="text-slate-400 hover:text-orange-600 cursor-pointer"
                      >
                        <LucideEdit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="text-red-400 hover:text-red-600 cursor-pointer"
                      >
                        <LucideTrash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
