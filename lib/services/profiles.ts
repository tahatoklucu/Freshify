import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { CACHE_TAGS } from "@/lib/cache-tags";

export async function getProfileByToken(token: string) {
  return unstable_cache(
    async () =>
      db.user.findUnique({
        where: { profileToken: token },
        select: {
          id: true,
          name: true,
          image: true,
          createdAt: true,
          profileToken: true,
          items: {
            select: {
              id: true,
              slug: true,
              name: true,
              description: true,
              imageUrl: true,
            },
            orderBy: { name: "asc" },
          },
          review: {
            orderBy: { createdAt: "desc" },
            select: {
              id: true,
              content: true,
              rating: true,
              createdAt: true,
              item: {
                select: {
                  id: true,
                  slug: true,
                  name: true,
                },
              },
            },
          },
        },
      }),
    ["profile-by-token", token],
    {
      tags: [CACHE_TAGS.profile(token)],
      revalidate: 60,
    }
  )();
}
