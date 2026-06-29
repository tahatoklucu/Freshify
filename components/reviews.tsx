"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { LucideMessageSquare, LucideStar, LucideSend } from "lucide-react";

export default function ReviewsSection({ initialReviews }: { initialReviews: any[] }) {
  const { data: session } = useSession();
  const [reviews] = useState(initialReviews);

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm space-y-6">
      <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
        <LucideMessageSquare className="w-5 h-5 text-orange-500" />
        Reviews ({reviews.length})
      </h3>

      {session ? (
        <div className="relative">
          <textarea 
            className="w-full p-4 pr-12 rounded-2xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none bg-slate-50"
            rows={2}
            placeholder="Write a review..."
          />
          <button className="absolute right-3 bottom-3 p-2 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-colors">
            <LucideSend className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
          <p className="text-xs text-slate-500">Please log in to share your thoughts.</p>
        </div>
      )}

      <div className="space-y-6 pt-2">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="flex gap-4 border-b border-slate-50 pb-6 last:border-0 last:pb-0">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center font-bold text-[10px]">
                {review.userName?.charAt(0) || "A"}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-800 text-xs">{review.userName || "Anonymous"}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {new Date(review.createdAt).toLocaleDateString("en-US")}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{review.content}</p>
                <div className="flex text-orange-400 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <LucideStar key={i} className={`w-3 h-3 ${i < review.rating ? "fill-current" : "text-slate-200"}`} />
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-slate-400 text-sm italic text-center py-4">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}