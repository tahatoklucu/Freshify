import { db } from "@/lib/db";
import { ReviewCard } from "@/components/admin/review-card";

export default async function ReviewsPage() {
  const reviews = await db.review.findMany({
    include: { user: true, item: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Review Management
        </h1>
        <span className="text-sm text-muted-foreground">
          {reviews.length} total reviews
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}
