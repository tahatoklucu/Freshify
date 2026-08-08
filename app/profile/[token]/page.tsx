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
import ReviewList from "@/components/reviews/reviewList";
import { EditProfileDialog } from "@/components/forms/editProfileDialog";
import Link from "next/link";
import Image from "next/image";
import DeleteButton from "@/components/shared/deleteButton";
import { getProfileByToken } from "@/lib/services/profiles";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const session = await getServerSession(authOptions);
  const user = await getProfileByToken(token);

  if (!user) return notFound();

  const isOwner = session?.user?.id === user.id;
  const ownerEmail = isOwner ? session?.user?.email : null;

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
          {isOwner && (
            <EditProfileDialog
              user={{
                id: user.id,
                name: user.name,
                image: user.image,
                profileToken: user.profileToken,
              }}
            />
          )}
        </div>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-900 mb-2">
            {user.name}
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 mt-4">
            {isOwner && ownerEmail && (
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-full">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{ownerEmail}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.items.map((item) => (
              <div key={item.id} className="relative group">
                {isOwner && (
                  <div className="absolute top-3 right-3 z-50">
                    <DeleteButton itemId={item.id} />
                  </div>
                )}
                <Link
                  href={`/recipes/${item.slug}`}
                  className="group block bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-600 transition-all overflow-hidden h-full"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    {item.imageUrl && (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-orange-600 transition-colors mb-2 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No recipes shared yet.</p>
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
