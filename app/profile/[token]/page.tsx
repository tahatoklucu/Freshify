import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  CalendarDays,
  LucideMessageSquare,
  Mail,
} from "lucide-react";
import RecipeList from "@/components/recipes/recipeList";
import ReviewList from "@/components/reviews/reviewList";
import { EditProfileDialog } from "@/components/forms/editProfileDialog";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const session = await getServerSession(authOptions);

  const user: any = await db.user.findUnique({
    where: { profileToken: token },
    include: {
      items: { include: { reviews: true } },
      review: { include: { item: true }, orderBy: { createdAt: "desc" } },
    },
  });

  if (!user) return notFound();

  const isOwner = session?.user?.id === user.id;

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-16">
        <div className="relative">
          <Avatar className="w-32 h-32 border border-slate-200">
            <AvatarImage src={user.image || ""} />
            <AvatarFallback className="text-3xl bg-slate-100 text-slate-400 font-bold">
              {user.name?.[0]}
            </AvatarFallback>
          </Avatar>
          {isOwner && <EditProfileDialog user={user} />}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            {user.name}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 mt-4">
            {isOwner && (
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
              <CalendarDays className="w-4 h-4" />
              <span className="text-sm">
                Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-8">
          <BookOpen className="w-6 h-6 text-orange-600" />
          {isOwner ? "My Recipes" : `${user.name?.split(" ")[0]}'s Recipes`}
        </h2>

        {(user.items || []).length > 0 ? (
          <RecipeList items={user.items} />
        ) : (
          <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">
              {isOwner
                ? "You haven't added any recipes yet."
                : "This user hasn't shared any recipes yet."}
            </p>
          </div>
        )}
      </section>

      <section>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-8">
          <LucideMessageSquare className="w-6 h-6 text-orange-600" />
          {isOwner
            ? `My Reviews`
            : `${user.name?.split(" ")[0]}'s Recent Reviews`}{" "}
          <span className="text-orange-600">({user.review.length})</span>
        </h2>

        {(user.review || []).length > 0 ? (
          <ReviewList reviews={user.review} />
        ) : (
          <div className="py-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">
              {isOwner
                ? "You haven't written any reviews yet."
                : "This user hasn't written any reviews yet."}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
