import ReviewsSection from "@/components/reviews/reviews";
import { getRecipeReviews } from "@/lib/services/recipes";

export default async function RecipeReviews({
  itemId,
  slug,
}: {
  itemId: string;
  slug: string;
}) {
  const reviews = await getRecipeReviews(slug);

  return (
    <ReviewsSection itemId={itemId} initialReviews={reviews} slug={slug} />
  );
}
